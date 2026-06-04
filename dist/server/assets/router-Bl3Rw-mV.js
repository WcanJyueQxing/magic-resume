import { a as useLocale, i as NextIntlClientProvider } from "./utils-CECdrI66.js";
import { c as zh_default, r as getPreferredLocale, s as en_default, t as Route$20 } from "./_locale-CcjCQDoe.js";
import { t as useResumeStore } from "./useResumeStore-46XKG7Po.js";
import { t as syncResumesFromDirectory } from "./resumeFileSync-DkmptGMo.js";
import { n as AI_MODEL_CONFIGS, t as Route$21 } from "./_id-CWdHjDil.js";
import { useEffect } from "react";
import { HeadContent, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, redirect, useLocation } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ThemeProvider, useTheme } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ProxyAgent, setGlobalDispatcher } from "undici";
import { exec } from "child_process";
import { access, mkdir, readFile, readdir, rm, writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
//#region src/app/globals.css?url
var globals_default = "/assets/globals-CCSQ0MZd.css";
//#endregion
//#region src/app/font.css?url
var font_default = "/assets/font-Cj_m5HSK.css";
//#endregion
//#region src/styles/tiptap.scss?url
var tiptap_default = "/assets/tiptap-BvB4bUUO.css";
//#endregion
//#region src/hooks/useResumeDirectorySync.ts
var hasSyncedFromDirectory = false;
var activeSyncPromise = null;
var useResumeDirectorySync = () => {
	const updateResumeFromFile = useResumeStore((state) => state.updateResumeFromFile);
	useEffect(() => {
		if (hasSyncedFromDirectory || activeSyncPromise) return;
		activeSyncPromise = syncResumesFromDirectory(updateResumeFromFile).then(() => void 0).catch((error) => {
			console.error("Error syncing resume directory:", error);
		}).finally(() => {
			hasSyncedFromDirectory = true;
			activeSyncPromise = null;
		});
	}, [updateResumeFromFile]);
};
//#endregion
//#region src/app/providers.tsx
function Providers({ children }) {
	const locale = useLocale();
	useResumeDirectorySync();
	return /* @__PURE__ */ jsx(HeroUIProvider, {
		locale,
		children: /* @__PURE__ */ jsx(ThemeProvider, {
			attribute: "class",
			defaultTheme: "light",
			enableSystem: true,
			disableTransitionOnChange: true,
			storageKey: "magic-resume-theme",
			children
		})
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ jsx(Toaster, {
		theme,
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
var Route$19 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Magic Resume" }
		],
		links: [
			{
				rel: "stylesheet",
				href: globals_default
			},
			{
				rel: "stylesheet",
				href: font_default
			},
			{
				rel: "stylesheet",
				href: tiptap_default
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: RootNotFound
});
function RootComponent() {
	const locale = getPreferredLocale(useLocation({ select: (location) => location.pathname }));
	const messages = locale === "en" ? en_default : zh_default;
	useEffect(() => {
		document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
	}, [locale]);
	return /* @__PURE__ */ jsxs("html", {
		lang: locale,
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx(HeadContent, {}),
			/* @__PURE__ */ jsx("link", {
				rel: "icon",
				href: "/favicon.ico?v=2"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "icon",
				href: "/icon.png"
			})
		] }), /* @__PURE__ */ jsxs("body", { children: [/* @__PURE__ */ jsx(NextIntlClientProvider, {
			locale,
			messages,
			timeZone: "Asia/Shanghai",
			children: /* @__PURE__ */ jsxs(Providers, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, {
				position: "top-center",
				richColors: true
			})] })
		}), /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootNotFound() {
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground",
			children: "页面不存在"
		})
	});
}
//#endregion
//#region src/routes/index.tsx
var Route$18 = createFileRoute("/")({ beforeLoad: ({ location }) => {
	throw redirect({
		to: "/$locale",
		params: { locale: getPreferredLocale(location.pathname) }
	});
} });
//#endregion
//#region src/routes/app/index.tsx
var Route$17 = createFileRoute("/app/")({ beforeLoad: () => {
	throw redirect({ to: "/app/dashboard/resumes" });
} });
//#endregion
//#region src/routes/app/pdf-parser.tsx
var $$splitComponentImporter$7 = () => import("./pdf-parser-BWpwm3fG.js");
var Route$16 = createFileRoute("/app/pdf-parser")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/app/dashboard.tsx
var $$splitComponentImporter$6 = () => import("./dashboard-CbsoWUFu.js");
var Route$15 = createFileRoute("/app/dashboard")({
	head: () => ({ meta: [{
		name: "robots",
		content: "noindex,nofollow"
	}] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/lib/server/gemini.ts
var proxyDispatcherInitialized = false;
var ensureGeminiProxyDispatcher = () => {
	if (proxyDispatcherInitialized) return;
	const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
	if (!proxyUrl) {
		proxyDispatcherInitialized = true;
		return;
	}
	try {
		setGlobalDispatcher(new ProxyAgent(proxyUrl));
	} catch (error) {
		console.warn("Failed to initialize proxy dispatcher for Gemini:", error);
	} finally {
		proxyDispatcherInitialized = true;
	}
};
var getGeminiModelInstance = (params) => {
	ensureGeminiProxyDispatcher();
	return new GoogleGenerativeAI(params.apiKey).getGenerativeModel({
		model: params.model,
		systemInstruction: params.systemInstruction,
		generationConfig: params.generationConfig
	});
};
var formatGeminiErrorMessage = (error) => {
	const anyError = error;
	const baseMessage = typeof anyError?.message === "string" && anyError.message ? anyError.message : "Gemini request failed";
	const details = anyError?.errorDetails;
	if (!details) return baseMessage;
	try {
		return `${baseMessage} | details: ${Array.isArray(details) ? JSON.stringify(details) : String(details)}`;
	} catch (stringifyError) {
		return baseMessage;
	}
};
//#endregion
//#region src/routes/api/resume-import.ts
var parseJsonPayload = (content) => {
	const text = content.trim();
	try {
		return JSON.parse(text);
	} catch (error) {}
	const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
	if (fenced?.[1]) try {
		return JSON.parse(fenced[1].trim());
	} catch (error) {}
	const objectBlock = text.match(/\{[\s\S]*\}/);
	if (objectBlock?.[0]) try {
		return JSON.parse(objectBlock[0]);
	} catch (error) {}
	return null;
};
var extractBase64Payload = (value) => {
	const matched = value.match(/^data:(.*?);base64,(.*)$/);
	if (matched) return {
		mimeType: matched[1] || "image/jpeg",
		data: matched[2] || ""
	};
	return {
		mimeType: "image/jpeg",
		data: value
	};
};
var Route$14 = createFileRoute("/api/resume-import")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { apiKey, model, content, images, locale } = await request.json();
		if (!apiKey || !content && (!images || images.length === 0)) return Response.json({ error: "Missing API key or resume content/images" }, { status: 400 });
		const language = locale === "en" ? "English" : "Chinese";
		const geminiModel = model || "gemini-flash-latest";
		const imageParts = Array.isArray(images) ? images.map((image) => {
			const payload = extractBase64Payload(image);
			return { inlineData: {
				mimeType: payload.mimeType,
				data: payload.data
			} };
		}) : [];
		const modelInstance = getGeminiModelInstance({
			apiKey,
			model: geminiModel,
			systemInstruction: `你是一个专业的简历结构化助手。根据用户提供的简历内容，提取信息并只输出一个合法 JSON 对象。

输出约束：
1. 只允许输出 JSON，不要输出 Markdown，不要输出解释。
2. 如果某个字段不确定，使用空字符串或空数组。
3. 请使用 ${language} 输出内容文本。
4. description/details 字段输出字符串数组，每一项为一句可读内容。

JSON 结构：
{
  "title": "简历标题",
  "basic": {
    "name": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "employementStatus": "",
    "birthDate": ""
  },
  "education": [
    {
      "school": "",
      "major": "",
      "degree": "",
      "startDate": "",
      "endDate": "",
      "gpa": "",
      "description": ["", ""]
    }
  ],
  "experience": [
    {
      "company": "",
      "position": "",
      "date": "",
      "details": ["", ""]
    }
  ],
  "projects": [
    {
      "name": "",
      "role": "",
      "date": "",
      "description": ["", ""],
      "link": "",
      "linkLabel": ""
    }
  ],
  "skills": ["", ""]
}`,
			generationConfig: {
				temperature: .2,
				responseMimeType: "application/json"
			}
		});
		const inputParts = [{ text: content || "请识别以下简历页面图片中的信息，并严格按 JSON 结构输出。" }, ...imageParts];
		const aiContent = (await modelInstance.generateContent(inputParts)).response.text();
		if (!aiContent || typeof aiContent !== "string") return Response.json({ error: "AI did not return structured content" }, { status: 500 });
		const parsedResume = parseJsonPayload(aiContent);
		if (!parsedResume) return Response.json({ error: "Failed to parse AI JSON output" }, { status: 500 });
		return Response.json({ resume: parsedResume });
	} catch (error) {
		console.error("Error in resume import:", error);
		const status = typeof error?.status === "number" ? error.status : 500;
		return Response.json({ error: formatGeminiErrorMessage(error) }, { status });
	}
} } } });
//#endregion
//#region src/routes/api/polish.ts
var BACKEND_URL = "http://localhost:8000";
var Route$13 = createFileRoute("/api/polish")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { apiKey, model, content, modelType, apiEndpoint, customInstructions } = await request.json();
		const response = await fetch(`${BACKEND_URL}/api/polish`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content,
				provider: modelType,
				model_id: model,
				api_endpoint: apiEndpoint,
				custom_instructions: customInstructions
			})
		});
		if (!response.ok) {
			const errorData = await response.json();
			return Response.json({ error: errorData }, { status: response.status });
		}
		const encoder = new TextEncoder();
		const stream = new ReadableStream({ async start(controller) {
			if (!response.body) {
				controller.close();
				return;
			}
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let pending = "";
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					pending += decoder.decode(value, { stream: true });
					const lines = pending.split(/\r?\n/);
					pending = lines.pop() ?? "";
					for (const line of lines) {
						const trimmed = line.trim();
						if (!trimmed.startsWith("data:")) continue;
						try {
							const payload = trimmed.slice(5).trim();
							if (!payload || payload === "[DONE]") continue;
							controller.enqueue(encoder.encode(payload));
						} catch (e) {
							console.error("Error parsing stream:", e);
						}
					}
				}
				controller.close();
			} catch (error) {
				console.error("Stream reading error:", error);
				controller.error(error);
			}
		} });
		return new Response(stream, { headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive"
		} });
	} catch (error) {
		console.error("Polish error:", error);
		return Response.json({ error: { message: "Failed to polish content" } }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api/pdf-parse.ts
/**
* 检查 MinerU 是否已安装
*/
async function checkMinerUInstalled$1() {
	return new Promise((resolve) => {
		exec("magic-pdf --version", { timeout: 1e4 }, (error) => {
			resolve(!error);
		});
	});
}
/**
* 使用 MinerU 解析 PDF
*/
async function parseWithMinerU(pdfPath, outputDir) {
	const result = {
		text: "",
		images: [],
		contentList: [],
		method: "mineru"
	};
	return new Promise((resolve, reject) => {
		const cmd = `magic-pdf -p "${pdfPath}" -o "${outputDir}" -m auto`;
		console.log("Running MinerU:", cmd);
		exec(cmd, { timeout: 18e4 }, async (error, stdout, stderr) => {
			if (error) {
				reject(/* @__PURE__ */ new Error(`MinerU failed: ${stderr || error.message}`));
				return;
			}
			try {
				const entries = await readdir(outputDir, { withFileTypes: true });
				let actualDir = outputDir;
				for (const entry of entries) if (entry.isDirectory()) {
					const subDir = join(outputDir, entry.name);
					if ((await readdir(subDir)).some((e) => e.endsWith(".md") || e.endsWith(".json"))) {
						actualDir = subDir;
						break;
					}
				}
				const mdFiles = (await readdir(actualDir)).filter((e) => e.endsWith(".md"));
				if (mdFiles.length > 0) result.text = await readFile(join(actualDir, mdFiles[0]), "utf-8");
				const jsonFiles = (await readdir(actualDir)).filter((e) => e.endsWith(".json"));
				if (jsonFiles.length > 0) {
					const jsonContent = await readFile(join(actualDir, jsonFiles[0]), "utf-8");
					result.contentList = JSON.parse(jsonContent);
				}
				const imagesDir = join(actualDir, "images");
				try {
					await access(imagesDir);
					const imgFiles = (await readdir(imagesDir)).filter((e) => /\.(png|jpg|jpeg)$/i.test(e));
					for (const imgFile of imgFiles) {
						const imgBuffer = await readFile(join(imagesDir, imgFile));
						const ext = imgFile.split(".").pop()?.toLowerCase() || "png";
						const mime = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
						result.images.push({
							data: `data:${mime};base64,${imgBuffer.toString("base64")}`,
							name: imgFile
						});
					}
				} catch (e) {}
				resolve(result);
			} catch (e) {
				reject(e);
			}
		});
	});
}
/**
* 使用 PyMuPDF 解析 PDF
*/
async function parseWithPyMuPDF(pdfPath) {
	const result = {
		text: "",
		images: [],
		contentList: [],
		method: "pymupdf"
	};
	const pythonScript = `
import fitz
import json
import base64
import sys

def extract_pdf_content(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    images = []
    content_list = []

    for page_num, page in enumerate(doc):
        page_text = page.get_text()
        if page_text.strip():
            text += page_text + "\\n\\n"

        image_list = page.get_images()
        for img_index, img in enumerate(image_list):
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
                if base_image:
                    img_bytes = base_image["image"]
                    img_ext = base_image["ext"]
                    img_base64 = base64.b64encode(img_bytes).decode("utf-8")
                    mime_type = f"image/{img_ext}" if img_ext != "jpg" else "image/jpeg"
                    images.append({
                        "data": f"data:{mime_type};base64,{img_base64}",
                        "name": f"image_{page_num}_{img_index}.{img_ext}"
                    })
            except:
                pass

        content_list.append({
            "type": "text",
            "text": page_text,
            "page": page_num
        })

    return {
        "text": text.strip(),
        "images": images,
        "contentList": content_list
    }

pdf_path = sys.argv[1]
result = extract_pdf_content(pdf_path)
print(json.dumps(result))
`;
	const { execSync } = await import("child_process");
	const tempScript = join(tmpdir(), `pymupdf_${randomUUID()}.py`);
	await writeFile(tempScript, pythonScript);
	try {
		const output = execSync(`python "${tempScript}" "${pdfPath}"`, {
			timeout: 6e4,
			encoding: "utf-8"
		});
		const parsed = JSON.parse(output.trim());
		result.text = parsed.text || "";
		result.images = parsed.images || [];
		result.contentList = parsed.contentList || [];
	} finally {
		await rm(tempScript, { force: true });
	}
	return result;
}
var Route$12 = createFileRoute("/api/pdf-parse")({ server: { handlers: { POST: async ({ request }) => {
	let tempDir = "";
	try {
		const formData = await request.formData();
		const file = formData.get("pdf");
		const method = formData.get("method") || "auto";
		if (!file) return Response.json({ error: "未提供 PDF 文件" }, { status: 400 });
		console.log("Processing PDF:", file.name, "Size:", file.size, "Method:", method);
		const jobId = randomUUID();
		tempDir = join(tmpdir(), `pdf-parse-${jobId}`);
		await mkdir(tempDir, { recursive: true });
		const pdfBuffer = Buffer.from(await file.arrayBuffer());
		const pdfPath = join(tempDir, file.name);
		await writeFile(pdfPath, pdfBuffer);
		let result = {
			text: "",
			images: [],
			contentList: [],
			method: "pdfjs"
		};
		if (method === "mineru" || method === "auto") {
			if (await checkMinerUInstalled$1()) try {
				const outputDir = join(tempDir, "output");
				await mkdir(outputDir, { recursive: true });
				result = await parseWithMinerU(pdfPath, outputDir);
			} catch (mineruError) {
				console.warn("MinerU failed:", mineruError);
				if (method === "mineru") throw mineruError;
			}
			else if (method === "mineru") throw new Error("MinerU 未安装");
		}
		if (!result.text) {
			if (method === "pymupdf" || method === "auto") try {
				result = await parseWithPyMuPDF(pdfPath);
			} catch (pymupdfError) {
				console.warn("PyMuPDF failed:", pymupdfError);
				if (method === "pymupdf") throw pymupdfError;
			}
		}
		if (!result.text && result.images.length === 0) return Response.json({ error: "未能提取任何内容" }, { status: 422 });
		console.log("Parsed with method:", result.method);
		console.log("Text length:", result.text.length);
		console.log("Images:", result.images.length);
		return Response.json({
			success: true,
			text: result.text,
			images: result.images,
			contentList: result.contentList,
			method: result.method
		});
	} catch (error) {
		console.error("PDF parse error:", error);
		return Response.json({ error: error instanceof Error ? error.message : "PDF 解析失败" }, { status: 500 });
	} finally {
		if (tempDir) try {
			await rm(tempDir, {
				recursive: true,
				force: true
			});
		} catch (e) {
			console.warn("Failed to clean temp dir:", e);
		}
	}
} } } });
//#endregion
//#region src/routes/api/mineru-parse.ts
/**
* 检查 MinerU 是否已安装
*/
async function checkMinerUInstalled() {
	return new Promise((resolve) => {
		exec("magic-pdf --version", { timeout: 1e4 }, (error, stdout) => {
			if (error) {
				console.error("MinerU not installed:", error.message);
				resolve(false);
				return;
			}
			console.log("MinerU version:", stdout.trim());
			resolve(true);
		});
	});
}
/**
* 运行 MinerU 命令
*/
async function runMinerU(pdfPath, outputDir) {
	return new Promise((resolve, reject) => {
		const cmd = `magic-pdf -p "${pdfPath}" -o "${outputDir}" -m auto`;
		console.log("Running MinerU command:", cmd);
		exec(cmd, {
			timeout: 18e4,
			maxBuffer: 10 * 1024 * 1024
		}, (error, stdout, stderr) => {
			console.log("MinerU stdout:", stdout);
			console.log("MinerU stderr:", stderr);
			if (error) {
				console.error("MinerU error:", error);
				reject(/* @__PURE__ */ new Error(`MinerU 执行失败: ${stderr || error.message}`));
				return;
			}
			resolve(stdout || stderr || "");
		});
	});
}
/**
* 递归查找文件
*/
async function findFile(dir, filename) {
	try {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) {
				const found = await findFile(fullPath, filename);
				if (found) return found;
			} else if (entry.name === filename || entry.name.endsWith(filename)) return fullPath;
		}
	} catch (e) {}
	return null;
}
/**
* 递归查找所有图片文件
*/
async function findImages(dir) {
	const images = [];
	try {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = join(dir, entry.name);
			if (entry.isDirectory()) {
				const subImages = await findImages(fullPath);
				images.push(...subImages);
			} else if (/\.(png|jpg|jpeg|gif|bmp)$/i.test(entry.name)) images.push({
				path: fullPath,
				name: entry.name
			});
		}
	} catch (e) {}
	return images;
}
/**
* 读取 MinerU 输出文件
* MinerU 输出目录结构:
* <output_dir>/
* └── <pdf_filename>/
*     ├── auto/  (or "txt"/"ocr" depending on method)
*     │   ├── images/           # Extracted images from the PDF
*     │   ├── content_list.json # Structured content list
*     │   ├── full_content.md   # Full content in Markdown format
*     │   └── ...
*     └── ...
*/
async function readOutputFiles(outputDir) {
	const result = {
		text: "",
		images: [],
		contentList: []
	};
	console.log("Reading output from:", outputDir);
	try {
		const entries = await readdir(outputDir, { withFileTypes: true });
		console.log("Output directory contents:", entries.map((e) => e.name));
		let actualOutputDir = outputDir;
		for (const entry of entries) if (entry.isDirectory()) {
			const subDir = join(outputDir, entry.name);
			const subEntries = await readdir(subDir, { withFileTypes: true });
			for (const subEntry of subEntries) if (subEntry.isDirectory() && (subEntry.name === "auto" || subEntry.name === "txt" || subEntry.name === "ocr")) {
				actualOutputDir = join(subDir, subEntry.name);
				console.log("Found actual output dir:", actualOutputDir);
				break;
			}
			if (actualOutputDir === outputDir) {
				if (subEntries.some((e) => e.name.endsWith(".md") || e.name.endsWith(".json") || e.name === "images")) {
					actualOutputDir = subDir;
					console.log("Found output dir (direct):", actualOutputDir);
				}
			}
		}
		console.log("Using output dir:", actualOutputDir);
		const outputEntries = await readdir(actualOutputDir, { withFileTypes: true });
		console.log("Actual output directory contents:", outputEntries.map((e) => e.name));
		const mdFiles = outputEntries.filter((e) => e.name.endsWith(".md"));
		if (mdFiles.length > 0) {
			const mdFile = mdFiles.find((e) => e.name.includes("full_content")) || mdFiles[0];
			const mdPath = join(actualOutputDir, mdFile.name);
			result.text = await readFile(mdPath, "utf-8");
			console.log("Found markdown file:", mdPath, "Length:", result.text.length);
		} else {
			const mdPath = await findFile(actualOutputDir, ".md");
			if (mdPath) {
				result.text = await readFile(mdPath, "utf-8");
				console.log("Found markdown file (recursive):", mdPath, "Length:", result.text.length);
			}
		}
		const jsonFiles = outputEntries.filter((e) => e.name.endsWith(".json"));
		if (jsonFiles.length > 0) {
			const jsonPath = join(actualOutputDir, jsonFiles[0].name);
			const jsonContent = await readFile(jsonPath, "utf-8");
			result.contentList = JSON.parse(jsonContent);
			console.log("Found JSON file:", jsonPath, "Items:", result.contentList.length);
		} else {
			const jsonPath = await findFile(actualOutputDir, ".json");
			if (jsonPath) {
				const jsonContent = await readFile(jsonPath, "utf-8");
				result.contentList = JSON.parse(jsonContent);
				console.log("Found JSON file (recursive):", jsonPath, "Items:", result.contentList.length);
			}
		}
		const imagesDir = join(actualOutputDir, "images");
		try {
			await access(imagesDir);
			const imageFiles = await readdir(imagesDir);
			console.log("Found images directory:", imagesDir, "Files:", imageFiles.length);
			for (const imgFile of imageFiles) if (/\.(png|jpg|jpeg|gif|bmp)$/i.test(imgFile)) try {
				const imgBuffer = await readFile(join(imagesDir, imgFile));
				const ext = imgFile.split(".").pop()?.toLowerCase() || "png";
				const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
				result.images.push({
					data: `data:${mimeType};base64,${imgBuffer.toString("base64")}`,
					name: imgFile
				});
			} catch (e) {
				console.warn("Failed to read image:", imgFile, e);
			}
		} catch (e) {
			console.log("No images directory found, searching recursively...");
			const imageFiles = await findImages(actualOutputDir);
			console.log("Found images (recursive):", imageFiles.length);
			for (const img of imageFiles) try {
				const imgBuffer = await readFile(img.path);
				const ext = img.name.split(".").pop()?.toLowerCase() || "png";
				const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
				result.images.push({
					data: `data:${mimeType};base64,${imgBuffer.toString("base64")}`,
					name: img.name
				});
			} catch (e) {
				console.warn("Failed to read image:", img.path, e);
			}
		}
	} catch (error) {
		console.error("Error reading output files:", error);
	}
	return result;
}
/**
* 使用 PyMuPDF 提取 PDF 内容（后备方案）
*/
async function extractWithPyMuPDF(pdfPath) {
	const result = {
		text: "",
		images: [],
		contentList: []
	};
	try {
		const pythonScript = `
import fitz
import json
import base64
import sys

def extract_pdf_content(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    images = []
    content_list = []

    for page_num, page in enumerate(doc):
        # 提取文本
        page_text = page.get_text()
        if page_text.strip():
            text += page_text + "\\n\\n"

        # 提取图片
        image_list = page.get_images()
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            if base_image:
                img_bytes = base_image["image"]
                img_ext = base_image["ext"]
                img_base64 = base64.b64encode(img_bytes).decode("utf-8")
                mime_type = f"image/{img_ext}" if img_ext != "jpg" else "image/jpeg"
                images.append({
                    "data": f"data:{mime_type};base64,{img_base64}",
                    "name": f"image_{page_num}_{img_index}.{img_ext}"
                })

        # 添加到内容列表
        content_list.append({
            "type": "text",
            "text": page_text,
            "page": page_num
        })

    return {
        "text": text.strip(),
        "images": images,
        "contentList": content_list
    }

pdf_path = sys.argv[1]
result = extract_pdf_content(pdf_path)
print(json.dumps(result))
`;
		const { execSync } = await import("child_process");
		const tempScript = join(tmpdir(), `pymupdf_extract_${randomUUID()}.py`);
		await writeFile(tempScript, pythonScript);
		try {
			const output = execSync(`python "${tempScript}" "${pdfPath}"`, {
				timeout: 6e4,
				encoding: "utf-8"
			});
			const parsed = JSON.parse(output.trim());
			result.text = parsed.text || "";
			result.images = parsed.images || [];
			result.contentList = parsed.contentList || [];
		} finally {
			await rm(tempScript, { force: true });
		}
	} catch (error) {
		console.error("PyMuPDF extraction failed:", error);
	}
	return result;
}
var Route$11 = createFileRoute("/api/mineru-parse")({ server: { handlers: { POST: async ({ request }) => {
	let tempDir = "";
	try {
		const file = (await request.formData()).get("pdf");
		if (!file) return Response.json({ error: "未提供 PDF 文件" }, { status: 400 });
		console.log("Processing PDF:", file.name, "Size:", file.size);
		const jobId = randomUUID();
		tempDir = join(tmpdir(), `mineru-${jobId}`);
		await mkdir(tempDir, { recursive: true });
		const pdfBuffer = Buffer.from(await file.arrayBuffer());
		const pdfPath = join(tempDir, file.name);
		await writeFile(pdfPath, pdfBuffer);
		console.log("Saved PDF to:", pdfPath);
		let result = {
			text: "",
			images: [],
			contentList: []
		};
		if (await checkMinerUInstalled()) try {
			const outputDir = join(tempDir, "output");
			await mkdir(outputDir, { recursive: true });
			console.log("Starting MinerU...");
			await runMinerU(pdfPath, outputDir);
			console.log("MinerU completed.");
			result = await readOutputFiles(outputDir);
		} catch (mineruError) {
			console.warn("MinerU failed, falling back to PyMuPDF:", mineruError);
		}
		if (!result.text && result.images.length === 0) {
			console.log("Using PyMuPDF as fallback...");
			result = await extractWithPyMuPDF(pdfPath);
		}
		if (!result.text && result.images.length === 0) return Response.json({ error: "未能提取任何内容。请检查 PDF 文件是否有效。" }, { status: 422 });
		console.log("Extracted text length:", result.text.length);
		console.log("Extracted images:", result.images.length);
		return Response.json({
			success: true,
			text: result.text,
			images: result.images,
			contentList: result.contentList
		});
	} catch (error) {
		console.error("PDF parse error:", error);
		return Response.json({ error: error instanceof Error ? error.message : "PDF 解析失败" }, { status: 500 });
	} finally {
		if (tempDir) try {
			await rm(tempDir, {
				recursive: true,
				force: true
			});
			console.log("Cleaned up temp dir:", tempDir);
		} catch (e) {
			console.warn("Failed to clean temp dir:", e);
		}
	}
} } } });
//#endregion
//#region src/routes/api/grammar.ts
var parseUpstreamError = (raw, fallback) => {
	if (!raw) return { message: fallback };
	try {
		const data = JSON.parse(raw);
		return {
			message: data.error?.message || data.message || fallback,
			code: data.error?.code
		};
	} catch {
		return { message: raw };
	}
};
var Route$10 = createFileRoute("/api/grammar")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { apiKey, model, content, modelType, apiEndpoint } = await request.json();
		const modelConfig = AI_MODEL_CONFIGS[modelType];
		if (!modelConfig) throw new Error("Invalid model type");
		const systemPrompt = `你是一个专业的中文简历校对助手。你的任务是**仅**找出简历中的**错别字**和**标点符号错误**。

            **严格禁止**：
            1. ❌ **禁止**提供任何风格、语气、润色或改写建议。如果句子在语法上是正确的（即使读起来不够优美），也**绝对不要**报错。
            2. ❌ **禁止**报告“无明显错误”或类似的信息。如果没有发现错别字或标点错误，"errors" 数组必须为空。
            3. ❌ **禁止**对专业术语进行过度纠正，除非通过上下文非常确定是打字错误。

            **仅检查以下两类错误**：
            1. ✅ **错别字**：例如将“作为”写成“做为”，将“经理”写成“经里”。
            2. ✅ **严重标点错误**：仅报告重复标点（如“，，”）或完全错误的符号位置。

            **重要例外（绝不报错）**：
            - ❌ **忽略中英文标点混用**：在技术简历中，中文内容使用英文标点（如使用英文逗号, 代替中文逗号，或使用英文句点. 代替中文句号）是**完全接受**的风格。**绝对不要**报告此类“错误”。
            - ❌ **忽略空格使用**：不要报告中英文之间的空格遗漏或多余。

            返回格式示例（JSON）：
            {
              "errors": [
                {
                  "context": "包含错误的完整句子（必须是原文）",
                  "text": "具体的错误部分（必须是原文中实际存在的字符串）",
                  "suggestion": "仅包含修正后的词汇或片段（**不要**返回整句，除非整句都是错误的）",
                  "reason": "错别字 / 标点错误",
                  "type": "spelling"
                }
              ]
            }

            再次强调：**只找错别字和标点错误，不要做任何润色！**`;
		if (modelType === "gemini") {
			const text = (await getGeminiModelInstance({
				apiKey,
				model: model || "gemini-flash-latest",
				systemInstruction: systemPrompt,
				generationConfig: {
					temperature: 0,
					responseMimeType: "application/json"
				}
			}).generateContent(content)).response.text() || "";
			return Response.json({ choices: [{ message: { content: text } }] });
		}
		const response = await fetch(modelConfig.url(apiEndpoint), {
			method: "POST",
			headers: modelConfig.headers(apiKey),
			body: JSON.stringify({
				model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: systemPrompt
				}, {
					role: "user",
					content
				}]
			})
		});
		const raw = await response.text();
		if (!response.ok) {
			const parsedError = parseUpstreamError(raw, `Upstream API error: ${response.status} ${response.statusText}`);
			return Response.json({ error: parsedError }, { status: response.status });
		}
		let data;
		try {
			data = raw ? JSON.parse(raw) : {};
		} catch {
			return Response.json({ error: "Invalid upstream response: expected JSON payload" }, { status: 502 });
		}
		return Response.json(data);
	} catch (error) {
		console.error("Error in grammar check:", error);
		return Response.json({ error: formatGeminiErrorMessage(error) }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api/document-parse.ts
var BACKEND_API$1 = "http://localhost:8000/api";
var Route$9 = createFileRoute("/api/document-parse")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get("file");
		const type = formData.get("type") || "word";
		if (!file) return Response.json({ error: "未提供文件" }, { status: 400 });
		console.log("Processing document:", file.name, "Size:", file.size, "Type:", type);
		const backendFormData = new FormData();
		backendFormData.append("file", file);
		console.log(`Uploading file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
		const uploadResponse = await fetch(`${BACKEND_API$1}/files/upload`, {
			method: "POST",
			body: backendFormData
		});
		if (!uploadResponse.ok) {
			const errorData = await uploadResponse.json();
			console.error("Upload failed:", errorData);
			throw new Error(errorData.detail || "文件上传失败");
		}
		const uploadResult = await uploadResponse.json();
		console.log("File uploaded successfully, ID:", uploadResult.id);
		const extractResponse = await fetch(`${BACKEND_API$1}/files/extract/${uploadResult.id}`);
		if (!extractResponse.ok) {
			console.error("Extract request failed:", extractResponse.status);
			throw new Error("获取文件内容失败");
		}
		const extractResult = await extractResponse.json();
		console.log("Extract result:", extractResult);
		const text = extractResult.content || "";
		console.log(`Extracted text length: ${text.length}`);
		if (!text.trim()) {
			console.warn("Empty content extracted from file");
			return Response.json({ error: "未能提取任何内容" }, { status: 422 });
		}
		console.log("Extracted text length:", text.length);
		return Response.json({
			success: true,
			text
		});
	} catch (error) {
		console.error("Document parse error:", error);
		return Response.json({ error: error instanceof Error ? error.message : "文档解析失败" }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routes/api/ai-config.ts
var BACKEND_API = "http://localhost:8000/api";
var Route$8 = createFileRoute("/api/ai-config")({ server: { handlers: {
	GET: async () => {
		try {
			const response = await fetch(`${BACKEND_API}/ai-config`);
			const result = await response.json();
			return Response.json(result, { status: response.status });
		} catch (error) {
			console.error("Error fetching AI config:", error);
			return Response.json({
				success: false,
				error: "Failed to fetch config from backend"
			}, { status: 500 });
		}
	},
	POST: async ({ request }) => {
		try {
			const body = await request.json();
			const response = await fetch(`${BACKEND_API}/ai-config`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			const result = await response.json();
			return Response.json(result, { status: response.status });
		} catch (error) {
			console.error("Error creating AI config:", error);
			return Response.json({
				success: false,
				error: "Failed to create config"
			}, { status: 500 });
		}
	},
	PUT: async ({ request }) => {
		try {
			const body = await request.json();
			const response = await fetch(`${BACKEND_API}/ai-config`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
			const result = await response.json();
			return Response.json(result, { status: response.status });
		} catch (error) {
			console.error("Error updating AI config:", error);
			return Response.json({
				success: false,
				error: "Failed to update config"
			}, { status: 500 });
		}
	},
	DELETE: async ({ request }) => {
		try {
			const id = new URL(request.url).searchParams.get("id");
			const response = await fetch(`${BACKEND_API}/ai-config?id=${id}`, { method: "DELETE" });
			const result = await response.json();
			return Response.json(result, { status: response.status });
		} catch (error) {
			console.error("Error deleting AI config:", error);
			return Response.json({
				success: false,
				error: "Failed to delete config"
			}, { status: 500 });
		}
	}
} } });
//#endregion
//#region src/routes/app/dashboard/index.tsx
var Route$7 = createFileRoute("/app/dashboard/")({ beforeLoad: () => {
	throw redirect({ to: "/app/dashboard/resumes" });
} });
//#endregion
//#region src/routes/app/preview-template/$id.tsx
var $$splitComponentImporter$5 = () => import("./_id-DI0YBPWn.js");
var Route$6 = createFileRoute("/app/preview-template/$id")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/app/dashboard/templates.tsx
var $$splitComponentImporter$4 = () => import("./templates-B5AEN6OJ.js");
var Route$5 = createFileRoute("/app/dashboard/templates")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/app/dashboard/settings.tsx
var $$splitComponentImporter$3 = () => import("./settings-gevb3kJe.js");
var Route$4 = createFileRoute("/app/dashboard/settings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/app/dashboard/resumes.tsx
var $$splitComponentImporter$2 = () => import("./resumes-BHDS9Iks.js");
var Route$3 = createFileRoute("/app/dashboard/resumes")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/app/dashboard/dashboard.tsx
var $$splitComponentImporter$1 = () => import("./dashboard-B1VsLGDS.js");
var Route$2 = createFileRoute("/app/dashboard/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/app/dashboard/ai.tsx
var $$splitComponentImporter = () => import("./ai-CBZzaOyq.js");
var Route$1 = createFileRoute("/app/dashboard/ai")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routes/api/proxy/image.ts
var Route = createFileRoute("/api/proxy/image")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const { searchParams } = new URL(request.url);
		const imageUrl = searchParams.get("url");
		if (!imageUrl) {
			console.error("缺少图片URL参数");
			return Response.json({ error: "缺少图片URL参数" }, { status: 400 });
		}
		let parsedUrl;
		try {
			parsedUrl = new URL(imageUrl);
		} catch (_error) {
			console.error(`图片URL格式不正确: ${imageUrl}`);
			return Response.json({ error: "图片URL格式不正确" }, { status: 400 });
		}
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
			console.error(`不支持的URL协议: ${parsedUrl.protocol}`);
			return Response.json({ error: "只支持HTTP和HTTPS协议" }, { status: 400 });
		}
		let response;
		try {
			response = await fetch(imageUrl, { headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
				"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
				Referer: parsedUrl.origin
			} });
		} catch (error) {
			console.error(`获取图片失败: ${error.message || "未知错误"}`);
			return Response.json({ error: `获取图片失败: ${error.message || "未知错误"}` }, { status: 500 });
		}
		if (!response.ok) {
			console.error(`图片服务器返回错误: ${response.status} ${response.statusText}`);
			return Response.json({ error: `获取图片失败: ${response.status} ${response.statusText}` }, { status: response.status });
		}
		let imageBuffer;
		try {
			imageBuffer = await response.arrayBuffer();
		} catch (error) {
			console.error(`读取图片内容失败: ${error.message || "未知错误"}`);
			return Response.json({ error: `读取图片内容失败: ${error.message || "未知错误"}` }, { status: 500 });
		}
		if (imageBuffer.byteLength === 0) {
			console.error("图片内容为空");
			return Response.json({ error: "图片内容为空" }, { status: 400 });
		}
		const contentType = response.headers.get("content-type") || "image/jpeg";
		return new Response(imageBuffer, { headers: {
			"Content-Type": contentType,
			"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
			Pragma: "no-cache",
			Expires: "0",
			"Surrogate-Control": "no-store",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type"
		} });
	} catch (error) {
		console.error("图片代理未处理的错误:", error);
		return Response.json({ error: `处理图片请求时出错: ${error.message || "未知错误"}` }, { status: 500 });
	}
} } } });
//#endregion
//#region src/routeTree.gen.ts
var LocaleRoute = Route$20.update({
	id: "/$locale",
	path: "/$locale",
	getParentRoute: () => Route$19
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AppIndexRoute = Route$17.update({
	id: "/app/",
	path: "/app/",
	getParentRoute: () => Route$19
});
var AppPdfParserRoute = Route$16.update({
	id: "/app/pdf-parser",
	path: "/app/pdf-parser",
	getParentRoute: () => Route$19
});
var AppDashboardRoute = Route$15.update({
	id: "/app/dashboard",
	path: "/app/dashboard",
	getParentRoute: () => Route$19
});
var ApiResumeImportRoute = Route$14.update({
	id: "/api/resume-import",
	path: "/api/resume-import",
	getParentRoute: () => Route$19
});
var ApiPolishRoute = Route$13.update({
	id: "/api/polish",
	path: "/api/polish",
	getParentRoute: () => Route$19
});
var ApiPdfParseRoute = Route$12.update({
	id: "/api/pdf-parse",
	path: "/api/pdf-parse",
	getParentRoute: () => Route$19
});
var ApiMineruParseRoute = Route$11.update({
	id: "/api/mineru-parse",
	path: "/api/mineru-parse",
	getParentRoute: () => Route$19
});
var ApiGrammarRoute = Route$10.update({
	id: "/api/grammar",
	path: "/api/grammar",
	getParentRoute: () => Route$19
});
var ApiDocumentParseRoute = Route$9.update({
	id: "/api/document-parse",
	path: "/api/document-parse",
	getParentRoute: () => Route$19
});
var ApiAiConfigRoute = Route$8.update({
	id: "/api/ai-config",
	path: "/api/ai-config",
	getParentRoute: () => Route$19
});
var AppDashboardIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppDashboardRoute
});
var AppWorkbenchIdRoute = Route$21.update({
	id: "/app/workbench/$id",
	path: "/app/workbench/$id",
	getParentRoute: () => Route$19
});
var AppPreviewTemplateIdRoute = Route$6.update({
	id: "/app/preview-template/$id",
	path: "/app/preview-template/$id",
	getParentRoute: () => Route$19
});
var AppDashboardTemplatesRoute = Route$5.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => AppDashboardRoute
});
var AppDashboardSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppDashboardRoute
});
var AppDashboardResumesRoute = Route$3.update({
	id: "/resumes",
	path: "/resumes",
	getParentRoute: () => AppDashboardRoute
});
var AppDashboardDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppDashboardRoute
});
var AppDashboardAiRoute = Route$1.update({
	id: "/ai",
	path: "/ai",
	getParentRoute: () => AppDashboardRoute
});
var ApiProxyImageRoute = Route.update({
	id: "/api/proxy/image",
	path: "/api/proxy/image",
	getParentRoute: () => Route$19
});
var AppDashboardRouteChildren = {
	AppDashboardAiRoute,
	AppDashboardDashboardRoute,
	AppDashboardResumesRoute,
	AppDashboardSettingsRoute,
	AppDashboardTemplatesRoute,
	AppDashboardIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	LocaleRoute,
	ApiAiConfigRoute,
	ApiDocumentParseRoute,
	ApiGrammarRoute,
	ApiMineruParseRoute,
	ApiPdfParseRoute,
	ApiPolishRoute,
	ApiResumeImportRoute,
	AppDashboardRoute: AppDashboardRoute._addFileChildren(AppDashboardRouteChildren),
	AppPdfParserRoute,
	AppIndexRoute,
	ApiProxyImageRoute,
	AppPreviewTemplateIdRoute,
	AppWorkbenchIdRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
