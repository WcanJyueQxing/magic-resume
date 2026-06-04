import { a as initialResumeStateEn, i as initialResumeState } from "./initialResumeData-KCtMeTPD.js";
import { a as useLocale, o as useTranslations, t as cn } from "./utils-CECdrI66.js";
import { n as DEFAULT_TEMPLATES, t as useResumeStore } from "./useResumeStore-46XKG7Po.js";
import { n as useRouter } from "./navigation-DRQZI54s.js";
import { t as Button } from "./button-BaBi_9yO.js";
import { i as CardFooter, n as CardContent, t as Card } from "./card-DGtkjkTU.js";
import { c as ScrollArea, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-D_tFkKKT.js";
import { i as ResumeTemplateComponent, r as normalizeFontFamily } from "./fonts-BxvXKZ7g.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
//#region src/app/app/dashboard/templates/page.tsx
var A4_WIDTH_PX = 793.700787;
var PREVIEW_MODAL_SCALE = .529166667;
var PRESET_COLORS = [
	{
		name: "default",
		value: ""
	},
	{
		name: "blue",
		value: "#3b82f6"
	},
	{
		name: "green",
		value: "#10b981"
	},
	{
		name: "purple",
		value: "#8b5cf6"
	},
	{
		name: "orange",
		value: "#f97316"
	},
	{
		name: "red",
		value: "#ef4444"
	},
	{
		name: "slate",
		value: "#475569"
	},
	{
		name: "black",
		value: "#000000"
	}
];
var getTemplateKey = (templateId) => templateId === "left-right" ? "leftRight" : templateId;
var buildTemplatePreviewData = (baseData, template, selectedColor, mockId) => ({
	...baseData,
	id: mockId,
	templateId: template.id,
	globalSettings: {
		...baseData.globalSettings,
		themeColor: selectedColor || template.colorScheme.primary,
		sectionSpacing: template.spacing.sectionGap,
		paragraphSpacing: template.spacing.itemGap,
		pagePadding: template.spacing.contentPadding
	},
	basic: {
		...baseData.basic,
		layout: template.basic.layout
	}
});
var TemplateCardItem = ({ index, template, templateName, templateDescription, baseData, selectedColor, onPreview, onUseTemplate, previewLabel, useTemplateLabel }) => {
	const containerRef = useRef(null);
	const [scale, setScale] = useState(.24);
	useEffect(() => {
		if (!containerRef.current) return;
		const observer = new ResizeObserver((entries) => {
			const { width } = entries[0].contentRect;
			if (width > 0) setScale(width / A4_WIDTH_PX);
		});
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);
	const previewData = buildTemplatePreviewData(baseData, template, selectedColor, `template-preview-${template.id}`);
	return /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .3,
			delay: index * .08
		},
		whileHover: { scale: 1.02 },
		whileTap: { scale: .98 },
		children: /* @__PURE__ */ jsxs(Card, {
			className: cn("group border transition-all duration-200 aspect-[210/297] flex flex-col overflow-hidden", "hover:border-primary/40 hover:shadow-lg", "dark:hover:border-primary/40"),
			children: [/* @__PURE__ */ jsxs(CardContent, {
				className: "p-0 flex-1 relative bg-gray-50 dark:bg-gray-900 overflow-hidden cursor-pointer",
				onClick: onPreview,
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
									padding: `${template.spacing.contentPadding}px`,
									fontFamily: normalizeFontFamily(previewData.globalSettings?.fontFamily)
								},
								children: /* @__PURE__ */ jsx(ResumeTemplateComponent, {
									data: previewData,
									template
								})
							})
						})
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 top-[60%] pointer-events-none bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-950 dark:via-gray-950/90 z-0" }),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-x-0 bottom-0 pt-12 pb-3 px-4 flex items-end border-t border-transparent z-10 transition-colors group-hover:bg-white/50 dark:group-hover:bg-gray-950/50",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col w-full",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[15px] font-semibold truncate text-gray-900 dark:text-gray-100 drop-shadow-sm",
								children: templateName
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 font-medium truncate",
								children: templateDescription
							})]
						})
					})
				]
			}), /* @__PURE__ */ jsx(CardFooter, {
				className: "pt-2 pb-2 px-2 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 z-10",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-2 w-full",
					children: [/* @__PURE__ */ jsx(motion.div, {
						whileHover: { scale: 1.05 },
						whileTap: { scale: .95 },
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 17
						},
						children: /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							className: "w-full text-sm hover:bg-gray-100 dark:border-primary/50 dark:hover:bg-primary/10",
							size: "sm",
							onClick: (e) => {
								e.stopPropagation();
								onPreview();
							},
							children: previewLabel
						})
					}), /* @__PURE__ */ jsx(motion.div, {
						whileHover: { scale: 1.05 },
						whileTap: { scale: .95 },
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 17
						},
						children: /* @__PURE__ */ jsx(Button, {
							className: "w-full text-sm",
							size: "sm",
							onClick: (e) => {
								e.stopPropagation();
								onUseTemplate();
							},
							children: useTemplateLabel
						})
					})]
				})
			})]
		})
	});
};
var TemplatesPage = () => {
	const t = useTranslations("dashboard.templates");
	const locale = useLocale();
	const router = useRouter();
	const createResume = useResumeStore((state) => state.createResume);
	const [previewTemplate, setPreviewTemplate] = useState(null);
	const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value);
	const autoPlayRef = useRef(null);
	useEffect(() => {
		let currentIndex = 0;
		autoPlayRef.current = setInterval(() => {
			currentIndex = (currentIndex + 1) % PRESET_COLORS.length;
			setSelectedColor(PRESET_COLORS[currentIndex].value);
		}, 3e3);
		return () => {
			if (autoPlayRef.current) {
				clearInterval(autoPlayRef.current);
				autoPlayRef.current = null;
			}
		};
	}, []);
	const handleColorSelect = (value) => {
		setSelectedColor(value);
		if (autoPlayRef.current) {
			clearInterval(autoPlayRef.current);
			autoPlayRef.current = null;
		}
	};
	const baseData = locale === "en" ? initialResumeStateEn : initialResumeState;
	const activePreviewTemplate = DEFAULT_TEMPLATES.find((template) => template.id === previewTemplate) ?? null;
	const handleCreateResume = (templateId) => {
		const template = DEFAULT_TEMPLATES.find((entry) => entry.id === templateId);
		if (!template) return;
		const resumeId = createResume(templateId);
		const { resumes, updateResume } = useResumeStore.getState();
		const resume = resumes[resumeId];
		if (resume) updateResume(resumeId, {
			globalSettings: {
				...resume.globalSettings,
				themeColor: selectedColor || template.colorScheme.primary,
				sectionSpacing: template.spacing.sectionGap,
				paragraphSpacing: template.spacing.itemGap,
				pagePadding: template.spacing.contentPadding
			},
			basic: {
				...resume.basic,
				layout: template.basic.layout
			}
		});
		router.push(`/app/workbench/${resumeId}`);
	};
	return /* @__PURE__ */ jsx(ScrollArea, {
		className: "h-[calc(100vh-2rem)] w-full",
		children: /* @__PURE__ */ jsx("div", {
			className: "w-full max-w-[1600px] mx-auto py-8 px-4 sm:px-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col space-y-8",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-3xl font-bold tracking-tight",
							children: t("title")
						}), /* @__PURE__ */ jsx("div", {
							className: "flex items-center space-x-2 bg-gray-50/50 dark:bg-gray-900/50 p-2 rounded-full border border-gray-100 dark:border-gray-800 backdrop-blur-sm self-start sm:self-auto overflow-x-auto",
							children: PRESET_COLORS.map((color) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => handleColorSelect(color.value),
								className: cn("relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-110", selectedColor === color.value ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-950 scale-110" : ""),
								title: color.name === "default" ? "Default" : color.name,
								children: color.value ? /* @__PURE__ */ jsx("div", {
									className: "w-full h-full rounded-full border border-black/10 dark:border-white/10 shadow-sm",
									style: { backgroundColor: color.value }
								}) : /* @__PURE__ */ jsx("div", {
									className: "w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ jsx("span", {
										className: "text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-tighter",
										children: "Tpl"
									})
								})
							}, color.name))
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6",
						children: DEFAULT_TEMPLATES.map((template, index) => {
							const templateKey = getTemplateKey(template.id);
							return /* @__PURE__ */ jsx(TemplateCardItem, {
								index,
								template,
								templateName: t(`${templateKey}.name`),
								templateDescription: t(`${templateKey}.description`),
								baseData,
								selectedColor,
								onPreview: () => setPreviewTemplate(template.id),
								onUseTemplate: () => handleCreateResume(template.id),
								previewLabel: t("preview"),
								useTemplateLabel: t("useTemplate")
							}, template.id);
						})
					}),
					/* @__PURE__ */ jsx(Dialog, {
						open: !!previewTemplate,
						onOpenChange: (open) => {
							if (!open) setPreviewTemplate(null);
						},
						children: activePreviewTemplate && /* @__PURE__ */ jsx(DialogContent, {
							className: "max-w-[680px] p-0 overflow-hidden border-0 shadow-lg rounded-xl bg-white dark:bg-gray-900",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "border-b border-gray-100 dark:border-gray-800 px-4 py-4",
										children: /* @__PURE__ */ jsx(DialogTitle, {
											className: "text-lg font-medium",
											children: t(`${getTemplateKey(activePreviewTemplate.id)}.name`)
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-8 pointer-events-none",
										children: /* @__PURE__ */ jsx("div", {
											className: "relative bg-white shadow-md ring-1 ring-gray-200/50 overflow-hidden",
											style: {
												width: "420px",
												height: "594px"
											},
											children: /* @__PURE__ */ jsx("div", {
												className: "resume-preview absolute top-0 left-0 bg-white",
												style: {
													width: "210mm",
													height: "297mm",
													transform: `scale(${PREVIEW_MODAL_SCALE})`,
													transformOrigin: "top left",
													padding: `${activePreviewTemplate.spacing.contentPadding}px`,
													fontFamily: normalizeFontFamily(buildTemplatePreviewData(baseData, activePreviewTemplate, selectedColor, "template-preview-modal").globalSettings?.fontFamily)
												},
												children: /* @__PURE__ */ jsx(ResumeTemplateComponent, {
													data: buildTemplatePreviewData(baseData, activePreviewTemplate, selectedColor, "preview-mock-id-large"),
													template: activePreviewTemplate
												})
											})
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "p-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-center",
										children: /* @__PURE__ */ jsx(Button, {
											className: "w-full",
											onClick: () => {
												const templateId = activePreviewTemplate.id;
												setPreviewTemplate(null);
												handleCreateResume(templateId);
											},
											children: t("useTemplate")
										})
									})
								]
							})
						})
					})
				]
			})
		})
	});
};
//#endregion
//#region src/routes/app/dashboard/templates.tsx?tsr-split=component
var SplitComponent = TemplatesPage;
//#endregion
export { SplitComponent as component };
