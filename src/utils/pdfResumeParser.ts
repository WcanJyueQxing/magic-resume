import { generateUUID } from "./uuid";

interface ParsedResumeData {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  title?: string;
  photo?: string;
  education: Array<{
    school?: string;
    major?: string;
    startDate?: string;
    endDate?: string;
    degree?: string;
    description?: string;
  }>;
  experience: Array<{
    company?: string;
    position?: string;
    date?: string;
    details?: string;
  }>;
  projects: Array<{
    name?: string;
    role?: string;
    date?: string;
    description?: string;
  }>;
  skills: string[];
  summary: string;
  fullText: string;
  images?: string[];
}

const sectionKeywords = {
  education: [
    "教育背景",
    "教育经历",
    "教育",
    "教育背景",
    "教育经历",
    "Education",
    "EDUCATION",
  ],
  experience: [
    "工作经验",
    "工作经历",
    "工作",
    "工作经验",
    "工作经历",
    "Experience",
    "EXPERIENCE",
    "Work Experience",
  ],
  projects: [
    "项目经历",
    "项目经验",
    "项目",
    "项目经历",
    "项目经验",
    "Projects",
    "PROJECTS",
  ],
  skills: ["专业技能", "技能", "技能清单", "Skills", "SKILLS", "专业技能"],
  summary: [
    "个人简介",
    "个人总结",
    "自我简介",
    "自我评价",
    "Summary",
    "SUMMARY",
  ],
};

export function parseResumeFromText(
  text: string,
  images?: string[],
): ParsedResumeData {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const result: ParsedResumeData = {
    education: [],
    experience: [],
    projects: [],
    skills: [],
    summary: "",
    fullText: text,
    images: images || [],
  };

  // 1. 提取基本信息
  extractBasicInfo(lines, result);

  // 2. 识别各个部分并提取
  parseSections(lines, result);

  // 3. 如果有图片，尝试将第一张图片作为头像
  if (images && images.length > 0) {
    result.photo = images[0];
  }

  return result;
}

function extractBasicInfo(lines: string[], result: ParsedResumeData) {
  const fullText = lines.join("\n");

  // 提取邮箱
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const emailMatch = fullText.match(emailRegex);
  if (emailMatch) {
    result.email = emailMatch[0];
  }

  // 提取电话
  const phoneRegex = /1[3-9]\d{9}/;
  const phoneMatch = fullText.match(phoneRegex);
  if (phoneMatch) {
    result.phone = phoneMatch[0];
  }

  // 尝试从前面几行找姓名（通常是最大的字体或第一行）
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    // 姓名通常是2-4个中文字符，且比较短
    if (line.length >= 2 && line.length <= 10) {
      // 检查是否包含常见姓名特征
      const chineseChars = (line.match(/[\u4e00-\u9fa5]/g) || []).length;
      if (chineseChars >= 2 && chineseChars <= 4) {
        // 排除明显不是姓名的词
        const excludeWords = [
          "简历",
          "个人",
          "求职",
          "应聘",
          "联系",
          "电话",
          "邮箱",
          "地址",
          "邮箱",
        ];
        if (!excludeWords.some((word) => line.includes(word))) {
          result.name = line;
          break;
        }
      }
    }
  }

  // 提取地址/位置
  const locationPatterns = [
    /地址[：:]\s*(.+)/,
    /地址\s*(.+)/,
    /所在地[：:]\s*(.+)/,
    /现居地[：:]\s*(.+)/,
    /住址[：:]\s*(.+)/,
  ];

  for (const pattern of locationPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      result.location = match[1].trim();
      break;
    }
  }

  // 提取求职意向/职位
  const titlePatterns = [
    /求职意向[：:]\s*(.+)/,
    /意向职位[：:]\s*(.+)/,
    /应聘职位[：:]\s*(.+)/,
    /期望职位[：:]\s*(.+)/,
    /职位[：:]\s*(.+)/,
  ];

  for (const pattern of titlePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      result.title = match[1].trim();
      break;
    }
  }
}

