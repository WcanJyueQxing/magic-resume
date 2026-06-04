import { i as initialResumeState } from "./initialResumeData-KCtMeTPD.js";
import { a as useLocale, o as useTranslations, t as cn } from "./utils-CECdrI66.js";
import { m as getFileHandle, n as DEFAULT_TEMPLATES, p as getConfig, t as useResumeStore } from "./useResumeStore-46XKG7Po.js";
import { t as generateUUID } from "./uuid-B3Jp4nyW.js";
import { n as useRouter } from "./navigation-DRQZI54s.js";
import { t as Button } from "./button-BaBi_9yO.js";
import { i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DGtkjkTU.js";
import { a as DialogHeader, c as ScrollArea, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-D_tFkKKT.js";
import { i as ResumeTemplateComponent, r as normalizeFontFamily } from "./fonts-BxvXKZ7g.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as useTemplateSnapshots } from "./alert-dialog-CN9piprn.js";
import * as React$1 from "react";
import React, { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Braces, CheckCircle, ChevronLeft, Copy, Edit2, FileDown, FilePlus, FileText, FileType, Loader2, Plus, Scan, Settings, Sparkles, Trash2, X, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cva } from "class-variance-authority";
//#region src/components/ui/alert.tsx
var alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = React$1.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h5", {
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
//#endregion
//#region src/utils/pdfResumeParser.ts
var sectionKeywords = {
	education: [
		"教育背景",
		"教育经历",
		"教育",
		"教育背景",
		"教育经历",
		"Education",
		"EDUCATION"
	],
	experience: [
		"工作经验",
		"工作经历",
		"工作",
		"工作经验",
		"工作经历",
		"Experience",
		"EXPERIENCE",
		"Work Experience"
	],
	projects: [
		"项目经历",
		"项目经验",
		"项目",
		"项目经历",
		"项目经验",
		"Projects",
		"PROJECTS"
	],
	skills: [
		"专业技能",
		"技能",
		"技能清单",
		"Skills",
		"SKILLS",
		"专业技能"
	],
	summary: [
		"个人简介",
		"个人总结",
		"自我简介",
		"自我评价",
		"Summary",
		"SUMMARY"
	]
};
function parseResumeFromText(text, images) {
	const lines = text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
	const result = {
		education: [],
		experience: [],
		projects: [],
		skills: [],
		summary: "",
		fullText: text,
		images: images || []
	};
	extractBasicInfo(lines, result);
	parseSections(lines, result);
	if (images && images.length > 0) result.photo = images[0];
	return result;
}
function extractBasicInfo(lines, result) {
	const fullText = lines.join("\n");
	const emailMatch = fullText.match(/[\w.-]+@[\w.-]+\.\w+/);
	if (emailMatch) result.email = emailMatch[0];
	const phoneMatch = fullText.match(/1[3-9]\d{9}/);
	if (phoneMatch) result.phone = phoneMatch[0];
	for (let i = 0; i < Math.min(5, lines.length); i++) {
		const line = lines[i];
		if (line.length >= 2 && line.length <= 10) {
			const chineseChars = (line.match(/[\u4e00-\u9fa5]/g) || []).length;
			if (chineseChars >= 2 && chineseChars <= 4) {
				if (![
					"简历",
					"个人",
					"求职",
					"应聘",
					"联系",
					"电话",
					"邮箱",
					"地址",
					"邮箱"
				].some((word) => line.includes(word))) {
					result.name = line;
					break;
				}
			}
		}
	}
	for (const pattern of [
		/地址[：:]\s*(.+)/,
		/地址\s*(.+)/,
		/所在地[：:]\s*(.+)/,
		/现居地[：:]\s*(.+)/,
		/住址[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			result.location = match[1].trim();
			break;
		}
	}
	for (const pattern of [
		/求职意向[：:]\s*(.+)/,
		/意向职位[：:]\s*(.+)/,
		/应聘职位[：:]\s*(.+)/,
		/期望职位[：:]\s*(.+)/,
		/职位[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			result.title = match[1].trim();
			break;
		}
	}
}
function parseSections(lines, result) {
	let currentSection = null;
	let sectionContent = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const newSection = identifySection(line);
		if (newSection) {
			if (currentSection && sectionContent.length > 0) processSectionContent(currentSection, sectionContent, result);
			currentSection = newSection;
			sectionContent = [];
			continue;
		}
		if (currentSection) {
			const formattedLine = formatLine(line);
			sectionContent.push(formattedLine);
		}
	}
	if (currentSection && sectionContent.length > 0) processSectionContent(currentSection, sectionContent, result);
}
function identifySection(line) {
	const cleanLine = line.replace(/^[0-9一二三四五六七八九十]+[.、]*/, "").trim();
	for (const [section, keywords] of Object.entries(sectionKeywords)) for (const keyword of keywords) if (cleanLine.includes(keyword)) return section;
	return null;
}
function formatLine(line) {
	const bulletMatch = line.match(/^([•\-▪●○►▸])\s*(.*)/);
	if (bulletMatch) return `${bulletMatch[1]} ${bulletMatch[2]}`;
	const indentMatch = line.match(/^(\s+)(.*)/);
	if (indentMatch) return indentMatch[2];
	return line;
}
function processSectionContent(section, content, result) {
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
function convertToHtmlList(items) {
	if (items.length === 0) return "";
	return `<ul>${items.map((item) => {
		return `<li>${item.replace(/^[•\-▪●○►▸]\s*/, "").trim()}</li>`;
	}).join("")}</ul>`;
}
function parseEducation(content, result) {
	const entries = [];
	let currentEntry = [];
	for (const line of content) {
		if (/大学|学院|学校|School|University/.test(line) && currentEntry.length > 0) {
			entries.push([...currentEntry]);
			currentEntry = [];
		}
		currentEntry.push(line);
	}
	if (currentEntry.length > 0) entries.push(currentEntry);
	if (entries.length === 0) entries.push(content);
	for (const entry of entries) {
		const edu = parseSingleEducation(entry);
		if (edu.school || edu.major) result.education.push(edu);
	}
}
function parseSingleEducation(content) {
	const edu = {};
	const fullText = content.join(" ");
	for (const pattern of [
		/(.+大学)/,
		/(.+学院)/,
		/(.+学校)/,
		/School[：:]\s*(.+)/,
		/University[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			edu.school = match[1].trim();
			break;
		}
	}
	for (const pattern of [
		/专业[：:]\s*(.+)/,
		/专业\s+(.+)/,
		/Major[：:]\s*(.+)/,
		/所学专业[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			edu.major = match[1].trim();
			break;
		}
	}
	for (const pattern of [/(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*(\d{4})[.年-](\d{1,2})[.月]?/, /(\d{4})[-至~](\d{4})/]) {
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
	const descriptionLines = content.filter((line) => !line.includes("大学") && !line.includes("学院") && !line.includes("专业") && !/\d{4}/.test(line));
	if (descriptionLines.length > 0) if (descriptionLines.some((line) => /^[•\-▪●○►▸]/.test(line))) edu.description = convertToHtmlList(descriptionLines);
	else edu.description = `<p>${descriptionLines.join("</p><p>")}</p>`;
	edu.id = generateUUID();
	edu.visible = true;
	edu.gpa = "";
	edu.degree = "";
	return edu;
}
function parseExperience(content, result) {
	const entries = groupEntries(content, [/公司|企业|单位|Company|Corporation/, /^\d{4}/]);
	for (const entry of entries) {
		const exp = parseSingleExperience(entry);
		if (exp.company || exp.position) result.experience.push(exp);
	}
}
function parseSingleExperience(content) {
	const exp = {};
	const fullText = content.join(" ");
	for (const pattern of [
		/公司[：:]\s*(.+)/,
		/就职于[：:]\s*(.+)/,
		/工作单位[：:]\s*(.+)/,
		/Company[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			exp.company = match[1].trim();
			break;
		}
	}
	if (!exp.company) {
		for (const line of content) if (/科技|技术|网络|信息|数据|软件|互联网|有限|股份/.test(line) && line.length <= 30) {
			exp.company = line;
			break;
		}
	}
	for (const pattern of [
		/职位[：:]\s*(.+)/,
		/岗位[：:]\s*(.+)/,
		/职务[：:]\s*(.+)/,
		/Position[：:]\s*(.+)/,
		/任职：\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			exp.position = match[1].trim();
			break;
		}
	}
	for (const pattern of [
		/(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*(\d{4})[.年-](\d{1,2})[.月]?/,
		/(\d{4})[-至~](\d{4})/,
		/(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*至今/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			if (match.length === 5) exp.date = `${match[1]}.${match[2].padStart(2, "0")} - ${match[3]}.${match[4].padStart(2, "0")}`;
			else if (match.length === 3) exp.date = `${match[1]} - ${match[2]}`;
			else exp.date = `${match[1]}.${match[2].padStart(2, "0")} - 至今`;
			break;
		}
	}
	const detailsLines = content.filter((line) => !line.includes("公司") && !line.includes("职位") && !line.includes("岗位") && !/\d{4}/.test(line) && line.length > 5);
	if (detailsLines.length > 0) if (detailsLines.some((line) => /^[•\-▪●○►▸]/.test(line))) exp.details = convertToHtmlList(detailsLines);
	else exp.details = `<ul><li>${detailsLines.join("</li><li>")}</li></ul>`;
	exp.id = generateUUID();
	exp.visible = true;
	return exp;
}
function parseProjects(content, result) {
	const entries = groupEntries(content, [/项目|Project/]);
	for (const entry of entries) {
		const proj = parseSingleProject(entry);
		if (proj.name) result.projects.push(proj);
	}
}
function parseSingleProject(content) {
	const proj = {};
	const fullText = content.join(" ");
	for (const pattern of [
		/项目名称[：:]\s*(.+)/,
		/项目[：:]\s*(.+)/,
		/Project[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			proj.name = match[1].trim();
			break;
		}
	}
	if (!proj.name && content.length > 0) {
		const firstLine = content[0];
		if (firstLine.length <= 30) proj.name = firstLine;
	}
	for (const pattern of [
		/角色[：:]\s*(.+)/,
		/职责[：:]\s*(.+)/,
		/担任[：:]\s*(.+)/,
		/Role[：:]\s*(.+)/
	]) {
		const match = fullText.match(pattern);
		if (match) {
			proj.role = match[1].trim();
			break;
		}
	}
	for (const pattern of [/(\d{4})[.年-](\d{1,2})[.月-]\s*[-至到~]\s*(\d{4})[.年-](\d{1,2})[.月]?/, /(\d{4})[-至~](\d{4})/]) {
		const match = fullText.match(pattern);
		if (match) {
			if (match.length === 5) proj.date = `${match[1]}.${match[2].padStart(2, "0")} - ${match[3]}.${match[4].padStart(2, "0")}`;
			else proj.date = `${match[1]} - ${match[2]}`;
			break;
		}
	}
	const descLines = content.filter((line) => !line.includes("项目") && !line.includes("角色") && !line.includes("职责") && !/\d{4}/.test(line) && line !== proj.name && line.length > 3);
	if (descLines.length > 0) if (descLines.some((line) => /^[•\-▪●○►▸]/.test(line))) proj.description = convertToHtmlList(descLines);
	else proj.description = `<ul><li>${descLines.join("</li><li>")}</li></ul>`;
	proj.id = generateUUID();
	proj.visible = true;
	return proj;
}
function parseSkills(content, result) {
	const fullText = content.join(" ");
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
		"\n"
	];
	let skillsText = fullText;
	for (const sep of separators) skillsText = skillsText.split(sep).join("|||");
	result.skills = skillsText.split("|||").map((s) => s.trim()).filter((s) => s.length > 1 && s.length < 50);
}
function groupEntries(content, indicators) {
	const entries = [];
	let currentEntry = [];
	for (const line of content) {
		if (indicators.some((pattern) => pattern.test(line)) && currentEntry.length > 2) {
			entries.push([...currentEntry]);
			currentEntry = [];
		}
		currentEntry.push(line);
	}
	if (currentEntry.length > 0) entries.push(currentEntry);
	if (entries.length === 0) entries.push(content);
	return entries;
}
//#endregion
//#region src/app/app/dashboard/resumes/CreateResumeModal.tsx
var A4_WIDTH_PX = 793.700787;
var A4_HEIGHT_PX = 1122.519685;
var toTemplateNameKey = (templateId) => templateId === "left-right" ? "leftRight" : templateId;
var BLANK_TEMPLATE = {
	id: null,
	isBlank: true,
	nameKey: "blankTitle"
};
var NORMAL_TEMPLATES = DEFAULT_TEMPLATES.map((template) => ({
	...template,
	isBlank: false,
	nameKey: toTemplateNameKey(template.id)
}));
var BlankTemplateThumbnail = ({ t }) => /* @__PURE__ */ jsxs("div", {
	className: "w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50",
	children: [
		/* @__PURE__ */ jsx("div", {
			className: "w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-6 text-gray-400 group-hover:text-primary transition-colors",
			children: /* @__PURE__ */ jsx(FilePlus, { className: "w-12 h-12" })
		}),
		/* @__PURE__ */ jsx("span", {
			className: "text-2xl font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors",
			children: t("dashboard.resumes.createDialog.blankTitle")
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-gray-500 mt-4 text-base px-8 text-center leading-relaxed",
			children: t("dashboard.resumes.createDialog.blankThumbnailDescription")
		})
	]
});
var TemplateCardThumbnail = ({ template, t, snapshotSrc }) => {
	if (template.isBlank) return /* @__PURE__ */ jsx(BlankTemplateThumbnail, { t });
	if (snapshotSrc) return /* @__PURE__ */ jsx("img", {
		src: snapshotSrc,
		alt: t(`dashboard.templates.${template.nameKey}.name`),
		className: "h-full w-full object-cover object-top",
		loading: "eager",
		draggable: false
	});
	return /* @__PURE__ */ jsx("div", {
		className: "w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50",
		children: /* @__PURE__ */ jsx("span", {
			className: "text-lg font-semibold text-gray-700 dark:text-gray-200",
			children: t(`dashboard.templates.${template.nameKey}.name`)
		})
	});
};
var TemplateThumbnail = ({ template, t, scaleModifier = 1, quality = "low" }) => {
	const containerRef = useRef(null);
	const [scale, setScale] = useState(.2);
	useEffect(() => {
		if (!containerRef.current || template.isBlank) return;
		const observer = new ResizeObserver((entries) => {
			const { width } = entries[0].contentRect;
			if (width > 0) setScale(width / A4_WIDTH_PX * scaleModifier);
		});
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [template.isBlank, scaleModifier]);
	if (template.isBlank) return /* @__PURE__ */ jsx(BlankTemplateThumbnail, { t });
	const sampleExperience = quality === "high" ? [{
		id: "1",
		company: t("dashboard.resumes.createDialog.sample.company"),
		position: t("dashboard.resumes.createDialog.sample.position"),
		date: `2020-01 - ${t("dashboard.resumes.createDialog.sample.present")}`,
		details: t("dashboard.resumes.createDialog.sample.workDescription"),
		visible: true
	}] : [];
	const previewData = {
		...initialResumeState,
		id: "preview-mock",
		templateId: template.id,
		createdAt: (/* @__PURE__ */ new Date(0)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date(0)).toISOString(),
		globalSettings: {
			...initialResumeState.globalSettings,
			themeColor: template.colorScheme?.primary || "#000",
			sectionSpacing: template.spacing?.sectionGap || 16,
			paragraphSpacing: template.spacing?.itemGap || 8,
			pagePadding: template.spacing?.contentPadding || 32
		},
		basic: {
			...initialResumeState.basic,
			layout: template.basic?.layout || "left"
		},
		experience: sampleExperience
	};
	return /* @__PURE__ */ jsx("div", {
		className: "w-full h-full overflow-hidden bg-white flex items-center justify-center",
		ref: containerRef,
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: scale * A4_WIDTH_PX,
				height: scale * A4_HEIGHT_PX
			},
			className: "flex-shrink-0",
			children: /* @__PURE__ */ jsx("div", {
				className: "bg-white origin-top-left pointer-events-none",
				style: {
					width: "210mm",
					height: "297mm",
					transform: `scale(${scale})`,
					padding: `${template.spacing?.contentPadding || 32}px`,
					fontFamily: normalizeFontFamily(previewData.globalSettings?.fontFamily)
				},
				children: /* @__PURE__ */ jsx(ResumeTemplateComponent, {
					data: previewData,
					template
				})
			})
		})
	});
};
var CreateResumeModal = ({ open, onOpenChange, onCreate }) => {
	const t = useTranslations();
	const { snapshotMap } = useTemplateSnapshots(useLocale());
	const [previewTarget, setPreviewTarget] = useState(null);
	const handleCreate = (template) => {
		onCreate(template.id);
		setPreviewTarget(null);
	};
	useEffect(() => {
		if (!open) {
			const timeoutId = window.setTimeout(() => setPreviewTarget(null), 300);
			return () => window.clearTimeout(timeoutId);
		}
	}, [open]);
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			hideClose: true,
			className: "max-w-[1100px] w-[95vw] h-[90vh] sm:h-[85vh] p-0 overflow-hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-2xl rounded-[2rem] flex flex-col",
			children: [/* @__PURE__ */ jsx(DialogTitle, {
				className: "sr-only",
				children: t("dashboard.resumes.createDialog.title")
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative w-full h-full min-h-0 flex flex-col",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex-none px-8 py-6 flex items-center justify-between z-10",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 flex items-center",
							children: t("dashboard.resumes.createDialog.title")
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							"aria-label": t("common.cancel"),
							className: "p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
							children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6 text-gray-400" })
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex-1 min-h-0 relative w-full",
						children: /* @__PURE__ */ jsx(ScrollArea, {
							className: "h-full w-full",
							children: /* @__PURE__ */ jsxs("div", {
								className: "px-8 pb-12 max-w-7xl mx-auto space-y-12",
								children: [/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center mb-6",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "text-xl font-bold text-gray-900 dark:text-white",
										children: t("dashboard.resumes.createDialog.startFromBlank")
									}), /* @__PURE__ */ jsx("div", { className: "h-px bg-gray-200 dark:bg-gray-800 flex-1 ml-6" })]
								}), /* @__PURE__ */ jsxs(motion.div, {
									layoutId: `card-container-blank`,
									whileHover: {
										y: -4,
										scale: 1.01
									},
									whileTap: { scale: .99 },
									onClick: () => handleCreate(BLANK_TEMPLATE),
									className: "group cursor-pointer rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm bg-gray-50/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 p-6 flex flex-col sm:flex-row items-center gap-6",
									children: [
										/* @__PURE__ */ jsx(motion.div, {
											layoutId: `card-image-blank`,
											className: "h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 rounded-2xl bg-white dark:bg-gray-800 shadow-inner flex items-center justify-center border border-gray-100 dark:border-gray-700",
											children: /* @__PURE__ */ jsx(FilePlus, { className: "w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex-1 text-center sm:text-left",
											children: [/* @__PURE__ */ jsx(motion.div, {
												layoutId: `card-title-blank`,
												className: "inline-block",
												children: /* @__PURE__ */ jsx("h5", {
													className: "text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors",
													children: t("dashboard.resumes.createDialog.blankTitle")
												})
											}), /* @__PURE__ */ jsx("p", {
												className: "text-gray-500 dark:text-gray-400 text-sm max-w-lg leading-relaxed",
												children: t("dashboard.resumes.createDialog.blankCardDescription")
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "hidden sm:flex text-primary font-medium items-center text-sm   group-hover:translate-x-0 duration-300",
											children: [
												t("dashboard.resumes.createDialog.createNow"),
												" ",
												/* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 ml-1 rotate-180" })
											]
										})
									]
								})] }), /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center mb-6",
									children: [/* @__PURE__ */ jsx("h4", {
										className: "text-xl font-bold text-gray-900 dark:text-white",
										children: t("dashboard.resumes.createDialog.startFromTemplate")
									}), /* @__PURE__ */ jsx("div", { className: "h-px bg-gray-200 dark:bg-gray-800 flex-1 ml-6" })]
								}), /* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 hover:!shadow-none",
									children: NORMAL_TEMPLATES.map((template) => {
										const templateName = t(`dashboard.templates.${template.nameKey}.name`);
										return /* @__PURE__ */ jsxs(motion.div, {
											layoutId: `card-container-${template.id}`,
											whileHover: {
												y: 0,
												scale: 1.02
											},
											whileTap: { scale: .98 },
											onClick: () => setPreviewTarget(template),
											className: "group cursor-pointer flex flex-col",
											children: [/* @__PURE__ */ jsxs(motion.div, {
												layoutId: `card-image-${template.id}`,
												className: "aspect-[210/297] rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-800/60 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50 dark:group-hover:border-primary/50 bg-white dark:bg-gray-900 relative",
												children: [
													/* @__PURE__ */ jsx(TemplateCardThumbnail, {
														template,
														t,
														snapshotSrc: snapshotMap[template.id]
													}),
													/* @__PURE__ */ jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-2xl pointer-events-none" }),
													/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
												]
											}), /* @__PURE__ */ jsx(motion.div, {
												layoutId: `card-title-${template.id}`,
												className: "mt-4 flex items-center justify-center",
												children: /* @__PURE__ */ jsx("span", {
													className: "text-[15px] font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors",
													children: templateName
												})
											})]
										}, template.id);
									})
								})] })]
							})
						})
					}),
					/* @__PURE__ */ jsx(AnimatePresence, { children: previewTarget && /* @__PURE__ */ jsxs(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						transition: {
							duration: .3,
							ease: "easeInOut"
						},
						className: "fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col sm:flex-row overflow-hidden rounded-[2rem]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1 relative bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center p-8 sm:p-12 h-full overflow-hidden",
							children: [/* @__PURE__ */ jsx("div", {
								className: "p-6 flex justify-start w-full absolute top-0 left-0 z-20",
								children: /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setPreviewTarget(null),
									className: "rounded-full p-2 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors",
									"aria-label": t("dashboard.resumes.createDialog.backToGrid"),
									children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-gray-500 hover:text-primary dark:text-gray-400" })
								})
							}), /* @__PURE__ */ jsx(motion.div, {
								layoutId: `card-container-${previewTarget.id || "blank"}`,
								className: "w-full flex-1 flex flex-col items-center justify-center p-2 min-h-0",
								children: /* @__PURE__ */ jsx(motion.div, {
									layoutId: `card-image-${previewTarget.id || "blank"}`,
									className: "aspect-[210/297] rounded-xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/10 bg-white",
									style: {
										maxHeight: "100%",
										maxWidth: "100%",
										height: "100%",
										width: "auto"
									},
									children: /* @__PURE__ */ jsx(TemplateThumbnail, {
										template: previewTarget,
										t,
										quality: "high",
										scaleModifier: 1
									})
								})
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "w-full sm:w-[400px] bg-white dark:bg-gray-950 border-l border-gray-100 dark:border-gray-800 flex flex-col h-full shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] relative z-10",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex-1 p-10 flex flex-col justify-center",
								children: [
									/* @__PURE__ */ jsx(motion.div, {
										layoutId: `card-title-${previewTarget.id || "blank"}`,
										className: "inline-block",
										children: /* @__PURE__ */ jsx("h3", {
											className: "text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4",
											children: previewTarget.isBlank ? t("dashboard.resumes.createDialog.blankTitle") : t(`dashboard.templates.${previewTarget.nameKey}.name`)
										})
									}),
									/* @__PURE__ */ jsx("div", { className: "w-12 h-1.5 bg-primary rounded-full mb-6" }),
									/* @__PURE__ */ jsx("p", {
										className: "text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 font-medium",
										children: previewTarget.isBlank ? t("dashboard.resumes.createDialog.blankPreviewDescription") : t(`dashboard.templates.${previewTarget.nameKey}.description`)
									}),
									/* @__PURE__ */ jsx("div", {
										className: "space-y-4",
										children: /* @__PURE__ */ jsxs(Button, {
											size: "lg",
											className: "w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]",
											onClick: () => handleCreate(previewTarget),
											children: [t("dashboard.resumes.createDialog.useThisTemplate"), /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 ml-2 opacity-70" })]
										})
									})
								]
							})
						})]
					}) })
				]
			})]
		})
	});
};
//#endregion
//#region src/components/ui/progress.tsx
var Progress = React$1.forwardRef(({ className, value = 0, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800", className),
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: "h-full w-full flex-1 bg-primary transition-all duration-300",
			style: { width: `${Math.min(100, Math.max(0, value))}%` }
		})
	});
});
Progress.displayName = "Progress";
//#endregion
//#region src/app/app/dashboard/resumes/ImportResumeDialog.tsx
var ImportResumeDialog = ({ open, isImporting, importProgress, importStatus, isUsingOCR, onOpenChange, jsonFileInputRef, pdfFileInputRef, wordFileInputRef, markdownFileInputRef, onJsonFileChange, onPdfFileChange, onWordFileChange, onMarkdownFileChange }) => {
	const t = useTranslations();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("input", {
			ref: jsonFileInputRef,
			type: "file",
			accept: ".json,application/json",
			className: "hidden",
			onChange: onJsonFileChange
		}),
		/* @__PURE__ */ jsx("input", {
			ref: pdfFileInputRef,
			type: "file",
			accept: ".pdf,application/pdf",
			className: "hidden",
			onChange: onPdfFileChange
		}),
		/* @__PURE__ */ jsx("input", {
			ref: wordFileInputRef,
			type: "file",
			accept: ".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword",
			className: "hidden",
			onChange: onWordFileChange
		}),
		/* @__PURE__ */ jsx("input", {
			ref: markdownFileInputRef,
			type: "file",
			accept: ".md,text/markdown",
			className: "hidden",
			onChange: onMarkdownFileChange
		}),
		/* @__PURE__ */ jsx(Dialog, {
			open,
			onOpenChange: (nextOpen) => {
				if (isImporting) return;
				onOpenChange(nextOpen);
			},
			children: /* @__PURE__ */ jsxs(DialogContent, {
				className: "sm:max-w-[480px]",
				children: [
					/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: t("dashboard.resumes.importDialog.title") }), /* @__PURE__ */ jsx(DialogDescription, {})] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 py-4",
						children: [
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: isImporting,
								className: cn("group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200", "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md", "active:scale-[0.98]", "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"),
								onClick: () => jsonFileInputRef.current?.click(),
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400",
									children: /* @__PURE__ */ jsx(Braces, { className: "h-6 w-6" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground leading-none",
										children: t("dashboard.resumes.importDialog.jsonTitle")
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: t("dashboard.resumes.importDialog.jsonDescription")
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: isImporting,
								className: cn("group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200", "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md", "active:scale-[0.98]", "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"),
								onClick: () => pdfFileInputRef.current?.click(),
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 transition-colors group-hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400",
									children: /* @__PURE__ */ jsx(FileText, { className: "h-6 w-6" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground leading-none",
										children: t("dashboard.resumes.importDialog.pdfTitle") || "导入 PDF"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: "使用 PyMuPDF 服务端解析，支持文本提取和图片提取"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: isImporting,
								className: cn("group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200", "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md", "active:scale-[0.98]", "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"),
								onClick: () => wordFileInputRef.current?.click(),
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 transition-colors group-hover:bg-green-500/20 dark:bg-green-500/20 dark:text-green-400",
									children: /* @__PURE__ */ jsx(FileType, { className: "h-6 w-6" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground leading-none",
										children: "导入 Word"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: "支持 .docx 和 .doc 格式文档"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								disabled: isImporting,
								className: cn("group relative flex w-full items-start gap-4 rounded-xl border border-border/50 bg-card p-4 text-left transition-all duration-200", "hover:border-primary/50 hover:bg-accent/50 hover:shadow-md", "active:scale-[0.98]", "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"),
								onClick: () => markdownFileInputRef.current?.click(),
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 transition-colors group-hover:bg-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400",
									children: /* @__PURE__ */ jsx(FileDown, { className: "h-6 w-6" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground leading-none",
										children: "导入 Markdown"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: "支持 .md 格式文档，解析结构化内容"
									})]
								})]
							})
						]
					}),
					isImporting && /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" }),
								isUsingOCR && /* @__PURE__ */ jsx(Scan, { className: "h-4 w-4 text-purple-600" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: importStatus || t("dashboard.resumes.importDialog.importing")
								})
							]
						}), /* @__PURE__ */ jsx(Progress, {
							value: importProgress,
							className: "h-2"
						})]
					})
				]
			})
		})
	] });
};
//#endregion
//#region src/app/app/dashboard/resumes/ImportResultDialog.tsx
var ImportResultDialog = ({ open, success, message, resumeId, fileName, format, onOpenChange, onNavigate }) => {
	const t = useTranslations();
	const displayFormat = {
		pdf: "PDF",
		word: "Word",
		docx: "Word",
		markdown: "Markdown",
		md: "Markdown",
		json: "JSON"
	}[format?.toLowerCase() || ""] || format || "未知格式";
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ jsxs(DialogHeader, {
				className: "text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: cn("mx-auto flex h-16 w-16 items-center justify-center rounded-full", success ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"),
						children: success ? /* @__PURE__ */ jsx(CheckCircle, { className: "h-8 w-8" }) : /* @__PURE__ */ jsx(XCircle, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ jsx(DialogTitle, {
						className: cn("mt-4 text-xl font-semibold", success ? "text-green-600" : "text-red-600"),
						children: success ? t("dashboard.resumes.importSuccessTitle") || "导入成功" : t("dashboard.resumes.importFailedTitle") || "导入失败"
					}),
					/* @__PURE__ */ jsx(DialogDescription, {
						className: "text-center",
						children: message
					}),
					fileName && /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-gray-500",
						children: t("dashboard.resumes.importFileName", { fileName }) || `文件名: ${fileName}`
					}),
					format && /* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-500",
						children: t("dashboard.resumes.importFormat", { format: displayFormat }) || `导入格式: ${displayFormat}`
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-3 pt-4",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					className: "flex-1",
					onClick: () => onOpenChange(false),
					children: t("common.cancel") || "取消"
				}), success && resumeId && /* @__PURE__ */ jsxs(Button, {
					className: "flex-1",
					onClick: onNavigate,
					children: [t("dashboard.resumes.editResume") || "编辑简历", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })]
				})]
			})]
		})
	});
};
//#endregion
//#region src/app/app/dashboard/resumes/ResumeCardItem.tsx
var ResumeCardItem = ({ id, resume, t, locale, setActiveResume, router, deleteResume, duplicateResume, index }) => {
	const containerRef = React.useRef(null);
	const [scale, setScale] = React.useState(.24);
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
	const activeTemplate = DEFAULT_TEMPLATES.find((template) => template.id === resume.templateId) ?? DEFAULT_TEMPLATES[0];
	const templateNameKey = activeTemplate.id === "left-right" ? "leftRight" : activeTemplate.id;
	React.useEffect(() => {
		if (!containerRef.current) return;
		const observer = new ResizeObserver((entries) => {
			const { width } = entries[0].contentRect;
			if (width > 0) setScale(width / 793.700787);
		});
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -20
		},
		transition: {
			duration: .3,
			delay: index * .1
		},
		whileHover: { scale: 1.02 },
		whileTap: { scale: .98 },
		children: [/* @__PURE__ */ jsxs(Card, {
			className: cn("group border transition-all duration-200 aspect-[210/297] flex flex-col overflow-hidden", "hover:border-primary/40 hover:shadow-lg", "dark:hover:border-primary/40"),
			children: [/* @__PURE__ */ jsxs(CardContent, {
				className: "p-0 flex-1 relative bg-gray-50 dark:bg-gray-900 overflow-hidden cursor-pointer",
				onClick: (e) => {
					e.stopPropagation();
					setActiveResume(id);
					router.push(`/app/workbench/${id}`);
				},
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 pb-6 flex items-center justify-center pointer-events-none transition-transform duration-300 group-hover:scale-[1.02] overflow-hidden",
						ref: containerRef,
						children: /* @__PURE__ */ jsx("div", {
							className: "w-full h-full relative origin-top bg-white",
							children: /* @__PURE__ */ jsx("div", {
								className: "resume-preview absolute top-0 left-0 bg-white",
								style: {
									width: "210mm",
									height: "297mm",
									transform: `scale(${scale})`,
									transformOrigin: "top left",
									padding: `${resume.globalSettings?.pagePadding || 32}px`,
									fontFamily: normalizeFontFamily(resume.globalSettings?.fontFamily)
								},
								children: /* @__PURE__ */ jsx(ResumeTemplateComponent, {
									data: resume,
									template: activeTemplate
								})
							})
						})
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 top-[60%] pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-950 dark:via-gray-950/90 z-0" }),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-x-0 bottom-0 pt-12 pb-3 px-4 flex justify-between items-end border-t border-transparent z-10 transition-colors group-hover:bg-white/50 dark:group-hover:bg-gray-950/50",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col w-full",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[15px] font-semibold truncate text-gray-900 dark:text-gray-100 drop-shadow-sm w-[90%]",
								children: resume.title || t("dashboard.resumes.untitled")
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 font-medium",
								children: [
									t(`dashboard.templates.${templateNameKey}.name`),
									" · ",
									new Intl.DateTimeFormat(locale, {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
										hour12: false
									}).format(new Date(resume.createdAt))
								]
							})]
						})
					})
				]
			}), /* @__PURE__ */ jsx(CardFooter, {
				className: "p-0 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex w-full h-11 divide-x divide-gray-100 dark:divide-gray-800",
					children: [
						/* @__PURE__ */ jsxs("button", {
							onClick: (e) => {
								e.stopPropagation();
								setActiveResume(id);
								router.push(`/app/workbench/${id}`);
							},
							className: "flex-1 flex items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-200 text-gray-700 dark:text-gray-200 hover:text-primary font-medium text-sm group",
							children: [/* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5 group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" }), /* @__PURE__ */ jsx("span", { children: t("common.edit") })]
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: (e) => {
								e.stopPropagation();
								duplicateResume(resume);
							},
							className: "flex-1 flex items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-200 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm group",
							children: [/* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5 group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" }), /* @__PURE__ */ jsx("span", { children: t("common.copy") })]
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: (e) => {
								e.stopPropagation();
								setShowDeleteDialog(true);
							},
							className: "flex-1 flex items-center justify-center gap-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-200 text-red-600 dark:text-red-400 font-medium text-sm group",
							children: [/* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100" }), /* @__PURE__ */ jsx("span", { children: t("common.delete") })]
						})
					]
				})
			})]
		}), /* @__PURE__ */ jsx(AlertDialog, {
			open: showDeleteDialog,
			onOpenChange: setShowDeleteDialog,
			children: /* @__PURE__ */ jsxs(AlertDialogContent, {
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: t("dashboard.resumes.deleteConfirmTitle") }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: t("dashboard.resumes.deleteConfirmDescription") })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, {
					onClick: (e) => {
						e.stopPropagation();
						setShowDeleteDialog(false);
					},
					children: t("common.cancel")
				}), /* @__PURE__ */ jsx(AlertDialogAction, {
					className: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 border-none",
					onClick: (e) => {
						e.stopPropagation();
						deleteResume(resume);
						setShowDeleteDialog(false);
						toast.success(t("common.deleteSuccess"));
					},
					children: t("common.confirm")
				})] })]
			})
		})]
	});
};
//#endregion
//#region src/components/shared/icons/PdfIcon.tsx
var PdfIcon = ({ className }) => {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: cn("h-full w-full", className),
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z",
				fill: "#EF4444"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M14 2V8H20L14 2Z",
				fill: "#FECACA",
				fillOpacity: "0.9"
			}),
			/* @__PURE__ */ jsxs("g", {
				fill: "white",
				children: [
					/* @__PURE__ */ jsx("path", { d: "M7 11.5H8.8C9.35228 11.5 9.8 11.9477 9.8 12.5C9.8 13.0523 9.35228 13.5 8.8 13.5H8V15H7V11.5ZM8.8 12.5H8V11.5H8.8V12.5Z" }),
					/* @__PURE__ */ jsx("path", { d: "M11 11.5H12.5C13.3284 11.5 14 12.1716 14 13C14 13.8284 13.3284 14.5 12.5 14.5H12V15H11V11.5ZM12.5 13.5C12.7761 13.5 13 13.2761 13 13C13 12.7239 12.7761 12.5 12.5 12.5H12V13.5H12.5Z" }),
					/* @__PURE__ */ jsx("path", { d: "M15 11.5H17.5V12.5H16V13H17.5V14H16V15H15V11.5Z" })
				]
			})
		]
	});
};
//#endregion
//#region src/app/app/dashboard/resumes/AnimatedImportButton.tsx
var AnimatedImportButton = ({ onClick, t }) => {
	const [isHovered, setIsHovered] = React.useState(false);
	return /* @__PURE__ */ jsx(motion.div, {
		onHoverStart: () => setIsHovered(true),
		onHoverEnd: () => setIsHovered(false),
		whileHover: { scale: 1.02 },
		whileTap: { scale: .98 },
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 17
		},
		children: /* @__PURE__ */ jsx(Button, {
			onClick,
			variant: "outline",
			className: cn("relative h-10 overflow-hidden px-4 font-medium transition-all duration-300", "border-border/60 bg-background hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm", "dark:border-border/40 dark:hover:border-primary/40"),
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "relative h-5 w-5 overflow-hidden",
					children: /* @__PURE__ */ jsxs(motion.div, {
						animate: { y: isHovered ? -20 : 0 },
						transition: {
							type: "spring",
							stiffness: 300,
							damping: 20
						},
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex h-5 w-5 items-center justify-center",
							children: /* @__PURE__ */ jsx(Braces, { className: "h-4 w-4 text-blue-500" })
						}), /* @__PURE__ */ jsx("div", {
							className: "flex h-5 w-5 items-center justify-center",
							children: /* @__PURE__ */ jsx(PdfIcon, { className: "h-4 w-4 text-red-500" })
						})]
					})
				}), /* @__PURE__ */ jsx("span", {
					className: "relative z-10",
					children: t("dashboard.resumes.import")
				})]
			})
		})
	});
};
//#endregion
//#region src/app/app/dashboard/resumes/ResumeWorkbench.tsx
var ResumeWorkbench = () => {
	const t = useTranslations();
	const locale = useLocale();
	const { resumes, setActiveResume, addResume, deleteResume, createResume } = useResumeStore();
	const router = useRouter();
	const [hasConfiguredFolder, setHasConfiguredFolder] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
	const [isImporting, setIsImporting] = useState(false);
	const [importProgress, setImportProgress] = useState(0);
	const [importStatus, setImportStatus] = useState("");
	const [isUsingOCR, setIsUsingOCR] = useState(false);
	const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
	const [importSuccess, setImportSuccess] = useState(false);
	const [importMessage, setImportMessage] = useState("");
	const [importedResumeId, setImportedResumeId] = useState(void 0);
	const [importedFileName, setImportedFileName] = useState(void 0);
	const [importedFormat, setImportedFormat] = useState(void 0);
	const jsonFileInputRef = useRef(null);
	const pdfFileInputRef = useRef(null);
	const wordFileInputRef = useRef(null);
	const markdownFileInputRef = useRef(null);
	useEffect(() => {
		const loadSavedConfig = async () => {
			try {
				const handle = await getFileHandle("syncDirectory");
				const path = await getConfig("syncDirectoryPath");
				if (handle && path) setHasConfiguredFolder(true);
			} catch (error) {
				console.error("Error loading saved config:", error);
			}
		};
		loadSavedConfig();
	}, []);
	const handleCreateFromModal = (templateId) => {
		const newId = createResume(templateId, !templateId);
		if (templateId) {
			const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
			if (template) {
				const { resumes, updateResume } = useResumeStore.getState();
				const resume = resumes[newId];
				if (resume) updateResume(newId, {
					globalSettings: {
						...resume.globalSettings,
						themeColor: template.colorScheme.primary,
						sectionSpacing: template.spacing.sectionGap,
						paragraphSpacing: template.spacing.itemGap,
						pagePadding: template.spacing.contentPadding
					},
					basic: {
						...resume.basic,
						layout: template.basic.layout
					}
				});
			}
		}
		setIsCreateModalOpen(false);
		setActiveResume(newId);
		router.push(`/app/workbench/${newId}`);
	};
	const duplicateResume = async (resume) => {
		const { generateUUID } = await import("./uuid-B3Jp4nyW.js").then((n) => n.n);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const { id, ...rest } = resume;
		addResume({
			...rest,
			id: generateUUID(),
			title: `${resume.title || t("dashboard.resumes.untitled")} - ${t("common.copy")}`,
			createdAt: now,
			updatedAt: now
		});
		toast.success(t("previewDock.copyResume.success"));
	};
	const convertTemplateJsonToResumeData = (config, initialState) => {
		if (config.personalInfo || config.skills || config.selfEvaluation) {
			const converted = { ...initialState };
			if (config.personalInfo) converted.basic = {
				...initialState.basic,
				name: config.personalInfo.name || "",
				title: config.personalInfo.jobIntent || config.personalInfo.title || "",
				phone: config.personalInfo.phone || "",
				email: config.personalInfo.email || "",
				location: config.personalInfo.location || ""
			};
			if (config.education) converted.education = config.education.map((edu) => ({
				id: edu.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				school: edu.school || "",
				major: edu.major || "",
				degree: edu.degree || "",
				startDate: edu.startTime || edu.startDate || "",
				endDate: edu.endTime || edu.endDate || "",
				visible: true,
				gpa: "",
				description: edu.description ? `<p>${edu.description}</p>` : ""
			}));
			if (config.skills) {
				const skillList = [];
				if (Array.isArray(config.skills)) skillList.push(...config.skills);
				else if (typeof config.skills === "object") Object.entries(config.skills).forEach(([category, skills]) => {
					if (Array.isArray(skills)) skillList.push(`${category}: ${skills.join(", ")}`);
				});
				converted.skillContent = `<div class="skill-content"><ul><li>${skillList.join("</li><li>")}</li></ul></div>`;
			}
			if (config.selfEvaluation) converted.selfEvaluationContent = `<p>${config.selfEvaluation}</p>`;
			if (config.projects) converted.projects = config.projects.map((proj) => ({
				id: proj.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				name: proj.name || "",
				role: proj.role || proj.position || "",
				date: proj.time || proj.date || "",
				description: Array.isArray(proj.description) ? `<ul><li>${proj.description.join("</li><li>")}</li></ul>` : `<p>${proj.description || proj.techStack || ""}</p>`,
				visible: true
			}));
			if (config.experience) converted.experience = config.experience.map((exp) => ({
				id: exp.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				company: exp.company || "",
				position: exp.position || "",
				date: exp.time || exp.date || "",
				visible: true,
				details: Array.isArray(exp.description) ? `<ul><li>${exp.description.join("</li><li>")}</li></ul>` : `<p>${exp.description || ""}</p>`
			}));
			const menuSections = [{
				id: "basic",
				title: "基本信息",
				icon: "👤",
				enabled: true,
				order: 0
			}];
			if (converted.skillContent) menuSections.push({
				id: "skills",
				title: "专业技能",
				icon: "⚡",
				enabled: true,
				order: 1
			});
			if (converted.experience && converted.experience.length > 0) menuSections.push({
				id: "experience",
				title: "工作经验",
				icon: "💼",
				enabled: true,
				order: 2
			});
			if (converted.projects && converted.projects.length > 0) menuSections.push({
				id: "projects",
				title: "项目经历",
				icon: "🚀",
				enabled: true,
				order: 3
			});
			if (converted.education && converted.education.length > 0) menuSections.push({
				id: "education",
				title: "教育经历",
				icon: "🎓",
				enabled: true,
				order: 4
			});
			converted.menuSections = menuSections;
			return converted;
		}
		return null;
	};
	const importResumeFromJson = async (file) => {
		try {
			const content = await file.text();
			const config = JSON.parse(content);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { generateUUID } = await import("./uuid-B3Jp4nyW.js").then((n) => n.n);
			const { initialResumeState } = await import("./initialResumeData-KCtMeTPD.js").then((n) => n.r);
			const convertedConfig = convertTemplateJsonToResumeData(config, initialResumeState);
			let newResume;
			if (convertedConfig) newResume = {
				...initialResumeState,
				...convertedConfig,
				id: generateUUID(),
				createdAt: now,
				updatedAt: now
			};
			else newResume = {
				...config,
				id: generateUUID(),
				createdAt: now,
				updatedAt: now
			};
			const resumeId = addResume(newResume);
			setActiveResume(resumeId);
			setIsImportDialogOpen(false);
			setImportedResumeId(resumeId);
			setImportedFileName(file.name);
			setImportedFormat("json");
			setImportSuccess(true);
			setImportMessage(t("dashboard.resumes.importSuccess") || "JSON 导入成功");
			setIsResultDialogOpen(true);
		} catch (error) {
			console.error("Import JSON error:", error);
			const message = error instanceof Error ? error.message : "JSON 导入失败";
			setImportedFileName(file.name);
			setImportedFormat("json");
			setImportSuccess(false);
			setImportMessage(message);
			setIsResultDialogOpen(true);
		}
	};
	const importResumeFromPdf = async (file) => {
		setImportStatus("正在解析 PDF 文档...");
		setImportProgress(10);
		try {
			let fullText = "";
			let images = [];
			const formData = new FormData();
			formData.append("file", file);
			formData.append("type", "pdf");
			setImportProgress(20);
			const response = await fetch("/api/document-parse", {
				method: "POST",
				body: formData
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "PDF 解析失败");
			}
			const result = await response.json();
			setImportProgress(60);
			fullText = result.text || "";
			setImportProgress(70);
			setImportStatus("智能解析简历内容...");
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { generateUUID } = await import("./uuid-B3Jp4nyW.js").then((n) => n.n);
			const { blankResumeState } = await import("./initialResumeData-KCtMeTPD.js").then((n) => n.r);
			const nameWithoutExt = file.name.replace(/\.[^.]+$/, "").trim();
			const parsedData = parseResumeFromText(fullText, images);
			let skillContent = "";
			if (parsedData.skills.length > 0) skillContent = `<div class="skill-content"><ul><li>${parsedData.skills.join("</li><li>")}</li></ul></div>`;
			const newResume = {
				...blankResumeState,
				id: generateUUID(),
				title: nameWithoutExt || t("dashboard.resumes.untitled"),
				createdAt: now,
				updatedAt: now,
				summary: {
					...blankResumeState.summary,
					content: parsedData.fullText
				},
				basic: {
					...blankResumeState.basic,
					name: parsedData.name || "",
					phone: parsedData.phone || "",
					email: parsedData.email || "",
					location: parsedData.location || "",
					title: parsedData.title || "",
					photo: parsedData.photo || ""
				},
				education: parsedData.education,
				experience: parsedData.experience,
				projects: parsedData.projects,
				skillContent,
				selfEvaluationContent: parsedData.summary
			};
			const menuSections = [{
				id: "basic",
				title: "基本信息",
				icon: "👤",
				enabled: true,
				order: 0
			}];
			if (parsedData.skills.length > 0) menuSections.push({
				id: "skills",
				title: "专业技能",
				icon: "⚡",
				enabled: true,
				order: 1
			});
			if (parsedData.experience.length > 0) menuSections.push({
				id: "experience",
				title: "工作经验",
				icon: "💼",
				enabled: true,
				order: 2
			});
			if (parsedData.projects.length > 0) menuSections.push({
				id: "projects",
				title: "项目经历",
				icon: "🚀",
				enabled: true,
				order: 3
			});
			if (parsedData.education.length > 0) menuSections.push({
				id: "education",
				title: "教育经历",
				icon: "🎓",
				enabled: true,
				order: 4
			});
			newResume.menuSections = menuSections;
			setImportProgress(100);
			setImportStatus("创建简历...");
			const resumeId = addResume(newResume);
			setActiveResume(resumeId);
			setIsImportDialogOpen(false);
			setImportedResumeId(resumeId);
			setImportedFileName(file.name);
			setImportedFormat("pdf");
			setImportSuccess(true);
			setImportMessage(t("dashboard.resumes.importSuccess") || "PDF 导入成功");
			setIsResultDialogOpen(true);
			setTimeout(() => {
				setImportProgress(0);
				setImportStatus("");
				setIsUsingOCR(false);
			}, 1e3);
		} catch (error) {
			console.error("Import PDF error:", error);
			const message = error instanceof Error ? error.message : "PDF 导入失败";
			setImportedFileName(file.name);
			setImportedFormat("pdf");
			setImportSuccess(false);
			setImportMessage(message);
			setIsResultDialogOpen(true);
		}
	};
	const importResumeFromText = async (file, fileType) => {
		setImportStatus(fileType === "word" ? "正在解析 Word 文档..." : "正在解析 Markdown...");
		setImportProgress(10);
		try {
			let fullText = "";
			if (fileType === "word") {
				setImportProgress(20);
				const formData = new FormData();
				formData.append("file", file);
				formData.append("type", "word");
				const response = await fetch("/api/document-parse", {
					method: "POST",
					body: formData
				});
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || "Word 解析失败");
				}
				const result = await response.json();
				setImportProgress(60);
				fullText = result.text || "";
			} else {
				setImportProgress(30);
				fullText = await file.text();
				setImportProgress(60);
			}
			if (!fullText.trim()) throw new Error("未能提取任何内容");
			setImportProgress(70);
			setImportStatus("智能解析简历内容...");
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { generateUUID } = await import("./uuid-B3Jp4nyW.js").then((n) => n.n);
			const { blankResumeState } = await import("./initialResumeData-KCtMeTPD.js").then((n) => n.r);
			const nameWithoutExt = file.name.replace(/\.[^.]+$/, "").trim();
			const parsedData = parseResumeFromText(fullText, []);
			let skillContent = "";
			if (parsedData.skills.length > 0) skillContent = `<div class="skill-content"><ul><li>${parsedData.skills.join("</li><li>")}</li></ul></div>`;
			const newResume = {
				...blankResumeState,
				id: generateUUID(),
				title: nameWithoutExt || t("dashboard.resumes.untitled"),
				createdAt: now,
				updatedAt: now,
				summary: {
					...blankResumeState.summary,
					content: parsedData.fullText
				},
				basic: {
					...blankResumeState.basic,
					name: parsedData.name || "",
					phone: parsedData.phone || "",
					email: parsedData.email || "",
					location: parsedData.location || "",
					title: parsedData.title || "",
					photo: parsedData.photo || ""
				},
				education: parsedData.education,
				experience: parsedData.experience,
				projects: parsedData.projects,
				skillContent,
				selfEvaluationContent: parsedData.summary
			};
			const menuSections = [{
				id: "basic",
				title: "基本信息",
				icon: "👤",
				enabled: true,
				order: 0
			}];
			if (parsedData.skills.length > 0) menuSections.push({
				id: "skills",
				title: "专业技能",
				icon: "⚡",
				enabled: true,
				order: 1
			});
			if (parsedData.experience.length > 0) menuSections.push({
				id: "experience",
				title: "工作经验",
				icon: "💼",
				enabled: true,
				order: 2
			});
			if (parsedData.projects.length > 0) menuSections.push({
				id: "projects",
				title: "项目经历",
				icon: "🚀",
				enabled: true,
				order: 3
			});
			if (parsedData.education.length > 0) menuSections.push({
				id: "education",
				title: "教育经历",
				icon: "🎓",
				enabled: true,
				order: 4
			});
			newResume.menuSections = menuSections;
			setImportProgress(100);
			setImportStatus("创建简历...");
			const resumeId = addResume(newResume);
			setActiveResume(resumeId);
			setIsImportDialogOpen(false);
			setImportedResumeId(resumeId);
			setImportedFileName(file.name);
			setImportedFormat(fileType);
			setImportSuccess(true);
			setImportMessage(t("dashboard.resumes.importSuccess") || (fileType === "word" ? "Word 导入成功" : "Markdown 导入成功"));
			setIsResultDialogOpen(true);
			setTimeout(() => {
				setImportProgress(0);
				setImportStatus("");
			}, 1e3);
		} catch (error) {
			console.error(`Import ${fileType} error:`, error);
			const message = error instanceof Error ? error.message : `${fileType === "word" ? "Word" : "Markdown"} 导入失败`;
			setImportedFileName(file.name);
			setImportedFormat(fileType);
			setImportSuccess(false);
			setImportMessage(message);
			setIsResultDialogOpen(true);
		}
	};
	const handleWordFileChange = async (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file || isImporting) return;
		try {
			setIsImporting(true);
			await importResumeFromText(file, "word");
		} catch (error) {
			console.error("Import Word error:", error);
			const message = error instanceof Error && error.message ? error.message : "Word 导入失败";
			setImportedFileName(file.name);
			setImportedFormat("word");
			setImportSuccess(false);
			setImportMessage(message);
			setIsResultDialogOpen(true);
		} finally {
			setIsImporting(false);
		}
	};
	const handleMarkdownFileChange = async (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file || isImporting) return;
		try {
			setIsImporting(true);
			await importResumeFromText(file, "markdown");
		} catch (error) {
			console.error("Import Markdown error:", error);
			const message = error instanceof Error && error.message ? error.message : "Markdown 导入失败";
			setImportedFileName(file.name);
			setImportedFormat("markdown");
			setImportSuccess(false);
			setImportMessage(message);
			setIsResultDialogOpen(true);
		} finally {
			setIsImporting(false);
		}
	};
	const handleJsonFileChange = async (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file || isImporting) return;
		try {
			setIsImporting(true);
			await importResumeFromJson(file);
		} finally {
			setIsImporting(false);
		}
	};
	const handlePdfFileChange = async (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file || isImporting) return;
		try {
			setIsImporting(true);
			await importResumeFromPdf(file);
		} finally {
			setIsImporting(false);
		}
	};
	return /* @__PURE__ */ jsx(ScrollArea, {
		className: "h-[calc(100vh-2rem)] w-full",
		children: /* @__PURE__ */ jsxs(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .3 },
			className: "flex-1 space-y-6 py-8",
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					className: "flex w-full items-center justify-center px-4",
					initial: {
						y: 20,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					transition: {
						duration: .3,
						delay: .1
					},
					children: hasConfiguredFolder ? /* @__PURE__ */ jsx(Alert, {
						className: "mb-6 bg-green-50/50 dark:bg-green-950/30 border-green-200 dark:border-green-900",
						children: /* @__PURE__ */ jsxs(AlertDescription, {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-green-700 dark:text-green-400",
								children: t("dashboard.resumes.synced")
							}), /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								variant: "outline",
								className: "ml-4 hover:bg-green-100 dark:hover:bg-green-900",
								onClick: () => {
									router.push("/app/dashboard/settings");
								},
								children: [/* @__PURE__ */ jsx(Settings, { className: "w-4 h-4 mr-2" }), t("dashboard.resumes.view")]
							})]
						})
					}) : /* @__PURE__ */ jsxs(Alert, {
						variant: "destructive",
						className: "mb-6 bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-900",
						children: [
							/* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
							/* @__PURE__ */ jsx(AlertTitle, { children: t("dashboard.resumes.notice.title") }),
							/* @__PURE__ */ jsxs(AlertDescription, {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-red-700 dark:text-red-400",
									children: t("dashboard.resumes.notice.description")
								}), /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "ml-4 hover:bg-red-100 dark:hover:bg-red-900",
									onClick: () => {
										router.push("/app/dashboard/settings");
									},
									children: [/* @__PURE__ */ jsx(Settings, { className: "w-4 h-4 mr-2" }), t("dashboard.resumes.notice.goToSettings")]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: "px-4 sm:px-6 flex items-center justify-between",
					initial: {
						y: -20,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					transition: { duration: .3 },
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100",
						children: t("dashboard.resumes.myResume")
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center space-x-2",
						children: [/* @__PURE__ */ jsx(AnimatedImportButton, {
							onClick: () => setIsImportDialogOpen(true),
							t
						}), /* @__PURE__ */ jsx(motion.div, {
							whileHover: { scale: 1.05 },
							whileTap: { scale: .95 },
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 17
							},
							children: /* @__PURE__ */ jsxs(Button, {
								onClick: () => setIsCreateModalOpen(true),
								variant: "default",
								className: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
								children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }), t("dashboard.resumes.create")]
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "flex-1 w-full p-3 sm:p-6",
					initial: {
						y: 20,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					transition: {
						duration: .3,
						delay: .2
					},
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6",
						children: [/* @__PURE__ */ jsx(motion.div, {
							whileHover: { scale: 1.02 },
							whileTap: { scale: .98 },
							transition: {
								type: "spring",
								stiffness: 400,
								damping: 17
							},
							onClick: () => setIsCreateModalOpen(true),
							children: /* @__PURE__ */ jsx(Card, {
								className: cn("relative border border-dashed cursor-pointer transition-all duration-200 aspect-[210/297] flex flex-col", "hover:border-gray-400 hover:bg-gray-50", "dark:hover:border-primary dark:hover:bg-primary/10"),
								children: /* @__PURE__ */ jsxs(CardContent, {
									className: "flex-1 p-0 text-center flex flex-col items-center justify-center",
									children: [
										/* @__PURE__ */ jsx(motion.div, {
											className: "mb-4 p-4 rounded-full bg-gray-100 dark:bg-primary/10",
											whileHover: { rotate: 90 },
											transition: { duration: .2 },
											children: /* @__PURE__ */ jsx(Plus, { className: "h-8 w-8 text-gray-600 dark:text-primary" })
										}),
										/* @__PURE__ */ jsx(CardTitle, {
											className: "text-xl text-gray-900 dark:text-gray-100 px-4",
											children: t("dashboard.resumes.newResume")
										}),
										/* @__PURE__ */ jsx(CardDescription, {
											className: "mt-2 text-gray-600 dark:text-gray-400 px-4",
											children: t("dashboard.resumes.newResumeDescription")
										})
									]
								})
							})
						}), /* @__PURE__ */ jsx(AnimatePresence, { children: Object.entries(resumes).sort(([, a], [, b]) => {
							const dateA = new Date(a.createdAt || 0).getTime();
							return new Date(b.createdAt || 0).getTime() - dateA;
						}).map(([id, resume], index) => /* @__PURE__ */ jsx(ResumeCardItem, {
							id,
							resume,
							t,
							locale,
							setActiveResume,
							router,
							deleteResume,
							duplicateResume,
							index
						}, id)) })]
					})
				}),
				/* @__PURE__ */ jsx(CreateResumeModal, {
					open: isCreateModalOpen,
					onOpenChange: setIsCreateModalOpen,
					onCreate: handleCreateFromModal
				}),
				/* @__PURE__ */ jsx(ImportResumeDialog, {
					open: isImportDialogOpen,
					isImporting,
					importProgress,
					importStatus,
					isUsingOCR,
					onOpenChange: setIsImportDialogOpen,
					jsonFileInputRef,
					pdfFileInputRef,
					wordFileInputRef,
					markdownFileInputRef,
					onJsonFileChange: handleJsonFileChange,
					onPdfFileChange: handlePdfFileChange,
					onWordFileChange: handleWordFileChange,
					onMarkdownFileChange: handleMarkdownFileChange
				}),
				/* @__PURE__ */ jsx(ImportResultDialog, {
					open: isResultDialogOpen,
					success: importSuccess,
					message: importMessage,
					resumeId: importedResumeId,
					fileName: importedFileName,
					format: importedFormat,
					onOpenChange: setIsResultDialogOpen,
					onNavigate: () => {
						if (importedResumeId) router.push(`/app/workbench/${importedResumeId}`);
					}
				})
			]
		})
	});
};
//#endregion
//#region src/app/app/dashboard/resumes/page.tsx
function ResumesPage() {
	return /* @__PURE__ */ jsx(ResumeWorkbench, {});
}
//#endregion
//#region src/routes/app/dashboard/resumes.tsx?tsr-split=component
var SplitComponent = ResumesPage;
//#endregion
export { SplitComponent as component };
