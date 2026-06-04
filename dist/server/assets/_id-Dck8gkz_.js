import { c as getBorderRadiusValue, d as GITHUB_REPO_URL, f as PDF_EXPORT_CONFIG, l as getRatioMultiplier, o as DEFAULT_CONFIG, s as THEME_COLORS, u as DEFAULT_FIELD_ORDER } from "./initialResumeData-KCtMeTPD.js";
import { a as useLocale, o as useTranslations, t as cn } from "./utils-CECdrI66.js";
import { a as normalizeLinkHref, d as shouldShowCustomFieldLabelPrefix, f as getProjectLinkMeta, i as hasMeaningfulRichTextContent, l as getCustomFieldDisplayText, m as getFileHandle, n as DEFAULT_TEMPLATES, o as stripLegacyRichTextClasses, p as getConfig, s as stripTrailingListParagraph, t as useResumeStore, u as getCustomFieldHref } from "./useResumeStore-46XKG7Po.js";
import { t as generateUUID } from "./uuid-B3Jp4nyW.js";
import { n as AI_MODEL_CONFIGS, t as Route } from "./_id-CWdHjDil.js";
import { n as useRouter } from "./navigation-DRQZI54s.js";
import { t as Button } from "./button-BaBi_9yO.js";
import { a as ThemeToggle, i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-CTvhKNVD.js";
import { a as Input, i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-8aXINjtu.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DGtkjkTU.js";
import { a as DialogHeader, c as ScrollArea, i as DialogFooter, l as ScrollBar, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-D_tFkKKT.js";
import { i as ResumeTemplateComponent, n as getFontOptions, r as normalizeFontFamily, t as getFontFaceCss } from "./fonts-BxvXKZ7g.js";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as useTemplateSnapshots } from "./alert-dialog-CN9piprn.js";
import * as React$1 from "react";
import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { HeroUIProvider } from "@heroui/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnimatePresence, Reorder, motion, useDragControls } from "framer-motion";
import { AlertCircle, AlignCenter, AlignJustify, AlignLeft, AlignRight, ArrowRight, Award, Bold, Book, Bookmark, Briefcase, Building, Building2, CalendarRange, Camera, Check, CheckCircle2, ChevronDown, ChevronUp, Clock, Code, Copy, Cpu, Database, Download, Edit2, Eye, EyeOff, Facebook, FileCheck, FileText, Filter, Flag, FolderGit2, GitBranch, Github, Globe, GraduationCap, GripVertical, Heart, HelpCircle, Highlighter, Home, Image as Image$1, ImageIcon, ImagePlus, Instagram, Italic, Languages, Layers, Layout, Library, Lightbulb, Link, Link2, Linkedin, List, ListOrdered, Loader2, Mail, MapPin, Medal, MessageSquare, MessagesSquare, Minimize2, Music, PaintBucket, Palette, PanelLeft, PanelRightClose, PanelRightOpen, PanelsLeftBottom, Pencil, Phone, Plus, PlusCircle, Redo, Rocket, School, Search, Send, Settings, Settings2, Share2, ShieldAlert, ShieldCheck, Smartphone, SpaceIcon, Sparkles, SpellCheck2, Star, Target, Terminal, ThumbsUp, Trash2, Trophy, Twitter, Type, Underline, Undo, Unlink, Upload, User, Wallet, Wand2, X, XCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import { cva } from "class-variance-authority";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import TurndownService from "turndown";
import Mark from "mark.js";
import debounce from "lodash/debounce.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { HexColorPicker } from "react-colorful";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Drawer } from "vaul";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ListKit } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline$1 from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Link$1 from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { Extension } from "@tiptap/core";
import { Streamdown } from "streamdown";
import { createMarkdownExit } from "markdown-exit";
import { DateInput } from "@heroui/date-input";
import { parseDate } from "@internationalized/date";
import throttle from "lodash/throttle.js";
import * as ResizablePrimitive from "react-resizable-panels";
import { PanelResizeHandle } from "react-resizable-panels";
//#region src/utils/markdown.ts
var HTML_TAG_REGEX = /<\/?[a-z][\s\S]*>/i;
var DATA_URL_REGEX = /^data:/i;
var DEFAULT_BASIC_SECTION_TITLES = {
	basic: "Basic Info",
	skills: "Skills",
	experience: "Experience",
	projects: "Projects",
	education: "Education",
	selfEvaluation: "Self Evaluation",
	certificates: "Certificates"
};
var BASIC_FIELD_KEYS = new Set([
	"name",
	"title",
	"employementStatus",
	"birthDate",
	"email",
	"phone",
	"location"
]);
var DEFAULT_BASIC_FIELD_LABELS = {
	name: "Name",
	title: "Title",
	employementStatus: "Employment Status",
	birthDate: "Birth Date",
	email: "Email",
	phone: "Phone",
	location: "Location"
};
var normalizeText = (value) => value?.trim() || "";
var normalizeDateRangeText = (value) => normalizeText(value).split(/\s+-\s*/).map((part) => part.trim()).filter(Boolean).join(" - ");
var createTurndownService = () => new TurndownService({
	headingStyle: "atx",
	bulletListMarker: "-"
});
var markdownFromText = (value) => {
	const normalized = normalizeText(value);
	if (!normalized) return "";
	if (!HTML_TAG_REGEX.test(normalized)) return normalized;
	return createTurndownService().turndown(normalized).trim();
};
var normalizeMarkdown = (content) => content.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
var pickBasicFieldValue = (basic, key) => normalizeText(basic[key] || "");
var getOrderedEnabledSections = (resume) => {
	const enabledSections = (resume.menuSections || []).filter((section) => section.enabled).sort((a, b) => a.order - b.order);
	if (enabledSections.length > 0) return enabledSections;
	return [
		{
			id: "basic",
			title: DEFAULT_BASIC_SECTION_TITLES.basic,
			icon: "",
			enabled: true,
			order: 0
		},
		{
			id: "skills",
			title: DEFAULT_BASIC_SECTION_TITLES.skills,
			icon: "",
			enabled: true,
			order: 1
		},
		{
			id: "experience",
			title: DEFAULT_BASIC_SECTION_TITLES.experience,
			icon: "",
			enabled: true,
			order: 2
		},
		{
			id: "projects",
			title: DEFAULT_BASIC_SECTION_TITLES.projects,
			icon: "",
			enabled: true,
			order: 3
		},
		{
			id: "education",
			title: DEFAULT_BASIC_SECTION_TITLES.education,
			icon: "",
			enabled: true,
			order: 4
		},
		{
			id: "selfEvaluation",
			title: DEFAULT_BASIC_SECTION_TITLES.selfEvaluation,
			icon: "",
			enabled: true,
			order: 5
		},
		{
			id: "certificates",
			title: DEFAULT_BASIC_SECTION_TITLES.certificates,
			icon: "",
			enabled: true,
			order: 6
		}
	];
};
var renderBasicSection = (title, resume, options) => {
	const fieldOrder = resume.basic.fieldOrder?.length ? resume.basic.fieldOrder : DEFAULT_FIELD_ORDER;
	const lines = [];
	const name = pickBasicFieldValue(resume.basic, "name");
	const summaryTitle = pickBasicFieldValue(resume.basic, "title");
	if (name) lines.push(`### ${name}`);
	if (summaryTitle) lines.push(summaryTitle);
	for (const field of fieldOrder) {
		const key = field.key;
		if (!BASIC_FIELD_KEYS.has(key)) continue;
		if (field.visible === false) continue;
		if (key === "name" || key === "title") continue;
		const value = pickBasicFieldValue(resume.basic, key);
		if (!value) continue;
		const label = options?.basicFieldLabels?.[key] || normalizeText(field.label) || DEFAULT_BASIC_FIELD_LABELS[key];
		lines.push(`- ${label}: ${value}`);
	}
	const customFieldLines = (resume.basic.customFields || []).filter((field) => field.visible !== false).map((field) => {
		const displayText = normalizeText(getCustomFieldDisplayText(field));
		if (!displayText) return "";
		const href = getCustomFieldHref(field);
		const normalizedLabel = normalizeText(field.label);
		const showPrefix = shouldShowCustomFieldLabelPrefix(field) && normalizedLabel;
		const markdownValue = href ? `[${displayText}](${href})` : displayText;
		return showPrefix ? `- ${normalizedLabel}: ${markdownValue}` : `- ${markdownValue}`;
	}).filter(Boolean);
	const sectionBlocks = [...lines, ...customFieldLines];
	if (sectionBlocks.length === 0) return "";
	return `## ${title}\n\n${sectionBlocks.join("\n")}`;
};
var renderSkillsSection = (title, resume) => {
	const content = markdownFromText(resume.skillContent);
	if (!content) return "";
	return `## ${title}\n\n${content}`;
};
var renderSelfEvaluationSection = (title, resume) => {
	const content = markdownFromText(resume.selfEvaluationContent);
	if (!content) return "";
	return `## ${title}\n\n${content}`;
};
var renderExperienceSection = (title, resume) => {
	const blocks = resume.experience.filter((item) => item.visible).map((item) => {
		const heading = [normalizeText(item.company), normalizeText(item.position)].filter(Boolean).join(" | ");
		const date = normalizeDateRangeText(item.date);
		const details = markdownFromText(item.details);
		const lines = [];
		if (heading) lines.push(`### ${heading}`);
		if (date) lines.push(`_${date}_`);
		if (details) lines.push(details);
		return lines.join("\n\n");
	}).filter(Boolean);
	if (blocks.length === 0) return "";
	return `## ${title}\n\n${blocks.join("\n\n")}`;
};
var renderProjectSection = (title, resume) => {
	const blocks = resume.projects.filter((item) => item.visible).map((item) => {
		const heading = normalizeText(item.name);
		const meta = [normalizeText(item.role), normalizeDateRangeText(item.date)].filter(Boolean).join(" | ");
		const description = markdownFromText(item.description);
		const linkMeta = getProjectLinkMeta(item, { preferFullUrl: true });
		const lines = [];
		if (heading) lines.push(`### ${heading}`);
		if (meta) lines.push(`_${meta}_`);
		if (description) lines.push(description);
		if (linkMeta?.href) lines.push(`[${normalizeText(linkMeta.label) || linkMeta.href}](${linkMeta.href})`);
		return lines.join("\n\n");
	}).filter(Boolean);
	if (blocks.length === 0) return "";
	return `## ${title}\n\n${blocks.join("\n\n")}`;
};
var renderEducationSection = (title, resume) => {
	const blocks = resume.education.filter((item) => item.visible).map((item) => {
		const heading = [normalizeText(item.school), normalizeText(item.major)].filter(Boolean).join(" | ");
		const duration = [normalizeText(item.startDate), normalizeText(item.endDate)].filter(Boolean).join(" - ");
		const metadata = [
			normalizeText(item.degree),
			duration,
			item.gpa ? `GPA: ${normalizeText(item.gpa)}` : ""
		].filter(Boolean).join(" | ");
		const description = markdownFromText(item.description);
		const lines = [];
		if (heading) lines.push(`### ${heading}`);
		if (metadata) lines.push(`_${metadata}_`);
		if (description) lines.push(description);
		return lines.join("\n\n");
	}).filter(Boolean);
	if (blocks.length === 0) return "";
	return `## ${title}\n\n${blocks.join("\n\n")}`;
};
var renderCertificateSection = (title, resume) => {
	const lines = resume.certificates.map((certificate, index) => {
		const url = normalizeText(certificate.url);
		if (!url) return "";
		if (DATA_URL_REGEX.test(url)) return `- Certificate ${index + 1} (embedded image omitted)`;
		return `- ![Certificate ${index + 1}](${url})`;
	}).filter(Boolean);
	if (lines.length === 0) return "";
	return `## ${title}\n\n${lines.join("\n")}`;
};
var renderCustomSection = (title, items) => {
	const blocks = items.filter((item) => item.visible).map((item, index) => {
		const heading = normalizeText(item.title) || normalizeText(item.subtitle) || `Item ${index + 1}`;
		const subtitle = normalizeText(item.subtitle);
		const dateRange = normalizeDateRangeText(item.dateRange);
		const details = markdownFromText(item.description);
		const metadata = [subtitle !== heading ? subtitle : "", dateRange].filter(Boolean).join(" | ");
		const lines = [];
		if (heading) lines.push(`### ${heading}`);
		if (metadata) lines.push(`_${metadata}_`);
		if (details) lines.push(details);
		return lines.join("\n\n");
	}).filter(Boolean);
	if (blocks.length === 0) return "";
	return `## ${title}\n\n${blocks.join("\n\n")}`;
};
var generateResumeMarkdown = (resume, options) => {
	const topTitle = normalizeText(resume.title) || "Resume";
	const sections = getOrderedEnabledSections(resume);
	const blocks = [`# ${topTitle}`];
	for (const section of sections) {
		const sectionTitle = normalizeText(section.title) || section.id;
		let content = "";
		switch (section.id) {
			case "basic":
				content = renderBasicSection(sectionTitle, resume, options);
				break;
			case "skills":
				content = renderSkillsSection(sectionTitle, resume);
				break;
			case "experience":
				content = renderExperienceSection(sectionTitle, resume);
				break;
			case "projects":
				content = renderProjectSection(sectionTitle, resume);
				break;
			case "education":
				content = renderEducationSection(sectionTitle, resume);
				break;
			case "selfEvaluation":
				content = renderSelfEvaluationSection(sectionTitle, resume);
				break;
			case "certificates":
				content = renderCertificateSection(sectionTitle, resume);
				break;
			default:
				content = renderCustomSection(sectionTitle, resume.customData?.[section.id] || []);
				break;
		}
		if (content) blocks.push(content);
	}
	return normalizeMarkdown(blocks.join("\n\n"));
};
//#endregion
//#region src/utils/export.ts
var INVALID_FILE_NAME_CHAR_REGEX = /[\\/:*?"<>|]/g;
var getSafeFileName = (title) => {
	return (title || "resume").trim().replace(INVALID_FILE_NAME_CHAR_REGEX, "_").replace(/\s+/g, " ") || "resume";
};
var downloadBlob = (blob, fileName) => {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	link.click();
	window.URL.revokeObjectURL(url);
};
var downloadTextFile = (content, fileName, mimeType) => {
	downloadBlob(new Blob([content], { type: mimeType }), fileName);
};
var getOptimizedStyles = () => {
	const styleCache = /* @__PURE__ */ new Map();
	const startTime = performance.now();
	const styles = Array.from(document.styleSheets).map((sheet) => {
		try {
			return Array.from(sheet.cssRules).filter((rule) => {
				const ruleText = rule.cssText;
				const normalizedRuleText = ruleText.toLowerCase();
				if (styleCache.has(ruleText)) return false;
				styleCache.set(ruleText, true);
				if (rule instanceof CSSFontFaceRule) return false;
				if (rule instanceof CSSImportRule) return false;
				if (normalizedRuleText.includes("fonts.googleapis.com")) return false;
				if (normalizedRuleText.includes("fonts.gstatic.com")) return false;
				if (ruleText.includes("font-family")) return false;
				if (ruleText.includes("@keyframes")) return false;
				if (ruleText.includes("animation")) return false;
				if (ruleText.includes("transition")) return false;
				if (ruleText.includes("hover")) return false;
				return true;
			}).map((rule) => rule.cssText).join("\n");
		} catch (e) {
			console.warn("Style processing error:", e);
			return "";
		}
	}).join("\n");
	console.log(`Style processing took ${performance.now() - startTime}ms`);
	return styles;
};
var optimizeImages = async (element) => {
	const startTime = performance.now();
	const images = element.getElementsByTagName("img");
	const imagePromises = Array.from(images).filter((img) => !img.src.startsWith("data:")).map(async (img) => {
		try {
			const blob = await (await fetch(img.src)).blob();
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					img.src = reader.result;
					resolve();
				};
				reader.readAsDataURL(blob);
			});
		} catch (error) {
			console.error("Image conversion error:", error);
			return Promise.resolve();
		}
	});
	await Promise.all(imagePromises);
	console.log(`Image processing took ${performance.now() - startTime}ms`);
};
var exportResumeAsJson = ({ resume, title, onStart, onEnd, onSuccess, onError, successMessage, errorMessage }) => {
	onStart?.();
	try {
		if (!resume) throw new Error("No active resume");
		downloadTextFile(JSON.stringify(resume, null, 2), `${getSafeFileName(title || resume.title)}.json`, "application/json;charset=utf-8");
		if (successMessage) toast.success(successMessage);
		onSuccess?.();
	} catch (error) {
		console.error("JSON export error:", error);
		if (errorMessage) toast.error(errorMessage);
		onError?.();
	} finally {
		onEnd?.();
	}
};
var exportResumeAsMarkdown = ({ resume, title, onStart, onEnd, onSuccess, onError, successMessage, errorMessage, markdownOptions }) => {
	onStart?.();
	try {
		if (!resume) throw new Error("No active resume");
		downloadTextFile(generateResumeMarkdown(resume, markdownOptions), `${getSafeFileName(title || resume.title)}.md`, "text/markdown;charset=utf-8");
		if (successMessage) toast.success(successMessage);
		onSuccess?.();
	} catch (error) {
		console.error("Markdown export error:", error);
		if (errorMessage) toast.error(errorMessage);
		onError?.();
	} finally {
		onEnd?.();
	}
};
var exportToPdf = async ({ elementId, title, pagePadding, fontFamily, onStart, onEnd, onSuccess, onError, successMessage, errorMessage }) => {
	const exportStartTime = performance.now();
	onStart?.();
	try {
		const pdfElement = document.querySelector(`#${elementId}`);
		if (!pdfElement) throw new Error(`PDF element #${elementId} not found`);
		const clonedElement = pdfElement.cloneNode(true);
		const selectedFontFamily = normalizeFontFamily(fontFamily);
		const scaleMatch = (clonedElement.style.transform || "").match(/scale\(([\d.]+)\)/);
		if (scaleMatch) {
			const scale = Number(scaleMatch[1]);
			if (Number.isFinite(scale) && scale > 0 && scale < 1) {
				clonedElement.style.removeProperty("transform");
				clonedElement.style.removeProperty("transform-origin");
				clonedElement.style.setProperty("width", "100%", "important");
				clonedElement.style.setProperty("zoom", String(scale));
			}
		}
		clonedElement.style.setProperty("width", "100%", "important");
		clonedElement.style.setProperty("padding", "0", "important");
		clonedElement.style.setProperty("box-sizing", "border-box");
		clonedElement.style.setProperty("font-family", selectedFontFamily, "important");
		clonedElement.querySelectorAll(".page-break-line").forEach((line) => {
			line.style.display = "none";
		});
		const [capturedStyles] = await Promise.all([getOptimizedStyles(), optimizeImages(clonedElement)]);
		const styles = `
      ${capturedStyles}
      html, body { background: white !important; background-color: white !important; }
      html, body, #${elementId} {
        background: white !important;
        background-color: white !important;
        font-family: ${selectedFontFamily} !important;
      }
    `;
		const response = await fetch(PDF_EXPORT_CONFIG.SERVER_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: clonedElement.outerHTML,
				styles,
				margin: pagePadding
			}),
			mode: "cors",
			signal: AbortSignal.timeout(PDF_EXPORT_CONFIG.TIMEOUT)
		});
		if (!response.ok) throw new Error(`PDF generation failed: ${response.status}`);
		downloadBlob(await response.blob(), `${getSafeFileName(title)}.pdf`);
		if (successMessage) toast.success(successMessage);
		console.log(`Total export took ${performance.now() - exportStartTime}ms`);
		onSuccess?.();
	} catch (error) {
		console.error("Export error:", error);
		if (errorMessage) toast.error(errorMessage);
		onError?.();
	} finally {
		onEnd?.();
	}
};
//#endregion
//#region src/utils/print.ts
var exportResumeToBrowserPrint = async (resumeContent, pagePadding, fontFamily) => {
	const printFrame = document.createElement("iframe");
	printFrame.style.position = "absolute";
	printFrame.style.width = "1px";
	printFrame.style.height = "1px";
	printFrame.style.left = "-9999px";
	printFrame.style.top = "0";
	printFrame.style.visibility = "hidden";
	printFrame.style.zIndex = "-1";
	document.body.appendChild(printFrame);
	const iframeWindow = printFrame.contentWindow;
	if (!iframeWindow) {
		console.error("IFrame window not found");
		document.body.removeChild(printFrame);
		return;
	}
	try {
		iframeWindow.document.open();
		const clonedContent = resumeContent.cloneNode(true);
		const selectedFontFamily = normalizeFontFamily(fontFamily);
		const match = (clonedContent.style.transform || "").match(/scale\(([\d.]+)\)/);
		if (match) {
			const scale = Number(match[1]);
			if (Number.isFinite(scale) && scale > 0 && scale < 1) {
				clonedContent.style.removeProperty("transform");
				clonedContent.style.removeProperty("transform-origin");
				clonedContent.style.setProperty("width", "100%");
				clonedContent.style.setProperty("zoom", String(scale));
			}
		}
		clonedContent.style.setProperty("font-family", selectedFontFamily, "important");
		const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Resume</title>
          <style>
            ${await getFontFaceCss(selectedFontFamily)}

            @page {
              size: A4;
              margin: 0;
              padding: 0;
            }
            * {
              box-sizing: border-box;
            }
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              background: white !important;
              height: auto !important;
              overflow: visible !important;
            }
            body {
              font-family: ${selectedFontFamily};
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            #resume-preview {
              margin: 0 !important;
              padding: ${pagePadding}px !important;
              -webkit-box-decoration-break: clone;
              box-decoration-break: clone;
              font-family: ${selectedFontFamily} !important;
              background: white !important;
            }

            #print-content {
              width: 210mm;
              margin: 0 auto;
              padding: 0;
              background: white;
              box-shadow: none;
            }
            #print-content * {
              box-shadow: none !important;
            }

            #resume-preview .min-h-screen,
            #resume-preview .min-h-full,
            #resume-preview [style*="min-height"] {
              min-height: 0 !important;
            }
            
            .page-break-line {
              display: none;
            }

            ${Array.from(document.styleSheets).map((sheet) => {
			try {
				return Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
			} catch (e) {
				console.warn("Could not copy styles from sheet:", e);
				return "";
			}
		}).join("\n")}
          </style>
        </head>
        <body>
          <div id="print-content">
            ${clonedContent.outerHTML}
          </div>
        </body>
      </html>
    `;
		iframeWindow.document.write(htmlContent);
		iframeWindow.document.close();
		const printWhenReady = async () => {
			try {
				const doc = iframeWindow.document;
				if (doc.fonts?.ready) await doc.fonts.ready;
				const images = Array.from(doc.images);
				await Promise.all(images.filter((img) => !img.complete).map((img) => new Promise((resolve) => {
					img.onload = () => resolve();
					img.onerror = () => resolve();
				})));
				await new Promise((resolve) => {
					iframeWindow.requestAnimationFrame(() => {
						iframeWindow.requestAnimationFrame(() => resolve());
					});
				});
				iframeWindow.focus();
				iframeWindow.print();
				setTimeout(() => {
					if (document.body.contains(printFrame)) document.body.removeChild(printFrame);
				}, 1e3);
			} catch (error) {
				console.error("Error print:", error);
				if (document.body.contains(printFrame)) document.body.removeChild(printFrame);
			}
		};
		printWhenReady();
	} catch (error) {
		console.error("Error setting up print:", error);
		if (document.body.contains(printFrame)) document.body.removeChild(printFrame);
	}
};
//#endregion
//#region src/components/shared/GlassIcons.tsx
var PdfGlassIcon = ({ className, isLoading }) => /* @__PURE__ */ jsxs("svg", {
	viewBox: "0 0 100 100",
	fill: "none",
	className,
	children: [
		/* @__PURE__ */ jsxs("defs", { children: [
			/* @__PURE__ */ jsx("filter", {
				id: "pdf-glow",
				children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "8" })
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "pdf-glass",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.7"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.1"
				})]
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "pdf-border",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.9"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.2"
				})]
			})
		] }),
		/* @__PURE__ */ jsx("rect", {
			x: "25",
			y: "25",
			width: "45",
			height: "55",
			rx: "8",
			fill: "#f43f5e",
			filter: "url(#pdf-glow)",
			opacity: "0.75"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "25",
			y: "25",
			width: "45",
			height: "55",
			rx: "8",
			fill: "#e11d48"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "15",
			y: "15",
			width: "55",
			height: "65",
			rx: "10",
			fill: "url(#pdf-glass)",
			stroke: "url(#pdf-border)",
			strokeWidth: "1.5"
		}),
		/* @__PURE__ */ jsx("text", {
			x: "42.5",
			y: "48",
			fill: "#ffffff",
			fontSize: "16",
			fontWeight: "900",
			fontFamily: "sans-serif",
			textAnchor: "middle",
			opacity: "0.95",
			style: { letterSpacing: "2px" },
			children: "PDF"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M70 15 L70 30 C70 33 67 36 64 36 L49 36",
			stroke: "url(#pdf-border)",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			fill: "none",
			opacity: "0.6"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "30",
			y: "60",
			width: isLoading ? "0" : "25",
			height: "4",
			rx: "2",
			fill: "#ffffff",
			opacity: isLoading ? "1" : "0.8",
			children: isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "width",
				values: "5;30;5",
				dur: "1.2s",
				repeatCount: "indefinite"
			})
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "30",
			y: "68",
			width: isLoading ? "15" : "15",
			height: "4",
			rx: "2",
			fill: "#ffffff",
			opacity: isLoading ? "1" : "0.5",
			children: isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "width",
				values: "20;5;20",
				dur: "1.2s",
				repeatCount: "indefinite"
			})
		})
	]
});
var PrintGlassIcon = ({ className, isLoading }) => /* @__PURE__ */ jsxs("svg", {
	viewBox: "0 0 100 100",
	fill: "none",
	className,
	children: [
		/* @__PURE__ */ jsxs("defs", { children: [
			/* @__PURE__ */ jsx("filter", {
				id: "pr-glow",
				children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "8" })
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "pr-glass",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.6"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.1"
				})]
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "pr-border",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.8"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.2"
				})]
			})
		] }),
		/* @__PURE__ */ jsx("ellipse", {
			cx: "50",
			cy: "55",
			rx: "35",
			ry: "20",
			fill: "#0ea5e9",
			filter: "url(#pr-glow)",
			opacity: "0.6"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "15",
			y: "45",
			width: "70",
			height: "30",
			rx: "8",
			fill: "#0284c7"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M15 55 L85 55",
			stroke: "#38bdf8",
			strokeWidth: "3",
			opacity: "0.4"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "25",
			y: "15",
			width: "50",
			height: "45",
			rx: "6",
			fill: "url(#pr-glass)",
			stroke: "url(#pr-border)",
			strokeWidth: "1.5"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "35",
			y: "28",
			width: isLoading ? "0" : "30",
			height: "4",
			rx: "2",
			fill: "#ffffff",
			opacity: "0.8",
			children: isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "width",
				values: "10;30;10",
				dur: "1s",
				repeatCount: "indefinite"
			})
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "35",
			y: "38",
			width: isLoading ? "20" : "20",
			height: "4",
			rx: "2",
			fill: "#ffffff",
			opacity: "0.5",
			children: isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "width",
				values: "20;10;20",
				dur: "1s",
				repeatCount: "indefinite"
			})
		})
	]
});
var JsonGlassIcon = ({ className, isLoading }) => /* @__PURE__ */ jsxs("svg", {
	viewBox: "0 0 100 100",
	fill: "none",
	className,
	children: [
		/* @__PURE__ */ jsxs("defs", { children: [
			/* @__PURE__ */ jsx("filter", {
				id: "js-glow",
				children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "10" })
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "js-glass",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.6"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.1"
				})]
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "js-border",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.8"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.1"
				})]
			})
		] }),
		/* @__PURE__ */ jsx("rect", {
			x: "25",
			y: "20",
			width: "50",
			height: "50",
			rx: "12",
			fill: "#f59e0b",
			filter: "url(#js-glow)",
			opacity: "0.6"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "30",
			y: "25",
			width: "45",
			height: "45",
			rx: "10",
			fill: "#d97706"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "15",
			y: "15",
			width: "55",
			height: "55",
			rx: "12",
			fill: "url(#js-glass)",
			stroke: "url(#js-border)",
			strokeWidth: "1.5"
		}),
		/* @__PURE__ */ jsxs("text", {
			x: "42.5",
			y: "52",
			fill: "#ffffff",
			fontSize: "24",
			fontWeight: "900",
			fontFamily: "monospace",
			textAnchor: "middle",
			children: [`{`, isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "opacity",
				values: "1;0.2;1",
				dur: "1.5s",
				repeatCount: "indefinite"
			})]
		}),
		/* @__PURE__ */ jsxs("text", {
			x: "58",
			y: "52",
			fill: "#ffffff",
			fontSize: "24",
			fontWeight: "900",
			fontFamily: "monospace",
			textAnchor: "middle",
			opacity: "0.4",
			children: [`}`, isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "opacity",
				values: "0.2;1;0.2",
				dur: "1.5s",
				repeatCount: "indefinite"
			})]
		}),
		/* @__PURE__ */ jsx("text", {
			x: "42.5",
			y: "64",
			fill: "#ffffff",
			fontSize: "10",
			fontWeight: "bold",
			fontFamily: "sans-serif",
			textAnchor: "middle",
			opacity: "0.9",
			children: "JSON"
		})
	]
});
var MarkdownGlassIcon = ({ className, isLoading }) => /* @__PURE__ */ jsxs("svg", {
	viewBox: "0 0 100 100",
	fill: "none",
	className,
	children: [
		/* @__PURE__ */ jsxs("defs", { children: [
			/* @__PURE__ */ jsx("filter", {
				id: "md-glow",
				children: /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "9" })
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "md-glass",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.5"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.05"
				})]
			}),
			/* @__PURE__ */ jsxs("linearGradient", {
				id: "md-border",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "#ffffff",
					stopOpacity: "0.8"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "#ffffff",
					stopOpacity: "0.1"
				})]
			})
		] }),
		/* @__PURE__ */ jsx("rect", {
			x: "15",
			y: "25",
			width: "60",
			height: "40",
			rx: "8",
			fill: "#6366f1",
			filter: "url(#md-glow)",
			opacity: "0.75"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "20",
			y: "30",
			width: "55",
			height: "40",
			rx: "8",
			fill: "#4f46e5"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "20",
			width: "65",
			height: "45",
			rx: "8",
			fill: "url(#md-glass)",
			stroke: "url(#md-border)",
			strokeWidth: "1.5"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M25 35 L25 50 M25 35 L33 43 L41 35 L41 50 M56 35 L56 50 M56 50 L49 43 M56 50 L63 43",
			stroke: "#ffffff",
			strokeWidth: "4",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: isLoading && /* @__PURE__ */ jsx("animate", {
				attributeName: "stroke-opacity",
				values: "1;0.3;1",
				dur: "1s",
				repeatCount: "indefinite"
			})
		})
	]
});
//#endregion
//#region src/components/shared/PdfExport.tsx
var ExportCard = ({ icon: Icon, title, description, onClick, isLoading, bgGradientClass, hoverBorderClass }) => {
	return /* @__PURE__ */ jsxs("div", {
		onClick: () => {
			if (!isLoading) onClick();
		},
		className: cn("group relative flex flex-col justify-center overflow-hidden p-6 pl-[136px] min-h-[130px] rounded-3xl border border-border/50 bg-card text-card-foreground shadow-sm transition-all duration-500", isLoading ? "opacity-70 cursor-not-allowed" : cn("cursor-pointer hover:shadow-2xl active:scale-[0.98] hover:-translate-y-1 hover:bg-muted/10", hoverBorderClass)),
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
			/* @__PURE__ */ jsx("div", { className: cn("absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-r to-transparent", isLoading ? "opacity-50" : "opacity-0 group-hover:opacity-100", bgGradientClass) }),
			/* @__PURE__ */ jsx("div", {
				className: cn("absolute left-6 top-1/2 -translate-y-1/2 w-24 h-24 transition-transform duration-500 will-change-transform drop-shadow-xl pointer-events-none", isLoading ? "-rotate-6 scale-[1.05] opacity-80" : "-rotate-6 group-hover:scale-[1.1] group-hover:-rotate-3"),
				children: /* @__PURE__ */ jsx(Icon, {
					className: "w-full h-full object-contain",
					isLoading
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex flex-col pointer-events-none",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-semibold text-[17px] mb-1.5 tracking-tight text-foreground/90 transition-colors",
					children: title
				}), /* @__PURE__ */ jsx("p", {
					className: "text-[13px] text-muted-foreground/75 leading-relaxed line-clamp-3 group-hover:text-muted-foreground/90 transition-colors",
					children: description
				})]
			})
		]
	});
};
var PdfExport = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isExporting, setIsExporting] = useState(false);
	const [isPrinting, setIsPrinting] = useState(false);
	const [isExportingJson, setIsExportingJson] = useState(false);
	const [isExportingMarkdown, setIsExportingMarkdown] = useState(false);
	const [exportResult, setExportResult] = useState(null);
	const { activeResume } = useResumeStore();
	const { globalSettings = {}, title } = activeResume || {};
	const t = useTranslations("pdfExport");
	const tBasicField = useTranslations("workbench.basicPanel.basicFields");
	const router = useRouter();
	const handleResultDialogClose = () => {
		setExportResult(null);
		setIsOpen(false);
		router.push("/app/dashboard/resumes");
	};
	const handleExport = async () => {
		await exportToPdf({
			elementId: "resume-preview",
			title: title || "resume",
			pagePadding: globalSettings?.pagePadding || 0,
			fontFamily: globalSettings?.fontFamily,
			onStart: () => setIsExporting(true),
			onEnd: () => setIsExporting(false),
			onSuccess: () => setExportResult({
				type: "success",
				message: t("toast.success")
			}),
			onError: () => setExportResult({
				type: "error",
				message: t("toast.error")
			})
		});
	};
	const handleJsonExport = () => {
		exportResumeAsJson({
			resume: activeResume,
			title,
			onStart: () => setIsExportingJson(true),
			onEnd: () => setIsExportingJson(false),
			onSuccess: () => setExportResult({
				type: "success",
				message: t("toast.jsonSuccess")
			}),
			onError: () => setExportResult({
				type: "error",
				message: t("toast.jsonError")
			})
		});
	};
	const handleMarkdownExport = () => {
		exportResumeAsMarkdown({
			resume: activeResume,
			title,
			onStart: () => setIsExportingMarkdown(true),
			onEnd: () => setIsExportingMarkdown(false),
			onSuccess: () => setExportResult({
				type: "success",
				message: t("toast.markdownSuccess")
			}),
			onError: () => setExportResult({
				type: "error",
				message: t("toast.markdownError")
			}),
			markdownOptions: { basicFieldLabels: {
				name: tBasicField("name"),
				title: tBasicField("title"),
				employementStatus: tBasicField("employementStatus"),
				birthDate: tBasicField("birthDate"),
				email: tBasicField("email"),
				phone: tBasicField("phone"),
				location: tBasicField("location")
			} }
		});
	};
	const handlePrint = async () => {
		const resumeContent = document.getElementById("resume-preview");
		if (!resumeContent) {
			console.error("Resume content not found");
			return;
		}
		try {
			setIsPrinting(true);
			await exportResumeToBrowserPrint(resumeContent, globalSettings?.pagePadding || 0, globalSettings?.fontFamily);
			setExportResult({
				type: "success",
				message: t("toast.success")
			});
		} catch (error) {
			console.error("Print error:", error);
			setExportResult({
				type: "error",
				message: t("toast.error")
			});
		} finally {
			setIsPrinting(false);
		}
	};
	const isLoading = isExporting || isExportingJson || isExportingMarkdown || isPrinting;
	const loadingText = isExporting ? t("button.exporting") : isExportingJson ? t("button.exportingJson") : isExportingMarkdown ? t("button.exportingMarkdown") : isPrinting ? t("button.exporting") : "";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Dialog, {
		open: isOpen,
		onOpenChange: (val) => {
			if (isLoading) return;
			setIsOpen(val);
		},
		children: [/* @__PURE__ */ jsx(DialogTrigger, {
			asChild: true,
			children: children ? children : /* @__PURE__ */ jsx(Button, {
				className: "px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
				disabled: isLoading,
				children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }), /* @__PURE__ */ jsx("span", { children: loadingText })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
					/* @__PURE__ */ jsx("span", { children: t("button.export") }),
					/* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5 opacity-60 ml-0.5" })
				] })
			})
		}), /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-4xl gap-0 p-0 sm:rounded-[2rem] border border-border/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-background overflow-hidden",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative p-8 pb-6 border-b border-border/40 bg-muted/10",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" }), /* @__PURE__ */ jsxs(DialogHeader, {
					className: "relative gap-2",
					children: [/* @__PURE__ */ jsx(DialogTitle, {
						className: "text-2xl font-bold tracking-tight",
						children: t("modal.title")
					}), /* @__PURE__ */ jsx(DialogDescription, {
						className: "text-[15px] text-muted-foreground/80 mt-1",
						children: t("modal.subtitle")
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-8 bg-background",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-5 relative",
					children: [
						/* @__PURE__ */ jsx(ExportCard, {
							icon: PdfGlassIcon,
							title: t("button.exportPdf"),
							description: t("modal.pdfDesc"),
							isLoading: isExporting,
							onClick: handleExport,
							bgGradientClass: "from-rose-500/10 dark:from-rose-500/20",
							hoverBorderClass: "hover:border-rose-500/40 hover:ring-1 hover:ring-rose-500/20"
						}),
						/* @__PURE__ */ jsx(ExportCard, {
							icon: PrintGlassIcon,
							title: t("button.print"),
							description: t("modal.printDesc"),
							isLoading: isPrinting,
							onClick: handlePrint,
							bgGradientClass: "from-sky-500/10 dark:from-sky-500/20",
							hoverBorderClass: "hover:border-sky-500/40 hover:ring-1 hover:ring-sky-500/20"
						}),
						/* @__PURE__ */ jsx(ExportCard, {
							icon: JsonGlassIcon,
							title: t("button.exportJson"),
							description: t("modal.jsonDesc"),
							isLoading: isExportingJson,
							onClick: handleJsonExport,
							bgGradientClass: "from-amber-500/10 dark:from-amber-500/20",
							hoverBorderClass: "hover:border-amber-500/40 hover:ring-1 hover:ring-amber-500/20"
						}),
						/* @__PURE__ */ jsx(ExportCard, {
							icon: MarkdownGlassIcon,
							title: t("button.exportMarkdown"),
							description: t("modal.markdownDesc"),
							isLoading: isExportingMarkdown,
							onClick: handleMarkdownExport,
							bgGradientClass: "from-indigo-500/10 dark:from-indigo-500/20",
							hoverBorderClass: "hover:border-indigo-500/40 hover:ring-1 hover:ring-indigo-500/20"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex items-center gap-2 p-3 sm:px-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
					children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ jsx("p", {
						className: "text-[13px] font-medium",
						children: t("modal.privacyNotice")
					})]
				})]
			})]
		})]
	}), /* @__PURE__ */ jsx(Dialog, {
		open: !!exportResult,
		onOpenChange: (val) => {
			if (!val) handleResultDialogClose();
		},
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: "max-w-md sm:rounded-2xl cursor-pointer",
			onClick: handleResultDialogClose,
			children: [/* @__PURE__ */ jsxs(DialogHeader, {
				className: "items-center gap-4 py-4",
				children: [
					exportResult?.type === "success" ? /* @__PURE__ */ jsx("div", {
						className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center",
						children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-10 h-10 text-emerald-500" })
					}) : /* @__PURE__ */ jsx("div", {
						className: "w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center",
						children: /* @__PURE__ */ jsx(XCircle, { className: "w-10 h-10 text-red-500" })
					}),
					/* @__PURE__ */ jsx(DialogTitle, {
						className: "text-xl font-bold text-center",
						children: exportResult?.type === "success" ? t("result.successTitle") : t("result.errorTitle")
					}),
					/* @__PURE__ */ jsx(DialogDescription, {
						className: "text-center text-muted-foreground",
						children: exportResult?.message
					})
				]
			}), /* @__PURE__ */ jsx("p", {
				className: "text-center text-sm text-muted-foreground/60 pb-2",
				children: t("result.clickToClose")
			})]
		})
	})] });
};
//#endregion
//#region src/store/useAIConfigStore.ts
var useAIConfigStore = create()(persist((set, get) => ({
	selectedModel: "doubao",
	doubaoApiKey: "",
	doubaoModelId: "",
	deepseekApiKey: "",
	deepseekModelId: "",
	openaiApiKey: "",
	openaiModelId: "",
	openaiApiEndpoint: "",
	geminiApiKey: "",
	geminiModelId: "gemini-flash-latest",
	ollamaApiEndpoint: "http://localhost:11434",
	ollamaModelId: "llama3",
	setSelectedModel: (model) => set({ selectedModel: model }),
	setDoubaoApiKey: (apiKey) => set({ doubaoApiKey: apiKey }),
	setDoubaoModelId: (modelId) => set({ doubaoModelId: modelId }),
	setDeepseekApiKey: (apiKey) => set({ deepseekApiKey: apiKey }),
	setDeepseekModelId: (modelId) => set({ deepseekModelId: modelId }),
	setOpenaiApiKey: (apiKey) => set({ openaiApiKey: apiKey }),
	setOpenaiModelId: (modelId) => set({ openaiModelId: modelId }),
	setOpenaiApiEndpoint: (endpoint) => set({ openaiApiEndpoint: endpoint }),
	setGeminiApiKey: (apiKey) => set({ geminiApiKey: apiKey }),
	setGeminiModelId: (modelId) => set({ geminiModelId: modelId }),
	setOllamaApiEndpoint: (endpoint) => set({ ollamaApiEndpoint: endpoint }),
	setOllamaModelId: (modelId) => set({ ollamaModelId: modelId }),
	isConfigured: () => {
		const state = get();
		return AI_MODEL_CONFIGS[state.selectedModel].validate(state);
	}
}), { name: "ai-config-storage" }));
//#endregion
//#region src/store/useGrammarStore.ts
var markSingleError = (marker, error, options) => {
	const keyword = (error.text || "").trim();
	if (!keyword) return;
	let hasMarked = false;
	marker.mark(keyword, {
		separateWordSearch: false,
		acrossElements: true,
		className: cn("grammar-error", error.type, options?.selected && options?.activeIndex !== void 0 && `active-${options.activeIndex}`),
		filter: () => {
			if (hasMarked) return false;
			hasMarked = true;
			return true;
		}
	});
};
var getPreviewScrollContainer = (element) => {
	const containers = Array.from(document.querySelectorAll("[data-preview-scroll-container=\"true\"]"));
	for (const container of containers) if (container.contains(element)) return container;
	let current = element.parentElement;
	while (current) {
		const style = window.getComputedStyle(current);
		if (/(auto|scroll)/.test(style.overflowY) && current.scrollHeight > current.clientHeight) return current;
		current = current.parentElement;
	}
	return null;
};
var useGrammarStore = create((set, get) => ({
	isChecking: false,
	errors: [],
	selectedErrorIndex: null,
	highlightKey: 0,
	setErrors: (errors) => set({ errors }),
	setIsChecking: (isChecking) => set({ isChecking }),
	setSelectedErrorIndex: (selectedErrorIndex) => set({ selectedErrorIndex }),
	incrementHighlightKey: () => set((state) => ({ highlightKey: state.highlightKey + 1 })),
	checkGrammar: async (text) => {
		const { selectedModel, doubaoApiKey, doubaoModelId, deepseekApiKey, deepseekModelId, openaiApiKey, openaiModelId, openaiApiEndpoint, geminiApiKey, geminiModelId, ollamaApiEndpoint, ollamaModelId } = useAIConfigStore.getState();
		const config = AI_MODEL_CONFIGS[selectedModel];
		const apiKey = selectedModel === "doubao" ? doubaoApiKey : selectedModel === "openai" ? openaiApiKey : selectedModel === "gemini" ? geminiApiKey : deepseekApiKey;
		const modelId = selectedModel === "doubao" ? doubaoModelId : selectedModel === "openai" ? openaiModelId : selectedModel === "gemini" ? geminiModelId : selectedModel === "ollama" ? ollamaModelId : deepseekModelId;
		const apiEndpoint = selectedModel === "openai" ? openaiApiEndpoint : selectedModel === "ollama" ? ollamaApiEndpoint : void 0;
		set({ isChecking: true });
		try {
			const response = await fetch("/api/grammar", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: text,
					apiKey,
					model: config.requiresModelId ? modelId : config.defaultModel,
					modelType: selectedModel,
					apiEndpoint
				})
			});
			if (!response.ok) throw new Error(`API request failed: ${response.status}`);
			const data = await response.json();
			if (data.error) {
				toast.error(data.error.message);
				throw new Error(data.error.message);
			}
			if (data.error?.code === "AuthenticationError") {
				toast.error("ApiKey 或 模型Id 不正确");
				throw new Error(data.error.message);
			}
			const aiResponse = selectedModel === "ollama" ? data.message?.content || data : data.choices[0]?.message?.content;
			try {
				const grammarErrors = typeof aiResponse === "string" ? JSON.parse(aiResponse) : aiResponse;
				if (grammarErrors.errors.length === 0) {
					set({ errors: [] });
					toast.success("无语法错误");
					return;
				}
				set({ errors: grammarErrors.errors });
				const preview = document.getElementById("resume-preview");
				if (preview) {
					const marker = new Mark(preview);
					marker.unmark();
					grammarErrors.errors.forEach((error) => {
						markSingleError(marker, error);
					});
				}
			} catch (parseError) {
				toast.error(`解析AI响应失败: ${parseError}`);
				set({ errors: [] });
			}
		} catch (error) {
			set({ errors: [] });
		} finally {
			set({ isChecking: false });
		}
	},
	clearErrors: () => {
		const preview = document.getElementById("resume-preview");
		if (preview) new Mark(preview).unmark();
		set({
			errors: [],
			selectedErrorIndex: null
		});
	},
	selectError: (index) => {
		const { errors } = get();
		if (!errors[index]) return;
		set({ selectedErrorIndex: index });
		const preview = document.getElementById("resume-preview");
		if (!preview) return;
		const marker = new Mark(preview);
		marker.unmark();
		errors.forEach((err, i) => {
			markSingleError(marker, err, {
				selected: i === index,
				activeIndex: index
			});
		});
		const selectedMark = preview.querySelectorAll("mark")[index];
		if (selectedMark) {
			const scrollContainer = getPreviewScrollContainer(selectedMark);
			if (scrollContainer) {
				const containerRect = scrollContainer.getBoundingClientRect();
				const markRect = selectedMark.getBoundingClientRect();
				const nextTop = scrollContainer.scrollTop + (markRect.top - containerRect.top) - scrollContainer.clientHeight / 2 + markRect.height / 2;
				const maxTop = Math.max(0, scrollContainer.scrollHeight - scrollContainer.clientHeight);
				scrollContainer.scrollTo({
					top: Math.max(0, Math.min(nextTop, maxTop)),
					behavior: "smooth"
				});
			}
		}
	},
	dismissError: (index) => {
		set((state) => {
			const newErrors = [...state.errors];
			newErrors.splice(index, 1);
			const preview = document.getElementById("resume-preview");
			if (preview) {
				const marker = new Mark(preview);
				marker.unmark();
				newErrors.forEach((error, i) => {
					markSingleError(marker, error, {
						selected: state.selectedErrorIndex === i,
						activeIndex: state.selectedErrorIndex ?? void 0
					});
				});
			}
			return {
				errors: newErrors,
				selectedErrorIndex: null
			};
		});
	}
}));
//#endregion
//#region src/hooks/useGrammarCheck.ts
var useGrammarCheck = () => {
	const { errors, isChecking, selectedErrorIndex, checkGrammar, clearErrors, selectError, dismissError } = useGrammarStore();
	return {
		errors,
		isChecking,
		selectedErrorIndex,
		checkGrammar,
		clearErrors,
		selectError,
		dismissError
	};
};
//#endregion
//#region src/components/ui/sheet-no-overlay.tsx
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-neutral-950", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 top-[64px] left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React$1.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsx(SheetPortal, { children: /* @__PURE__ */ jsx(SheetPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children
}) }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-neutral-950 dark:text-neutral-50", className),
	...props
}));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, {
	ref,
	className: cn("text-sm text-neutral-500 dark:text-neutral-400", className),
	...props
}));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/components/editor/grammar/GrammarCheckDrawer.tsx
function GrammarCheckDrawer() {
	const t = useTranslations("grammarCheck");
	const { errors, clearErrors, selectError, selectedErrorIndex, dismissError } = useGrammarCheck();
	const { activeResume, updateResume } = useResumeStore();
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		if (errors.length > 0) setIsOpen(true);
	}, [errors.length]);
	useEffect(() => {
		const handleOpenDrawer = () => setIsOpen(true);
		document.addEventListener("open-grammar-drawer", handleOpenDrawer);
		return () => {
			document.removeEventListener("open-grammar-drawer", handleOpenDrawer);
		};
	}, []);
	const handleOpenChange = (open) => {
		setIsOpen(open);
	};
	const handleAccept = (index) => {
		const error = errors[index];
		if (!error || !activeResume) return;
		const newResume = JSON.parse(JSON.stringify(activeResume));
		let replaced = false;
		const traverseAndReplace = (obj) => {
			for (const key in obj) if (typeof obj[key] === "string") {
				if (error.context && obj[key].includes(error.context)) {
					const originalContext = error.context;
					if (originalContext.includes(error.text)) {
						const correctedContext = originalContext.replace(error.text, error.suggestion);
						obj[key] = obj[key].replace(originalContext, correctedContext);
						replaced = true;
					}
				} else if (error.text && obj[key].includes(error.text) && error.text.length > 2) {
					obj[key] = obj[key].replace(error.text, error.suggestion);
					replaced = true;
				}
			} else if (typeof obj[key] === "object" && obj[key] !== null) traverseAndReplace(obj[key]);
		};
		traverseAndReplace(newResume);
		if (replaced) {
			updateResume(activeResume.id, newResume);
			dismissError(index);
			toast.success(t("applied_success"));
		} else toast.error(t("apply_error"));
	};
	const handleIgnore = (index) => {
		dismissError(index);
	};
	return /* @__PURE__ */ jsx(Sheet, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		modal: false,
		children: /* @__PURE__ */ jsxs(SheetContent, {
			side: "left",
			className: "w-[400px] sm:w-[450px] p-0 flex flex-col gap-0 border-r shadow-lg bg-muted/30 backdrop-blur-xl",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-6 pb-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "p-2 bg-primary/10 rounded-lg",
							children: /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SheetTitle, {
							className: "text-lg font-semibold",
							children: t("title")
						}), /* @__PURE__ */ jsx(SheetDescription, {
							className: "text-xs",
							children: t("description", { count: errors.length })
						})] })]
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-8 w-8 text-muted-foreground hover:text-foreground",
						onClick: () => {
							clearErrors();
							setIsOpen(false);
						},
						children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
					})]
				})
			}), /* @__PURE__ */ jsx(ScrollArea, {
				className: "flex-1 px-6 py-6 h-full",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-6 pb-20",
					children: [/* @__PURE__ */ jsx(AnimatePresence, {
						mode: "popLayout",
						children: errors.map((error, index) => /* @__PURE__ */ jsxs(motion.div, {
							layout: true,
							initial: {
								opacity: 0,
								y: 20,
								scale: .95
							},
							animate: {
								opacity: 1,
								y: 0,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .9,
								transition: { duration: .2 }
							},
							className: cn("group relative bg-card rounded-xl border border-border/50 shadow-sm transition-all duration-300 overflow-hidden", "hover:shadow-md hover:border-primary/20", selectedErrorIndex === index && "border-primary bg-primary/5 shadow-sm"),
							onClick: () => selectError(index),
							children: [/* @__PURE__ */ jsxs("div", {
								className: "px-4 py-3 border-b border-border/50 flex justify-between items-center bg-muted/20 rounded-t-xl",
								children: [/* @__PURE__ */ jsx(Badge, {
									variant: "secondary",
									className: cn("text-[10px] px-2 py-0.5 h-5 font-normal tracking-wide", error.type === "spelling" ? "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50" : "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50"),
									children: error.type === "spelling" ? t("spelling") : t("punctuation")
								}), error.reason && error.reason !== "错别字" && error.reason !== "标点符号" && /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-muted-foreground/70 italic max-w-[180px] truncate",
									children: error.reason
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-5 space-y-5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid gap-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1.5 group/original",
											children: [/* @__PURE__ */ jsx("div", {
												className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wider pl-1",
												children: t("original")
											}), /* @__PURE__ */ jsxs("div", {
												className: "p-3 rounded-lg bg-red-50/50 dark:bg-red-950/20 text-sm text-foreground/80 leading-relaxed border border-red-100/50 dark:border-red-900/30 transition-colors group-hover/original:bg-red-50 dark:group-hover/original:bg-red-950/30",
												children: [/* @__PURE__ */ jsx("span", {
													className: "line-through decoration-red-400/30 text-muted-foreground/80",
													children: error.context
												}), error.text && error.text !== error.context && /* @__PURE__ */ jsxs("div", {
													className: "mt-2 text-xs flex items-center gap-1.5 text-red-500/80 font-medium",
													children: [/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-red-400 inline-block" }), error.text]
												})]
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "flex justify-center -my-1 text-muted-foreground/20",
											children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 rotate-90" })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1.5 group/suggestion",
											children: [/* @__PURE__ */ jsx("div", {
												className: "text-[10px] font-medium text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider pl-1",
												children: t("suggestion")
											}), /* @__PURE__ */ jsx("div", {
												className: "p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 text-sm text-foreground leading-relaxed border border-emerald-100/50 dark:border-emerald-900/30 font-medium transition-colors group-hover/suggestion:bg-emerald-50 dark:group-hover/suggestion:bg-emerald-950/30",
												children: error.suggestion
											})]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-3 pt-1",
									children: [/* @__PURE__ */ jsxs(Button, {
										className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow transition-all",
										size: "sm",
										onClick: (e) => {
											e.stopPropagation();
											handleAccept(index);
										},
										children: [/* @__PURE__ */ jsx(Check, { className: "w-4 h-4 mr-2" }), t("accept")]
									}), /* @__PURE__ */ jsxs(Button, {
										variant: "outline",
										className: "flex-1 border-muted-foreground/20 text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-muted-foreground/30 transition-all",
										size: "sm",
										onClick: (e) => {
											e.stopPropagation();
											handleIgnore(index);
										},
										children: [/* @__PURE__ */ jsx(X, { className: "w-4 h-4 mr-2" }), t("ignore")]
									})]
								})]
							})]
						}, `${error.text}-${index}`))
					}), errors.length === 0 && /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center justify-center py-20 text-center px-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500",
								children: /* @__PURE__ */ jsx(Check, { className: "w-10 h-10 text-green-500 dark:text-green-400" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-semibold mb-2",
								children: t("no_errors_title")
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground max-w-[250px]",
								children: t("no_errors_desc")
							})
						]
					})]
				})
			})]
		})
	});
}
//#endregion
//#region src/components/editor/EditorHeader.tsx
function EditorHeader({ isMobile }) {
	const { activeResume, setActiveSection, updateResumeTitle } = useResumeStore();
	const { menuSections = [], activeSection } = activeResume || {};
	const { errors, selectError } = useGrammarCheck();
	const router = useRouter();
	const t = useTranslations();
	menuSections?.filter((section) => section.enabled).sort((a, b) => a.order - b.order);
	const [backupConfigured, setBackupConfigured] = useState(null);
	const [backupPath, setBackupPath] = useState("");
	useEffect(() => {
		const checkBackup = async () => {
			try {
				const handle = await getFileHandle("syncDirectory");
				const path = await getConfig("syncDirectoryPath");
				setBackupConfigured(!!handle);
				setBackupPath(path || "");
			} catch {
				setBackupConfigured(false);
			}
		};
		checkBackup();
	}, []);
	return /* @__PURE__ */ jsx(motion.header, {
		className: `h-16 border-b sticky top-0 z-10`,
		initial: { y: -100 },
		animate: { y: 0 },
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between px-6 h-full pr-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center space-x-4 scrollbar-hide",
				children: [
					/* @__PURE__ */ jsx(motion.div, {
						className: "flex items-center space-x-2 shrink-0 cursor-pointer",
						whileHover: { scale: 1.02 },
						whileTap: { scale: .98 },
						onClick: () => {
							router.push("/app/dashboard");
						},
						children: /* @__PURE__ */ jsx("span", {
							className: "text-lg font-semibold",
							children: t("common.title")
						})
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground/30 hidden md:inline-block font-light",
						children: "/"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative hidden md:flex items-center group",
						children: [/* @__PURE__ */ jsx(Input, {
							defaultValue: activeResume?.title || "",
							onBlur: (e) => {
								updateResumeTitle(e.target.value || "未命名简历");
							},
							className: "w-56 text-sm h-8 bg-muted/30 border-transparent hover:bg-muted/60 focus:bg-background transition-colors px-2.5 py-1 pr-8 shadow-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-border rounded-md font-medium text-foreground/90 hover:text-foreground",
							placeholder: "简历名称"
						}, activeResume?.id || "resume-title"), /* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5 absolute right-2.5 text-muted-foreground/40 pointer-events-none transition-colors group-hover:text-muted-foreground/80" })]
					}),
					backupConfigured !== null && /* @__PURE__ */ jsx(TooltipProvider, {
						delayDuration: 100,
						children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsx(motion.div, {
								className: `
                      hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer
                      text-xs font-medium transition-colors ml-2
                      ${backupConfigured ? "text-emerald-600/80 hover:bg-emerald-100/50 dark:text-emerald-500/80 dark:hover:bg-emerald-900/30" : "text-amber-600/80 hover:bg-amber-100/50 dark:text-amber-500/80 dark:hover:bg-amber-900/30"}
                    `,
								initial: {
									opacity: 0,
									x: -5
								},
								animate: {
									opacity: 1,
									x: 0
								},
								transition: {
									delay: .3,
									duration: .3
								},
								onClick: () => router.push("/app/dashboard/settings"),
								children: backupConfigured ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", { children: t("previewDock.backup.configured") })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(motion.div, {
									animate: { scale: [
										1,
										1.15,
										1
									] },
									transition: {
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut"
									},
									className: "relative",
									children: [/* @__PURE__ */ jsx(ShieldAlert, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" })]
								}), /* @__PURE__ */ jsx("span", { children: t("previewDock.backup.notConfigured") })] })
							})
						}), /* @__PURE__ */ jsx(TooltipContent, {
							side: "bottom",
							sideOffset: 8,
							className: "max-w-[240px]",
							children: backupConfigured ? /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-0.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-medium",
									children: t("previewDock.backup.configured")
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-muted-foreground truncate",
									children: backupPath
								})]
							}) : /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-0.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-medium",
									children: t("previewDock.backup.notConfigured")
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-muted-foreground",
									children: t("previewDock.backup.clickToConfigure")
								})]
							})
						})] })
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center space-x-3",
				children: [
					/* @__PURE__ */ jsx(GrammarCheckDrawer, {}),
					errors.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center space-x-1 cursor-pointer animate-pulse",
						onClick: () => document.dispatchEvent(new CustomEvent("open-grammar-drawer")),
						children: [/* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-500" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm text-red-500",
							children: t("grammarCheck.found_issues", { count: errors.length })
						})]
					}),
					/* @__PURE__ */ jsx(ThemeToggle, {}),
					/* @__PURE__ */ jsx("div", {
						className: "md:flex items-center ",
						children: /* @__PURE__ */ jsx(PdfExport, {})
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = React$1.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	className: cn("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/ui/slider.tsx
var Slider = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(SliderPrimitive.Root, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
		className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = SliderPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/switch.tsx
var Switch = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/components/editor/layout/LayoutItem.tsx
var LayoutItem = ({ item, isBasic = false, activeSection, setActiveSection, toggleSectionVisibility, updateMenuSections, menuSections }) => {
	const dragControls = useDragControls();
	const t = useTranslations("common");
	if (isBasic) return /* @__PURE__ */ jsx("div", {
		className: cn("rounded-lg group border mb-2", "bg-card border-border", "hover:border-primary/50 transition-colors", activeSection === item.id && "border-primary text-primary ring-1 ring-primary"),
		onClick: () => setActiveSection(item.id),
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center p-3 pl-[32px] space-x-3",
			children: [/* @__PURE__ */ jsx("span", {
				className: cn("text-lg  ml-[12px]", "text-muted-foreground group-hover:text-foreground transition-colors"),
				children: item.icon
			}), /* @__PURE__ */ jsx("span", {
				className: cn("text-sm flex-1 cursor-pointer"),
				children: item.title
			})]
		})
	});
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		id: item.id,
		value: item,
		dragListener: false,
		dragControls,
		className: cn("rounded-lg group border flex overflow-hidden ", "bg-card border-border", "hover:border-primary/50 transition-colors", activeSection === item.id && "border-primary text-primary ring-1 ring-primary"),
		whileHover: { scale: 1.01 },
		whileDrag: { scale: 1.02 },
		children: [/* @__PURE__ */ jsx("div", {
			onPointerDown: (event) => {
				dragControls.start(event);
			},
			className: cn("w-8 flex items-center justify-center  touch-none shrink-0", "border-border", "cursor-grab hover:bg-muted/50"),
			children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-4 h-4", "text-muted-foreground", "transform transition-transform group-hover:scale-110") })
		}), /* @__PURE__ */ jsx("div", {
			className: "flex select-none items-center p-3 space-x-3 flex-1  cursor-pointer",
			onClick: () => setActiveSection(item.id),
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-1 items-center",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: cn("text-lg mr-2", "text-muted-foreground group-hover:text-foreground transition-colors"),
						children: item.icon
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-sm flex-1",
						children: item.title
					}),
					/* @__PURE__ */ jsx(motion.button, {
						whileHover: { scale: 1.1 },
						whileTap: { scale: .9 },
						onClick: (e) => {
							e.stopPropagation();
							toggleSectionVisibility(item.id);
						},
						className: cn("p-1.5 rounded-md mr-2", "hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"),
						children: item.enabled ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
					}),
					/* @__PURE__ */ jsxs(AlertDialog, { children: [/* @__PURE__ */ jsx(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx(motion.button, {
							whileHover: { scale: 1.1 },
							whileTap: { scale: .9 },
							onClick: (e) => e.stopPropagation(),
							className: cn("p-1.5 rounded-md text-primary", "hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"),
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-red-400" })
						})
					}), /* @__PURE__ */ jsxs(AlertDialogContent, {
						onClick: (e) => e.stopPropagation(),
						children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
							t("delete"),
							" ",
							item.title
						] }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: t("deleteModuleConfirm") })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, {
							onClick: (e) => e.stopPropagation(),
							children: t("cancel")
						}), /* @__PURE__ */ jsx(AlertDialogAction, {
							onClick: (e) => {
								e.stopPropagation();
								updateMenuSections(menuSections.filter((section) => section.id !== item.id));
								setActiveSection(menuSections[menuSections.findIndex((s) => s.id === item.id) - 1].id);
							},
							className: "bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white shadow-sm border-0",
							children: t("confirm")
						})] })]
					})] })
				]
			})
		})]
	});
};
//#endregion
//#region src/components/editor/layout/LayoutSetting.tsx
var LayoutSetting = ({ menuSections, activeSection, setActiveSection, toggleSectionVisibility, updateMenuSections, reorderSections }) => {
	const basicSection = menuSections.find((item) => item.id === "basic");
	const draggableSections = menuSections.filter((item) => item.id !== "basic");
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-4  rounded-lg dark:bg-neutral-900/30",
		children: [basicSection && /* @__PURE__ */ jsx(LayoutItem, {
			item: basicSection,
			isBasic: true,
			activeSection,
			setActiveSection,
			toggleSectionVisibility,
			updateMenuSections,
			menuSections
		}), /* @__PURE__ */ jsx(Reorder.Group, {
			axis: "y",
			values: draggableSections,
			onReorder: (newOrder) => {
				reorderSections([...menuSections.filter((item) => item.id === "basic"), ...newOrder]);
			},
			className: "space-y-2",
			children: draggableSections.map((item) => /* @__PURE__ */ jsx(LayoutItem, {
				item,
				activeSection,
				setActiveSection,
				toggleSectionVisibility,
				updateMenuSections,
				menuSections
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/ui/popover.tsx
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React$1.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(PopoverPrimitive.Content, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
//#endregion
//#region src/lib/use-forwarded-ref.ts
function useForwardedRef(ref) {
	const innerRef = useRef(null);
	useEffect(() => {
		if (!ref) return;
		if (typeof ref === "function") ref(innerRef.current);
		else ref.current = innerRef.current;
	});
	return innerRef;
}
//#endregion
//#region src/components/ui/color-picker.tsx
var ColorPicker = forwardRef(({ disabled, value, onChange, onBlur, name, className, ...props }, forwardedRef) => {
	useForwardedRef(forwardedRef);
	const [open, setOpen] = useState(false);
	const parsedValue = useMemo(() => {
		return value || "#FFFFFF";
	}, [value]);
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				...props,
				disabled,
				className: cn("w-[40px] h-[40px] rounded-lg cursor-pointer overflow-hidden p-0 border-2 transition-all hover:scale-105", className),
				onClick: () => setOpen(true),
				style: {
					backgroundColor: parsedValue,
					...props.style
				},
				children: props.children || /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Pick a color"
				})
			})
		}), /* @__PURE__ */ jsxs(PopoverContent, {
			className: "w-auto p-3",
			children: [/* @__PURE__ */ jsx(HexColorPicker, {
				color: parsedValue,
				onChange
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-muted-foreground text-sm",
					children: "#"
				}), /* @__PURE__ */ jsx(Input, {
					maxLength: 7,
					onChange: (e) => {
						onChange(e.currentTarget.value.startsWith("#") ? e.currentTarget.value : `#${e.currentTarget.value}`);
					},
					value: parsedValue.replace("#", ""),
					className: "h-8"
				})]
			})]
		})]
	});
});
ColorPicker.displayName = "ColorPicker";
//#endregion
//#region src/config/modules.ts
var STANDARD_MODULES = {
	skills: {
		id: "skills",
		titleKey: "skills",
		icon: "⚡"
	},
	experience: {
		id: "experience",
		titleKey: "experience",
		icon: "💼"
	},
	projects: {
		id: "projects",
		titleKey: "projects",
		icon: "🚀"
	},
	education: {
		id: "education",
		titleKey: "education",
		icon: "🎓"
	},
	selfEvaluation: {
		id: "selfEvaluation",
		titleKey: "selfEvaluation",
		icon: "💬"
	},
	certificates: {
		id: "certificates",
		titleKey: "certificates",
		icon: "🏆"
	}
};
//#endregion
//#region src/components/editor/SidePanel.tsx
function SettingCard({ icon: Icon, title, action, children }) {
	return /* @__PURE__ */ jsxs(Card, {
		className: cn("border shadow-sm", "bg-card border-border shadow-sm"),
		children: [/* @__PURE__ */ jsxs(CardHeader, {
			className: "p-4 pb-0 flex flex-row items-center justify-between space-y-0",
			children: [/* @__PURE__ */ jsxs(CardTitle, {
				className: "flex items-center gap-2 text-base font-medium",
				children: [/* @__PURE__ */ jsx(Icon, { className: cn("w-4 h-4 text-muted-foreground") }), /* @__PURE__ */ jsx("span", {
					className: cn("text-foreground"),
					children: title
				})]
			}), action && /* @__PURE__ */ jsx("div", {
				className: "ml-auto",
				children: action
			})]
		}), /* @__PURE__ */ jsx(CardContent, {
			className: "p-4",
			children
		})]
	});
}
function SidePanel() {
	const { activeResume, setActiveSection, toggleSectionVisibility, updateGlobalSettings, updateMenuSections, setThemeColor, reorderSections, addCustomData } = useResumeStore();
	const { menuSections = [], globalSettings = {}, activeSection } = activeResume || {};
	const { themeColor = THEME_COLORS[0] } = globalSettings;
	const t = useTranslations("workbench.sidePanel");
	const currentTemplate = DEFAULT_TEMPLATES.find((t) => t.id === activeResume?.templateId);
	const availableModules = useMemo(() => {
		return currentTemplate?.availableSections?.map((id) => STANDARD_MODULES[id]).filter(Boolean) || [];
	}, [currentTemplate]);
	const filteredModules = useMemo(() => {
		const existingIds = new Set(menuSections.map((s) => s.id));
		return availableModules.filter((m) => !existingIds.has(m.id));
	}, [availableModules, menuSections]);
	const fontOptions = getFontOptions((key) => t(`typography.font.${key}`));
	const selectedFontFamily = normalizeFontFamily(globalSettings?.fontFamily);
	t("typography.lineHeight.normal"), t("typography.lineHeight.relaxed"), t("typography.lineHeight.loose");
	const debouncedSetColor = useMemo(() => debounce((value) => {
		setThemeColor(value);
	}, 100), []);
	const generateCustomSectionId = (menuSections) => {
		return `custom-${menuSections.filter((s) => s.id.startsWith("custom")).length + 1}`;
	};
	const handleCreateSection = () => {
		const sectionId = generateCustomSectionId(menuSections);
		const newSection = {
			id: sectionId,
			title: sectionId,
			icon: "➕",
			enabled: true,
			order: menuSections.length
		};
		updateMenuSections([...menuSections, newSection]);
		addCustomData(sectionId);
	};
	return /* @__PURE__ */ jsx(motion.div, {
		className: cn("w-[80]  overflow-y-auto", "bg-background border-border"),
		initial: {
			x: -100,
			opacity: 0
		},
		animate: {
			x: 0,
			opacity: 1
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "p-4 space-y-4",
			children: [
				/* @__PURE__ */ jsxs(SettingCard, {
					icon: Layout,
					title: t("layout.title"),
					children: [/* @__PURE__ */ jsx(LayoutSetting, {
						menuSections,
						activeSection: activeSection || "",
						setActiveSection,
						toggleSectionVisibility,
						updateMenuSections,
						reorderSections
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-2 py-4",
						children: /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(motion.button, {
								whileHover: { scale: 1.01 },
								whileTap: { scale: .9 },
								className: "flex justify-center w-full rounded-lg items-center gap-2 py-2 px-3 text-sm font-medium text-primary bg-primary/5 border border-dashed border-primary/20 hover:bg-primary/10 transition-colors",
								children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), t("layout.addCustomSection")]
							})
						}), /* @__PURE__ */ jsx(PopoverContent, {
							className: "w-[var(--radix-popover-trigger-width)] p-1",
							align: "center",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1",
								children: [
									filteredModules.map((section) => /* @__PURE__ */ jsxs("button", {
										onClick: () => {
											const newSection = {
												id: section.id,
												title: t(`layout.standardSections.${section.titleKey}`),
												icon: section.icon,
												enabled: true,
												order: menuSections.length
											};
											updateMenuSections([...menuSections, newSection]);
										},
										className: "flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-lg",
											children: section.icon
										}), /* @__PURE__ */ jsx("span", { children: t(`layout.standardSections.${section.titleKey}`) })]
									}, section.id)),
									filteredModules.length > 0 && /* @__PURE__ */ jsx("div", { className: "h-px bg-border my-1" }),
									/* @__PURE__ */ jsxs("button", {
										onClick: handleCreateSection,
										className: "flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors text-left text-muted-foreground italic",
										children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), t("layout.addCustomSectionOption")]
									})
								]
							})
						})] })
					})]
				}),
				/* @__PURE__ */ jsx(SettingCard, {
					icon: Palette,
					title: t("theme.title"),
					action: /* @__PURE__ */ jsxs(ColorPicker, {
						value: themeColor,
						onChange: (value) => debouncedSetColor(value),
						className: cn("h-7 w-auto px-3 py-0 rounded-full border shadow-none transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background", !THEME_COLORS.includes(themeColor) ? "border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/60" : "border-border text-muted-foreground bg-transparent hover:bg-accent/50 hover:text-foreground"),
						style: { backgroundColor: "transparent" },
						title: t("theme.custom"),
						children: [
							/* @__PURE__ */ jsx(Palette, { className: "w-3.5 h-3.5" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-medium",
								children: t("theme.custom")
							}),
							!THEME_COLORS.includes(themeColor) && /* @__PURE__ */ jsx("div", {
								className: "w-2.5 h-2.5 rounded-full ml-0.5 border border-primary/20 shadow-sm",
								style: { backgroundColor: themeColor }
							})
						]
					}),
					children: /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-2.5 pt-1",
						children: THEME_COLORS.map((presetTheme) => /* @__PURE__ */ jsx("button", {
							className: cn("relative group w-6 h-6 rounded-full overflow-hidden transition-all duration-200 focus:outline-none", themeColor === presetTheme ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "ring-1 ring-border hover:ring-primary/50 hover:scale-110"),
							onClick: () => setThemeColor(presetTheme),
							title: presetTheme,
							children: /* @__PURE__ */ jsx("div", {
								className: "absolute inset-0",
								style: { backgroundColor: presetTheme }
							})
						}, presetTheme))
					})
				}),
				/* @__PURE__ */ jsx(SettingCard, {
					icon: Type,
					title: t("typography.title"),
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsx(Label, {
										className: "text-muted-foreground",
										children: t("typography.font.title")
									}),
									/* @__PURE__ */ jsxs(Select, {
										value: selectedFontFamily,
										onValueChange: (value) => updateGlobalSettings?.({ fontFamily: value }),
										children: [/* @__PURE__ */ jsx(motion.div, {
											whileHover: { scale: 1.01 },
											whileTap: { scale: .99 },
											children: /* @__PURE__ */ jsx(SelectTrigger, {
												className: "border border-input bg-background transition-colors",
												children: /* @__PURE__ */ jsx(SelectValue, {})
											})
										}), /* @__PURE__ */ jsx(SelectContent, {
											className: cn("bg-popover border-border"),
											children: fontOptions.map((font) => /* @__PURE__ */ jsx(SelectItem, {
												value: font.value,
												className: "cursor-pointer transition-colors hover:bg-accent focus:bg-accent",
												children: font.label
											}, font.value))
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs leading-5 text-muted-foreground",
										children: t("typography.font.note")
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("typography.lineHeight.title")
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx(Slider, {
										value: [globalSettings?.lineHeight || 1.5],
										min: 1,
										max: 2,
										step: .1,
										onValueChange: ([value]) => updateGlobalSettings?.({ lineHeight: value })
									}), /* @__PURE__ */ jsx("span", {
										className: "min-w-[3ch] text-sm text-muted-foreground",
										children: globalSettings?.lineHeight
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("typography.baseFontSize.title")
								}), /* @__PURE__ */ jsxs(Select, {
									value: globalSettings?.baseFontSize?.toString(),
									onValueChange: (value) => updateGlobalSettings?.({ baseFontSize: parseInt(value) }),
									children: [/* @__PURE__ */ jsx(motion.div, {
										whileHover: { scale: 1.01 },
										whileTap: { scale: .99 },
										children: /* @__PURE__ */ jsx(SelectTrigger, {
											className: "border border-input bg-background transition-colors",
											children: /* @__PURE__ */ jsx(SelectValue, {})
										})
									}), /* @__PURE__ */ jsx(SelectContent, {
										className: cn("bg-popover border-border"),
										children: [
											12,
											13,
											14,
											15,
											16,
											18,
											20,
											24
										].map((size) => /* @__PURE__ */ jsxs(SelectItem, {
											value: size.toString(),
											className: "cursor-pointer transition-colors hover:bg-accent focus:bg-accent",
											children: [size, "px"]
										}, size))
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("typography.headerSize.title")
								}), /* @__PURE__ */ jsxs(Select, {
									value: globalSettings?.headerSize?.toString(),
									onValueChange: (value) => updateGlobalSettings?.({ headerSize: parseInt(value) }),
									children: [/* @__PURE__ */ jsx(motion.div, {
										whileHover: { scale: 1.01 },
										whileTap: { scale: .99 },
										children: /* @__PURE__ */ jsx(SelectTrigger, {
											className: "border border-input bg-background transition-colors",
											children: /* @__PURE__ */ jsx(SelectValue, {})
										})
									}), /* @__PURE__ */ jsx(SelectContent, {
										className: cn("bg-popover border-border"),
										children: [
											12,
											13,
											14,
											15,
											16,
											18,
											20,
											24
										].map((size) => /* @__PURE__ */ jsxs(SelectItem, {
											value: size.toString(),
											className: "cursor-pointer transition-colors hover:bg-accent focus:bg-accent",
											children: [size, "px"]
										}, size))
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("typography.subheaderSize.title")
								}), /* @__PURE__ */ jsxs(Select, {
									value: globalSettings?.subheaderSize?.toString(),
									onValueChange: (value) => updateGlobalSettings?.({ subheaderSize: parseInt(value) }),
									children: [/* @__PURE__ */ jsx(motion.div, {
										whileHover: { scale: 1.01 },
										whileTap: { scale: .99 },
										children: /* @__PURE__ */ jsx(SelectTrigger, {
											className: "border border-input bg-background transition-colors",
											children: /* @__PURE__ */ jsx(SelectValue, {})
										})
									}), /* @__PURE__ */ jsx(SelectContent, {
										className: cn("bg-popover border-border"),
										children: [
											12,
											13,
											14,
											15,
											16,
											18,
											20,
											24
										].map((size) => /* @__PURE__ */ jsxs(SelectItem, {
											value: size.toString(),
											className: "cursor-pointer transition-colors hover:bg-accent focus:bg-accent",
											children: [size, "px"]
										}, size))
									})]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(SettingCard, {
					icon: SpaceIcon,
					title: t("spacing.title"),
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("spacing.pagePadding.title")
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx(Slider, {
										value: [globalSettings?.pagePadding || 0],
										min: 0,
										max: 100,
										step: 1,
										onValueChange: ([value]) => updateGlobalSettings?.({ pagePadding: value }),
										className: "flex-1"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex h-8 w-20 overflow-hidden rounded-md border border-input",
											children: [/* @__PURE__ */ jsx(Input, {
												type: "number",
												min: 1,
												max: 100,
												step: 1,
												value: globalSettings?.pagePadding || 0,
												onChange: (e) => {
													const value = Number(e.target.value);
													if (!isNaN(value) && value >= 0 && value <= 100) updateGlobalSettings?.({ pagePadding: value });
												},
												className: "h-full w-12 border-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0 no-spinner"
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col border-l border-input",
												children: [/* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-4 w-8 items-center justify-center border-b border-input bg-transparent text-muted-foreground hover:bg-accent",
													onClick: () => {
														const currentValue = globalSettings?.pagePadding || 0;
														if (currentValue < 100) updateGlobalSettings?.({ pagePadding: currentValue + 1 });
													},
													children: [/* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "增加"
													}), /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" })
													})]
												}), /* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-4 w-8 items-center justify-center bg-transparent text-muted-foreground hover:bg-accent",
													onClick: () => {
														const currentValue = globalSettings?.pagePadding || 0;
														if (currentValue > 0) updateGlobalSettings?.({ pagePadding: currentValue - 1 });
													},
													children: [/* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "减少"
													}), /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
													})]
												})]
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "ml-1 text-sm text-muted-foreground",
											children: "px"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("spacing.sectionSpacing.title")
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx(Slider, {
										value: [globalSettings?.sectionSpacing || 0],
										min: 1,
										max: 100,
										step: 1,
										onValueChange: ([value]) => updateGlobalSettings?.({ sectionSpacing: value }),
										className: "flex-1"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex h-8 w-20 overflow-hidden rounded-md border border-input",
											children: [/* @__PURE__ */ jsx(Input, {
												type: "number",
												min: 1,
												max: 100,
												step: 1,
												value: globalSettings?.sectionSpacing || 0,
												onChange: (e) => {
													const value = Number(e.target.value);
													if (!isNaN(value) && value >= 1 && value <= 100) updateGlobalSettings?.({ sectionSpacing: value });
												},
												className: "h-full w-12 border-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0 no-spinner"
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col border-l border-input",
												children: [/* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-4 w-8 items-center justify-center border-b border-input bg-transparent text-muted-foreground hover:bg-accent",
													onClick: () => {
														const currentValue = globalSettings?.sectionSpacing || 0;
														if (currentValue < 100) updateGlobalSettings?.({ sectionSpacing: currentValue + 1 });
													},
													children: [/* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "增加"
													}), /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" })
													})]
												}), /* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-4 w-8 items-center justify-center bg-transparent text-muted-foreground hover:bg-accent",
													onClick: () => {
														const currentValue = globalSettings?.sectionSpacing || 0;
														if (currentValue > 1) updateGlobalSettings?.({ sectionSpacing: currentValue - 1 });
													},
													children: [/* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "减少"
													}), /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
													})]
												})]
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "ml-1 text-sm text-muted-foreground",
											children: "px"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("spacing.paragraphSpacing.title")
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx(Slider, {
										value: [globalSettings?.paragraphSpacing || 0],
										min: 1,
										max: 50,
										step: 1,
										onValueChange: ([value]) => updateGlobalSettings?.({ paragraphSpacing: value }),
										className: "flex-1"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex h-8 w-20 overflow-hidden rounded-md border border-input",
											children: [/* @__PURE__ */ jsx(Input, {
												type: "number",
												min: 1,
												max: 100,
												step: 1,
												value: globalSettings?.paragraphSpacing || 0,
												onChange: (e) => {
													const value = Number(e.target.value);
													if (!isNaN(value) && value >= 1) updateGlobalSettings?.({ paragraphSpacing: value });
												},
												className: "h-full w-12 border-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0 no-spinner"
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col border-l border-input",
												children: [/* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-4 w-8 items-center justify-center border-b border-input bg-transparent text-muted-foreground hover:bg-accent",
													onClick: () => {
														const currentValue = globalSettings?.paragraphSpacing || 0;
														if (currentValue < 100) updateGlobalSettings?.({ paragraphSpacing: currentValue + 1 });
													},
													children: [/* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "增加"
													}), /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" })
													})]
												}), /* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "flex h-4 w-8 items-center justify-center bg-transparent text-muted-foreground hover:bg-accent",
													onClick: () => {
														const currentValue = globalSettings?.paragraphSpacing || 0;
														if (currentValue > 1) updateGlobalSettings?.({ paragraphSpacing: currentValue - 1 });
													},
													children: [/* @__PURE__ */ jsx("span", {
														className: "sr-only",
														children: "减少"
													}), /* @__PURE__ */ jsx("svg", {
														xmlns: "http://www.w3.org/2000/svg",
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round",
														children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
													})]
												})]
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "ml-1 text-sm text-muted-foreground",
											children: "px"
										})]
									})]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(SettingCard, {
					icon: Zap,
					title: t("mode.title"),
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("mode.useIconMode.title")
								}), /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: /* @__PURE__ */ jsx(Switch, {
										checked: globalSettings.useIconMode,
										onCheckedChange: (checked) => updateGlobalSettings({ useIconMode: checked })
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("mode.centerSubtitle.title")
								}), /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: /* @__PURE__ */ jsx(Switch, {
										checked: globalSettings.centerSubtitle,
										onCheckedChange: (checked) => updateGlobalSettings({ centerSubtitle: checked })
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx(Label, {
									className: "text-muted-foreground",
									children: t("mode.flexibleHeaderLayout.title")
								}), /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: /* @__PURE__ */ jsx(Switch, {
										checked: globalSettings.flexibleHeaderLayout,
										onCheckedChange: (checked) => updateGlobalSettings({ flexibleHeaderLayout: checked })
									})
								})]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/utils/imageUtils.ts
/**
* 用Canvas调整图片尺寸和质量，返回压缩后的base64图片数据
*/
var compressImage = (file, maxWidth = 800, maxHeight = 800, quality = .7) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target?.result;
			img.onload = () => {
				let width = img.width;
				let height = img.height;
				if (width > height) {
					if (width > maxWidth) {
						height = Math.round(height * maxWidth / width);
						width = maxWidth;
					}
				} else if (height > maxHeight) {
					width = Math.round(width * maxHeight / height);
					height = maxHeight;
				}
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					reject(/* @__PURE__ */ new Error("无法创建Canvas上下文"));
					return;
				}
				ctx.drawImage(img, 0, 0, width, height);
				resolve(canvas.toDataURL(file.type || "image/jpeg", quality));
			};
			img.onerror = () => {
				reject(/* @__PURE__ */ new Error("图片加载失败"));
			};
		};
		reader.onerror = () => {
			reject(/* @__PURE__ */ new Error("文件读取失败"));
		};
	});
};
/**
* 估算base64图片数据的实际大小（字节）
* base64编码会将3字节的数据编码为4字节，所以实际大小约为base64字符串长度的3/4
*/
var estimateBase64Size = (base64String) => {
	const base64Data = base64String.split(",")[1] || base64String;
	return Math.round(base64Data.length * 3 / 4);
};
//#endregion
//#region src/components/ui/drawer.tsx
var Drawer$1 = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ jsx(Drawer.Root, {
	shouldScaleBackground,
	...props
});
Drawer$1.displayName = "Drawer";
Drawer.Trigger;
var DrawerPortal = Drawer.Portal;
var DrawerClose = Drawer.Close;
var DrawerOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Drawer.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80", className),
	...props
}));
DrawerOverlay.displayName = Drawer.Overlay.displayName;
var DrawerContent = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DrawerPortal, { children: [/* @__PURE__ */ jsx(DrawerOverlay, {}), /* @__PURE__ */ jsxs(Drawer.Content, {
	ref,
	className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className),
	...props,
	children: [/* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }), children]
})] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
	...props
});
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("mt-auto flex flex-col gap-2 p-4", className),
	...props
});
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Drawer.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DrawerTitle.displayName = Drawer.Title.displayName;
var DrawerDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Drawer.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DrawerDescription.displayName = Drawer.Description.displayName;
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/shared/PhotoConfigDrawer.tsx
var DEFAULT_AVATAR = "/avatar.png";
var PhotoConfigDrawer = ({ isOpen, onClose, photo, config: initialConfig, onPhotoChange, onConfigChange, ...props }) => {
	const t = useTranslations("photoConfig");
	const { updateBasicInfo } = useResumeStore();
	const inputRef = useRef(null);
	const [previewUrl, setPreviewUrl] = useState(photo);
	const [isDragging, setIsDragging] = useState(false);
	const [imageUrl, setImageUrl] = useState(photo || "");
	const drawerContentRef = useRef(null);
	const [config, setConfig] = useState(initialConfig || DEFAULT_CONFIG);
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	useEffect(() => {
		if (isOpen) {
			setConfig(initialConfig || DEFAULT_CONFIG);
			setPreviewUrl(photo === "" ? "" : photo || DEFAULT_AVATAR);
			setImageUrl(photo === DEFAULT_AVATAR ? "" : photo || "");
		}
		const handleClick = (e) => {
			if (!drawerContentRef.current?.contains(e.target)) onClose();
		};
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [
		isOpen,
		initialConfig,
		photo
	]);
	const handleFile = async (file) => {
		if (!file.type.startsWith("image/")) {
			toast.error(t("upload.typeLimit"));
			return;
		}
		try {
			let imageData;
			if (file.size > 2 * 1024 * 1024) try {
				imageData = await compressImage(file, 800, 800, .7);
				let compressedSize = estimateBase64Size(imageData);
				if (compressedSize > 2 * 1024 * 1024) {
					imageData = await compressImage(file, 600, 600, .5);
					compressedSize = estimateBase64Size(imageData);
					if (compressedSize > 2 * 1024 * 1024) imageData = await compressImage(file, 400, 400, .4);
				}
				console.log(`原始图片大小: ${(file.size / 1024).toFixed(2)}KB, 压缩后大小: ${(estimateBase64Size(imageData) / 1024).toFixed(2)}KB`);
			} catch (error) {
				toast.error(t("upload.sizeLimit"));
				return;
			}
			else imageData = await compressImage(file, 1200, 1200, .8);
			setPreviewUrl(imageData);
			setImageUrl(imageData);
			updateBasicInfo({ photo: imageData });
		} catch (error) {
			toast.error(t("upload.error"));
		}
	};
	const handleFileChange = (event) => {
		const file = event.target.files?.[0];
		if (file) handleFile(file);
	};
	const handleUrlChange = async (e) => {
		const url = e.trim();
		setImageUrl(url);
		if (!url) {
			handleRemovePhoto();
			return;
		}
		try {
			const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(url)}`;
			const img = new Image();
			img.crossOrigin = "anonymous";
			const checkImageSize = () => {
				return new Promise((resolve, reject) => {
					fetch(proxyUrl, { method: "HEAD" }).then((response) => {
						const contentLength = response.headers.get("content-length");
						if (contentLength) {
							if (parseInt(contentLength, 10) > 2 * 1024 * 1024) reject(new Error(t("upload.sizeLimit")));
						}
						resolve();
					}).catch(() => {
						resolve();
					});
				});
			};
			await checkImageSize();
			await new Promise((resolve, reject) => {
				const timer = setTimeout(() => {
					reject(new Error(t("upload.timeout")));
				}, 1e4);
				img.onload = () => {
					clearTimeout(timer);
					resolve(void 0);
				};
				img.onerror = () => {
					clearTimeout(timer);
					reject(new Error(t("upload.loadError")));
				};
				img.src = proxyUrl;
			});
			setPreviewUrl(proxyUrl);
			updateBasicInfo({ photo: url });
			onPhotoChange(url, config);
		} catch (error) {
			toast.error(t("upload.invalidUrl", { defaultMessage: "图片链接无效或无法访问，请尝试使用其他图片链接" }));
			handleRemovePhoto();
		}
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) handleFile(file);
	};
	const handleRemovePhoto = () => {
		setPreviewUrl("");
		setImageUrl("");
		if (inputRef.current) inputRef.current.value = "";
		updateBasicInfo({ photo: "" });
		onPhotoChange("", config);
		setTimeout(() => {
			setPreviewUrl("");
		}, 0);
	};
	const handleConfigChange = (updates) => {
		const newConfig = {
			...config,
			...updates
		};
		if (config.aspectRatio !== "custom") {
			if ("width" in updates) {
				const ratio = getRatioMultiplier(config.aspectRatio);
				newConfig.height = Math.round(updates.width * ratio) > 200 ? 200 : Math.round(updates.width * ratio);
			}
			if ("height" in updates) {
				const ratio = 1 / getRatioMultiplier(config.aspectRatio);
				newConfig.width = Math.round(updates.height * ratio) > 200 ? 200 : Math.round(updates.height * ratio);
			}
		}
		setConfig(newConfig);
		onConfigChange(newConfig);
	};
	const handleInputChange = (e, key) => {
		const value = Number(e.target.value) > 200 ? 200 : e.target.value;
		if (value === "") {
			setConfig((prev) => ({
				...prev,
				[key]: ""
			}));
			return;
		}
		const numValue = Number(value);
		if (!isNaN(numValue)) setConfig((prev) => ({
			...prev,
			[key]: numValue
		}));
	};
	const handleInputBlur = (e, key) => {
		const value = e.target.value;
		const numValue = value === "" ? 0 : Number(value);
		if (key === "customBorderRadius") {
			const maxRadius = Math.min(config.width, config.height) / 2;
			handleConfigChange({ customBorderRadius: Math.max(0, Math.min(numValue, maxRadius)) });
		} else {
			const validValue = Math.max(24, Math.min(numValue, 200));
			handleConfigChange({ [key]: validValue });
		}
	};
	const handleSave = () => {
		onPhotoChange(previewUrl, config);
		onClose();
	};
	return /* @__PURE__ */ jsx(Drawer$1, {
		direction: isMobile ? "bottom" : "left",
		modal: false,
		open: isOpen,
		dismissible: false,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ jsx(DrawerContent, {
			ref: drawerContentRef,
			className: cn("dark:bg-neutral-900 dark:text-white bg-white", "md:fixed md:border-none md:flex md:bottom-0 md:left-0 md:right-0 md:h-[93%] md:max-w-[360px] md:mx-[-1px] md:z-10 md:outline-none shadow shadow-blue-500/40"),
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-full max-w-md overflow-y-auto",
				children: [
					/* @__PURE__ */ jsxs(DrawerHeader, { children: [/* @__PURE__ */ jsx(DrawerTitle, {
						className: "text-center",
						children: t("title")
					}), /* @__PURE__ */ jsx(DrawerDescription, {})] }),
					/* @__PURE__ */ jsxs("div", {
						className: cn("relative overflow-hidden border-2 transition-all mx-auto", isDragging ? "border-blue-500 border-solid" : "border-dashed", "dark:border-neutral-700 dark:hover:border-neutral-600 border-neutral-300 hover:border-neutral-400"),
						style: {
							width: `${config.width}px`,
							height: `${config.height}px`,
							borderRadius: getBorderRadiusValue(config),
							maxWidth: "100%"
						},
						onDragOver: handleDragOver,
						onDragLeave: handleDragLeave,
						onDrop: handleDrop,
						children: [previewUrl && previewUrl !== "" ? /* @__PURE__ */ jsxs("div", {
							className: "relative h-full group",
							children: [/* @__PURE__ */ jsx("img", {
								src: previewUrl,
								alt: "Profile",
								className: "w-full h-full object-cover"
							}), /* @__PURE__ */ jsx("div", {
								className: cn("absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity", "group-hover:opacity-100"),
								children: /* @__PURE__ */ jsx(Button, {
									onClick: handleRemovePhoto,
									className: "p-1.5 rounded-full bg-white/10 hover:bg-white/20",
									children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" })
								})
							})]
						}) : /* @__PURE__ */ jsx(Button, {
							onClick: () => inputRef.current?.click(),
							variant: "ghost",
							className: "w-full h-full flex flex-col items-center justify-center p-0",
							children: /* @__PURE__ */ jsx(Upload, { className: cn("w-6 h-6 mb-2", "dark:text-neutral-400 text-neutral-500") })
						}), /* @__PURE__ */ jsx(motion.input, {
							ref: inputRef,
							type: "file",
							accept: "image/*",
							onChange: handleFileChange,
							className: "hidden"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-6 space-y-6",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: t("upload.dragHint")
						}), /* @__PURE__ */ jsxs("span", {
							className: "ml-2 text-xs text-neutral-500 mt-1",
							children: [
								"(",
								t("upload.sizeLimit"),
								")"
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-6 space-y-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-sm font-medium",
								children: t("upload.title")
							}), /* @__PURE__ */ jsx(Textarea, {
								value: imageUrl,
								onChange: (e) => handleUrlChange(e.target.value),
								placeholder: t("upload.urlPlaceholder"),
								className: cn("h-9", "dark:bg-neutral-800 dark:border-neutral-700")
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-medium",
										children: t("config.size")
									}), /* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx(Input, {
												value: config.width,
												onChange: (e) => handleInputChange(e, "width"),
												onBlur: (e) => handleInputBlur(e, "width"),
												className: cn("h-9 pr-7", "dark:bg-neutral-800 dark:border-neutral-700"),
												min: 24,
												max: 200,
												placeholder: t("config.widthPlaceholder")
											}), /* @__PURE__ */ jsx("div", {
												className: cn("absolute right-3 top-1/2 -translate-y-1/2 text-sm", "dark:text-neutral-400 text-neutral-500"),
												children: "W"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx(Input, {
												value: config.height,
												onChange: (e) => handleInputChange(e, "height"),
												onBlur: (e) => handleInputBlur(e, "height"),
												className: cn("h-9 pr-7", "dark:bg-neutral-800 dark:border-neutral-700"),
												min: 24,
												max: 200,
												placeholder: t("config.heightPlaceholder")
											}), /* @__PURE__ */ jsx("div", {
												className: cn("absolute right-3 top-1/2 -translate-y-1/2 text-sm", "dark:text-neutral-400 text-neutral-500"),
												children: "H"
											})]
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-medium",
										children: t("config.aspectRatio")
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-2",
										children: [
											"1:1",
											"4:3",
											"3:4",
											"16:9",
											"custom"
										].map((ratio) => /* @__PURE__ */ jsx(Button, {
											size: "sm",
											variant: config.aspectRatio === ratio ? "default" : "outline",
											onClick: () => {
												if (ratio !== "custom") handleConfigChange({
													aspectRatio: ratio,
													height: Math.round(config.width * getRatioMultiplier(ratio))
												});
												else handleConfigChange({ aspectRatio: ratio });
											},
											children: ratio === "custom" ? t("config.ratios.custom") : ratio
										}, ratio))
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "text-sm font-medium",
										children: t("config.border-radius")
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap gap-2",
										children: [[
											"none",
											"medium",
											"full",
											"custom"
										].map((radius) => /* @__PURE__ */ jsx(Button, {
											size: "sm",
											variant: config.borderRadius === radius ? "default" : "outline",
											onClick: () => handleConfigChange({ borderRadius: radius }),
											children: radius === "none" ? t("config.borderRadius.none") : radius === "medium" ? t("config.borderRadius.medium") : radius === "full" ? t("config.borderRadius.full") : t("config.borderRadius.custom")
										}, radius)), config.borderRadius === "custom" && /* @__PURE__ */ jsx(Input, {
											type: "number",
											value: config.customBorderRadius,
											onChange: (e) => handleInputChange(e, "customBorderRadius"),
											onBlur: (e) => handleInputBlur(e, "customBorderRadius"),
											className: cn("h-9 mt-2", "dark:bg-neutral-800"),
											min: 0,
											max: Math.min(config.width, config.height) / 2,
											placeholder: t("config.borderRadius.customPlaceholder")
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx(DrawerFooter, { children: /* @__PURE__ */ jsx("div", {
						className: "flex gap-2",
						children: /* @__PURE__ */ jsx(DrawerClose, {
							asChild: true,
							children: /* @__PURE__ */ jsx(Button, {
								className: "w-full",
								onClick: handleSave,
								variant: "destructive",
								children: t("actions.close")
							})
						})
					}) })
				]
			})
		})
	});
};
//#endregion
//#region src/components/shared/PhotoSelector.tsx
var PhotoSelector = ({ className }) => {
	const t = useTranslations("workbench");
	const [showConfig, setShowConfig] = useState(false);
	const { updateBasicInfo, activeResume } = useResumeStore();
	const { basic = {} } = activeResume || {};
	const handlePhotoChange = (photo, config) => {
		updateBasicInfo({
			...basic,
			photo,
			photoConfig: config
		});
	};
	const handleConfigChange = (config) => {
		updateBasicInfo({
			...basic,
			photoConfig: config
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Image$1, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-medium",
						children: t("basicPanel.avatar")
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						className: "h-6 px-2",
						onClick: () => setShowConfig(true),
						children: /* @__PURE__ */ jsx(Settings2, { className: "w-3 h-3" })
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						className: "h-6 px-2",
						onClick: () => {
							updateBasicInfo({
								...basic,
								photoConfig: {
									...basic.photoConfig,
									visible: !(basic.photoConfig?.visible ?? true)
								}
							});
						},
						children: basic.photoConfig?.visible !== false ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-2 relative overflow-hidden",
				children: basic.photo && /* @__PURE__ */ jsx("img", {
					src: basic.photo,
					alt: "Selected",
					className: "w-[48px] h-[48px] object-cover rounded"
				})
			}),
			/* @__PURE__ */ jsx(PhotoConfigDrawer, {
				isOpen: showConfig,
				onClose: () => setShowConfig(false),
				photo: basic.photo,
				config: basic.photoConfig,
				onPhotoChange: handlePhotoChange,
				onConfigChange: handleConfigChange
			})
		]
	});
};
//#endregion
//#region src/components/editor/IconSelector.tsx
var getIconOptions = (t) => [
	{
		label: t("icons.user"),
		value: "User",
		icon: User,
		category: t("categories.personal")
	},
	{
		label: t("icons.email"),
		value: "Mail",
		icon: Mail,
		category: t("categories.personal")
	},
	{
		label: t("icons.phone"),
		value: "Phone",
		icon: Phone,
		category: t("categories.personal")
	},
	{
		label: t("icons.address"),
		value: "MapPin",
		icon: MapPin,
		category: t("categories.personal")
	},
	{
		label: t("icons.website"),
		value: "Globe",
		icon: Globe,
		category: t("categories.personal")
	},
	{
		label: t("icons.mobile"),
		value: "Smartphone",
		icon: Smartphone,
		category: t("categories.personal")
	},
	{
		label: t("icons.education"),
		value: "GraduationCap",
		icon: GraduationCap,
		category: t("categories.education")
	},
	{
		label: t("icons.school"),
		value: "School",
		icon: School,
		category: t("categories.education")
	},
	{
		label: t("icons.major"),
		value: "Book",
		icon: Book,
		category: t("categories.education")
	},
	{
		label: t("icons.library"),
		value: "Library",
		icon: Library,
		category: t("categories.education")
	},
	{
		label: t("icons.scholarship"),
		value: "Award",
		icon: Award,
		category: t("categories.education")
	},
	{
		label: t("icons.work"),
		value: "Briefcase",
		icon: Briefcase,
		category: t("categories.experience")
	},
	{
		label: t("icons.company"),
		value: "Building2",
		icon: Building2,
		category: t("categories.experience")
	},
	{
		label: t("icons.office"),
		value: "Building",
		icon: Building,
		category: t("categories.experience")
	},
	{
		label: t("icons.dateRange"),
		value: "CalendarRange",
		icon: CalendarRange,
		category: t("categories.experience")
	},
	{
		label: t("icons.workTime"),
		value: "Clock",
		icon: Clock,
		category: t("categories.experience")
	},
	{
		label: t("icons.programming"),
		value: "Code",
		icon: Code,
		category: t("categories.skills")
	},
	{
		label: t("icons.system"),
		value: "Cpu",
		icon: Cpu,
		category: t("categories.skills")
	},
	{
		label: t("icons.database"),
		value: "Database",
		icon: Database,
		category: t("categories.skills")
	},
	{
		label: t("icons.terminal"),
		value: "Terminal",
		icon: Terminal,
		category: t("categories.skills")
	},
	{
		label: t("icons.techStack"),
		value: "Layers",
		icon: Layers,
		category: t("categories.skills")
	},
	{
		label: t("icons.language"),
		value: "Languages",
		icon: Languages,
		category: t("categories.languages")
	},
	{
		label: t("icons.speaking"),
		value: "MessageSquare",
		icon: MessageSquare,
		category: t("categories.languages")
	},
	{
		label: t("icons.communication"),
		value: "MessagesSquare",
		icon: MessagesSquare,
		category: t("categories.languages")
	},
	{
		label: t("icons.project"),
		value: "FolderGit2",
		icon: FolderGit2,
		category: t("categories.projects")
	},
	{
		label: t("icons.branch"),
		value: "GitBranch",
		icon: GitBranch,
		category: t("categories.projects")
	},
	{
		label: t("icons.release"),
		value: "Rocket",
		icon: Rocket,
		category: t("categories.projects")
	},
	{
		label: t("icons.target"),
		value: "Target",
		icon: Target,
		category: t("categories.projects")
	},
	{
		label: t("icons.trophy"),
		value: "Trophy",
		icon: Trophy,
		category: t("categories.achievements")
	},
	{
		label: t("icons.medal"),
		value: "Medal",
		icon: Medal,
		category: t("categories.achievements")
	},
	{
		label: t("icons.star"),
		value: "Star",
		icon: Star,
		category: t("categories.achievements")
	},
	{
		label: t("icons.interest"),
		value: "Heart",
		icon: Heart,
		category: t("categories.hobbies")
	},
	{
		label: t("icons.music"),
		value: "Music",
		icon: Music,
		category: t("categories.hobbies")
	},
	{
		label: t("icons.art"),
		value: "Palette",
		icon: Palette,
		category: t("categories.hobbies")
	},
	{
		label: t("icons.photography"),
		value: "Camera",
		icon: Camera,
		category: t("categories.hobbies")
	},
	{
		label: "Github",
		value: "Github",
		icon: Github,
		category: t("categories.social")
	},
	{
		label: t("icons.linkedin"),
		value: "Linkedin",
		icon: Linkedin,
		category: t("categories.social")
	},
	{
		label: t("icons.twitter"),
		value: "Twitter",
		icon: Twitter,
		category: t("categories.social")
	},
	{
		label: t("icons.facebook"),
		value: "Facebook",
		icon: Facebook,
		category: t("categories.social")
	},
	{
		label: t("icons.instagram"),
		value: "Instagram",
		icon: Instagram,
		category: t("categories.social")
	},
	{
		label: t("icons.profile"),
		value: "FileText",
		icon: FileText,
		category: t("categories.others")
	},
	{
		label: t("icons.review"),
		value: "FileCheck",
		icon: FileCheck,
		category: t("categories.others")
	},
	{
		label: t("icons.filter"),
		value: "Filter",
		icon: Filter,
		category: t("categories.others")
	},
	{
		label: t("icons.link"),
		value: "Link",
		icon: Link,
		category: t("categories.others")
	},
	{
		label: t("icons.salary"),
		value: "Wallet",
		icon: Wallet,
		category: t("categories.others")
	},
	{
		label: t("icons.idea"),
		value: "Lightbulb",
		icon: Lightbulb,
		category: t("categories.others")
	},
	{
		label: t("icons.send"),
		value: "Send",
		icon: Send,
		category: t("categories.others")
	},
	{
		label: t("icons.share"),
		value: "Share2",
		icon: Share2,
		category: t("categories.others")
	},
	{
		label: t("icons.settings"),
		value: "Settings",
		icon: Settings,
		category: t("categories.others")
	},
	{
		label: t("icons.search"),
		value: "SearchIcon",
		icon: Search,
		category: t("categories.others")
	},
	{
		label: t("icons.flag"),
		value: "Flag",
		icon: Flag,
		category: t("categories.others")
	},
	{
		label: t("icons.bookmark"),
		value: "Bookmark",
		icon: Bookmark,
		category: t("categories.others")
	},
	{
		label: t("icons.thumbsUp"),
		value: "ThumbsUp",
		icon: ThumbsUp,
		category: t("categories.others")
	},
	{
		label: t("icons.skill"),
		value: "Zap",
		icon: Zap,
		category: t("categories.others")
	}
];
var IconSelector = ({ value, onChange }) => {
	const t = useTranslations("iconSelector");
	const iconOptions = React.useMemo(() => getIconOptions(t), [t]);
	const [open, setOpen] = React.useState(false);
	const [searchTerm, setSearchTerm] = React.useState("");
	const [isHovered, setIsHovered] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState(t("all"));
	const Icon = (iconOptions.find((i) => i.value === value) || iconOptions[0]).icon;
	const categories = [t("all"), ...Array.from(new Set(iconOptions.map((icon) => icon.category)))];
	const filteredIcons = iconOptions.filter((icon) => {
		const matchesSearch = icon.label.toLowerCase().includes(searchTerm.toLowerCase()) || icon.value.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === t("all") || icon.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});
	const handleSelect = (iconValue) => {
		onChange(iconValue);
		setOpen(false);
	};
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				className: cn("w-8 h-8 p-2 rounded-md relative overflow-hidden", "transform-gpu transition-all duration-300 ease-out", "hover:bg-muted/50"),
				variant: "ghost",
				children: /* @__PURE__ */ jsx(Icon, { className: cn("w-4 h-4 transform-gpu transition-transform duration-300", "hover:rotate-[360deg]", "text-foreground") })
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			className: cn("w-[420px] p-4", "bg-popover border-border", "shadow-lg backdrop-blur-sm", "animate-in zoom-in-95 duration-200"),
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: cn("flex border items-center gap-2 px-3 py-2 rounded-lg", "transform-gpu transition-all duration-300", "bg-background/50 border border-input", "focus-within:ring-2 focus-within:ring-primary/20"),
						children: [/* @__PURE__ */ jsx(Search, { className: cn("w-4 h-4 transition-colors duration-300", "dark:text-neutral-400", "text-neutral-500") }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: t("searchPlaceholder"),
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: cn("w-full bg-transparent border-none outline-none text-sm", "transition-colors duration-300", "dark:text-neutral-200", "text-neutral-700", "placeholder:text-neutral-500", "focus:ring-0")
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-1 mb-3",
						children: categories.map((category) => /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setSelectedCategory(category),
							className: cn("px-2 py-1 text-xs rounded-md", "transition-all duration-200", selectedCategory === category ? "bg-primary text-primary-foreground ring-1 ring-primary/20" : "text-muted-foreground hover:text-foreground"),
							children: category
						}, category))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-8 gap-2 max-h-[400px] overflow-x-hidden overflow-y-auto pr-2",
						children: filteredIcons.map(({ value: iconValue, icon: Icon, label }) => /* @__PURE__ */ jsxs(Button, {
							variant: "ghost",
							onMouseEnter: () => setIsHovered(iconValue),
							onMouseLeave: () => setIsHovered(""),
							onClick: () => handleSelect(iconValue),
							className: cn("relative p-2 h-10  group", "hover:bg-muted text-muted-foreground hover:text-foreground", value === iconValue && "bg-primary text-white  "),
							children: [
								/* @__PURE__ */ jsx(Icon, { className: cn("w-4 h-4") }),
								/* @__PURE__ */ jsx("span", {
									className: cn("absolute -top-9 left-1/2 -translate-x-1/2", "px-2 py-1 text-xs rounded-md", "opacity-0 translate-y-1", "group-hover:opacity-100 group-hover:translate-y-0", "pointer-events-none", "bg-popover text-popover-foreground border border-border", "shadow-sm whitespace-nowrap z-10"),
									children: label
								}),
								isHovered === iconValue && /* @__PURE__ */ jsx("span", { className: cn("absolute inset-0 bg-primary/5", "animate-in fade-in duration-300") })
							]
						}, iconValue))
					}),
					filteredIcons.length === 0 && /* @__PURE__ */ jsxs("div", {
						className: cn("flex flex-col items-center justify-center py-8 px-4", "text-sm", "dark:text-neutral-400", "text-neutral-500"),
						children: [
							/* @__PURE__ */ jsx(Search, { className: "w-12 h-12 mb-2 opacity-20" }),
							/* @__PURE__ */ jsx("p", { children: t("noMatchingIcons") }),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs opacity-70",
								children: searchTerm ? t("tryOtherKeywords") : t("selectOtherCategory")
							})
						]
					})
				]
			})
		})]
	});
};
//#endregion
//#region src/components/editor/basic/AlignSelector.tsx
var AlignSelector = ({ value, onChange }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-3 gap-3",
		children: [
			{
				value: "left",
				icon: /* @__PURE__ */ jsxs("svg", {
					width: "48",
					height: "48",
					viewBox: "0 0 48 48",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "15",
							cy: "24",
							r: "6",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "27",
							y: "21",
							width: "15",
							height: "2",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "27",
							y: "25",
							width: "12",
							height: "2",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "27",
							y: "29",
							width: "13",
							height: "2",
							className: "fill-current"
						})
					]
				}),
				tooltip: "左对齐"
			},
			{
				value: "center",
				icon: /* @__PURE__ */ jsxs("svg", {
					width: "48",
					height: "48",
					viewBox: "0 0 48 48",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "24",
							cy: "15",
							r: "6",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "16.5",
							y: "27",
							width: "15",
							height: "2",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "18",
							y: "31",
							width: "12",
							height: "2",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "17",
							y: "35",
							width: "14",
							height: "2",
							className: "fill-current"
						})
					]
				}),
				tooltip: "居中"
			},
			{
				value: "right",
				icon: /* @__PURE__ */ jsxs("svg", {
					width: "48",
					height: "48",
					viewBox: "0 0 48 48",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "33",
							cy: "24",
							r: "6",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "6",
							y: "21",
							width: "15",
							height: "2",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "9",
							y: "25",
							width: "12",
							height: "2",
							className: "fill-current"
						}),
						/* @__PURE__ */ jsx("rect", {
							x: "8",
							y: "29",
							width: "13",
							height: "2",
							className: "fill-current"
						})
					]
				}),
				tooltip: "右对齐"
			}
		].map((layout) => /* @__PURE__ */ jsxs("button", {
			onClick: () => onChange(layout.value),
			title: layout.tooltip,
			className: cn("group relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200", "hover:scale-[1.02] active:scale-[0.98]", value === layout.value ? "border-primary bg-primary/5 text-primary shadow-sm" : "border-transparent bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"),
			children: [/* @__PURE__ */ jsx("div", {
				className: "w-10 h-10 flex items-center justify-center",
				children: React.cloneElement(layout.icon, {
					width: "100%",
					height: "100%",
					className: "fill-current"
				})
			}), value === layout.value && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 animate-in fade-in zoom-in-95 duration-200 fill-mode-forwards" })]
		}, layout.value))
	});
};
//#endregion
//#region src/components/shared/rich-editor/BetterSpace.ts
var BetterSpace = Extension.create({
	name: "betterSpace",
	addKeyboardShortcuts() {
		return { "Space": ({ editor }) => {
			const { state, view } = editor;
			const { selection } = state;
			const { $from } = selection;
			if ($from.nodeBefore?.text?.slice(-1) === " ") {
				view.dispatch(view.state.tr.insertText("\xA0"));
				return true;
			}
			return false;
		} };
	}
});
//#endregion
//#region src/components/shared/rich-editor/RichEditor.tsx
var normalizeEditorHtml = (value) => stripTrailingListParagraph(stripLegacyRichTextClasses(value));
var getColors = (t) => [
	{
		label: t("colors.black"),
		value: "#000000"
	},
	{
		label: t("colors.darkGray"),
		value: "#333333"
	},
	{
		label: t("colors.gray"),
		value: "#666666"
	},
	{
		label: t("colors.red"),
		value: "#FF0000"
	},
	{
		label: t("colors.orange"),
		value: "#FF4D00"
	},
	{
		label: t("colors.orangeYellow"),
		value: "#FF9900"
	},
	{
		label: t("colors.yellow"),
		value: "#FFCC00"
	},
	{
		label: t("colors.yellowGreen"),
		value: "#33CC00"
	},
	{
		label: t("colors.green"),
		value: "#00CC00"
	},
	{
		label: t("colors.cyan"),
		value: "#00CCCC"
	},
	{
		label: t("colors.lightBlue"),
		value: "#0066FF"
	},
	{
		label: t("colors.blue"),
		value: "#0000FF"
	},
	{
		label: t("colors.purple"),
		value: "#6600FF"
	},
	{
		label: t("colors.magenta"),
		value: "#CC00FF"
	},
	{
		label: t("colors.pink"),
		value: "#FF00FF"
	}
];
var getBgColors = getColors;
var MenuButton = ({ onClick, isActive = false, disabled = false, children, className = "", tooltip }) => {
	const [showTooltip, setShowTooltip] = React.useState(false);
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		onClick();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ jsx(Button, {
			onMouseDown: (e) => e.preventDefault(),
			variant: isActive ? "secondary" : "ghost",
			size: "sm",
			className: cn("h-9 w-9 rounded-md transition-all duration-200 hover:scale-105 p-0", isActive ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700" : "hover:bg-primary/5 dark:hover:bg-neutral-800", disabled ? "opacity-50" : "", className),
			onClick: handleClick,
			disabled,
			onMouseEnter: () => setShowTooltip(true),
			onMouseLeave: () => setShowTooltip(false),
			children
		}), tooltip && showTooltip && /* @__PURE__ */ jsx("div", {
			className: cn("absolute -bottom-8 left-1/2 transform -translate-x-1/2", "px-2 py-1 text-xs rounded-md whitespace-nowrap z-50", "transition-opacity duration-200", "bg-secondary text-secondary-foreground dark:bg-neutral-800 dark:text-neutral-200"),
			children: tooltip
		})]
	});
};
var TextColorButton = ({ editor }) => {
	const [activeColor, setActiveColor] = React.useState(null);
	const t = useTranslations("richEditor");
	const colors = getColors(t);
	React.useEffect(() => {
		const syncActiveColor = () => {
			const color = editor.getAttributes("textStyle").color;
			setActiveColor(typeof color === "string" ? color : null);
		};
		syncActiveColor();
		editor.on("selectionUpdate", syncActiveColor);
		editor.on("transaction", syncActiveColor);
		return () => {
			editor.off("selectionUpdate", syncActiveColor);
			editor.off("transaction", syncActiveColor);
		};
	}, [editor]);
	return /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsxs(Button, {
			variant: "ghost",
			size: "sm",
			className: "h-9 w-9 p-0 rounded-md hover:scale-105 transition-all duration-200 hover:bg-primary/5 relative group",
			children: [/* @__PURE__ */ jsx(PaintBucket, {
				className: "h-5 w-5",
				style: {
					color: activeColor || "currentColor",
					filter: activeColor ? "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" : "none"
				}
			}), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: t("textColor")
			})]
		})
	}), /* @__PURE__ */ jsx(PopoverContent, {
		className: "w-64 p-3 rounded-lg",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(PaintBucket, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
					className: "text-sm font-medium",
					children: t("textColor")
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-5 gap-1",
				children: [/* @__PURE__ */ jsx("button", {
					className: "h-8 w-8 rounded-md border border-border flex items-center justify-center hover:bg-muted",
					onClick: () => {
						editor.chain().focus().unsetColor().run();
						setActiveColor(null);
					},
					children: /* @__PURE__ */ jsx("span", {
						className: "text-xl leading-none text-muted-foreground",
						children: "/"
					})
				}), colors.map((color) => /* @__PURE__ */ jsx("button", {
					className: `h-8 w-8 rounded-md border hover:scale-110 transition-transform relative
                  ${activeColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""}`,
					style: {
						backgroundColor: color.value,
						borderColor: color.value === "#FFFFFF" ? "#E2E8F0" : color.value
					},
					onClick: () => {
						editor.chain().focus().setColor(color.value).run();
						setActiveColor(color.value);
					},
					title: color.label
				}, color.value))]
			})]
		})
	})] });
};
var BackgroundColorButton = ({ editor }) => {
	const [activeBgColor, setActiveBgColor] = React.useState(null);
	const t = useTranslations("richEditor");
	const bgColors = getBgColors(t);
	useEffect(() => {
		const syncActiveBgColor = () => {
			const highlight = editor.getAttributes("highlight");
			setActiveBgColor(typeof highlight === "string" ? highlight : typeof highlight?.color === "string" ? highlight.color : null);
		};
		syncActiveBgColor();
		editor.on("selectionUpdate", syncActiveBgColor);
		editor.on("transaction", syncActiveBgColor);
		return () => {
			editor.off("selectionUpdate", syncActiveBgColor);
			editor.off("transaction", syncActiveBgColor);
		};
	}, [editor]);
	return /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsxs(Button, {
			variant: "ghost",
			size: "sm",
			className: "h-9 w-9 p-0 rounded-md hover:scale-105 transition-all duration-200 hover:bg-primary/5 relative group",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx(Highlighter, {
					className: "h-5 w-5",
					style: {
						color: activeBgColor ? "currentColor" : "currentColor",
						filter: activeBgColor ? "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" : "none"
					}
				}), activeBgColor && /* @__PURE__ */ jsx("div", {
					className: "absolute -right-1 -bottom-1 w-2 h-2 rounded-full border border-white",
					style: { backgroundColor: activeBgColor }
				})]
			}), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: t("backgroundColor")
			})]
		})
	}), /* @__PURE__ */ jsx(PopoverContent, {
		className: "w-64 p-3 rounded-lg",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Highlighter, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
					className: "text-sm font-medium",
					children: t("backgroundColor")
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-5 gap-1",
				children: [/* @__PURE__ */ jsx("button", {
					className: "h-8 w-8 rounded-md border border-border flex items-center justify-center hover:bg-muted",
					onClick: () => {
						editor.chain().focus().unsetHighlight().run();
						setActiveBgColor(null);
					},
					children: /* @__PURE__ */ jsx("span", {
						className: "text-xl leading-none text-muted-foreground",
						children: "/"
					})
				}), bgColors.map((color) => /* @__PURE__ */ jsx("button", {
					className: `h-8 w-8 rounded-md border hover:scale-110 transition-transform relative
                  ${activeBgColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""}`,
					style: {
						backgroundColor: color.value,
						borderColor: "transparent"
					},
					onClick: () => {
						editor.chain().focus().setHighlight({ color: color.value }).run();
						setActiveBgColor(color.value);
					},
					title: color.label
				}, color.value))]
			})]
		})
	})] });
};
var LinkButton = ({ editor }) => {
	const [open, setOpen] = React.useState(false);
	const [linkUrl, setLinkUrl] = React.useState("");
	const t = useTranslations("richEditor");
	React.useEffect(() => {
		if (!open) return;
		setLinkUrl(editor.getAttributes("link").href || "");
	}, [editor, open]);
	const applyLink = () => {
		const normalizedHref = normalizeLinkHref(linkUrl);
		if (!normalizedHref) {
			toast.error(t("linkInvalid"));
			return;
		}
		editor.chain().focus().extendMarkRange("link").setLink({
			href: normalizedHref,
			target: "_blank",
			rel: "noopener noreferrer"
		}).run();
		setLinkUrl(normalizedHref);
		setOpen(false);
	};
	const removeLink = () => {
		editor.chain().focus().extendMarkRange("link").unsetLink().run();
		setLinkUrl("");
		setOpen(false);
	};
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				variant: editor.isActive("link") ? "secondary" : "ghost",
				size: "sm",
				className: cn("h-9 w-9 p-0 rounded-md transition-all duration-200 hover:scale-105", editor.isActive("link") ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700" : "hover:bg-primary/5 dark:hover:bg-neutral-800"),
				onMouseDown: (e) => e.preventDefault(),
				children: [/* @__PURE__ */ jsx(Link2, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: t("link")
				})]
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			className: "w-72 p-3 rounded-lg",
			align: "start",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Link2, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm font-medium",
							children: t("link")
						})]
					}),
					/* @__PURE__ */ jsx(Input, {
						value: linkUrl,
						onChange: (e) => setLinkUrl(e.target.value),
						placeholder: t("linkPlaceholder"),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								applyLink();
							}
						}
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-2",
						children: [editor.isActive("link") && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: removeLink,
							children: [/* @__PURE__ */ jsx(Unlink, { className: "h-4 w-4 mr-1.5" }), t("linkRemove")]
						}), /* @__PURE__ */ jsx(Button, {
							type: "button",
							size: "sm",
							onClick: applyLink,
							children: t("linkApply")
						})]
					})
				]
			})
		})]
	});
};
var RichTextEditor = ({ content = "", placeholder = "", onChange, onPolish }) => {
	const t = useTranslations("richEditor");
	const initialContent = useMemo(() => normalizeEditorHtml(content), []);
	const lastSyncedContentRef = React.useRef(initialContent);
	const [isEditorEmpty, setIsEditorEmpty] = React.useState(!hasMeaningfulRichTextContent(content));
	const editor = useEditor({
		extensions: useMemo(() => [
			StarterKit.configure({
				bulletList: false,
				orderedList: false,
				listItem: false,
				listKeymap: false,
				link: false,
				underline: false,
				heading: { levels: [
					1,
					2,
					3
				] }
			}),
			ListKit.configure({
				bulletList: {},
				orderedList: {},
				listItem: {},
				listKeymap: {},
				taskItem: false,
				taskList: false
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
				alignments: [
					"left",
					"center",
					"right",
					"justify"
				]
			}),
			TextStyle,
			Underline$1,
			Color,
			Link$1.configure({
				openOnClick: false,
				autolink: true,
				linkOnPaste: true,
				defaultProtocol: "https",
				HTMLAttributes: {
					target: "_blank",
					rel: "noopener noreferrer"
				},
				isAllowedUri: (url, ctx) => ctx.defaultValidate(url) && Boolean(normalizeLinkHref(url)),
				shouldAutoLink: (url) => Boolean(normalizeLinkHref(url))
			}),
			Highlight.configure({ multicolor: true }),
			BetterSpace
		], []),
		content: initialContent,
		onUpdate: ({ editor }) => {
			const normalizedHtml = normalizeEditorHtml(editor.getHTML());
			setIsEditorEmpty(editor.isEmpty);
			if (normalizedHtml === lastSyncedContentRef.current) return;
			lastSyncedContentRef.current = normalizedHtml;
			onChange(normalizedHtml);
		},
		editorProps: useMemo(() => ({ attributes: { class: cn("tiptap max-w-none focus:outline-none min-h-[150px] px-4 py-3", "text-neutral-900 dark:text-neutral-200") } }), []),
		immediatelyRender: false,
		shouldRerenderOnTransaction: true
	});
	useEffect(() => {
		if (!editor) return;
		const normalizedContent = normalizeEditorHtml(content);
		const normalizedEditorContent = normalizeEditorHtml(editor.getHTML());
		if (normalizedContent === lastSyncedContentRef.current || normalizedContent === normalizedEditorContent) {
			lastSyncedContentRef.current = normalizedContent;
			setIsEditorEmpty(editor.isEmpty);
			return;
		}
		editor.commands.setContent(normalizedContent, { emitUpdate: false });
		lastSyncedContentRef.current = normalizedContent;
		setIsEditorEmpty(editor.isEmpty);
	}, [content, editor]);
	if (!editor) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("rounded-lg overflow-hidden border shadow-sm", "bg-card border-gray-100 dark:bg-neutral-900/30 dark:border-neutral-800"),
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ jsxs("div", {
			className: cn("border-b px-2 py-1.5 flex flex-wrap items-center gap-3", "bg-background dark:bg-neutral-900/50 dark:border-neutral-800"),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-0.5",
					children: [
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().toggleBold().run(),
							isActive: editor.isActive("bold"),
							tooltip: t("bold"),
							children: /* @__PURE__ */ jsx(Bold, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().toggleItalic().run(),
							isActive: editor.isActive("italic"),
							tooltip: t("italic"),
							children: /* @__PURE__ */ jsx(Italic, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().toggleUnderline().run(),
							isActive: editor.isActive("underline"),
							tooltip: t("underline"),
							children: /* @__PURE__ */ jsx(Underline, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(LinkButton, { editor }),
						/* @__PURE__ */ jsx(TextColorButton, { editor }),
						/* @__PURE__ */ jsx(BackgroundColorButton, { editor })
					]
				}),
				/* @__PURE__ */ jsx("div", { className: cn("h-5 w-px", "bg-border/60 dark:bg-neutral-800") }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-0.5",
					children: [
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().setTextAlign("left").run(),
							isActive: editor.isActive({ textAlign: "left" }),
							tooltip: t("alignLeft"),
							children: /* @__PURE__ */ jsx(AlignLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().setTextAlign("center").run(),
							isActive: editor.isActive({ textAlign: "center" }),
							tooltip: t("alignCenter"),
							children: /* @__PURE__ */ jsx(AlignCenter, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().setTextAlign("right").run(),
							isActive: editor.isActive({ textAlign: "right" }),
							tooltip: t("alignRight"),
							children: /* @__PURE__ */ jsx(AlignRight, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().setTextAlign("justify").run(),
							isActive: editor.isActive({ textAlign: "justify" }),
							tooltip: t("alignJustify"),
							children: /* @__PURE__ */ jsx(AlignJustify, { className: "h-5 w-5" })
						})
					]
				}),
				/* @__PURE__ */ jsx("div", { className: cn("h-5 w-px", "bg-border/60 dark:bg-neutral-800") }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-0.5",
					children: [/* @__PURE__ */ jsx(MenuButton, {
						onClick: () => editor.chain().focus().toggleBulletList().run(),
						isActive: editor.isActive("bulletList"),
						tooltip: t("bulletList"),
						children: /* @__PURE__ */ jsx(List, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsx(MenuButton, {
						onClick: () => editor.chain().focus().toggleOrderedList().run(),
						isActive: editor.isActive("orderedList"),
						tooltip: t("orderedList"),
						children: /* @__PURE__ */ jsx(ListOrdered, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ jsx("div", { className: cn("h-5 w-px", "bg-border/60 dark:bg-neutral-800") }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center space-x-1",
					children: [
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().undo().run(),
							disabled: !editor.can().undo(),
							tooltip: t("undo"),
							children: /* @__PURE__ */ jsx(Undo, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ jsx(MenuButton, {
							onClick: () => editor.chain().focus().redo().run(),
							disabled: !editor.can().redo(),
							tooltip: t("redo"),
							children: /* @__PURE__ */ jsx(Redo, { className: "h-4 w-4" })
						}),
						onPolish && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: (e) => {
								e.preventDefault();
								e.stopPropagation();
								onPolish();
							},
							className: "h-8 px-3 text-xs gap-1.5 ml-1 border-primary/20 hover:border-primary/40 text-primary hover:bg-primary/5 transition-all duration-300 group",
							children: [/* @__PURE__ */ jsx(Wand2, { className: "h-3 w-3 group-hover:rotate-12 transition-transform" }), t("aiPolish")]
						})
					]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [placeholder && isEditorEmpty && /* @__PURE__ */ jsx("div", {
				className: "pointer-events-none absolute left-4 top-3 text-muted-foreground text-sm",
				children: placeholder
			}), /* @__PURE__ */ jsx(EditorContent, { editor })]
		})]
	});
};
//#endregion
//#region src/components/shared/ai/AIPolishDialog.tsx
var md = createMarkdownExit({
	html: true,
	breaks: true,
	linkify: false
});
var turndownService = new TurndownService({
	headingStyle: "atx",
	bulletListMarker: "-"
});
function AIPolishDialog({ open, onOpenChange, content, onApply }) {
	const t = useTranslations("aiPolishDialog");
	const [isPolishing, setIsPolishing] = useState(false);
	const [polishedContent, setPolishedContent] = useState("");
	const [customInstructions, setCustomInstructions] = useState("");
	const [error, setError] = useState(null);
	const { selectedModel, doubaoApiKey, doubaoModelId, deepseekApiKey, deepseekModelId, openaiApiKey, openaiModelId, openaiApiEndpoint, geminiApiKey, geminiModelId, ollamaApiEndpoint, ollamaModelId, isConfigured } = useAIConfigStore();
	const abortControllerRef = useRef(null);
	const polishedContentRef = useRef(null);
	const getPolishErrorMessage = async (response) => {
		const fallback = { message: `${t("error.polishFailed")} (${response.status})` };
		try {
			const contentType = response.headers.get("content-type") || "";
			const rawText = await response.text();
			if (!rawText) {
				if (response.status === 401) return {
					message: "认证失败",
					detail: "请检查 API Key、模型和 API Endpoint 配置",
					code: "AI_API_KEY_ERROR"
				};
				return fallback;
			}
			if (contentType.includes("application/json") || rawText.startsWith("{")) {
				const data = JSON.parse(rawText);
				if (data.error) return {
					message: data.error.message || fallback.message,
					detail: data.error.detail,
					code: data.error.code
				};
				if (typeof data.message === "string") return { message: data.message };
			} else if (rawText.trim()) return { message: rawText.trim() };
		} catch {}
		if (response.status === 401) return {
			message: "认证失败",
			detail: "请检查 API Key、模型和 API Endpoint 配置",
			code: "AI_API_KEY_ERROR"
		};
		return fallback;
	};
	const handlePolish = async () => {
		try {
			if (!isConfigured()) {
				toast.error(t("error.configRequired"));
				return;
			}
			setIsPolishing(true);
			setPolishedContent("");
			setError(null);
			abortControllerRef.current = new AbortController();
			const config = AI_MODEL_CONFIGS[selectedModel];
			const apiKey = selectedModel === "doubao" ? doubaoApiKey : selectedModel === "openai" ? openaiApiKey : selectedModel === "gemini" ? geminiApiKey : deepseekApiKey;
			const modelId = selectedModel === "doubao" ? doubaoModelId : selectedModel === "openai" ? openaiModelId : selectedModel === "gemini" ? geminiModelId : selectedModel === "ollama" ? ollamaModelId : deepseekModelId;
			const apiEndpoint = selectedModel === "openai" ? openaiApiEndpoint : selectedModel === "ollama" ? ollamaApiEndpoint : void 0;
			const response = await fetch("/api/polish", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: turndownService.turndown(content),
					apiKey,
					apiEndpoint,
					model: config.requiresModelId ? modelId : config.defaultModel,
					modelType: selectedModel,
					customInstructions: customInstructions.trim() || void 0
				}),
				signal: abortControllerRef.current.signal
			});
			if (!response.ok) {
				setError(await getPolishErrorMessage(response));
				return;
			}
			if (!response.body) {
				setError({ message: "未收到响应数据" });
				return;
			}
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value);
				if (chunk.includes("[ERROR]")) {
					setError({ message: chunk.replace("[ERROR]", "").trim() });
					return;
				}
				setPolishedContent((prev) => prev + chunk);
			}
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") {
				console.log("Polish aborted");
				return;
			}
			console.error("Polish error:", err);
			setError({ message: err instanceof Error ? err.message : t("error.polishFailed") });
		} finally {
			setIsPolishing(false);
		}
	};
	useEffect(() => {
		if (polishedContent && polishedContentRef.current) {
			const container = polishedContentRef.current;
			requestAnimationFrame(() => {
				container.scrollTop = container.scrollHeight;
			});
		}
	}, [polishedContent]);
	useEffect(() => {
		if (!open) {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
				abortControllerRef.current = null;
			}
			setPolishedContent("");
			setCustomInstructions("");
			setError(null);
		}
	}, [open]);
	const handleClose = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
		onOpenChange(false);
		setPolishedContent("");
		setError(null);
	};
	const handleApply = () => {
		onApply(md.render(polishedContent));
		handleClose();
		toast.success(t("error.applied"));
	};
	const handleOpenChange = (open) => {
		if (!open && !isPolishing) onOpenChange(open);
	};
	const getErrorSuggestion = (code) => {
		switch (code) {
			case "AI_API_KEY_ERROR":
			case "AI_API_KEY_NOT_FOUND": return "请前往「AI 服务商」设置页面检查 API Key 配置";
			case "AI_QUOTA_EXCEEDED": return "API 配额已用尽，请充值或更换 API Key";
			case "AI_RATE_LIMIT": return "请求过于频繁，请等待片刻后重试";
			case "AI_REQUEST_TIMEOUT": return "请求超时，可能是网络问题或服务繁忙，请稍后重试";
			case "AI_SERVICE_UNAVAILABLE": return "AI 服务暂时不可用，请稍后重试或检查网络连接";
			case "AI_MODEL_NOT_FOUND": return "模型配置有误，请前往设置页面检查模型 ID";
			default: return null;
		}
	};
	return /* @__PURE__ */ jsx(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ jsxs(DialogContent, {
			className: cn("sm:max-w-[1000px]", "bg-white dark:bg-neutral-900", "border-neutral-200 dark:border-neutral-800", "rounded-2xl shadow-2xl dark:shadow-none"),
			onPointerDownOutside: (e) => {
				e.preventDefault();
			},
			onEscapeKeyDown: (e) => {
				e.preventDefault();
			},
			onInteractOutside: (e) => {
				e.preventDefault();
			},
			children: [
				/* @__PURE__ */ jsxs(DialogHeader, {
					className: "pb-6",
					children: [/* @__PURE__ */ jsxs(DialogTitle, {
						className: cn("flex items-center gap-2 text-2xl", "text-neutral-800 dark:text-neutral-100"),
						children: [/* @__PURE__ */ jsx(Sparkles, { className: cn("h-6 w-6 text-primary animate-pulse", "dark:text-primary-400") }), t("title")]
					}), /* @__PURE__ */ jsx(DialogDescription, {
						className: cn("text-base", "text-neutral-600 dark:text-neutral-400"),
						children: isPolishing ? t("description.polishing") : polishedContent ? t("description.finished") : t("description.ready")
					})]
				}),
				error && /* @__PURE__ */ jsxs("div", {
					className: cn("relative rounded-xl border p-4", "bg-red-50 dark:bg-red-500/10", "border-red-200 dark:border-red-500/30", "text-red-700 dark:text-red-300", "animate-in fade-in-0 slide-in-from-top-2 duration-300"),
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => setError(null),
						className: "absolute top-3 right-3 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors",
						children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", {
							className: "space-y-1 pr-6",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-medium",
									children: error.message
								}),
								error.detail && /* @__PURE__ */ jsx("p", {
									className: "text-sm text-red-600 dark:text-red-400",
									children: error.detail
								}),
								error.code && getErrorSuggestion(error.code) && /* @__PURE__ */ jsxs("p", {
									className: "text-sm text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xs bg-red-100 dark:bg-red-500/20 px-1.5 py-0.5 rounded",
										children: "建议"
									}), getErrorSuggestion(error.code)]
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "custom-instructions",
						className: cn("text-sm font-medium", "text-neutral-600 dark:text-neutral-400"),
						children: t("customInstructions")
					}), /* @__PURE__ */ jsx(Textarea, {
						id: "custom-instructions",
						placeholder: t("customInstructionsPlaceholder"),
						value: customInstructions,
						onChange: (e) => setCustomInstructions(e.target.value),
						disabled: isPolishing,
						rows: 2,
						className: cn("resize-none rounded-xl border", "bg-neutral-50 dark:bg-neutral-800/50", "border-neutral-200 dark:border-neutral-800", "text-neutral-700 dark:text-neutral-300", "placeholder:text-neutral-400 dark:placeholder:text-neutral-500")
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 px-3",
							children: [/* @__PURE__ */ jsx("div", { className: cn("w-1.5 h-1.5 rounded-full", "bg-neutral-500 dark:bg-neutral-600") }), /* @__PURE__ */ jsx("span", {
								className: cn("text-sm font-medium", "text-neutral-600 dark:text-neutral-400"),
								children: t("content.original")
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: cn("relative rounded-xl border", "bg-neutral-50 dark:bg-neutral-800/50", "border-neutral-200 dark:border-neutral-800", "p-6 h-[400px] overflow-auto shadow-sm"),
							children: /* @__PURE__ */ jsx(Streamdown, {
								className: cn("prose dark:prose-invert max-w-none", "text-neutral-700 dark:text-neutral-300"),
								children: turndownService.turndown(content)
							})
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 px-3",
							children: [/* @__PURE__ */ jsx("div", { className: cn("w-1.5 h-1.5 rounded-full", "bg-primary animate-pulse") }), /* @__PURE__ */ jsx("span", {
								className: cn("text-sm font-medium", "text-primary dark:text-primary-400"),
								children: t("content.polished")
							})]
						}), /* @__PURE__ */ jsx("div", {
							ref: polishedContentRef,
							className: cn("relative rounded-xl border", "bg-primary/[0.03] dark:bg-primary/[0.1]", "border-primary/20 dark:border-primary/30", "p-6 h-[400px] overflow-auto shadow-sm scroll-smooth"),
							children: /* @__PURE__ */ jsx(Streamdown, {
								animated: true,
								isAnimating: isPolishing,
								className: cn("prose dark:prose-invert max-w-none", "text-neutral-800 dark:text-neutral-200"),
								children: polishedContent
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(DialogFooter, {
					className: "mt-6 flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Button, {
						onClick: handlePolish,
						disabled: isPolishing,
						className: "flex-1 bg-gradient-to-r from-[#9333EA] to-[#EC4899] hover:opacity-90 text-white border-none h-11 shadow-lg shadow-purple-500/20",
						children: isPolishing ? /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), t("button.generating")]
						}) : !polishedContent ? t("button.start") : t("button.regenerate")
					}), /* @__PURE__ */ jsx(Button, {
						onClick: handleApply,
						disabled: !polishedContent || isPolishing,
						className: "flex-1 bg-primary hover:bg-primary/90 text-white h-11 shadow-lg shadow-primary/20",
						children: t("button.apply")
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/hooks/useAIConfiguration.tsx
var useAIConfiguration = () => {
	const router = useRouter();
	const t = useTranslations("previewDock.grammarCheck");
	const { isConfigured, selectedModel } = useAIConfigStore();
	const checkConfiguration = () => {
		if (!isConfigured()) {
			toast.error(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children: t("configurePrompt") }), /* @__PURE__ */ jsx(Button, {
				variant: "link",
				className: "p-0 h-auto ml-1 font-bold underline decoration-[#D97757]/30 underline-offset-4 text-[#D97757]",
				onClick: () => router.push("/app/dashboard/ai"),
				children: t("configureButton")
			})] }));
			return false;
		}
		return true;
	};
	return { checkConfiguration };
};
//#endregion
//#region src/components/ui/unified-date-input.tsx
function UnifiedDateInput({ value, onChange, label, isRequired, className }) {
	const parseValue = (input) => {
		if (!input) return null;
		try {
			let normalized = input.replace(/[./]/g, "-");
			if (normalized.length === 7) normalized = `${normalized}-01`;
			return parseDate(normalized);
		} catch {
			return null;
		}
	};
	const isPresent = value === "至今" || value === "Present" || value.includes("Present") || value.includes("至今");
	const [selectedDate, setSelectedDate] = useState(() => parseValue(value));
	useEffect(() => {
		setSelectedDate(parseValue(value));
	}, [value]);
	const handleDateChange = (date) => {
		setSelectedDate(date);
		if (!date) {
			onChange("");
			return;
		}
		const month = date.month.toString().padStart(2, "0");
		onChange(`${date.year}/${month}`);
	};
	return /* @__PURE__ */ jsx("div", {
		className,
		children: /* @__PURE__ */ jsx(HeroUIProvider, {
			locale: "ja-JP",
			children: /* @__PURE__ */ jsx(DateInput, {
				value: isPresent ? null : selectedDate,
				onChange: handleDateChange,
				isRequired,
				granularity: "month",
				variant: "bordered",
				labelPlacement: "outside",
				shouldForceLeadingZeros: true,
				isDisabled: isPresent,
				className: cn(isPresent && "opacity-50"),
				classNames: { inputWrapper: "shadow-sm hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary bg-background" }
			})
		})
	});
}
//#endregion
//#region src/components/ui/unified-date-range-input.tsx
var SEPARATOR = " - ";
var PRESENT_VALUES = new Set([
	"至今",
	"Present",
	"Now"
]);
var parsePart = (part) => {
	if (!part) return null;
	const cleanPart = part.trim();
	if (PRESENT_VALUES.has(cleanPart)) return null;
	try {
		let isoStr = cleanPart.replace(/[./]/g, "-");
		if (isoStr.length === 7) isoStr += "-01";
		if (isoStr.length === 4) isoStr += "-01-01";
		return parseDate(isoStr);
	} catch {
		return null;
	}
};
var parseRange = (rangeValue) => {
	if (!rangeValue) return {
		start: null,
		end: null
	};
	let startStr = "";
	let endStr = "";
	if (rangeValue.includes(SEPARATOR)) [startStr, endStr] = rangeValue.split(SEPARATOR);
	else {
		const match = rangeValue.match(/^([^\s]+)\s*(?:-|–|—)\s*([^\s]+)$/);
		if (match) {
			startStr = match[1];
			endStr = match[2];
		} else startStr = rangeValue;
	}
	return {
		start: parsePart(startStr),
		end: parsePart(endStr)
	};
};
function UnifiedDateRangeInput({ value, onChange, className }) {
	const [range, setRange] = useState(() => parseRange(value));
	const isPresent = value.includes("至今") || value.includes("Present");
	const updateValue = (newStart, newEnd) => {
		const format = (d) => `${d.year}/${d.month.toString().padStart(2, "0")}`;
		const startStr = newStart ? format(newStart) : "";
		const endStr = isPresent ? value.includes("至今") ? "至今" : "Present" : newEnd ? format(newEnd) : "";
		if (!startStr && !endStr) {
			onChange("");
			return;
		}
		if (startStr && !endStr) {
			onChange(startStr);
			return;
		}
		onChange(`${startStr}${SEPARATOR}${endStr}`);
	};
	const handleStartChange = (newStart) => {
		setRange((prev) => {
			const next = {
				start: newStart,
				end: prev.end
			};
			updateValue(next.start, next.end);
			return next;
		});
	};
	const handleEndChange = (newEnd) => {
		setRange((prev) => {
			const next = {
				start: prev.start,
				end: newEnd
			};
			updateValue(next.start, next.end);
			return next;
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("w-full", className),
		children: /* @__PURE__ */ jsx(HeroUIProvider, {
			locale: "ja-JP",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex-1",
						children: /* @__PURE__ */ jsx(DateInput, {
							value: range.start,
							onChange: handleStartChange,
							variant: "bordered",
							granularity: "month",
							shouldForceLeadingZeros: true,
							"aria-label": "Start Date",
							classNames: {
								inputWrapper: "bg-background hover:bg-muted/20 h-9 min-h-0 py-0 px-3 shadow-sm ring-1 ring-inset ring-input border-0",
								innerWrapper: "pb-0"
							}
						})
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-muted-foreground",
						children: "-"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex-1 relative",
						children: /* @__PURE__ */ jsx(DateInput, {
							value: isPresent ? null : range.end,
							onChange: handleEndChange,
							variant: "bordered",
							granularity: "month",
							shouldForceLeadingZeros: true,
							"aria-label": "End Date",
							isDisabled: isPresent,
							className: cn(isPresent && "opacity-50"),
							classNames: {
								inputWrapper: "bg-background hover:bg-muted/20 h-9 min-h-0 py-0 px-3 shadow-sm ring-1 ring-inset ring-input border-0",
								innerWrapper: "pb-0"
							}
						})
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/editor/Field.tsx
var Field = ({ label, value, onChange, type = "text", placeholder, required, className, showPresentSwitch }) => {
	const [yearInput, setYearInput] = useState("");
	const [displayMonth, setDisplayMonth] = useState(/* @__PURE__ */ new Date());
	const [fromDate, setFromDate] = useState(void 0);
	const [showPolishDialog, setShowPolishDialog] = useState(false);
	const { checkConfiguration } = useAIConfiguration();
	const t = useTranslations();
	const currentDate = useMemo(() => value ? new Date(value) : void 0, [value]);
	useEffect(() => {
		if (type === "date" && value) {
			const date = new Date(value);
			setYearInput(date.getFullYear().toString());
			setDisplayMonth(date);
		}
	}, [type, value]);
	useEffect(() => {
		if (type === "date") {
			if (!currentDate && fromDate) setFromDate(void 0);
			else if (currentDate && (!fromDate || currentDate.getTime() !== fromDate.getTime())) setFromDate(currentDate);
		}
	}, [
		type,
		currentDate,
		fromDate
	]);
	const isPresentValue = useMemo(() => {
		return value === t("field.toPresent") || value.endsWith(` - ${t("field.toPresent")}`);
	}, [value, t]);
	const handlePresentToggle = (checked) => {
		if (type === "date") onChange(checked ? t("field.toPresent") : "");
		else if (type === "date-range") {
			const [start] = value.split(" - ");
			onChange(checked ? [start, t("field.toPresent")].filter(Boolean).join(" - ") : start || "");
		}
	};
	const renderLabel = () => {
		if (!label) return null;
		return /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between mb-1.5 font-medium",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-sm text-foreground",
				children: label
			}), showPresentSwitch && /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Switch, {
					checked: isPresentValue,
					onCheckedChange: handlePresentToggle
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xs text-muted-foreground",
					children: t("field.toPresent")
				})]
			})]
		});
	};
	const inputStyles = cn("block w-full rounded-md border-0 py-1.5 px-3", "text-foreground bg-background", "shadow-sm ring-1 ring-inset ring-input", "placeholder:text-muted-foreground", "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary", "sm:text-sm sm:leading-6", className);
	if (type === "date") return /* @__PURE__ */ jsxs("div", {
		className: "block",
		children: [renderLabel(), /* @__PURE__ */ jsx(UnifiedDateInput, {
			value,
			onChange,
			placeholder,
			isRequired: required,
			className
		})]
	});
	if (type === "date-range") return /* @__PURE__ */ jsxs("div", {
		className: "block",
		children: [renderLabel(), /* @__PURE__ */ jsx(UnifiedDateRangeInput, {
			value,
			onChange,
			placeholder,
			className
		})]
	});
	if (type === "textarea") return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [renderLabel(), /* @__PURE__ */ jsx(motion.textarea, {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: inputStyles,
			required,
			rows: 4,
			whileHover: { scale: 1.005 },
			whileTap: { scale: .995 }
		})]
	});
	if (type === "editor") return /* @__PURE__ */ jsxs(motion.div, {
		className: "block",
		children: [
			renderLabel(),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1.5",
				children: /* @__PURE__ */ jsx(RichTextEditor, {
					content: value || "",
					onChange,
					placeholder,
					onPolish: () => {
						if (checkConfiguration()) setShowPolishDialog(true);
					}
				})
			}),
			/* @__PURE__ */ jsx(AIPolishDialog, {
				open: showPolishDialog,
				onOpenChange: setShowPolishDialog,
				content: value || "",
				onApply: (content) => {
					onChange(content);
				}
			})
		]
	});
	return /* @__PURE__ */ jsxs("label", {
		className: "block",
		children: [renderLabel(), /* @__PURE__ */ jsx(motion.input, {
			type: "text",
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: inputStyles,
			required,
			whileHover: { scale: 1.005 },
			whileTap: { scale: .995 }
		})]
	});
};
//#endregion
//#region src/components/editor/basic/BasicPanel.tsx
var itemAnimations = {
	initial: {
		opacity: 0,
		y: 0
	},
	animate: {
		opacity: 1,
		y: 0
	},
	exit: {
		opacity: 0,
		y: 0
	},
	transition: {
		type: "spring",
		stiffness: 500,
		damping: 50,
		mass: 1
	}
};
var CustomField = ({ field, onUpdate, onDelete, onReorderEnd }) => {
	const t = useTranslations("workbench.basicPanel");
	return /* @__PURE__ */ jsx(Reorder.Item, {
		value: field,
		id: field.id,
		className: "group touch-none list-none",
		onDragEnd: onReorderEnd,
		children: /* @__PURE__ */ jsxs(motion.div, {
			...itemAnimations,
			className: cn("grid grid-cols-[auto,auto,1fr,1fr,auto,auto] gap-3 items-center p-3", "bg-card rounded-xl", "border border-border", "transition-all duration-200", "hover:border-primary/20", !field.visible && "!opacity-60"),
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-4 h-4 cursor-grab active:cursor-grabbing", "text-muted-foreground", "transition-colors duration-200", "group-hover:text-foreground") })
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ jsx(IconSelector, {
						value: field.icon,
						onChange: (value) => onUpdate({
							...field,
							icon: value
						})
					})
				}),
				/* @__PURE__ */ jsx(Field, {
					value: field.label ?? "",
					onChange: (value) => onUpdate({
						...field,
						label: value
					}),
					placeholder: t("customFields.placeholders.label"),
					className: cn("bg-background/50", "border-border", "focus:border-primary", "placeholder-muted-foreground")
				}),
				/* @__PURE__ */ jsx(Field, {
					value: field.value,
					onChange: (value) => onUpdate({
						...field,
						value
					}),
					placeholder: t("customFields.placeholders.value"),
					className: cn("bg-background/50", "border-border", "focus:border-primary", "placeholder-muted-foreground")
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 whitespace-nowrap",
					children: [/* @__PURE__ */ jsx(Switch, {
						checked: field.displayLabel ?? false,
						onCheckedChange: (checked) => onUpdate({
							...field,
							displayLabel: checked
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: t("customFields.displayLabel")
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center space-x-1",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						className: cn("shrink-0 h-8 px-2", "text-muted-foreground", "hover:text-foreground"),
						onClick: () => onUpdate({
							...field,
							visible: !field.visible
						}),
						children: field.visible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onDelete(field.id),
						className: cn("shrink-0 h-8 px-2", "text-neutral-500 dark:text-neutral-400", "hover:text-red-600 dark:hover:text-red-400"),
						children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-red-400" })
					})]
				})
			]
		})
	});
};
var BasicPanel = () => {
	const { activeResume, updateBasicInfo } = useResumeStore();
	const { basic } = activeResume || {};
	const [customFields, setCustomFields] = useState(basic?.customFields?.map((field) => ({
		...field,
		visible: field.visible ?? true
	})) || []);
	const [basicFields, setBasicFields] = useState(() => {
		if (!basic?.fieldOrder) return DEFAULT_FIELD_ORDER;
		return basic.fieldOrder.map((field) => ({
			...field,
			visible: field.visible ?? true
		}));
	});
	const basicFieldsRef = useRef(basicFields);
	const customFieldsRef = useRef(customFields);
	const t = useTranslations("workbench.basicPanel");
	useEffect(() => {
		basicFieldsRef.current = basicFields;
	}, [basicFields]);
	useEffect(() => {
		customFieldsRef.current = customFields;
	}, [customFields]);
	const handleBasicReorder = (newOrder) => {
		basicFieldsRef.current = newOrder;
		setBasicFields(newOrder);
	};
	const commitBasicReorder = useCallback(() => {
		updateBasicInfo({ fieldOrder: basicFieldsRef.current });
	}, [updateBasicInfo]);
	const toggleFieldVisibility = (fieldId, isVisible) => {
		const newFields = basicFields.map((field) => field.id === fieldId ? {
			...field,
			visible: isVisible
		} : field);
		setBasicFields(newFields);
		updateBasicInfo({
			...basic,
			fieldOrder: newFields
		});
	};
	const deleteBasicField = (fieldId) => {
		const fieldToDelete = basicFields.find((field) => field.id === fieldId);
		if (fieldToDelete && (fieldToDelete.key === "name" || fieldToDelete.key === "title")) return;
		const updatedFields = basicFields.filter((field) => field.id !== fieldId);
		setBasicFields(updatedFields);
		updateBasicInfo({
			...basic,
			fieldOrder: updatedFields
		});
	};
	const addCustomField = () => {
		const fieldToAdd = {
			id: generateUUID(),
			label: "",
			value: "",
			icon: "User",
			visible: true,
			displayLabel: false
		};
		const updatedFields = [...customFields, fieldToAdd];
		setCustomFields(updatedFields);
		updateBasicInfo({
			...basic,
			customFields: updatedFields
		});
	};
	const updateCustomField = (updatedField) => {
		const updatedFields = customFields.map((field) => field.id === updatedField.id ? updatedField : field);
		setCustomFields(updatedFields);
		updateBasicInfo({
			...basic,
			customFields: updatedFields
		});
	};
	const deleteCustomField = (id) => {
		const updatedFields = customFields.filter((field) => field.id !== id);
		setCustomFields(updatedFields);
		updateBasicInfo({
			...basic,
			customFields: updatedFields
		});
	};
	const handleCustomFieldsReorder = (newOrder) => {
		customFieldsRef.current = newOrder;
		setCustomFields(newOrder);
	};
	const commitCustomFieldsReorder = useCallback(() => {
		updateBasicInfo({ customFields: customFieldsRef.current });
	}, [updateBasicInfo]);
	const renderBasicField = (field) => {
		const selectedIcon = basic?.icons?.[field.key] || "User";
		return /* @__PURE__ */ jsx(Reorder.Item, {
			value: field,
			id: field.id,
			className: "group touch-none list-none",
			dragListener: field.key !== "name" && field.key !== "title",
			onDragEnd: commitBasicReorder,
			children: /* @__PURE__ */ jsxs(motion.div, {
				...itemAnimations,
				className: cn("flex items-center gap-4 p-4 pr-3", "bg-card", "rounded-lg ", "transition-all duration-200", !field.visible && "opacity-75"),
				children: [
					field.key !== "name" && field.key !== "title" && /* @__PURE__ */ jsx("div", {
						className: "shrink-0",
						children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-5 h-5 cursor-grab active:cursor-grabbing", "text-muted-foreground", "hover:text-foreground", "transition-colors duration-200") })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-1 min-w-0 items-center",
						children: [
							field.key !== "name" && field.key !== "title" && /* @__PURE__ */ jsx(IconSelector, {
								value: selectedIcon,
								onChange: (value) => {
									updateBasicInfo({
										...basic,
										icons: {
											...basic?.icons || {},
											[field.key]: value
										}
									});
								}
							}),
							/* @__PURE__ */ jsx("div", {
								className: " w-[80px] ml-[4px] text-sm font-medium text-foreground",
								children: t(`basicFields.${field.key}`)
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex-1",
								children: /* @__PURE__ */ jsx(Field, {
									label: "",
									value: basic?.[field.key] ?? "",
									onChange: (value) => updateBasicInfo({
										...basic,
										[field.key]: value
									}),
									placeholder: `请输入${field.label}`,
									type: field.type
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("shrink-0 h-8 px-2", "text-neutral-500 dark:text-neutral-400", "hover:text-neutral-700 dark:hover:text-neutral-200"),
							onClick: () => toggleFieldVisibility(field.id, !field.visible),
							children: field.visible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
						}), field.key !== "name" && field.key !== "title" && /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("shrink-0 h-8 px-2", "text-neutral-500 dark:text-neutral-400", "hover:text-red-600 dark:hover:text-red-400"),
							onClick: () => deleteBasicField(field.id),
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-red-400" })
						})]
					})
				]
			})
		}, field.id);
	};
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-6 p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg font-medium",
					children: t("layout")
				}), /* @__PURE__ */ jsx("div", {
					className: " bg-card rounded-lg",
					children: /* @__PURE__ */ jsx(AlignSelector, {
						value: basic?.layout || "left",
						onChange: (value) => updateBasicInfo({
							...basic,
							layout: value
						})
					})
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ jsx("h2", {
						className: "text-lg font-medium",
						children: t("title")
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: /* @__PURE__ */ jsxs(motion.div, {
						className: "space-y-6",
						children: [/* @__PURE__ */ jsx(motion.div, {
							initial: {
								opacity: 0,
								y: 0
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "bg-card rounded-xl p-3 border border-border",
							children: /* @__PURE__ */ jsx(PhotoSelector, {})
						}), /* @__PURE__ */ jsxs(motion.div, {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsxs(motion.div, {
									className: "space-y-3",
									children: [/* @__PURE__ */ jsx(motion.h3, {
										className: "font-medium text-neutral-900 dark:text-neutral-200 px-1",
										children: t("basicField")
									}), /* @__PURE__ */ jsx(AnimatePresence, {
										mode: "popLayout",
										children: /* @__PURE__ */ jsx(Reorder.Group, {
											axis: "y",
											as: "div",
											values: basicFields,
											onReorder: handleBasicReorder,
											className: "space-y-3",
											children: basicFields.map((field) => renderBasicField(field))
										})
									})]
								}),
								/* @__PURE__ */ jsxs(motion.div, {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ jsx(motion.h3, {
											className: "font-medium text-neutral-900 dark:text-neutral-200 px-1",
											children: t("customField")
										}),
										/* @__PURE__ */ jsx(AnimatePresence, {
											mode: "popLayout",
											children: /* @__PURE__ */ jsx(Reorder.Group, {
												axis: "y",
												as: "div",
												values: customFields,
												onReorder: handleCustomFieldsReorder,
												className: "space-y-3",
												children: Array.isArray(customFields) && customFields.map((field) => /* @__PURE__ */ jsx(CustomField, {
													field,
													onUpdate: updateCustomField,
													onDelete: deleteCustomField,
													onReorderEnd: commitCustomFieldsReorder
												}, field.id))
											})
										}),
										/* @__PURE__ */ jsx(motion.div, {
											initial: { opacity: 0 },
											animate: { opacity: 1 },
											transition: { delay: .2 },
											children: /* @__PURE__ */ jsxs(Button, {
												onClick: addCustomField,
												className: "w-full mt-4",
												children: [/* @__PURE__ */ jsx(PlusCircle, { className: "w-4 h-4 mr-2" }), t("customFields.addButton")]
											})
										})
									]
								}),
								/* @__PURE__ */ jsx(motion.div, {
									className: "space-y-3",
									children: /* @__PURE__ */ jsxs(motion.div, {
										initial: { opacity: 0 },
										animate: { opacity: 1 },
										transition: { delay: .2 },
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx(motion.h3, {
												className: "font-medium text-neutral-900 dark:text-neutral-200 px-1",
												children: t("githubContributions")
											}), /* @__PURE__ */ jsx(Switch, {
												checked: basic?.githubContributionsVisible,
												onCheckedChange: (checked) => updateBasicInfo({
													...basic,
													githubContributionsVisible: checked
												})
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "mt-4",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center ml-3 space-x-2",
												children: [/* @__PURE__ */ jsx("div", {
													className: " w-[110px]",
													children: "Access Token"
												}), /* @__PURE__ */ jsx(Input, {
													placeholder: "请输入github access token",
													className: "flex-1",
													value: basic?.githubKey,
													onChange: (e) => updateBasicInfo({
														...basic,
														githubKey: e.target.value
													})
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center ml-3 mt-4 space-x-2",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-[110px]",
													children: "UseName"
												}), /* @__PURE__ */ jsx(Input, {
													className: "flex-1",
													placeholder: "请输入github username",
													value: basic?.githubUseName,
													onChange: (e) => updateBasicInfo({
														...basic,
														githubUseName: e.target.value
													})
												})]
											})]
										})]
									})
								})
							]
						})]
					})
				})]
			})]
		})
	});
};
//#endregion
//#region src/components/shared/ThemeModal.tsx
var ThemeModal = ({ isOpen, onClose, onConfirm, title }) => {
	const t = useTranslations("themeModal.delete");
	return /* @__PURE__ */ jsx(AlertDialog, {
		open: isOpen,
		onOpenChange: onClose,
		children: /* @__PURE__ */ jsxs(AlertDialogContent, {
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ jsxs(AlertDialogHeader, { children: [/* @__PURE__ */ jsx(AlertDialogTitle, { children: t("title") }), /* @__PURE__ */ jsx(AlertDialogDescription, { children: /* @__PURE__ */ jsxs("span", { children: [
				t.raw("description").split("{title}")[0],
				/* @__PURE__ */ jsx("span", {
					className: "px-1 font-semibold text-foreground",
					children: title
				}),
				t.raw("description").split("{title}")[1]
			] }) })] }), /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [/* @__PURE__ */ jsx(AlertDialogCancel, {
				onClick: onClose,
				children: t("cancelText")
			}), /* @__PURE__ */ jsx(AlertDialogAction, {
				onClick: (e) => {
					e.stopPropagation();
					onConfirm();
				},
				className: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 border-none",
				children: t("confirmText")
			})] })]
		})
	});
};
//#endregion
//#region src/components/editor/education/EducationItem.tsx
var EducationEditor = ({ education, onSave }) => {
	const t = useTranslations("workbench.educationItem");
	const handleChange = (field, value) => {
		onSave({
			...education,
			[field]: value
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsx(Field, {
						label: t("labels.school"),
						value: education.school,
						onChange: (value) => handleChange("school", value),
						placeholder: t("placeholders.school")
					}), /* @__PURE__ */ jsx(Field, {
						label: t("labels.major"),
						value: education.major,
						onChange: (value) => handleChange("major", value),
						placeholder: t("placeholders.major")
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsx(Field, {
						label: t("labels.degree"),
						value: education.degree,
						onChange: (value) => handleChange("degree", value),
						placeholder: t("placeholders.degree")
					}), /* @__PURE__ */ jsx(Field, {
						label: t("labels.gpa"),
						value: education.gpa || "",
						onChange: (value) => handleChange("gpa", value),
						placeholder: t("placeholders.gpa")
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsx(Field, {
						label: t("labels.startDate"),
						value: education.startDate,
						onChange: (value) => handleChange("startDate", value),
						type: "date",
						placeholder: "YYYY-MM"
					}), /* @__PURE__ */ jsx(Field, {
						label: t("labels.endDate"),
						value: education.endDate,
						onChange: (value) => handleChange("endDate", value),
						type: "date",
						placeholder: "YYYY-MM",
						showPresentSwitch: true
					})]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: t("labels.description"),
					value: education.description,
					onChange: (value) => handleChange("description", value),
					type: "editor",
					placeholder: t("placeholders.description")
				})
			]
		})
	});
};
var EducationItem = ({ education }) => {
	const { updateEducation, deleteEducation } = useResumeStore();
	const dragControls = useDragControls();
	const [expandedId, setExpandedId] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const handleVisibilityToggle = useCallback((e) => {
		e.stopPropagation();
		if (isUpdating) return;
		setIsUpdating(true);
		setTimeout(() => {
			updateEducation({
				...education,
				visible: !education.visible
			});
			setIsUpdating(false);
		}, 10);
	}, [
		education,
		updateEducation,
		isUpdating
	]);
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		id: education.id,
		value: education,
		dragListener: false,
		dragControls,
		className: cn("rounded-lg border overflow-hidden flex group", "bg-card hover:border-primary/50", "border-border"),
		children: [/* @__PURE__ */ jsx("div", {
			onPointerDown: (event) => {
				if (expandedId === education.id) return;
				dragControls.start(event);
			},
			className: cn("w-12 flex items-center justify-center border-r shrink-0 touch-none", "dark:border-neutral-800", "border-border", expandedId === education.id ? "cursor-not-allowed" : "cursor-grab hover:bg-muted/50"),
			children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-4 h-4", "text-muted-foreground", expandedId === education.id && "opacity-50", "transform transition-transform group-hover:scale-110") })
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("px-4 py-4 flex items-center justify-between", expandedId === education.id && "bg-muted/10", "cursor-pointer select-none"),
				onClick: (e) => {
					if (expandedId === education.id) setExpandedId(null);
					else setExpandedId(education.id);
				},
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-1 min-w-0",
					children: /* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: cn("font-medium truncate", "text-foreground"),
							children: education.school || "未填写学校"
						}), (education.major || education.degree) && /* @__PURE__ */ jsx("p", {
							className: cn("text-sm truncate", "dark:text-neutral-400", "text-gray-500"),
							children: [education.major, education.degree].filter(Boolean).join(" · ")
						})] })
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 ml-4 shrink-0",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							disabled: isUpdating,
							className: cn("text-sm"),
							onClick: handleVisibilityToggle,
							children: education.visible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("text-sm", "dark:hover:bg-red-900/50 dark:text-red-400 hover:bg-red-50 text-red-600"),
							onClick: (e) => {
								e.stopPropagation();
								setDeleteDialogOpen(true);
							},
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(ThemeModal, {
							isOpen: deleteDialogOpen,
							title: education.school,
							onClose: () => setDeleteDialogOpen(false),
							onConfirm: () => {
								deleteEducation(education.id);
								setExpandedId(null);
								setDeleteDialogOpen(false);
							}
						}),
						/* @__PURE__ */ jsx(motion.div, {
							initial: false,
							animate: { rotate: expandedId === education.id ? 180 : 0 },
							children: /* @__PURE__ */ jsx(ChevronDown, { className: cn("w-5 h-5", "text-muted-foreground") })
						})
					]
				})]
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedId === education.id && /* @__PURE__ */ jsx(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: { duration: .2 },
				className: "overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: cn("px-4 pb-4 space-y-4", "border-border"),
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsx("div", { className: cn("h-px w-full", "bg-border") }), /* @__PURE__ */ jsx(EducationEditor, {
						education,
						onSave: updateEducation,
						onDelete: () => {
							deleteEducation(education.id);
							setExpandedId(null);
						},
						onCancel: () => setExpandedId(null)
					})]
				})
			}) })]
		})]
	});
};
//#endregion
//#region src/components/editor/education/EducationPanel.tsx
var EducationPanel = () => {
	const t = useTranslations("workbench.educationPanel");
	const { activeResume, updateEducation, updateEducationBatch } = useResumeStore();
	const { education = [] } = activeResume || {};
	const handleCreateProject = () => {
		updateEducation({
			id: generateUUID(),
			school: t("defaultProject.school"),
			major: t("defaultProject.major"),
			degree: t("defaultProject.degree"),
			startDate: "2015-09-01",
			endDate: "2019-06-30",
			description: "",
			visible: true
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("space-y-4 px-4 py-4 rounded-lg", "dark:bg-neutral-900/30"),
		children: /* @__PURE__ */ jsxs(Reorder.Group, {
			axis: "y",
			values: education,
			onReorder: (newOrder) => {
				updateEducationBatch(newOrder);
			},
			className: "space-y-3",
			children: [(education || []).map((education) => /* @__PURE__ */ jsx(EducationItem, { education }, education.id)), /* @__PURE__ */ jsxs(Button, {
				onClick: handleCreateProject,
				className: "w-full",
				children: [/* @__PURE__ */ jsx(PlusCircle, { className: "w-4 h-4 mr-2" }), t("addButton")]
			})]
		})
	});
};
//#endregion
//#region src/components/editor/project/ProjectItem.tsx
var ProjectEditor$1 = ({ project, onSave }) => {
	const t = useTranslations("workbench.projectItem");
	const handleChange = (field, value) => {
		onSave({
			...project,
			[field]: value
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ jsx(Field, {
						label: t("labels.name"),
						value: project.name,
						onChange: (value) => handleChange("name", value),
						placeholder: t("placeholders.name")
					}), /* @__PURE__ */ jsx(Field, {
						label: t("labels.role"),
						value: project.role,
						onChange: (value) => handleChange("role", value),
						placeholder: t("placeholders.role")
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-center justify-between font-medium",
						children: /* @__PURE__ */ jsx("span", {
							className: "text-sm text-foreground",
							children: t("labels.link")
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-input bg-background/40 p-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-3 md:grid-cols-2",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "block space-y-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: t("labels.link")
								}), /* @__PURE__ */ jsx(Input, {
									type: "text",
									value: project.link || "",
									onChange: (e) => handleChange("link", e.target.value),
									placeholder: t("placeholders.link")
								})]
							}), /* @__PURE__ */ jsxs("label", {
								className: "block space-y-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground",
									children: t("labels.linkLabel")
								}), /* @__PURE__ */ jsx(Input, {
									type: "text",
									value: project.linkLabel || "",
									onChange: (e) => handleChange("linkLabel", e.target.value),
									placeholder: t("placeholders.linkLabel")
								})]
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: t("hints.linkLabel")
						})]
					})]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: t("labels.date"),
					value: project.date,
					onChange: (value) => handleChange("date", value),
					type: "date-range",
					placeholder: t("placeholders.date"),
					showPresentSwitch: true
				}),
				/* @__PURE__ */ jsx(Field, {
					label: t("labels.description"),
					value: project.description,
					onChange: (value) => handleChange("description", value),
					type: "editor",
					placeholder: t("placeholders.description")
				})
			]
		})
	});
};
var ProjectItem = ({ project }) => {
	const { updateProjects, deleteProject, setDraggingProjectId } = useResumeStore();
	const dragControls = useDragControls();
	const [expandedId, setExpandedId] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const handleVisibilityToggle = useCallback((e) => {
		e.stopPropagation();
		if (isUpdating) return;
		setIsUpdating(true);
		setTimeout(() => {
			updateProjects({
				...project,
				visible: !project.visible
			});
			setIsUpdating(false);
		}, 10);
	}, [
		project,
		updateProjects,
		isUpdating
	]);
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		id: project.id,
		value: project,
		dragListener: false,
		dragControls,
		onDragEnd: () => {
			setDraggingProjectId(null);
		},
		className: cn("rounded-lg border overflow-hidden flex group", "bg-card hover:border-primary/50", "border-border"),
		children: [/* @__PURE__ */ jsx("div", {
			onPointerDown: (event) => {
				if (expandedId === project.id) return;
				dragControls.start(event);
				setDraggingProjectId(project.id);
			},
			onPointerUp: () => {
				setDraggingProjectId(null);
			},
			onPointerCancel: () => {
				setDraggingProjectId(null);
			},
			className: cn("w-12 flex items-center justify-center border-r shrink-0 touch-none", "border-border", expandedId === project.id ? "cursor-not-allowed" : "cursor-grab hover:bg-muted/50"),
			children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-4 h-4", "text-muted-foreground", expandedId === project.id && "opacity-50", "transform transition-transform group-hover:scale-110") })
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("px-4 py-4 flex items-center justify-between", expandedId === project.id && "bg-muted/10", "cursor-pointer select-none"),
				onClick: (e) => {
					if (expandedId === project.id) setExpandedId(null);
					else setExpandedId(project.id);
				},
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-1 min-w-0",
					children: /* @__PURE__ */ jsx("h3", {
						className: cn("font-medium truncate", "text-gray-700 dark:text-neutral-200"),
						children: project.name || "未命名项目"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 ml-4 shrink-0",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							disabled: isUpdating,
							className: cn("text-sm", project.visible ? "hover:bg-gray-100 text-gray-500 dark:hover:bg-neutral-800 dark:text-neutral-400" : "hover:bg-gray-100 text-gray-400 dark:hover:bg-neutral-800 dark:text-neutral-600"),
							onClick: handleVisibilityToggle,
							children: project.visible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("text-sm", "dark:hover:bg-red-900/50 dark:text-red-400 hover:bg-red-50 text-red-600"),
							onClick: (e) => {
								e.stopPropagation();
								setDeleteDialogOpen(true);
							},
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(ThemeModal, {
							isOpen: deleteDialogOpen,
							title: project.name,
							onClose: () => setDeleteDialogOpen(false),
							onConfirm: () => {
								deleteProject(project.id);
								setExpandedId(null);
								setDeleteDialogOpen(false);
							}
						}),
						/* @__PURE__ */ jsx(motion.div, {
							initial: false,
							animate: { rotate: expandedId === project.id ? 180 : 0 },
							children: /* @__PURE__ */ jsx(ChevronDown, { className: cn("w-5 h-5", "dark:text-neutral-400", "text-gray-500") })
						})
					]
				})]
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedId === project.id && /* @__PURE__ */ jsx(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: { duration: .2 },
				className: "overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: cn("px-4 pb-4 space-y-4", "dark:border-neutral-800 border-gray-100"),
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsx("div", { className: cn("h-px w-full", "dark:bg-neutral-800 bg-gray-100") }), /* @__PURE__ */ jsx(ProjectEditor$1, {
						project,
						onSave: (updatedProject) => {
							updateProjects(updatedProject);
						},
						onDelete: () => {
							deleteProject(project.id);
							setExpandedId(null);
						},
						onCancel: () => setExpandedId(null)
					})]
				})
			}) })]
		})]
	});
};
//#endregion
//#region src/components/editor/project/ProjectPanel.tsx
var ProjectPanel = () => {
	const t = useTranslations("workbench.projectPanel");
	const { activeResume, updateProjects, updateProjectsBatch } = useResumeStore();
	const { projects = [] } = activeResume || {};
	const handleCreateProject = () => {
		updateProjects({
			id: generateUUID(),
			name: t("defaultProject.name"),
			role: t("defaultProject.role"),
			date: t("defaultProject.date"),
			description: t("defaultProject.description"),
			visible: true
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("space-y-4 px-4 py-4 rounded-lg", "bg-card border-border"),
		children: /* @__PURE__ */ jsxs(Reorder.Group, {
			axis: "y",
			values: projects,
			onReorder: (newOrder) => {
				updateProjectsBatch(newOrder);
			},
			className: "space-y-3",
			children: [projects.map((project) => /* @__PURE__ */ jsx(ProjectItem, { project }, project.id)), /* @__PURE__ */ jsxs(Button, {
				onClick: handleCreateProject,
				className: "w-full",
				children: [/* @__PURE__ */ jsx(PlusCircle, { className: "w-4 h-4 mr-2" }), t("addButton")]
			})]
		})
	});
};
//#endregion
//#region src/components/editor/experience/ExperienceItem.tsx
var ProjectEditor = ({ experience, onSave }) => {
	const t = useTranslations("workbench.experienceItem");
	const handleChange = (field, value) => {
		onSave({
			...experience,
			[field]: value
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsx(Field, {
						label: t("labels.company"),
						value: experience.company,
						onChange: (value) => handleChange("company", value),
						placeholder: t("placeholders.company")
					}), /* @__PURE__ */ jsx(Field, {
						label: t("labels.position"),
						value: experience.position,
						onChange: (value) => handleChange("position", value),
						placeholder: t("placeholders.position")
					})]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: t("labels.date"),
					value: experience.date,
					onChange: (value) => handleChange("date", value),
					type: "date-range",
					placeholder: t("placeholders.date"),
					showPresentSwitch: true
				}),
				/* @__PURE__ */ jsx(Field, {
					label: t("labels.details"),
					value: experience.details,
					onChange: (value) => handleChange("details", value),
					type: "editor",
					placeholder: t("placeholders.details")
				})
			]
		})
	});
};
var ExperienceItem = ({ experience }) => {
	const dragControls = useDragControls();
	const [expandedId, setExpandedId] = useState(null);
	const { updateExperience, deleteExperience } = useResumeStore();
	const [isUpdating, setIsUpdating] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const handleVisibilityToggle = useCallback((e) => {
		e.stopPropagation();
		if (isUpdating) return;
		setIsUpdating(true);
		setTimeout(() => {
			updateExperience({
				...experience,
				visible: !experience.visible
			});
			setIsUpdating(false);
		}, 10);
	}, [
		experience,
		updateExperience,
		isUpdating
	]);
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		id: experience.id,
		value: experience,
		dragListener: false,
		dragControls,
		className: cn("rounded-lg border overflow-hidden flex group", "bg-card hover:border-primary/20", "border-border"),
		children: [/* @__PURE__ */ jsx("div", {
			onPointerDown: (event) => {
				if (expandedId === experience.id) return;
				dragControls.start(event);
			},
			className: cn("w-12 flex items-center justify-center border-r shrink-0 touch-none", "border-border", expandedId === experience.id ? "cursor-not-allowed" : "cursor-grab hover:bg-muted/50"),
			children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-4 h-4", "text-muted-foreground", expandedId === experience.id && "opacity-50", "transform transition-transform group-hover:scale-110") })
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("px-4 py-4 flex items-center justify-between", expandedId === experience.id && "bg-muted/10", "cursor-pointer select-none"),
				onClick: (e) => {
					if (expandedId === experience.id) setExpandedId(null);
					else setExpandedId(experience.id);
				},
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-1 min-w-0",
					children: /* @__PURE__ */ jsx("h3", {
						className: cn("font-medium truncate", "text-foreground"),
						children: experience.company || "家里蹲公司"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 ml-4 shrink-0",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							disabled: isUpdating,
							className: cn("text-sm", experience.visible ? "hover:bg-gray-100 text-gray-500 dark:hover:bg-neutral-800 dark:text-neutral-400" : "hover:bg-gray-100 text-gray-400 dark:hover:bg-neutral-800 dark:text-neutral-600"),
							onClick: handleVisibilityToggle,
							children: experience.visible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("text-sm", "dark:hover:bg-red-900/50 dark:text-red-400 hover:bg-red-50 text-red-600"),
							onClick: (e) => {
								e.stopPropagation();
								setDeleteDialogOpen(true);
							},
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(ThemeModal, {
							isOpen: deleteDialogOpen,
							title: experience.company,
							onClose: () => setDeleteDialogOpen(false),
							onConfirm: () => {
								deleteExperience(experience.id);
								setExpandedId(null);
								setDeleteDialogOpen(false);
							}
						}),
						/* @__PURE__ */ jsx(motion.div, {
							initial: false,
							animate: { rotate: expandedId === experience.id ? 180 : 0 },
							children: /* @__PURE__ */ jsx(ChevronDown, { className: cn("w-5 h-5", "text-muted-foreground") })
						})
					]
				})]
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedId === experience.id && /* @__PURE__ */ jsx(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: { duration: .2 },
				className: "overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: cn("px-4 pb-4 space-y-4", "border-border"),
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsx("div", { className: cn("h-px w-full", "bg-border") }), /* @__PURE__ */ jsx(ProjectEditor, {
						experience,
						onSave: updateExperience,
						onDelete: () => {
							deleteExperience(experience.id);
							setExpandedId(null);
						},
						onCancel: () => setExpandedId(null)
					})]
				})
			}) })]
		})]
	});
};
//#endregion
//#region src/components/editor/experience/ExperiencePanel.tsx
var ExperiencePanel = () => {
	const t = useTranslations("workbench.experiencePanel");
	const { activeResume, updateExperience, updateExperienceBatch } = useResumeStore();
	const { experience = [] } = activeResume || {};
	const handleCreateProject = () => {
		updateExperience({
			id: generateUUID(),
			company: t("defaultProject.company"),
			position: t("defaultProject.position"),
			date: t("defaultProject.date"),
			details: t("defaultProject.details"),
			visible: true
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("space-y-4 px-4 py-4 rounded-lg", "bg-card border-border"),
		children: /* @__PURE__ */ jsxs(Reorder.Group, {
			axis: "y",
			values: experience,
			onReorder: (newOrder) => {
				updateExperienceBatch(newOrder);
			},
			className: "space-y-3",
			children: [experience.map((item) => /* @__PURE__ */ jsx(ExperienceItem, { experience: item }, item.id)), /* @__PURE__ */ jsxs(Button, {
				onClick: handleCreateProject,
				className: "w-full",
				children: [/* @__PURE__ */ jsx(PlusCircle, { className: "w-4 h-4 mr-2" }), t("addButton")]
			})]
		})
	});
};
//#endregion
//#region src/components/editor/custom/CustomItem.tsx
var CustomItemEditor = ({ item, onSave }) => {
	const handleChange = (field, value) => {
		onSave({
			...item,
			[field]: value
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ jsx(Field, {
						label: "标题",
						value: item.title,
						onChange: (value) => handleChange("title", value),
						placeholder: "标题"
					}), /* @__PURE__ */ jsx(Field, {
						label: "副标题",
						value: item.subtitle,
						onChange: (value) => handleChange("subtitle", value),
						placeholder: "副标题"
					})]
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "时间范围",
					value: item.dateRange,
					onChange: (value) => handleChange("dateRange", value),
					type: "date-range",
					placeholder: "例如: 2023.01 - 2024.01"
				}),
				/* @__PURE__ */ jsx(Field, {
					label: "详细描述",
					value: item.description,
					onChange: (value) => handleChange("description", value),
					type: "editor",
					placeholder: "请输入详细描述..."
				})
			]
		})
	});
};
var CustomItem = ({ item, sectionId }) => {
	const { updateCustomItem, removeCustomItem } = useResumeStore();
	const dragControls = useDragControls();
	const [expandedId, setExpandedId] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const handleVisibilityToggle = useCallback((e) => {
		e.stopPropagation();
		if (isUpdating) return;
		setIsUpdating(true);
		setTimeout(() => {
			updateCustomItem(sectionId, item.id, { visible: !item.visible });
			setIsUpdating(false);
		}, 10);
	}, [
		item,
		updateCustomItem,
		isUpdating,
		sectionId
	]);
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		id: item.id,
		value: item,
		dragListener: false,
		dragControls,
		className: cn("rounded-lg border overflow-hidden flex group", "bg-card hover:border-primary/50", "border-border"),
		children: [/* @__PURE__ */ jsx("div", {
			onPointerDown: (event) => {
				if (expandedId === item.id) return;
				dragControls.start(event);
			},
			className: cn("w-12 flex items-center justify-center border-r shrink-0 touch-none", "border-border", expandedId === item.id ? "cursor-not-allowed" : "cursor-grab hover:bg-muted/50"),
			children: /* @__PURE__ */ jsx(GripVertical, { className: cn("w-4 h-4", "text-muted-foreground", expandedId === item.id && "opacity-50") })
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("px-4 py-4 flex items-center justify-between cursor-pointer select-none", expandedId === item.id && "bg-muted/10"),
				onClick: () => setExpandedId(expandedId === item.id ? null : item.id),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ jsx("h3", {
						className: cn("font-medium truncate text-foreground"),
						children: item.title || "未命名模块"
					}), item.subtitle && /* @__PURE__ */ jsx("p", {
						className: cn("text-sm truncate", "dark:text-neutral-400 text-gray-500"),
						children: item.subtitle
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 ml-4 shrink-0",
					children: [
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							disabled: isUpdating,
							onClick: handleVisibilityToggle,
							children: item.visible ? /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: cn("text-sm", "dark:hover:bg-red-900/50 dark:text-red-400 hover:bg-red-50 text-red-600"),
							onClick: (e) => {
								e.stopPropagation();
								setDeleteDialogOpen(true);
							},
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
						}),
						/* @__PURE__ */ jsx(ThemeModal, {
							isOpen: deleteDialogOpen,
							title: item.title,
							onClose: () => setDeleteDialogOpen(false),
							onConfirm: () => {
								removeCustomItem(sectionId, item.id);
								setExpandedId(null);
								setDeleteDialogOpen(false);
							}
						}),
						/* @__PURE__ */ jsx(motion.div, {
							initial: false,
							animate: { rotate: expandedId === item.id ? 180 : 0 },
							children: /* @__PURE__ */ jsx(ChevronDown, { className: cn("w-5 h-5", "text-muted-foreground") })
						})
					]
				})]
			}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedId === item.id && /* @__PURE__ */ jsx(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				transition: { duration: .2 },
				className: "overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: cn("px-4 pb-4 space-y-4", "border-border"),
					children: [/* @__PURE__ */ jsx("div", { className: cn("h-px w-full", "bg-border") }), /* @__PURE__ */ jsx(CustomItemEditor, {
						item,
						onSave: (updatedItem) => {
							updateCustomItem(sectionId, item.id, updatedItem);
						}
					})]
				})
			}) })]
		})]
	});
};
//#endregion
//#region src/components/editor/custom/CustomPanel.tsx
var CustomPanel = memo(({ sectionId }) => {
	const { addCustomItem, updateCustomData, activeResume } = useResumeStore();
	const { customData } = activeResume || {};
	const items = customData?.[sectionId] || [];
	const handleCreateItem = () => {
		addCustomItem(sectionId);
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("space-y-4 px-4 py-4 rounded-lg", "bg-card"),
		children: /* @__PURE__ */ jsxs(Reorder.Group, {
			axis: "y",
			values: items,
			onReorder: (newOrder) => {
				updateCustomData(sectionId, newOrder);
			},
			className: "space-y-3",
			children: [items.map((item) => /* @__PURE__ */ jsx(CustomItem, {
				item,
				sectionId
			}, item.id)), /* @__PURE__ */ jsxs(Button, {
				onClick: handleCreateItem,
				className: cn("w-full"),
				children: [/* @__PURE__ */ jsx(PlusCircle, { className: "w-4 h-4 mr-2" }), "添加"]
			})]
		})
	});
});
CustomPanel.displayName = "CustomPanel";
//#endregion
//#region src/components/editor/skills/SkillPanel.tsx
var SkillPanel = () => {
	const { activeResume, updateSkillContent } = useResumeStore();
	const { skillContent } = activeResume || {};
	const handleChange = (value) => {
		updateSkillContent(value);
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("rounded-lg border p-4", "bg-card", "border-border"),
		children: /* @__PURE__ */ jsx(Field, {
			value: skillContent,
			onChange: handleChange,
			type: "editor",
			placeholder: "描述你的技能、专长等..."
		})
	});
};
//#endregion
//#region src/components/editor/self-evaluation/SelfEvaluationPanel.tsx
var SelfEvaluationPanel = () => {
	const { activeResume, updateSelfEvaluationContent } = useResumeStore();
	const selfEvaluationContent = activeResume?.selfEvaluationContent ?? "";
	const handleChange = (value) => {
		updateSelfEvaluationContent(value);
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("rounded-lg border p-4", "bg-card", "border-border"),
		children: /* @__PURE__ */ jsx(Field, {
			value: selfEvaluationContent,
			onChange: handleChange,
			type: "editor",
			placeholder: "描述你的自我评价..."
		})
	});
};
//#endregion
//#region src/components/editor/certificates/CertificateItem.tsx
var CertificateItem = ({ certificate }) => {
	const { updateCertificate, removeCertificate, setDraggingProjectId } = useResumeStore();
	const dragControls = useDragControls();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const t = useTranslations("workbench.certificatesPanel");
	return /* @__PURE__ */ jsxs(Reorder.Item, {
		id: certificate.id,
		value: certificate,
		dragListener: false,
		dragControls,
		onDragEnd: () => setDraggingProjectId(null),
		className: cn("rounded-lg border overflow-hidden flex flex-col group", "bg-card hover:border-primary/50 border-border"),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex h-24",
			children: [
				/* @__PURE__ */ jsx("div", {
					onPointerDown: (e) => {
						dragControls.start(e);
						setDraggingProjectId(certificate.id);
					},
					onPointerUp: () => setDraggingProjectId(null),
					onPointerCancel: () => setDraggingProjectId(null),
					className: cn("w-8 flex items-center justify-center border-r shrink-0 touch-none", "border-border cursor-grab hover:bg-muted/50"),
					children: /* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground transition-transform group-hover:scale-110" })
				}),
				/* @__PURE__ */ jsx("div", {
					className: "w-24 border-r border-border shrink-0 bg-muted/20 p-2 flex items-center justify-center overflow-hidden",
					children: /* @__PURE__ */ jsx("img", {
						src: certificate.url,
						alt: "cert",
						className: "max-w-full max-h-full object-contain drop-shadow-sm"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 min-w-0 p-4 flex flex-col justify-center gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-sm font-medium",
							children: [
								t("width"),
								": ",
								certificate.width,
								"%"
							]
						}), /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							className: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 -mr-2",
							onClick: () => setDeleteDialogOpen(true),
							children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ jsx(Slider, {
						value: [certificate.width],
						min: 10,
						max: 100,
						step: 5,
						onValueChange: ([val]) => updateCertificate(certificate.id, { width: val })
					})]
				})
			]
		}), /* @__PURE__ */ jsx(ThemeModal, {
			isOpen: deleteDialogOpen,
			title: t("delete"),
			onClose: () => setDeleteDialogOpen(false),
			onConfirm: () => {
				removeCertificate(certificate.id);
				setDeleteDialogOpen(false);
			}
		})]
	});
};
//#endregion
//#region src/components/editor/certificates/CertificatesPanel.tsx
var CertificatesPanel = () => {
	const t = useTranslations("workbench.certificatesPanel");
	const { activeResume, updateCertificatesBatch, addCertificate } = useResumeStore();
	const { certificates = [], activeSection } = activeResume || {};
	const fileInputRef = useRef(null);
	const handleCreateCertificate = (url) => {
		addCertificate({
			id: generateUUID(),
			url,
			width: 100
		});
	};
	const handleFile = async (file) => {
		if (!file.type.startsWith("image/")) {
			toast.error("Format error");
			return;
		}
		try {
			let imageData;
			if (file.size > 2 * 1024 * 1024) {
				imageData = await compressImage(file, 800, 800, .7);
				let compressedSize = estimateBase64Size(imageData);
				if (compressedSize > 2 * 1024 * 1024) {
					imageData = await compressImage(file, 600, 600, .5);
					compressedSize = estimateBase64Size(imageData);
					if (compressedSize > 2 * 1024 * 1024) imageData = await compressImage(file, 400, 400, .4);
				}
			} else imageData = await compressImage(file, 1200, 1200, .8);
			handleCreateCertificate(imageData);
		} catch (e) {
			toast.error("Upload error");
		}
	};
	useEffect(() => {
		if (activeSection !== "certificates") return;
		const handlePaste = (e) => {
			const items = e.clipboardData?.items;
			if (!items) return;
			for (let i = 0; i < items.length; i++) if (items[i].type.indexOf("image") !== -1) {
				const blob = items[i].getAsFile();
				if (blob) {
					handleFile(blob);
					e.preventDefault();
					break;
				}
			}
		};
		document.addEventListener("paste", handlePaste);
		return () => document.removeEventListener("paste", handlePaste);
	}, [activeSection]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("space-y-4 px-4 py-4 rounded-lg bg-card border-border"),
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-gray-500",
				children: t("tips")
			}),
			certificates.length === 0 && /* @__PURE__ */ jsx("div", {
				className: "py-8 text-center text-sm text-gray-400 border border-dashed rounded-lg",
				children: t("empty")
			}),
			/* @__PURE__ */ jsx("input", {
				type: "file",
				ref: fileInputRef,
				className: "hidden",
				accept: "image/*",
				multiple: true,
				onChange: (e) => {
					const files = e.target.files;
					if (files) Array.from(files).forEach((file) => handleFile(file));
					if (fileInputRef.current) fileInputRef.current.value = "";
				}
			}),
			/* @__PURE__ */ jsxs(Reorder.Group, {
				axis: "y",
				values: certificates,
				onReorder: updateCertificatesBatch,
				className: "space-y-3",
				children: [certificates.map((cert) => /* @__PURE__ */ jsx(CertificateItem, { certificate: cert }, cert.id)), /* @__PURE__ */ jsxs(Button, {
					onClick: () => fileInputRef.current?.click(),
					className: "w-full",
					children: [/* @__PURE__ */ jsx(ImagePlus, { className: "w-4 h-4 mr-2" }), t("addButton")]
				})]
			})
		]
	});
};
//#endregion
//#region src/components/editor/EditPanel.tsx
function EditPanel() {
	const { activeResume, updateMenuSections } = useResumeStore();
	if (!activeResume) return;
	const { activeSection = "", menuSections = [] } = activeResume || {};
	const renderFields = () => {
		switch (activeSection) {
			case "basic": return /* @__PURE__ */ jsx(BasicPanel, {});
			case "projects": return /* @__PURE__ */ jsx(ProjectPanel, {});
			case "education": return /* @__PURE__ */ jsx(EducationPanel, {});
			case "experience": return /* @__PURE__ */ jsx(ExperiencePanel, {});
			case "skills": return /* @__PURE__ */ jsx(SkillPanel, {});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationPanel, {});
			case "certificates": return /* @__PURE__ */ jsx(CertificatesPanel, {});
			default: if (activeSection?.startsWith("custom")) return /* @__PURE__ */ jsx(CustomPanel, { sectionId: activeSection });
			else return /* @__PURE__ */ jsx(BasicPanel, {});
		}
	};
	return /* @__PURE__ */ jsx(motion.div, {
		className: cn("w-full h-full border-r overflow-y-auto", "bg-background border-border"),
		children: /* @__PURE__ */ jsxs("div", {
			className: "p-4",
			children: [/* @__PURE__ */ jsx(motion.div, {
				className: cn("mb-4 p-4 rounded-lg border", "bg-card border-border"),
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-lg",
						children: menuSections?.find((s) => s.id === activeSection)?.icon
					}), activeSection === "basic" ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", {
						className: "text-lg font-semibold text-primary",
						children: menuSections?.find((s) => s.id === activeSection)?.title
					}) }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("input", {
						className: cn("flex-1 text-lg  font-medium  text-primary border-black  bg-transparent outline-none   pb-1 text-primary"),
						type: "text",
						value: menuSections?.find((s) => s.id === activeSection)?.title,
						onChange: (e) => {
							updateMenuSections(menuSections.map((s) => {
								if (s.id === activeSection) return {
									...s,
									title: e.target.value
								};
								return s;
							}));
						}
					}), /* @__PURE__ */ jsx(TooltipProvider, {
						delayDuration: 300,
						children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(Pencil, {
							size: 16,
							className: "text-primary"
						}) }), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: "点击文字部分即可聚焦编辑" }) })] })
					})] })]
				})
			}), /* @__PURE__ */ jsx(motion.div, {
				className: cn("rounded-lg", "bg-card border-border"),
				children: renderFields()
			})]
		})
	});
}
//#endregion
//#region src/hooks/useAutoOnePage.ts
var A4_HEIGHT_PX = 297 * 3.78;
var MIN_SCALE = .9;
function useAutoOnePage({ contentHeight, pagePadding, enabled }) {
	return useMemo(() => {
		if (!enabled || contentHeight <= 0) return {
			scaleFactor: 1,
			isScaled: false,
			cannotFit: false
		};
		const availableHeight = A4_HEIGHT_PX - 2 * pagePadding;
		const actualContentHeight = contentHeight - 2 * pagePadding;
		if (actualContentHeight <= availableHeight) return {
			scaleFactor: 1,
			isScaled: false,
			cannotFit: false
		};
		const idealScale = availableHeight / actualContentHeight;
		if (idealScale >= MIN_SCALE) return {
			scaleFactor: idealScale,
			isScaled: true,
			cannotFit: false
		};
		return {
			scaleFactor: MIN_SCALE,
			isScaled: true,
			cannotFit: true
		};
	}, [
		contentHeight,
		pagePadding,
		enabled
	]);
}
//#endregion
//#region src/components/preview/index.tsx
var PageBreakLine = React.memo(({ pageNumber, contentPerPagePx, pagePadding }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "absolute left-0 right-0 pointer-events-none page-break-line",
		style: { top: `${pagePadding + pageNumber * contentPerPagePx}px` },
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative w-full",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute w-full border-t-2 border-dashed border-red-400" }), /* @__PURE__ */ jsxs("div", {
				className: "absolute right-0 -top-6 text-xs text-red-500",
				children: [
					"第",
					pageNumber,
					"页结束"
				]
			})]
		})
	});
});
PageBreakLine.displayName = "PageBreakLine";
var PreviewPanel = React.forwardRef(({ sidePanelCollapsed, editPanelCollapsed, previewPanelCollapsed, toggleSidePanel, toggleEditPanel, togglePreviewPanel }, ref) => {
	const { activeResume, setActiveSection } = useResumeStore();
	const selectedFontFamily = normalizeFontFamily(activeResume?.globalSettings?.fontFamily);
	const t = useTranslations("previewDock");
	const template = useMemo(() => {
		return DEFAULT_TEMPLATES.find((t) => t.id === activeResume?.templateId) || DEFAULT_TEMPLATES[0];
	}, [activeResume?.templateId]);
	const startRef = useRef(null);
	const previewRef = useRef(null);
	const internalResumeContentRef = useRef(null);
	const resumeContentRef = ref || internalResumeContentRef;
	const [contentHeight, setContentHeight] = useState(0);
	const updateContentHeight = () => {
		if (resumeContentRef.current) {
			const height = resumeContentRef.current.clientHeight;
			if (height > 0) {
				if (height !== contentHeight) setContentHeight(height);
			}
		}
	};
	useEffect(() => {
		const debouncedUpdate = throttle(() => {
			requestAnimationFrame(() => {
				updateContentHeight();
			});
		}, 100);
		const observer = new MutationObserver(debouncedUpdate);
		if (resumeContentRef.current) {
			observer.observe(resumeContentRef.current, {
				childList: true,
				subtree: true,
				attributes: true,
				characterData: true
			});
			updateContentHeight();
		}
		const resizeObserver = new ResizeObserver(debouncedUpdate);
		if (resumeContentRef.current) resizeObserver.observe(resumeContentRef.current);
		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
		};
	}, []);
	useEffect(() => {
		if (activeResume) {
			const timer = setTimeout(updateContentHeight, 300);
			return () => clearTimeout(timer);
		}
	}, [activeResume]);
	const pagePadding = activeResume?.globalSettings?.pagePadding || 0;
	const { scaleFactor, isScaled, cannotFit } = useAutoOnePage({
		contentHeight,
		pagePadding,
		enabled: activeResume?.globalSettings?.autoOnePage || false
	});
	useEffect(() => {
		if (cannotFit) toast.warning(t("autoOnePage.cannotFit"), { duration: 4e3 });
	}, [cannotFit, t]);
	const { contentPerPagePx, pageBreakCount } = useMemo(() => {
		const baseContentPerPage = 297 * 3.78 - 2 * pagePadding;
		if (isScaled && !cannotFit || contentHeight <= 0) return {
			contentPerPagePx: baseContentPerPage,
			pageBreakCount: 0
		};
		const effectiveContentPerPage = isScaled ? baseContentPerPage / scaleFactor : baseContentPerPage;
		const actualContentHeight = contentHeight - 2 * pagePadding;
		const pageCount = Math.max(1, Math.ceil(actualContentHeight / effectiveContentPerPage));
		return {
			contentPerPagePx: effectiveContentPerPage,
			pageBreakCount: Math.max(0, pageCount - 1)
		};
	}, [
		contentHeight,
		pagePadding,
		isScaled,
		cannotFit,
		scaleFactor
	]);
	if (!activeResume) return null;
	const handlePreviewClickCapture = (event) => {
		const sectionId = (event.target?.closest("[data-resume-section-id]"))?.dataset.resumeSectionId;
		if (!sectionId || sectionId === activeResume.activeSection) return;
		setActiveSection(sectionId);
	};
	return /* @__PURE__ */ jsx("div", {
		ref: previewRef,
		className: "relative w-full h-full  bg-gray-100",
		style: { fontFamily: selectedFontFamily },
		children: /* @__PURE__ */ jsx("div", {
			className: "py-4 ml-4 px-4 min-h-screen flex justify-center scale-[58%] origin-top md:scale-90 md:origin-top-left",
			children: /* @__PURE__ */ jsx("div", {
				ref: startRef,
				className: cn("w-[210mm] min-w-[210mm] min-h-[297mm]", "bg-white", "shadow-lg", "relative mx-auto"),
				children: /* @__PURE__ */ jsxs("div", {
					ref: resumeContentRef,
					id: "resume-preview",
					onClickCapture: handlePreviewClickCapture,
					style: {
						fontFamily: selectedFontFamily,
						padding: `${activeResume.globalSettings?.pagePadding}px`,
						...isScaled ? {
							transform: `scale(${scaleFactor})`,
							transformOrigin: "top left",
							width: `${100 / scaleFactor}%`
						} : {}
					},
					className: "relative",
					children: [
						/* @__PURE__ */ jsx("style", { children: `
              .grammar-error {
                cursor: help;
                border-bottom: 2px dashed;
                transition: background-color 0.2s ease;
              }

              .grammar-error.spelling {
                border-color: #ef4444;
              }

              .grammar-error.grammar {
                border-color: #f59e0b;
              }

              .grammar-error:hover {
                background-color: rgba(239, 68, 68, 0.1);
              }

              /* 使用属性选择器匹配所有active-*类 */
              .grammar-error[class*="active-"] {
                animation: highlight 2s ease-in-out;
              }

              @keyframes highlight {
                0% {
                  background-color: transparent;
                }
                20% {
                  background-color: rgba(239, 68, 68, 0.2);
                }
                80% {
                  background-color: rgba(239, 68, 68, 0.2);
                }
                100% {
                  background-color: transparent;
                }
              }
            ` }),
						/* @__PURE__ */ jsx(ResumeTemplateComponent, {
							data: activeResume,
							template
						}),
						contentHeight > 0 && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: Array.from({ length: Math.min(pageBreakCount, 20) }, (_, i) => {
							const pageNumber = i + 1;
							if (pagePadding + pageNumber * contentPerPagePx <= contentHeight) return /* @__PURE__ */ jsx(PageBreakLine, {
								pageNumber,
								contentPerPagePx,
								pagePadding
							}, `page-break-${pageNumber}`);
							return null;
						}).filter(Boolean) }, `page-breaks-container-${contentHeight}`) })
					]
				})
			})
		})
	});
});
PreviewPanel.displayName = "PreviewPanel";
//#endregion
//#region src/components/magicui/dock.tsx
function Dock({ children, className, ...props }) {
	const childrenArray = React.Children.toArray(children);
	const templateSheetIndex = childrenArray.findIndex((child) => {
		if (React.isValidElement(child)) {
			const tooltip = child.props.children;
			if (React.isValidElement(tooltip)) {
				const trigger = tooltip.props.children.find((child) => child?.type?.name === "TooltipTrigger");
				if (trigger) {
					const content = trigger.props.children;
					if (React.isValidElement(content)) {
						const icon = content.props.children;
						return React.isValidElement(icon) && icon.type?.name === "TemplateSheet";
					}
				}
			}
		}
		return false;
	});
	if (templateSheetIndex === -1) return /* @__PURE__ */ jsx("div", {
		...props,
		className: cn("flex flex-col items-center gap-4 rounded-xl bg-white/[0.7] p-2 shadow-lg backdrop-blur-md dark:bg-slate-800/[0.7] dark:shadow-slate-900/20", className),
		children: /* @__PURE__ */ jsx("div", {
			className: "flex flex-col items-center gap-4",
			children
		})
	});
	const topChildren = childrenArray.slice(0, templateSheetIndex);
	const middleChild = childrenArray[templateSheetIndex];
	const bottomChildren = childrenArray.slice(templateSheetIndex + 1);
	return /* @__PURE__ */ jsxs("div", {
		...props,
		className: cn("flex flex-col items-center gap-4 rounded-xl bg-white/[0.7] p-4 shadow-lg backdrop-blur-md dark:bg-slate-800/[0.7] dark:shadow-slate-900/20", className),
		children: [
			topChildren.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "flex flex-col items-center gap-4",
				children: topChildren
			}),
			topChildren.length > 0 && /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" }),
			middleChild,
			bottomChildren.length > 0 && /* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" }),
			bottomChildren.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "flex flex-col items-center gap-4",
				children: bottomChildren
			})
		]
	});
}
function DockIcon({ children, className, onClick }) {
	return /* @__PURE__ */ jsx(motion.div, {
		whileHover: { scale: 1.2 },
		whileTap: { scale: .95 },
		className: cn("flex size-8 items-center justify-center rounded-sm bg-white text-neutral-700 shadow-sm transition-colors hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:shadow-slate-900/20", className),
		onClick,
		children
	});
}
//#endregion
//#region src/components/shared/TemplateSheet.tsx
var TemplatePreview = ({ template, isActive, snapshotSrc, onSelect }) => {
	return /* @__PURE__ */ jsxs("button", {
		onClick: () => onSelect(template.id),
		className: cn("relative group rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-[1.02] text-left", isActive ? "border-primary dark:border-primary shadow-lg dark:shadow-primary/30" : "border-gray-100 hover:border-gray-200 dark:border-neutral-800 dark:hover:border-neutral-700"),
		children: [/* @__PURE__ */ jsx("div", {
			className: "relative aspect-[210/297] w-full overflow-hidden bg-gray-50 dark:bg-gray-900",
			children: snapshotSrc ? /* @__PURE__ */ jsx("img", {
				src: snapshotSrc,
				alt: template.name,
				className: "h-full w-full object-cover object-top",
				loading: "eager",
				draggable: false
			}) : /* @__PURE__ */ jsxs("div", {
				className: "flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500 dark:from-neutral-900 dark:to-neutral-950 dark:text-neutral-400",
				children: [/* @__PURE__ */ jsx(ImageIcon, { className: "h-8 w-8" }), /* @__PURE__ */ jsx("span", {
					className: "px-4 text-center text-sm font-medium",
					children: template.name
				})]
			})
		}), isActive && /* @__PURE__ */ jsx(motion.div, {
			layoutId: "template-selected",
			className: "absolute inset-0 z-20 flex items-center justify-center bg-black/10 dark:bg-black/40 pointer-events-none",
			children: /* @__PURE__ */ jsx(Layout, { className: "h-8 w-8 text-primary shadow-sm" })
		})]
	});
};
var TemplateSheet = () => {
	const t = useTranslations("templates");
	const locale = useLocale();
	const { activeResume, setTemplate } = useResumeStore();
	const { snapshotMap } = useTemplateSnapshots(locale);
	const currentTemplate = DEFAULT_TEMPLATES.find((template) => template.id === activeResume?.templateId) || DEFAULT_TEMPLATES[0];
	return /* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(PanelsLeftBottom, { size: 20 })
	}), /* @__PURE__ */ jsxs(SheetContent, {
		side: "left",
		forceMount: true,
		className: "w-1/2 sm:max-w-1/2",
		children: [
			/* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: t("switchTemplate") }) }),
			/* @__PURE__ */ jsx(SheetDescription, {}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 h-[calc(100vh-8rem)]",
				children: /* @__PURE__ */ jsx(ScrollArea, {
					className: "h-full w-full pr-4",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-4 gap-4 pb-8",
						children: DEFAULT_TEMPLATES.map((template) => /* @__PURE__ */ jsx(TemplatePreview, {
							template,
							isActive: template.id === currentTemplate.id,
							snapshotSrc: snapshotMap[template.id],
							onSelect: setTemplate
						}, template.id))
					})
				})
			})
		]
	})] });
};
//#endregion
//#region src/config/faq.tsx
var FAQ_KEYS = [
	"browser-compatibility",
	"export-methods",
	"export-failure",
	"drag-and-drop"
];
//#endregion
//#region src/components/preview/FAQDialog.tsx
var DynamicHelpIcon = React.forwardRef((props, ref) => /* @__PURE__ */ jsxs("button", {
	ref,
	...props,
	className: cn("relative group flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full", "animate-[bounce_5s_ease-in-out_infinite]", props.className),
	children: [
		/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/30 transition-all duration-700 animate-[pulse_4s_ease-in-out_infinite]" }),
		/* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-background/40 dark:bg-zinc-900/40 backdrop-blur-md border border-primary/20 group-hover:border-primary/50 transition-colors duration-500 shadow-lg" }),
		/* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 100 100",
			className: "relative w-10 h-10 md:w-11 md:h-11 origin-center transition-transform duration-500 group-hover:scale-110 overflow-visible",
			children: [
				/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("radialGradient", {
					id: "magicGlow",
					cx: "50%",
					cy: "50%",
					r: "50%",
					children: [/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "var(--primary)",
						stopOpacity: "0.4"
					}), /* @__PURE__ */ jsx("stop", {
						offset: "100%",
						stopColor: "var(--primary)",
						stopOpacity: "0"
					})]
				}) }),
				/* @__PURE__ */ jsx("circle", {
					cx: "50",
					cy: "50",
					r: "45",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "0.5",
					className: "text-primary/20 origin-center animate-[spin_20s_linear_infinite]"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "50",
					cy: "50",
					r: "40",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1",
					strokeDasharray: "2 10",
					className: "text-primary/40 origin-center animate-[spin_15s_linear_infinite_reverse]"
				}),
				/* @__PURE__ */ jsx("g", {
					className: "origin-center animate-[spin_8s_linear_infinite]",
					children: /* @__PURE__ */ jsx("circle", {
						cx: "50",
						cy: "5",
						r: "2",
						className: "fill-primary drop-shadow-[0_0_5px_var(--primary)]"
					})
				}),
				/* @__PURE__ */ jsx("g", {
					className: "origin-center animate-[spin_12s_linear_infinite_reverse]",
					children: /* @__PURE__ */ jsx("circle", {
						cx: "95",
						cy: "50",
						r: "1.5",
						className: "fill-primary/60"
					})
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "50",
					cy: "50",
					r: "28",
					fill: "url(#magicGlow)",
					className: "animate-[pulse_3s_ease-in-out_infinite]"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "50",
					cy: "50",
					r: "20",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-primary/80"
				}),
				/* @__PURE__ */ jsx("text", {
					x: "50",
					y: "52",
					textAnchor: "middle",
					dominantBaseline: "central",
					className: "fill-primary font-bold text-[32px] select-none pointer-events-none",
					style: { fontFamily: "Inter, system-ui, sans-serif" },
					children: "?"
				}),
				/* @__PURE__ */ jsxs("g", {
					className: "text-primary",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "20",
							cy: "20",
							r: "1",
							className: "animate-pulse",
							children: /* @__PURE__ */ jsx("animate", {
								attributeName: "opacity",
								values: "0;1;0",
								dur: "2s",
								repeatCount: "indefinite"
							})
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "80",
							cy: "30",
							r: "0.8",
							className: "animate-pulse",
							children: /* @__PURE__ */ jsx("animate", {
								attributeName: "opacity",
								values: "0;1;0",
								dur: "3s",
								begin: "1s",
								repeatCount: "indefinite"
							})
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "30",
							cy: "80",
							r: "1.2",
							className: "animate-pulse",
							children: /* @__PURE__ */ jsx("animate", {
								attributeName: "opacity",
								values: "0;1;0",
								dur: "2.5s",
								begin: "0.5s",
								repeatCount: "indefinite"
							})
						})
					]
				})
			]
		})
	]
}));
DynamicHelpIcon.displayName = "DynamicHelpIcon";
var FAQDialog = () => {
	const [open, setOpen] = useState(false);
	const t = useTranslations("faqDialog");
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx(DynamicHelpIcon, {})
				})
			}), /* @__PURE__ */ jsx(TooltipContent, {
				side: "left",
				sideOffset: 16,
				children: /* @__PURE__ */ jsx("p", { children: t("title") })
			})] })
		}), /* @__PURE__ */ jsxs(DialogContent, {
			className: "sm:max-w-[500px]",
			children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ jsx(HelpCircle, { className: "h-5 w-5" })
				}), t("title")]
			}), /* @__PURE__ */ jsx(DialogDescription, { children: t("description") })] }), /* @__PURE__ */ jsx("div", {
				className: "mt-4 max-h-[60vh] overflow-y-auto pr-2",
				children: /* @__PURE__ */ jsx(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: FAQ_KEYS.map((key) => /* @__PURE__ */ jsxs(AccordionItem, {
						value: key,
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "text-left text-[15px] font-medium",
							children: t(`items.${key}.question`)
						}), /* @__PURE__ */ jsx(AccordionContent, {
							className: "text-muted-foreground leading-relaxed whitespace-pre-wrap",
							children: t(`items.${key}.answer`)
						})]
					}, key))
				})
			})]
		})]
	});
};
//#endregion
//#region src/components/preview/PreviewDock.tsx
var Icons = { gitHub: (props) => /* @__PURE__ */ jsx("svg", {
	viewBox: "0 0 438.549 438.549",
	...props,
	children: /* @__PURE__ */ jsx("path", {
		fill: "currentColor",
		d: "M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
	})
}) };
var MagicThread = ({ height = 40 }) => /* @__PURE__ */ jsxs("div", {
	className: "relative flex flex-col items-center",
	style: { height },
	children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 w-[1px] border-l border-dashed border-primary/30" }), /* @__PURE__ */ jsx(motion.div, {
		className: "absolute top-0 w-[1px] h-4 bg-gradient-to-b from-transparent via-primary to-transparent",
		animate: {
			top: ["0%", "100%"],
			opacity: [
				0,
				1,
				0
			]
		},
		transition: {
			duration: 2.5,
			repeat: Infinity,
			ease: "easeInOut"
		}
	})]
});
var PreviewDock = ({ sidePanelCollapsed, editPanelCollapsed, previewPanelCollapsed, toggleSidePanel, toggleEditPanel, togglePreviewPanel, resumeContentRef }) => {
	const router = useRouter();
	const t = useTranslations("previewDock");
	const { checkGrammar, isChecking } = useGrammarCheck();
	const { selectedModel, doubaoApiKey, doubaoModelId, deepseekApiKey, deepseekModelId, openaiApiKey, openaiModelId, openaiApiEndpoint } = useAIConfigStore();
	const { duplicateResume, setActiveResume, activeResumeId, activeResume, updateGlobalSettings } = useResumeStore();
	const { globalSettings = {} } = activeResume || {};
	const { checkConfiguration } = useAIConfiguration();
	const handleGrammarCheck = useCallback(async () => {
		if (!checkConfiguration()) return;
		try {
			const previewContent = resumeContentRef.current || document.getElementById("resume-preview");
			if (!previewContent) {
				toast.error(t("grammarCheck.errorToast"));
				return;
			}
			const text = previewContent.innerText?.trim();
			if (!text) {
				toast.error(t("grammarCheck.errorToast"));
				return;
			}
			await checkGrammar(text);
		} catch (error) {
			toast.error(t("grammarCheck.errorToast"));
		}
	}, [
		resumeContentRef,
		checkConfiguration,
		checkGrammar,
		t
	]);
	const handleGoGitHub = () => {
		window.open(GITHUB_REPO_URL, "_blank");
	};
	const handleCopyResume = useCallback(() => {
		if (!activeResumeId) return;
		try {
			const newId = duplicateResume(activeResumeId);
			const targetPath = `/app/workbench/${newId}`;
			setActiveResume(newId);
			toast.success(t("copyResume.success"));
			router.push(targetPath);
			requestAnimationFrame(() => {
				if (window.location.pathname !== targetPath) window.location.assign(targetPath);
			});
		} catch (error) {
			toast.error(t("copyResume.error"));
		}
	}, [
		activeResumeId,
		duplicateResume,
		router,
		setActiveResume,
		t
	]);
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", {
		className: "hidden md:flex flex-col items-center fixed top-1/2 right-3 transform -translate-y-1/2 z-[50]",
		children: [
			/* @__PURE__ */ jsx(TooltipProvider, {
				delayDuration: 0,
				children: /* @__PURE__ */ jsx(Dock, {
					className: "bg-background/80 border border-border/40 shadow-xl mb-0",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("div", {
									className: cn("flex cursor-pointer h-7 w-7 items-center justify-center rounded-lg", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"),
									children: /* @__PURE__ */ jsx(TemplateSheet, {})
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: t("switchTemplate") })
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("div", {
									className: cn("flex cursor-pointer h-7 w-7 items-center justify-center rounded-lg", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "transition-all duration-200", isChecking && "animate-pulse"),
									onClick: handleGrammarCheck,
									children: /* @__PURE__ */ jsx(SpellCheck2, { className: cn("h-4 w-4", isChecking && "animate-spin") })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: isChecking ? t("grammarCheck.checking") : t("grammarCheck.idle") })
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("div", {
									className: cn("flex cursor-pointer h-7 w-7 items-center justify-center rounded-lg", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "transition-all duration-200", globalSettings?.autoOnePage && [
										"bg-primary text-primary-foreground",
										"hover:bg-primary/90 dark:hover:bg-primary/90",
										"shadow-sm"
									]),
									onClick: () => {
										updateGlobalSettings({ autoOnePage: !globalSettings?.autoOnePage });
										toast.success(globalSettings?.autoOnePage ? t("autoOnePage.disabled") : t("autoOnePage.enabled"));
									},
									children: /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: t("autoOnePage.tooltip") })
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(PdfExport, { children: /* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									className: cn("flex cursor-pointer h-7 w-7 items-center justify-center rounded-lg", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "transition-all duration-200"),
									children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" })
								})
							}) }), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: t("export.tooltip") })
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("div", {
									className: cn("flex cursor-pointer h-7 w-7 items-center justify-center rounded-lg", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"),
									onClick: handleCopyResume,
									children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: t("copyResume.tooltip") })
							})] }) }),
							/* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-gray-200" }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsxs("button", {
									onClick: toggleSidePanel,
									className: cn("flex h-[30px] w-[30px] items-center justify-center rounded-sm transition-all", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "active:scale-95", !sidePanelCollapsed && [
										"bg-primary text-primary-foreground",
										"hover:bg-primary/90 dark:hover:bg-primary/90",
										"shadow-sm"
									]),
									children: [sidePanelCollapsed && /* @__PURE__ */ jsx(PanelRightClose, { size: 20 }), !sidePanelCollapsed && /* @__PURE__ */ jsx(PanelRightOpen, { size: 20 })]
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: sidePanelCollapsed ? t("sidePanel.expand") : t("sidePanel.collapse") })
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									onClick: toggleEditPanel,
									className: cn("flex h-[30px] w-[30px] items-center justify-center rounded-sm transition-all", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "active:scale-95", !editPanelCollapsed && [
										"bg-primary text-primary-foreground",
										"hover:bg-primary/90 dark:hover:bg-primary/90",
										"shadow-sm"
									]),
									children: /* @__PURE__ */ jsx(Edit2, { size: 20 })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: editPanelCollapsed ? t("editPanel.expand") : t("editPanel.collapse")
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									onClick: togglePreviewPanel,
									className: cn("flex h-[30px] w-[30px] items-center justify-center rounded-sm transition-all", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "active:scale-95", !previewPanelCollapsed && [
										"bg-primary text-primary-foreground",
										"hover:bg-primary/90 dark:hover:bg-primary/90",
										"shadow-sm"
									]),
									children: /* @__PURE__ */ jsx(Eye, { size: 20 })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: previewPanelCollapsed ? t("previewPanel.expand") : t("previewPanel.collapse")
							})] }) }),
							/* @__PURE__ */ jsx("div", { className: "w-full h-[1px] bg-gray-200" }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("div", {
									className: cn("flex cursor-pointer h-7 w-7 items-center justify-center rounded-lg", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50"),
									onClick: () => router.push("/app/dashboard"),
									children: /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: t("backToDashboard") })
							})] }) }),
							/* @__PURE__ */ jsx(DockIcon, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
								asChild: true,
								children: /* @__PURE__ */ jsx("button", {
									onClick: handleGoGitHub,
									className: cn("flex h-[20px] w-[20px] items-center justify-center rounded-lg transition-all", "hover:bg-gray-100/50 dark:hover:bg-neutral-800/50", "active:scale-95"),
									children: /* @__PURE__ */ jsx(Icons.gitHub, {})
								})
							}), /* @__PURE__ */ jsx(TooltipContent, {
								side: "left",
								sideOffset: 10,
								children: /* @__PURE__ */ jsx("p", { children: t("github") })
							})] }) })
						]
					})
				})
			}),
			/* @__PURE__ */ jsx(MagicThread, { height: 60 }),
			/* @__PURE__ */ jsx("div", {
				className: "w-[56px] flex justify-center",
				children: /* @__PURE__ */ jsx(FAQDialog, {})
			})
		]
	}) });
};
//#endregion
//#region src/components/mobile/MobileWorkbench.tsx
function MobileWorkbench() {
	const [activeTab, setActiveTab] = useState("content");
	const { activeResume, setActiveSection } = useResumeStore();
	const { activeSection, menuSections } = activeResume || {};
	const renderNavItem = (tab, icon, label) => /* @__PURE__ */ jsxs("button", {
		onClick: () => setActiveTab(tab),
		className: cn("flex flex-col items-center justify-center py-2 px-4 flex-1 transition-colors", activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-primary/80"),
		children: [
			/* @__PURE__ */ jsx("div", {
				className: cn("mb-1", activeTab === tab && "scale-110 duration-200"),
				children: icon
			}),
			/* @__PURE__ */ jsx("span", {
				className: "text-[10px] font-medium",
				children: label
			}),
			activeTab === tab && /* @__PURE__ */ jsx(motion.div, {
				layoutId: "mobile-nav-indicator",
				className: "absolute bottom-0 w-12 h-1 bg-primary rounded-t-full"
			})
		]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col h-[calc(100vh-64px)] bg-background",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex-1 overflow-hidden relative",
			children: /* @__PURE__ */ jsxs(AnimatePresence, {
				mode: "wait",
				children: [
					activeTab === "content" && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: 20
						},
						transition: { duration: .2 },
						className: "h-full flex flex-col",
						children: [/* @__PURE__ */ jsx("div", {
							className: "border-b bg-background/95 backdrop-blur z-10",
							children: /* @__PURE__ */ jsxs(ScrollArea, {
								className: "w-full whitespace-nowrap",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex p-2 space-x-2",
									children: [/* @__PURE__ */ jsxs("button", {
										onClick: () => setActiveSection("basic"),
										className: cn("inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors border", activeSection === "basic" ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"),
										children: [/* @__PURE__ */ jsx("span", {
											className: "mr-1.5",
											children: "👤"
										}), "基本信息"]
									}), menuSections?.filter((s) => s.id !== "basic" && s.enabled).map((section) => /* @__PURE__ */ jsxs("button", {
										onClick: () => setActiveSection(section.id),
										className: cn("inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors border", activeSection === section.id ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"),
										children: [/* @__PURE__ */ jsx("span", {
											className: "mr-1.5",
											children: section.icon
										}), section.title]
									}, section.id))]
								}), /* @__PURE__ */ jsx(ScrollBar, {
									orientation: "horizontal",
									className: "invisible"
								})]
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "flex-1 overflow-hidden",
							children: /* @__PURE__ */ jsx(EditPanel, {})
						})]
					}, "content"),
					activeTab === "style" && /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: 20
						},
						transition: { duration: .2 },
						className: "h-full overflow-hidden",
						children: /* @__PURE__ */ jsx(SidePanel, {})
					}, "style"),
					activeTab === "preview" && /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: 1.05
						},
						transition: { duration: .2 },
						className: "h-full overflow-y-auto bg-gray-100",
						"data-preview-scroll-container": "true",
						children: /* @__PURE__ */ jsx(PreviewPanel, {
							sidePanelCollapsed: true,
							editPanelCollapsed: true,
							previewPanelCollapsed: false,
							toggleSidePanel: () => {},
							toggleEditPanel: () => {}
						})
					}, "preview")
				]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "h-16 border-t bg-background flex items-center justify-around relative shadow-[0_-1px_3px_rgba(0,0,0,0.05)] z-50",
			children: [
				renderNavItem("content", /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }), "内容"),
				renderNavItem("style", /* @__PURE__ */ jsx(Palette, { className: "w-5 h-5" }), "样式"),
				renderNavItem("preview", /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }), "预览")
			]
		})]
	});
}
//#endregion
//#region src/components/ui/resizable.tsx
var ResizablePanelGroup = ({ className, ...props }) => /* @__PURE__ */ jsx(ResizablePrimitive.PanelGroup, {
	className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
	...props
});
var ResizablePanel = ResizablePrimitive.Panel;
//#endregion
//#region src/app/app/workbench/[id]/page.tsx
var LAYOUT_CONFIG = {
	DEFAULT: [
		20,
		32,
		48
	],
	SIDE_COLLAPSED: [50, 50],
	EDIT_FOCUSED: [20, 80],
	PREVIEW_FOCUSED: [20, 80]
};
var DragHandle = ({ show = true }) => {
	if (!show) return null;
	return /* @__PURE__ */ jsxs(PanelResizeHandle, {
		className: "relative flex w-px items-center justify-center outline-none group cursor-col-resize",
		children: [
			/* @__PURE__ */ jsx("div", { className: cn("absolute inset-y-0 left-1/2 z-0 w-[1px] -translate-x-1/2 bg-border", "transition-colors duration-200", "group-hover:bg-primary/40 group-active:bg-primary/60 data-[resize-handle-state=drag]:bg-primary/60") }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-1/2 z-10 w-5 -translate-x-1/2 bg-transparent" }),
			/* @__PURE__ */ jsx("div", { className: cn("absolute top-1/2 left-1/2 z-20 h-7 w-2 -translate-x-1/2 -translate-y-1/2", "rounded-full border border-border/80 bg-white dark:bg-neutral-900 shadow-sm", "transition-all duration-200", "group-hover:border-primary/50 group-hover:scale-110", "group-active:border-primary group-active:scale-105") })
		]
	});
};
var LayoutControls = memo(({ sidePanelCollapsed, editPanelCollapsed, previewPanelCollapsed, toggleSidePanel, toggleEditPanel, togglePreviewPanel }) => /* @__PURE__ */ jsxs("div", {
	className: cn("absolute bottom-6 left-1/2 -translate-x-1/2", "flex items-center gap-2 z-10 p-2 rounded-full", "flex items-center gap-2 z-10 p-2 rounded-full", "bg-background/80 border border-border", "backdrop-blur-sm shadow-lg"),
	children: [
		/* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				variant: sidePanelCollapsed ? "secondary" : "ghost",
				size: "icon",
				className: "h-9 w-9 rounded-full",
				onClick: toggleSidePanel,
				children: /* @__PURE__ */ jsx(PanelLeft, { className: "h-4 w-4" })
			})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", {
			className: "text-xs",
			children: sidePanelCollapsed ? "展开侧边栏" : "收起侧边栏"
		}) })] }) }),
		/* @__PURE__ */ jsx("div", { className: cn("h-5 w-px mx-1", "bg-border") }),
		/* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				variant: editPanelCollapsed ? "secondary" : "ghost",
				size: "icon",
				className: "h-9 w-9 rounded-full",
				onClick: toggleEditPanel,
				children: editPanelCollapsed ? /* @__PURE__ */ jsx(Edit2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Minimize2, { className: "h-4 w-4" })
			})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", {
			className: "text-xs",
			children: editPanelCollapsed ? "展开编辑面板" : "收起编辑面板"
		}) })] }) }),
		/* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsx(Button, {
				variant: previewPanelCollapsed ? "secondary" : "ghost",
				size: "icon",
				className: "h-9 w-9 rounded-full",
				onClick: togglePreviewPanel,
				children: previewPanelCollapsed ? /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Minimize2, { className: "h-4 w-4" })
			})
		}), /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", {
			className: "text-xs",
			children: previewPanelCollapsed ? "展开预览面板" : "收起预览面板"
		}) })] }) })
	]
}));
LayoutControls.displayName = "LayoutControls";
function Home$1() {
	const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);
	const [editPanelCollapsed, setEditPanelCollapsed] = useState(false);
	const [previewPanelCollapsed, setPreviewPanelCollapsed] = useState(false);
	const [panelSizes, setPanelSizes] = useState(LAYOUT_CONFIG.DEFAULT);
	const resumeContentRef = React.useRef(null);
	const toggleSidePanel = () => {
		setSidePanelCollapsed(!sidePanelCollapsed);
	};
	const toggleEditPanel = () => {
		setEditPanelCollapsed(!editPanelCollapsed);
	};
	const togglePreviewPanel = () => {
		setPreviewPanelCollapsed(!previewPanelCollapsed);
	};
	const updateLayout = (sizes) => {
		setPanelSizes(sizes);
	};
	useEffect(() => {
		if (previewPanelCollapsed) return;
		if (window.innerWidth < 1440) setSidePanelCollapsed(true);
		const handleResize = () => {
			if (previewPanelCollapsed) return;
			if (window.innerWidth < 1440) setSidePanelCollapsed(true);
			else setSidePanelCollapsed(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [previewPanelCollapsed]);
	useEffect(() => {
		document.body.classList.add("workbench-body-lock");
		return () => {
			document.body.classList.remove("workbench-body-lock");
		};
	}, []);
	useEffect(() => {
		let newSizes = [];
		newSizes.push(sidePanelCollapsed ? 0 : 20);
		if (editPanelCollapsed) newSizes.push(0);
		else if (sidePanelCollapsed) newSizes.push(36);
		else if (previewPanelCollapsed) newSizes.push(80);
		else newSizes.push(32);
		if (previewPanelCollapsed) newSizes.push(0);
		else if (editPanelCollapsed && sidePanelCollapsed) newSizes.push(100);
		else if (editPanelCollapsed) newSizes.push(80);
		else if (sidePanelCollapsed) newSizes.push(64);
		else newSizes.push(48);
		const total = newSizes.reduce((a, b) => a + b, 0);
		if (total < 100) {
			const lastNonZeroIndex = newSizes.map((size, index) => ({
				size,
				index
			})).filter(({ size }) => size > 0).pop()?.index;
			if (lastNonZeroIndex !== void 0) newSizes[lastNonZeroIndex] += 100 - total;
		}
		updateLayout([...newSizes]);
	}, [
		sidePanelCollapsed,
		editPanelCollapsed,
		previewPanelCollapsed
	]);
	return /* @__PURE__ */ jsxs("main", {
		className: cn("w-full min-h-screen  overflow-hidden", "w-full min-h-screen overflow-hidden", "bg-background text-foreground"),
		children: [
			/* @__PURE__ */ jsx(EditorHeader, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "hidden md:block h-[calc(100vh-64px)] relative flex w-full",
				children: [/* @__PURE__ */ jsx("div", {
					className: cn("h-full transition-all duration-300", previewPanelCollapsed ? "w-[calc(100%-4rem)]" : "w-full"),
					children: /* @__PURE__ */ jsxs(ResizablePanelGroup, {
						direction: "horizontal",
						className: cn("h-full", "h-full", "border border-border bg-background"),
						children: [
							!sidePanelCollapsed && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ResizablePanel, {
								id: "side-panel",
								order: 1,
								defaultSize: panelSizes?.[0],
								className: "bg-background",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full overflow-y-auto",
									children: /* @__PURE__ */ jsx(SidePanel, {})
								})
							}), /* @__PURE__ */ jsx(DragHandle, {})] }),
							!editPanelCollapsed && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ResizablePanel, {
								id: "edit-panel",
								order: 2,
								defaultSize: panelSizes?.[1],
								className: "bg-background",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full",
									children: /* @__PURE__ */ jsx(EditPanel, {})
								})
							}), /* @__PURE__ */ jsx(DragHandle, {})] }),
							/* @__PURE__ */ jsx(ResizablePanel, {
								id: "preview-panel",
								order: 3,
								collapsible: false,
								defaultSize: panelSizes?.[2],
								className: cn("bg-gray-100", previewPanelCollapsed && "hidden"),
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full overflow-y-auto",
									"data-preview-scroll-container": "true",
									children: /* @__PURE__ */ jsx(PreviewPanel, {
										sidePanelCollapsed,
										editPanelCollapsed,
										previewPanelCollapsed,
										toggleSidePanel,
										toggleEditPanel,
										togglePreviewPanel
									})
								})
							})
						]
					}, panelSizes?.join("-"))
				}), /* @__PURE__ */ jsx(PreviewDock, {
					sidePanelCollapsed,
					editPanelCollapsed,
					previewPanelCollapsed,
					toggleSidePanel,
					toggleEditPanel,
					togglePreviewPanel,
					resumeContentRef
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "md:hidden h-[calc(100vh-64px)]",
				children: /* @__PURE__ */ jsx(MobileWorkbench, {})
			})
		]
	});
}
//#endregion
//#region src/routes/app/workbench/$id.tsx?tsr-split=component
function WorkbenchRoutePage() {
	const { id } = Route.useParams();
	const setActiveResume = useResumeStore((state) => state.setActiveResume);
	useEffect(() => {
		setActiveResume(id);
	}, [id, setActiveResume]);
	return /* @__PURE__ */ jsx(Home$1, {});
}
//#endregion
export { WorkbenchRoutePage as component };