function parseSections(lines: string[], result: ParsedResumeData) {
  let currentSection: string | null = null;
  let sectionContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检查是否是新的章节标题
    const newSection = identifySection(line);
    if (newSection) {
      // 保存之前章节的内容
      if (currentSection && sectionContent.length > 0) {
        processSectionContent(currentSection, sectionContent, result);
      }
      currentSection = newSection;
      sectionContent = [];
      continue;
    }

    // 如果有当前章节，收集内容
    if (currentSection) {
      // 保留列表符号和格式
      const formattedLine = formatLine(line);
      sectionContent.push(formattedLine);
    }
  }

  // 处理最后一个章节
  if (currentSection && sectionContent.length > 0) {
    processSectionContent(currentSection, sectionContent, result);
  }
}

function identifySection(line: string): string | null {
  // 移除可能的序号和特殊字符
  const cleanLine = line
    .replace(/^[0-9一二三四五六七八九十]+[.、]*/, "")
    .trim();

  for (const [section, keywords] of Object.entries(sectionKeywords)) {
    for (const keyword of keywords) {
      if (cleanLine.includes(keyword)) {
        return section;
      }
    }
  }

  return null;
}

function formatLine(line: string): string {
  // 保留列表符号
  const bulletMatch = line.match(/^([•\-▪●○►▸])\s*(.*)/);
  if (bulletMatch) {
    return `${bulletMatch[1]} ${bulletMatch[2]}`;
  }

  // 处理缩进
  const indentMatch = line.match(/^(\s+)(.*)/);
  if (indentMatch) {
    return indentMatch[2];
  }

  return line;
}

function processSectionContent(
  section: string,
  content: string[],
  result: ParsedResumeData,
) {
  switch (section) {
    case "education":
      parseEducation(content, result);
      break;
    case "experience":
      parseExperience(content, result);
      break;
    case "projects":
      parseProjects(content, result);
      break;
    case "skills":
      parseSkills(content, result);
      break;
    case "summary":
      result.summary = content.join("\n");
      break;
  }
}

/**
 * 将文本内容转换为 HTML 列表格式
 */
function convertToHtmlList(items: string[]): string {
  if (items.length === 0) return "";

  const listItems = items.map((item) => {
    // 移除列表符号
    const cleanItem = item.replace(/^[•\-▪●○►▸]\s*/, "").trim();
    return `<li>${cleanItem}</li>`;
  });

  return `<ul>${listItems.join("")}</ul>`;
}

function parseEducation(content: string[], result: ParsedResumeData) {
  // 简单分组：检测可能的教育经历分隔（通常是空行或明显的新条目）
  const entries: string[][] = [];
  let currentEntry: string[] = [];

  for (const line of content) {
    // 检查是否是新的教育经历（可能包含大学、学院、学校等关键词）
    const isNewEntry =
      /大学|学院|学校|School|University/.test(line) && currentEntry.length > 0;

    if (isNewEntry) {
      entries.push([...currentEntry]);
      currentEntry = [];
    }
    currentEntry.push(line);
  }

  if (currentEntry.length > 0) {
    entries.push(currentEntry);
  }

  // 如果没有明显分组，就当做一个整体处理
  if (entries.length === 0) {
    entries.push(content);
  }

  for (const entry of entries) {
    const edu = parseSingleEducation(entry);
    if (edu.school || edu.major) {
      result.education.push(edu);
    }
  }
}

function parseSingleEducation(content: string[]): any {
  const edu: any = {};
  const fullText = content.join(" ");

  // 提取学校
  const schoolPatterns = [
    /(.+大学)/,
    /(.+学院)/,
    /(.+学校)/,
    /School[：:]\s*(.+)/,
    /University[：:]\s*(.+)/,
  ];

  for (const pattern of schoolPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      edu.school = match[1].trim();
      break;
    }
  }

  // 提取专业
  const majorPatterns = [
    /专业[：:]\s*(.+)/,
    /专业\s+(.+)/,
    /Major[：:]\s*(.+)/,
    /所学专业[：:]\s*(.+)/,
  ];

  for (const pattern of majorPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      edu.major = match[1].trim();
      break;
    }
  }

  // 提取时间
  const datePatterns = [
    /(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*(\d{4})[.年-](\d{1,2})[.月]?/,
    /(\d{4})[-至~](\d{4})/,
  ];

  for (const pattern of datePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      if (match.length === 5) {
        edu.startDate = `${match[1]}-${match[2].padStart(2, "0")}`;
        edu.endDate = `${match[3]}-${match[4].padStart(2, "0")}`;
      } else if (match.length === 3) {
        edu.startDate = `${match[1]}-09`;
        edu.endDate = `${match[2]}-06`;
      }
      break;
    }
  }

  // 剩余内容作为描述（保留列表格式）
  const descriptionLines = content.filter(
    (line) =>
      !line.includes("大学") &&
      !line.includes("学院") &&
      !line.includes("专业") &&
      !/\d{4}/.test(line),
  );
  if (descriptionLines.length > 0) {
    // 检查是否是列表项
    const hasListItems = descriptionLines.some((line) =>
      /^[•\-▪●○►▸]/.test(line),
    );
    if (hasListItems) {
      edu.description = convertToHtmlList(descriptionLines);
    } else {
      edu.description = `<p>${descriptionLines.join("</p><p>")}</p>`;
    }
  }

  edu.id = generateUUID();
  edu.visible = true;
  edu.gpa = "";
  edu.degree = "";

  return edu;
}

function parseExperience(content: string[], result: ParsedResumeData) {
  const entries = groupEntries(content, [
    /公司|企业|单位|Company|Corporation/,
    /^\d{4}/,
  ]);

  for (const entry of entries) {
    const exp = parseSingleExperience(entry);
    if (exp.company || exp.position) {
      result.experience.push(exp);
    }
  }
}

function parseSingleExperience(content: string[]): any {
  const exp: any = {};
  const fullText = content.join(" ");

  // 提取公司
  const companyPatterns = [
    /公司[：:]\s*(.+)/,
    /就职于[：:]\s*(.+)/,
    /工作单位[：:]\s*(.+)/,
    /Company[：:]\s*(.+)/,
  ];

  for (const pattern of companyPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      exp.company = match[1].trim();
      break;
    }
  }

  // 如果没有匹配到，尝试找一些常见的公司名模式
  if (!exp.company) {
    for (const line of content) {
      if (
        /科技|技术|网络|信息|数据|软件|互联网|有限|股份/.test(line) &&
        line.length <= 30
      ) {
        exp.company = line;
        break;
      }
    }
  }

  // 提取职位
  const positionPatterns = [
    /职位[：:]\s*(.+)/,
    /岗位[：:]\s*(.+)/,
    /职务[：:]\s*(.+)/,
    /Position[：:]\s*(.+)/,
    /任职：\s*(.+)/,
  ];

  for (const pattern of positionPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      exp.position = match[1].trim();
      break;
    }
  }

  // 提取时间
  const datePatterns = [
    /(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*(\d{4})[.年-](\d{1,2})[.月]?/,
    /(\d{4})[-至~](\d{4})/,
    /(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*至今/,
  ];

  for (const pattern of datePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      if (match.length === 5) {
        exp.date = `${match[1]}.${match[2].padStart(2, "0")} - ${match[3]}.${match[4].padStart(2, "0")}`;
      } else if (match.length === 3) {
        exp.date = `${match[1]} - ${match[2]}`;
      } else {
        exp.date = `${match[1]}.${match[2].padStart(2, "0")} - 至今`;
      }
      break;
    }
  }

  // 提取详细内容
  const detailsLines = content.filter(
    (line) =>
      !line.includes("公司") &&
      !line.includes("职位") &&
      !line.includes("岗位") &&
      !/\d{4}/.test(line) &&
      line.length > 5,
  );

  if (detailsLines.length > 0) {
    // 检查是否是列表项
    const hasListItems = detailsLines.some((line) => /^[•\-▪●○►▸]/.test(line));
    if (hasListItems) {
      exp.details = convertToHtmlList(detailsLines);
    } else {
      exp.details = `<ul><li>${detailsLines.join("</li><li>")}</li></ul>`;
    }
  }

  exp.id = generateUUID();
  exp.visible = true;

  return exp;
}

function parseProjects(content: string[], result: ParsedResumeData) {
  const entries = groupEntries(content, [/项目|Project/]);

  for (const entry of entries) {
    const proj = parseSingleProject(entry);
    if (proj.name) {
      result.projects.push(proj);
    }
  }
}

function parseSingleProject(content: string[]): any {
  const proj: any = {};
  const fullText = content.join(" ");

  // 提取项目名称
  const namePatterns = [
    /项目名称[：:]\s*(.+)/,
    /项目[：:]\s*(.+)/,
    /Project[：:]\s*(.+)/,
  ];

  for (const pattern of namePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      proj.name = match[1].trim();
      break;
    }
  }

  // 尝试从第一行提取项目名
  if (!proj.name && content.length > 0) {
    const firstLine = content[0];
    if (firstLine.length <= 30) {
      proj.name = firstLine;
    }
  }

  // 提取角色
  const rolePatterns = [
    /角色[：:]\s*(.+)/,
    /职责[：:]\s*(.+)/,
    /担任[：:]\s*(.+)/,
    /Role[：:]\s*(.+)/,
  ];

  for (const pattern of rolePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      proj.role = match[1].trim();
      break;
    }
  }

  // 提取时间
  const datePatterns = [
    /(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*(\d{4})[.年-](\d{1,2})[.月]?/,
    /(\d{4})[-至~](\d{4})/,
  ];

  for (const pattern of datePatterns) {
    const match = fullText.match(pattern);
    if (match) {
      if (match.length === 5) {
        proj.date = `${match[1]}.${match[2].padStart(2, "0")} - ${match[3]}.${match[4].padStart(2, "0")}`;
      } else {
        proj.date = `${match[1]} - ${match[2]}`;
      }
      break;
    }
  }

  // 提取描述
  const descLines = content.filter(
    (line) =>
      !line.includes("项目") &&
      !line.includes("角色") &&
      !line.includes("职责") &&
      !/\d{4}/.test(line) &&
      line !== proj.name &&
      line.length > 3,
  );

  if (descLines.length > 0) {
    // 检查是否是列表项
    const hasListItems = descLines.some((line) => /^[•\-▪●○►▸]/.test(line));
    if (hasListItems) {
      proj.description = convertToHtmlList(descLines);
    } else {
      proj.description = `<ul><li>${descLines.join("</li><li>")}</li></ul>`;
    }
  }

  proj.id = generateUUID();
  proj.visible = true;

  return proj;
}

function parseSkills(content: string[], result: ParsedResumeData) {
  const fullText = content.join(" ");

  // 简单的技能提取：按常见分隔符拆分
  const separators = [
    "、",
    "，",
    ",",
    "；",
    ";",
    "•",
    "●",
    "▪",
    "▸",
    "►",
    "-",
    "\n",
  ];
  let skillsText = fullText;

  for (const sep of separators) {
    skillsText = skillsText.split(sep).join("|||");
  }

  const skills = skillsText
    .split("|||")
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 50);

  result.skills = skills;
}

function groupEntries(content: string[], indicators: RegExp[]): string[][] {
  const entries: string[][] = [];
  let currentEntry: string[] = [];

  for (const line of content) {
    const isNewEntry =
      indicators.some((pattern) => pattern.test(line)) &&
      currentEntry.length > 2;

    if (isNewEntry) {
      entries.push([...currentEntry]);
      currentEntry = [];
    }
    currentEntry.push(line);
  }

  if (currentEntry.length > 0) {
    entries.push(currentEntry);
  }

  // 如果没有分组成功，就当做一个整体
  if (entries.length === 0) {
    entries.push(content);
  }

  return entries;
}
