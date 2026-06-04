import { a as initialResumeStateEn, c as getBorderRadiusValue, i as initialResumeState, n as blankResumeStateEn, t as blankResumeState } from "./initialResumeData-KCtMeTPD.js";
import { a as useLocale, n as formatDateRange, o as useTranslations, r as formatDateString, t as cn } from "./utils-CECdrI66.js";
import { t as generateUUID } from "./uuid-B3Jp4nyW.js";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "lucide-react";
//#region src/utils/fileSystem.ts
var DB_NAME = "FileHandleDB";
var HANDLE_STORE = "handles";
var CONFIG_STORE = "config";
var DB_VERSION = 2;
var db = null;
var initDB = () => {
	return new Promise((resolve, reject) => {
		if (db) {
			resolve();
			return;
		}
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => {
			db = request.result;
			resolve();
		};
		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(HANDLE_STORE)) db.createObjectStore(HANDLE_STORE);
			if (!db.objectStoreNames.contains(CONFIG_STORE)) db.createObjectStore(CONFIG_STORE);
		};
	});
};
var storeFileHandle = async (key, handle) => {
	await initDB();
	if (!db) throw new Error("Database not initialized");
	return new Promise((resolve, reject) => {
		const request = db.transaction(HANDLE_STORE, "readwrite").objectStore(HANDLE_STORE).put(handle, key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
};
var getFileHandle = async (key) => {
	await initDB();
	if (!db) throw new Error("Database not initialized");
	return new Promise((resolve, reject) => {
		const request = db.transaction(HANDLE_STORE, "readonly").objectStore(HANDLE_STORE).get(key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
};
var storeConfig = async (key, value) => {
	await initDB();
	if (!db) throw new Error("Database not initialized");
	return new Promise((resolve, reject) => {
		const request = db.transaction(CONFIG_STORE, "readwrite").objectStore(CONFIG_STORE).put(value, key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve();
	});
};
var getConfig = async (key) => {
	await initDB();
	if (!db) throw new Error("Database not initialized");
	return new Promise((resolve, reject) => {
		const request = db.transaction(CONFIG_STORE, "readonly").objectStore(CONFIG_STORE).get(key);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
};
var verifyPermission = async (handle, mode = "readwrite") => {
	if (!handle) return false;
	const options = { mode };
	if (await handle.queryPermission(options) === "granted") return true;
	if (await handle.requestPermission(options) === "granted") return true;
	return false;
};
//#endregion
//#region src/components/templates/classic/config.ts
var classicConfig = {
	id: "classic",
	name: "经典模板",
	description: "传统简约的简历布局，适合大多数求职场景",
	thumbnail: "classic",
	layout: "classic",
	colorScheme: {
		primary: "#000000",
		secondary: "#4b5563",
		background: "#ffffff",
		text: "#212529"
	},
	spacing: {
		sectionGap: 16,
		itemGap: 12,
		contentPadding: 32
	},
	basic: { layout: "left" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/modern/config.ts
var modernConfig = {
	id: "modern",
	name: "两栏布局",
	description: "经典两栏，突出个人特色",
	thumbnail: "modern",
	layout: "modern",
	colorScheme: {
		primary: "#000000",
		secondary: "#6b7280",
		background: "#ffffff",
		text: "#212529"
	},
	spacing: {
		sectionGap: 8,
		itemGap: 4,
		contentPadding: 0
	},
	basic: { layout: "center" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/left-right/config.ts
var leftRightConfig = {
	id: "left-right",
	name: "模块标题背景色",
	description: "模块标题背景鲜明，突出美观特色",
	thumbnail: "leftRight",
	layout: "left-right",
	colorScheme: {
		primary: "#000000",
		secondary: "#9ca3af",
		background: "#ffffff",
		text: "#212529"
	},
	spacing: {
		sectionGap: 24,
		itemGap: 16,
		contentPadding: 32
	},
	basic: { layout: "left" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/timeline/config.ts
var timelineConfig = {
	id: "timeline",
	name: "时间线风格",
	description: "时间线布局，突出经历的时间顺序",
	thumbnail: "timeline",
	layout: "timeline",
	colorScheme: {
		primary: "#18181b",
		secondary: "#64748b",
		background: "#ffffff",
		text: "#212529"
	},
	spacing: {
		sectionGap: 1,
		itemGap: 12,
		contentPadding: 24
	},
	basic: { layout: "left" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/minimalist/config.ts
var minimalistConfig = {
	id: "minimalist",
	name: "极简模板",
	description: "大面积留白，干净纯粹的排版风格",
	thumbnail: "minimalist",
	layout: "minimalist",
	colorScheme: {
		primary: "#171717",
		secondary: "#737373",
		background: "#ffffff",
		text: "#171717"
	},
	spacing: {
		sectionGap: 32,
		itemGap: 24,
		contentPadding: 40
	},
	basic: { layout: "center" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/elegant/config.ts
var elegantConfig = {
	id: "elegant",
	name: "优雅模板",
	description: "居中标题单列设计，具有高级感的分隔线",
	thumbnail: "elegant",
	layout: "elegant",
	colorScheme: {
		primary: "#18181b",
		secondary: "#71717a",
		background: "#ffffff",
		text: "#27272a"
	},
	spacing: {
		sectionGap: 28,
		itemGap: 18,
		contentPadding: 32
	},
	basic: { layout: "center" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/creative/config.ts
var creativeConfig = {
	id: "creative",
	name: "创意模板",
	description: "视觉错落设计，灵动活泼展现个性",
	thumbnail: "creative",
	layout: "creative",
	colorScheme: {
		primary: "#18181b",
		secondary: "#64748b",
		background: "#ffffff",
		text: "#1e293b"
	},
	spacing: {
		sectionGap: 16,
		itemGap: 16,
		contentPadding: 14
	},
	basic: { layout: "left" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/editorial/config.ts
var editorialConfig = {
	id: "editorial",
	name: "Editorial",
	description: "高端画报风模板，大号精美衬线体与窄体无衬线的完美结合，附带专属侧边时光轴设计，极具奢华感。",
	thumbnail: "editorial",
	layout: "editorial",
	colorScheme: {
		primary: "#000000",
		secondary: "#666666",
		text: "#1a1a1a",
		background: "#FFFFFF"
	},
	spacing: {
		sectionGap: 32,
		itemGap: 16,
		contentPadding: 36
	},
	basic: { layout: "left" },
	availableSections: [
		"basic",
		"experience",
		"education",
		"projects",
		"skills",
		"selfEvaluation",
		"certificates",
		"languages",
		"custom"
	]
};
//#endregion
//#region src/components/templates/swiss/config.ts
var swissConfig = {
	id: "swiss",
	name: "瑞士美学",
	description: "极具艺术感的包豪斯国际排版，超粗字重对比与几何色块点缀，彰显理性与高级",
	thumbnail: "swiss",
	layout: "swiss",
	colorScheme: {
		primary: "#0f172a",
		secondary: "#64748b",
		background: "#ffffff",
		text: "#0f172a"
	},
	spacing: {
		sectionGap: 36,
		itemGap: 20,
		contentPadding: 36
	},
	basic: { layout: "left" },
	availableSections: [
		"skills",
		"experience",
		"projects",
		"education",
		"selfEvaluation",
		"certificates"
	]
};
//#endregion
//#region src/components/templates/shared/SectionWrapper.tsx
/**
* Thin interaction wrapper for all section components.
* Provides hover highlight + click-to-select behavior.
*/
var SectionWrapper = ({ sectionId, children, className = "", style }) => {
	const { setActiveSection } = useResumeStore();
	return /* @__PURE__ */ jsx(motion.div, {
		"data-resume-section-id": sectionId,
		className: cn("hover:cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:shadow-md", "hover:bg-[#f9f8f3]", className),
		style,
		onClick: () => setActiveSection(sectionId),
		children
	});
};
//#endregion
//#region src/components/shared/GithubContribution.tsx
var colorLevels = [
	"bg-[#ebedf0]",
	"bg-[#9be9a8]",
	"bg-[#40c463]",
	"bg-[#30a14e]",
	"bg-[#216e39]"
];
var getColorLevel = (count) => {
	if (count === 0) return colorLevels[0];
	if (count <= 3) return colorLevels[1];
	if (count <= 7) return colorLevels[2];
	if (count <= 12) return colorLevels[3];
	return colorLevels[4];
};
var formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long"
	});
};
async function fetchGithubContributions(username, githubKey) {
	const token = githubKey;
	if (!token) throw new Error("GitHub token is required");
	const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;
	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query,
				variables: { username }
			})
		});
		if (!response.ok) {
			const errorData = await response.json();
			console.error("GitHub API Error:", errorData);
			throw new Error(errorData.message || "Failed to fetch GitHub data");
		}
		const data = await response.json();
		if (data.errors) {
			console.error("GitHub API Error:", data.errors);
			throw new Error(data.errors[0]?.message || "GitHub API Error");
		}
		const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
		if (!calendar) throw new Error("No contribution data found");
		const contributions = [];
		calendar.weeks.forEach((week) => {
			week.contributionDays.forEach((day) => {
				contributions.push({
					date: day.date,
					count: day.contributionCount
				});
			});
		});
		return contributions;
	} catch (error) {
		console.error("Error fetching GitHub contributions:", error);
		throw error;
	}
}
var GithubContributions = ({ username, githubKey, className, year = (/* @__PURE__ */ new Date()).getFullYear() }) => {
	const [weeks, setWeeks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		async function loadContributions() {
			try {
				setLoading(true);
				const yearContributions = (await fetchGithubContributions(username, githubKey)).filter((day) => {
					return new Date(day.date).getFullYear() === year;
				});
				const groupedWeeks = [];
				let currentWeek = [];
				yearContributions.forEach((day, index) => {
					currentWeek.push(day);
					if (currentWeek.length === 7 || index === yearContributions.length - 1) {
						if (currentWeek.length < 7) {
							const emptyDays = 7 - currentWeek.length;
							for (let i = 0; i < emptyDays; i++) currentWeek.push({
								date: "",
								count: 0
							});
						}
						groupedWeeks.push([...currentWeek]);
						currentWeek = [];
					}
				});
				setWeeks(groupedWeeks);
				setError(null);
			} catch (err) {
				setError("Failed to load GitHub contributions");
			} finally {
				setLoading(false);
			}
		}
		if (username) loadContributions();
	}, [
		githubKey,
		username,
		year
	]);
	if (loading) return /* @__PURE__ */ jsx("div", { className: "animate-pulse bg-gray-200 h-32 rounded-md" });
	if (error) return /* @__PURE__ */ jsx("div", {
		className: "text-red-500",
		children: error
	});
	const goGithub = () => {
		window.open(`https://github.com/${username}`, "_blank");
	};
	return /* @__PURE__ */ jsx("div", {
		className: "w-full flex  flex-col gap-2",
		children: /* @__PURE__ */ jsx("div", {
			className: cn("w-full flex justify-start gap-[1px]  overflow-hidden", className),
			children: weeks.map((week, weekIndex) => /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-[3px]",
				children: week.map((day, dayIndex) => /* @__PURE__ */ jsx("div", {
					className: cn("w-[13px] h-[13px] rounded-[3px] relative group cursor-pointer", getColorLevel(day.count), "transition-colors duration-200"),
					title: String(day.date),
					onClick: goGithub,
					children: day.date && /* @__PURE__ */ jsxs("div", {
						className: "pointer-events-none absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-10",
						style: {
							visibility: "hidden",
							transitionProperty: "opacity, visibility",
							transitionDuration: "150ms"
						},
						children: [
							formatDate(day.date),
							": ",
							day.count,
							" contributions",
							/* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" })
						]
					})
				}, `${weekIndex}-${dayIndex}`))
			}, weekIndex))
		})
	});
};
//#endregion
//#region src/lib/projectLink.ts
var ABSOLUTE_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:/i;
var SAFE_PROTOCOL_REGEX = /^https?:/i;
var getProjectLinkHref = (link) => {
	const value = link?.trim();
	if (!value) return null;
	if (SAFE_PROTOCOL_REGEX.test(value)) return value;
	if (ABSOLUTE_PROTOCOL_REGEX.test(value)) return null;
	return `https://${value}`;
};
var getProjectLinkLabel = (project, options) => {
	const customLabel = project.linkLabel?.trim();
	if (customLabel) return customLabel;
	const originalLink = project.link?.trim();
	if (!originalLink) return "";
	if (options?.preferFullUrl) return originalLink;
	const href = getProjectLinkHref(originalLink);
	if (!href) return originalLink;
	try {
		return new URL(href).hostname.replace(/^www\./, "");
	} catch {
		return originalLink;
	}
};
var getProjectLinkMeta = (project, options) => {
	const href = getProjectLinkHref(project.link);
	if (!href) return null;
	return {
		href,
		label: getProjectLinkLabel(project, options),
		title: project.link?.trim() || href
	};
};
//#endregion
//#region src/lib/customField.ts
var trim = (value) => value?.trim() || "";
var getCustomFieldDisplayText = (field) => {
	const label = trim(field.label);
	const value = trim(field.value);
	if (field.displayLabel) return label || value;
	return value;
};
var shouldShowCustomFieldLabelPrefix = (field) => {
	return !field.displayLabel && Boolean(trim(field.label));
};
var getCustomFieldHref = (field) => {
	if (!field.displayLabel) return null;
	return getProjectLinkHref(field.value);
};
//#endregion
//#region src/components/templates/classic/sections/BaseInfo.tsx
var BaseInfo$8 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		label: "姓名",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		label: "职位",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex items-center justify-between gap-6",
			leftContent: "flex items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-left min-w-0 max-w-[16rem] flex-1"
		},
		right: {
			container: "flex items-center justify-between gap-6 flex-row-reverse",
			leftContent: "flex flex-row-reverse justify-start items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-right min-w-0 max-w-[16rem] flex-1"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			leftContent: "flex flex-col items-center gap-4",
			fields: "w-full flex justify-center items-center flex-wrap gap-3",
			nameTitle: "text-center min-w-0 max-w-full"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "basic",
		children: [/* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.leftContent,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col", styles.nameTitle),
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "30px" },
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "18px" },
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "rgb(75, 85, 99)",
					maxWidth: layout === "center" ? "none" : "600px"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		}), basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
			className: "mt-2",
			githubKey: basic.githubKey,
			username: basic.githubUseName
		})]
	});
};
//#endregion
//#region src/components/templates/TemplateContext.tsx
var TemplateContext = createContext(void 0);
var TemplateProvider = ({ templateId, menuSections, children }) => {
	return /* @__PURE__ */ jsx(TemplateContext.Provider, {
		value: {
			templateId,
			menuSections
		},
		children
	});
};
var useTemplateContext = () => {
	return useContext(TemplateContext);
};
//#endregion
//#region src/components/templates/classic/sections/SectionTitle.tsx
var SectionTitle$8 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	return /* @__PURE__ */ jsx("h3", {
		className: "pb-2 border-b font-bold",
		style: {
			fontSize: `${globalSettings?.headerSize || 18}px`,
			color: themeColor,
			borderColor: themeColor,
			marginBottom: `${globalSettings?.paragraphSpacing}px`
		},
		children: renderTitle
	});
};
//#endregion
//#region src/lib/richText.ts
var HTML_TAG_REGEX = /<\/?[a-z][\s\S]*>/i;
var EMPTY_PARAGRAPH_REGEX = /<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi;
var HTML_BREAK_REGEX = /<br\s*\/?>/gi;
var HTML_ANY_TAG_REGEX = /<\/?[^>]+>/g;
var INVISIBLE_WHITESPACE_REGEX = /[\s\u200B-\u200D\uFEFF]/g;
var TRAILING_LIST_PARAGRAPH_REGEX = /(<\/(?:ul|ol)>)\s*<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>\s*$/i;
var RICH_TEXT_ANCHOR_REGEX = /<a\b([^>]*)>/gi;
var CLASS_ATTRIBUTE_REGEX = /\bclass\s*=\s*("([^"]*)"|'([^']*)')/i;
var CLASS_ATTRIBUTE_GLOBAL_REGEX = /\bclass\s*=\s*("([^"]*)"|'([^']*)')/gi;
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var DOMAIN_REGEX = /^(?:www\.)?[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:[/?#][^\s]*)?$/i;
var SAFE_LINK_PROTOCOL_REGEX = /^(https?:|mailto:|tel:)/i;
var ANY_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:/i;
var LEGACY_RICH_TEXT_CLASSES = new Set(["custom-list", "custom-list-ordered"]);
var escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var decorateRichTextAnchors = (content) => content.replace(RICH_TEXT_ANCHOR_REGEX, (match, attrs) => {
	if (CLASS_ATTRIBUTE_REGEX.test(attrs)) return match.replace(CLASS_ATTRIBUTE_REGEX, (_classMatch, quotedValue, doubleQuoted, singleQuoted) => {
		const classes = (doubleQuoted ?? singleQuoted ?? quotedValue ?? "").split(/\s+/).filter(Boolean);
		if (!classes.includes("rich-text-link")) classes.push("rich-text-link");
		return `class="${classes.join(" ")}"`;
	});
	return `<a class="rich-text-link"${attrs}>`;
});
var stripLegacyRichTextClasses = (content) => {
	if (!content) return "";
	return content.replace(CLASS_ATTRIBUTE_GLOBAL_REGEX, (_match, quotedValue, doubleQuoted, singleQuoted) => {
		const classes = (doubleQuoted ?? singleQuoted ?? quotedValue ?? "").split(/\s+/).filter(Boolean).filter((className) => !LEGACY_RICH_TEXT_CLASSES.has(className));
		return classes.length ? `class="${classes.join(" ")}"` : "";
	});
};
var stripTrailingListParagraph = (content) => {
	if (!content) return "";
	let normalized = content;
	while (TRAILING_LIST_PARAGRAPH_REGEX.test(normalized)) normalized = normalized.replace(TRAILING_LIST_PARAGRAPH_REGEX, "$1");
	return normalized;
};
var normalizeLinkHref = (href) => {
	if (!href) return null;
	const value = href.trim();
	if (!value) return null;
	if (SAFE_LINK_PROTOCOL_REGEX.test(value)) return value;
	if (value.startsWith("//")) return `https:${value}`;
	if (EMAIL_REGEX.test(value)) return `mailto:${value}`;
	if (DOMAIN_REGEX.test(value)) return `https://${value}`;
	if (ANY_PROTOCOL_REGEX.test(value)) return null;
	return null;
};
/**
* 规范化富文本内容，解决以下问题：
* 1. 纯文本中的换行无法在 HTML 中展示；
* 2. TipTap 产生的空 <p> 标签没有高度。
*/
var normalizeRichTextContent = (content) => {
	if (!content) return "";
	let normalized = content;
	if (!HTML_TAG_REGEX.test(content)) normalized = escapeHtml(content).replace(/\r\n|\r|\n/g, "<br />");
	return decorateRichTextAnchors(stripTrailingListParagraph(stripLegacyRichTextClasses(normalized))).replace(EMPTY_PARAGRAPH_REGEX, "<p><br /></p>");
};
var hasMeaningfulRichTextContent = (content) => {
	if (!content) return false;
	if (!HTML_TAG_REGEX.test(content)) return content.replace(INVISIBLE_WHITESPACE_REGEX, "").length > 0;
	return content.replace(EMPTY_PARAGRAPH_REGEX, "").replace(HTML_BREAK_REGEX, "").replace(/&nbsp;/gi, " ").replace(HTML_ANY_TAG_REGEX, "").replace(INVISIBLE_WHITESPACE_REGEX, "").length > 0;
};
//#endregion
//#region src/components/templates/classic/sections/ExperienceSection.tsx
var ExperienceSection$8 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$8, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/classic/sections/EducationSection.tsx
var EducationSection$8 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$8, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: edu.school
							}),
							centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								suppressHydrationWarning: true,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					!centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/classic/sections/ProjectSection.tsx
var ProjectSection$8 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$8, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `underline ${flexLayout ? "" : "flex-1"}`,
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/classic/sections/SkillSection.tsx
var SkillSection$8 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$8, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/classic/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$8 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$8, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/classic/sections/CustomSection.tsx
var CustomSection$8 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$8, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/shared/CertificatesSection.tsx
var CertificatesSection = ({ certificates }) => {
	if (!certificates || certificates.length === 0) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-wrap gap-2 w-full mt-2",
		children: certificates.map((cert) => /* @__PURE__ */ jsx("div", {
			style: { width: `calc(${cert.width}% - 8px)` },
			className: "flex justify-center max-w-full",
			children: /* @__PURE__ */ jsx("img", {
				src: cert.url,
				alt: "Certificate",
				className: "w-full h-auto object-contain"
			})
		}, cert.id))
	});
};
//#endregion
//#region src/components/templates/classic/index.tsx
var ClassicTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$8, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$8, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$8, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$8, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$8, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$8, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$8, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$8, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full min-h-screen",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id))
	});
};
//#endregion
//#region src/components/templates/modern/sections/BaseInfo.tsx
/**
* Modern template BaseInfo — designed for sidebar (white text on theme color background).
*/
var BaseInfo$7 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex flex-col gap-3",
			header: "flex items-center gap-4",
			nameTitle: "text-left min-w-[10rem] max-w-full flex-1",
			fields: "w-full flex flex-col gap-2"
		},
		right: {
			container: "flex flex-col gap-3",
			header: "flex flex-row-reverse items-center gap-4",
			nameTitle: "text-right min-w-[10rem] max-w-full flex-1",
			fields: "w-full flex flex-col gap-2"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			header: "flex flex-col items-center gap-4",
			nameTitle: "text-center min-w-0 max-w-full",
			fields: "w-full flex flex-col gap-2"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsx(SectionWrapper, {
		sectionId: "basic",
		children: /* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.header,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: `flex flex-col ${styles.nameTitle}`,
					style: { color: "#fff" },
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: {
							fontSize: "30px",
							color: "#fff"
						},
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: {
							fontSize: "18px",
							color: "#fff"
						},
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "#fff"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						style: {
							width: "100%",
							color: "#fff"
						},
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							style: { color: "#fff" },
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								style: { color: "#fff" },
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								style: { color: "#fff" },
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								style: { color: "#fff" },
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							style: { color: "#fff" },
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									style: { color: "#fff" },
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									style: { color: "#fff" },
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									style: { color: "#fff" },
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									style: { color: "#fff" },
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		})
	});
};
//#endregion
//#region src/components/templates/modern/sections/SectionTitle.tsx
var SectionTitle$7 = ({ type, title, globalSettings, showTitle = true, variant = "default" }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	const isSidebar = variant === "sidebar";
	return /* @__PURE__ */ jsx("h3", {
		className: cn("pb-1 font-semibold mb-2 uppercase tracking-wider", isSidebar ? "border-b border-white/20" : "border-b"),
		style: {
			fontSize: `${isSidebar ? (globalSettings?.headerSize || 18) - 2 : globalSettings?.headerSize || 18}px`,
			fontWeight: "bold",
			color: isSidebar ? "#ffffff" : themeColor,
			borderColor: isSidebar ? "rgba(255,255,255,0.2)" : themeColor,
			marginBottom: isSidebar ? "12px" : `${globalSettings?.paragraphSpacing}px`
		},
		children: renderTitle
	});
};
//#endregion
//#region src/components/templates/modern/sections/ExperienceSection.tsx
var ExperienceSection$7 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$7, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center justify-between gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: cn("font-bold truncate", flexLayout ? "" : "flex-1"),
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"),
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right"),
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/modern/sections/EducationSection.tsx
var EducationSection$7 = ({ education, globalSettings, showTitle = true, variant = "default" }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	const isSidebar = variant === "sidebar";
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: isSidebar ? 0 : `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$7, {
			type: "education",
			globalSettings,
			showTitle,
			variant
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: isSidebar ? "12px" : `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: cn("flex gap-4 items-center justify-between", isSidebar && "flex-col items-start gap-1"),
						children: [
							/* @__PURE__ */ jsx("div", {
								className: cn("font-bold truncate", !flexLayout && !isSidebar && "flex-1"),
								style: {
									fontSize: `${isSidebar ? (globalSettings?.baseFontSize || 14) + 2 : globalSettings?.subheaderSize || 16}px`,
									color: isSidebar ? "#fff" : "inherit"
								},
								children: edu.school
							}),
							centerSubtitle && !isSidebar && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"),
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: cn("text-subtitleFont shrink-0 whitespace-nowrap", !flexLayout && !isSidebar && "text-right", isSidebar && "opacity-80"),
								suppressHydrationWarning: true,
								style: {
									fontSize: isSidebar ? "12px" : `${globalSettings?.subheaderSize || 16}px`,
									color: isSidebar ? "#fff" : "inherit"
								},
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					(!centerSubtitle || isSidebar) && /* @__PURE__ */ jsxs("div", {
						className: cn("text-subtitleFont mt-0.5", isSidebar ? "text-xs opacity-90" : "mt-1"),
						style: {
							fontSize: isSidebar ? "12px" : `${globalSettings?.subheaderSize || 16}px`,
							color: isSidebar ? "#fff" : "inherit"
						},
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: cn("mt-1 text-baseFont", isSidebar && " opacity-80"),
						style: {
							fontSize: `${isSidebar ? (globalSettings?.baseFontSize || 14) - 2 : globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6,
							color: isSidebar ? "#fff" : "inherit"
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/modern/sections/ProjectSection.tsx
var ProjectSection$7 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$7, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center justify-between gap-4",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: cn("flex items-center gap-2 truncate", flexLayout ? "" : "flex-1"),
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold truncate",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: cn("underline truncate shrink", flexLayout ? "" : "flex-1"),
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"),
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right"),
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/modern/sections/SkillSection.tsx
var SkillSection$7 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$7, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/modern/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$7 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$7, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/modern/sections/CustomSection.tsx
var CustomSection$7 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$7, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center justify-between gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: cn("flex items-center gap-2 truncate", flexLayout ? "" : "flex-1"),
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold truncate",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: cn("text-subtitleFont truncate", flexLayout ? "ml-[16px]" : "flex-1"),
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: cn("text-subtitleFont shrink-0 whitespace-nowrap", flexLayout ? "ml-auto" : "text-right"),
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/modern/index.tsx
var ModernTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$7, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$7, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$7, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$7, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$7, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$7, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$7, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$7, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	const basicSection = enabledSections.find((s) => s.id === "basic");
	const educationSection = enabledSections.find((s) => s.id === "education");
	const otherSections = enabledSections.filter((s) => s.id !== "basic" && s.id !== "education");
	return /* @__PURE__ */ jsx("table", {
		className: "w-full border-collapse",
		style: {
			height: `calc(297mm - ${(data.globalSettings?.pagePadding || 32) * 2}px)`,
			tableLayout: "fixed"
		},
		children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsxs("td", {
			className: "p-4 align-top relative",
			style: {
				width: "33.333333%",
				backgroundColor: data.globalSettings.themeColor,
				color: "#ffffff",
				paddingTop: data.globalSettings.sectionSpacing
			},
			children: [basicSection && renderSection(basicSection.id), educationSection && /* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children: /* @__PURE__ */ jsx(EducationSection$7, {
					education: data.education,
					globalSettings: data.globalSettings,
					variant: "sidebar"
				})
			})]
		}), /* @__PURE__ */ jsx("td", {
			className: "p-4 pt-0 align-top relative",
			style: {
				width: "66.666667%",
				backgroundColor: colorScheme.background,
				color: colorScheme.text
			},
			children: otherSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id))
		})] }) })
	});
};
//#endregion
//#region src/components/templates/left-right/sections/BaseInfo.tsx
var BaseInfo$6 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		label: "姓名",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		label: "职位",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex items-center justify-between gap-6",
			leftContent: "flex items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-left min-w-0 max-w-[16rem] flex-1"
		},
		right: {
			container: "flex items-center justify-between gap-6 flex-row-reverse",
			leftContent: "flex flex-row-reverse justify-start items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-right min-w-0 max-w-[16rem] flex-1"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			leftContent: "flex flex-col items-center gap-4",
			fields: "w-full flex justify-center items-center flex-wrap gap-3",
			nameTitle: "text-center min-w-0 max-w-full"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "basic",
		children: [/* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.leftContent,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col", styles.nameTitle),
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "30px" },
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "18px" },
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "rgb(75, 85, 99)",
					maxWidth: layout === "center" ? "none" : "600px"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		}), basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
			className: "mt-2",
			githubKey: basic.githubKey,
			username: basic.githubUseName
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/SectionTitle.tsx
var SectionTitle$6 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0",
			style: {
				backgroundColor: themeColor,
				opacity: .1
			}
		}), /* @__PURE__ */ jsx("h3", {
			className: "pl-4 py-1 flex items-center relative font-bold",
			style: {
				fontSize: `${globalSettings?.headerSize || 18}px`,
				color: themeColor,
				borderLeft: `3px solid ${themeColor}`,
				marginBottom: `${globalSettings?.paragraphSpacing}px`
			},
			children: renderTitle
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/ExperienceSection.tsx
var ExperienceSection$6 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$6, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/EducationSection.tsx
var EducationSection$6 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$6, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: edu.school
							}),
							centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								suppressHydrationWarning: true,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					!centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/ProjectSection.tsx
var ProjectSection$6 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$6, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `underline ${flexLayout ? "" : "flex-1"}`,
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/SkillSection.tsx
var SkillSection$6 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$6, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$6 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$6, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/sections/CustomSection.tsx
var CustomSection$6 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$6, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/left-right/index.tsx
var LeftRightTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$6, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$6, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$6, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$6, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$6, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$6, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$6, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$6, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id))
	});
};
//#endregion
//#region src/components/templates/timeline/sections/BaseInfo.tsx
var BaseInfo$5 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		label: "姓名",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		label: "职位",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex items-center justify-between gap-6",
			leftContent: "flex items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-left min-w-0 max-w-[16rem] flex-1"
		},
		right: {
			container: "flex items-center justify-between gap-6 flex-row-reverse",
			leftContent: "flex flex-row-reverse justify-start items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-right min-w-0 max-w-[16rem] flex-1"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			leftContent: "flex flex-col items-center gap-4",
			fields: "w-full flex justify-center items-center flex-wrap gap-3",
			nameTitle: "text-center min-w-0 max-w-full"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "basic",
		children: [/* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.leftContent,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col", styles.nameTitle),
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "30px" },
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "18px" },
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "rgb(75, 85, 99)",
					maxWidth: layout === "center" ? "none" : "600px"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		}), basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
			className: "mt-2",
			githubKey: basic.githubKey,
			username: basic.githubUseName
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/sections/SectionTitle.tsx
var SectionTitle$5 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "text-xl font-bold mb-4",
		style: {
			color: themeColor,
			fontSize: `${globalSettings?.headerSize || 20}px`
		},
		children: renderTitle
	});
};
//#endregion
//#region src/components/templates/timeline/sections/ExperienceSection.tsx
var ExperienceSection$5 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$5, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/sections/EducationSection.tsx
var EducationSection$5 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$5, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: edu.school
							}),
							centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								suppressHydrationWarning: true,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					!centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/sections/ProjectSection.tsx
var ProjectSection$5 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$5, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `underline ${flexLayout ? "" : "flex-1"}`,
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/sections/SkillSection.tsx
var SkillSection$5 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$5, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$5 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$5, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/sections/CustomSection.tsx
var CustomSection$5 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$5, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/timeline/index.tsx
var TimelineTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderTimelineItem = (content, title) => /* @__PURE__ */ jsxs("div", {
		className: "relative pl-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute left-0 top-2 h-full w-0.5",
				style: { backgroundColor: "#e5e7eb" }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute left-[-6px] top-2 w-3 h-3 rounded-full",
				style: { backgroundColor: colorScheme.primary }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "text-xl font-bold mb-4",
				style: {
					color: data.globalSettings.themeColor,
					fontSize: `${data.globalSettings.headerSize || 20}px`
				},
				children: title
			}),
			/* @__PURE__ */ jsx("div", { children: content })
		]
	});
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$5, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$5, {
				experiences: data.experience,
				globalSettings: data.globalSettings,
				showTitle: false
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$5, {
				education: data.education,
				globalSettings: data.globalSettings,
				showTitle: false
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$5, {
				skill: data.skillContent,
				globalSettings: data.globalSettings,
				showTitle: false
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$5, {
				projects: data.projects,
				globalSettings: data.globalSettings,
				showTitle: false
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$5, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$5, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings,
				showTitle: false
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$5, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings,
					showTitle: false
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full min-h-screen pl-[6px]",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: enabledSections.map((section) => {
			if (section.id === "basic") return /* @__PURE__ */ jsx("div", {
				className: "mb-4",
				children: renderSection(section.id)
			}, section.id);
			const sectionTitle = data.menuSections.find((s) => s.id === section.id)?.title || section.id;
			return /* @__PURE__ */ jsx("div", {
				className: "mb-4",
				children: /* @__PURE__ */ jsx("div", {
					className: "timeline-section",
					children: renderTimelineItem(renderSection(section.id), sectionTitle)
				})
			}, section.id);
		})
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/BaseInfo.tsx
var BaseInfo$4 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		label: "姓名",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		label: "职位",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex items-center justify-between gap-6",
			leftContent: "flex items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-left min-w-0 max-w-[16rem] flex-1"
		},
		right: {
			container: "flex items-center justify-between gap-6 flex-row-reverse",
			leftContent: "flex flex-row-reverse justify-start items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-right min-w-0 max-w-[16rem] flex-1"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			leftContent: "flex flex-col items-center gap-4",
			fields: "w-full flex justify-center items-center flex-wrap gap-3",
			nameTitle: "text-center min-w-0 max-w-full"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "basic",
		children: [/* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.leftContent,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col", styles.nameTitle),
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "30px" },
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "18px" },
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "rgb(75, 85, 99)",
					maxWidth: layout === "center" ? "none" : "600px"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		}), basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
			className: "mt-2",
			githubKey: basic.githubKey,
			username: basic.githubUseName
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/SectionTitle.tsx
var SectionTitle$4 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	return /* @__PURE__ */ jsx("h3", {
		className: "pb-1 mb-2 tracking-widest uppercase font-bold",
		style: {
			fontSize: `${globalSettings?.headerSize || 16}px`,
			color: themeColor,
			marginBottom: `${globalSettings?.paragraphSpacing}px`
		},
		children: renderTitle
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/ExperienceSection.tsx
var ExperienceSection$4 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$4, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/EducationSection.tsx
var EducationSection$4 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$4, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: edu.school
							}),
							centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								suppressHydrationWarning: true,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					!centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/ProjectSection.tsx
var ProjectSection$4 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$4, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `underline ${flexLayout ? "" : "flex-1"}`,
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/SkillSection.tsx
var SkillSection$4 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$4, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$4 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$4, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/sections/CustomSection.tsx
var CustomSection$4 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$4, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/minimalist/index.tsx
var MinimalistTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$4, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$4, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$4, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$4, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$4, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$4, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$4, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$4, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full min-h-screen",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", {
			className: "w-full",
			children: renderSection(section.id)
		}, section.id))
	});
};
//#endregion
//#region src/components/templates/elegant/sections/BaseInfo.tsx
var BaseInfo$3 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		label: "姓名",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		label: "职位",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex items-center justify-between gap-6",
			leftContent: "flex items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-left min-w-0 max-w-[16rem] flex-1"
		},
		right: {
			container: "flex items-center justify-between gap-6 flex-row-reverse",
			leftContent: "flex flex-row-reverse justify-start items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-right min-w-0 max-w-[16rem] flex-1"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			leftContent: "flex flex-col items-center gap-4",
			fields: "w-full flex justify-center items-center flex-wrap gap-3",
			nameTitle: "text-center min-w-0 max-w-full"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "basic",
		children: [/* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.leftContent,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col", styles.nameTitle),
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "30px" },
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: { fontSize: "18px" },
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "rgb(75, 85, 99)",
					maxWidth: layout === "center" ? "none" : "600px"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		}), basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
			className: "mt-2",
			githubKey: basic.githubKey,
			username: basic.githubUseName
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/SectionTitle.tsx
var SectionTitle$3 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-center w-full mb-4 relative",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 flex items-center",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("div", {
				className: "w-full border-t",
				style: {
					borderColor: themeColor,
					opacity: .3
				}
			})
		}), /* @__PURE__ */ jsx("h3", {
			className: "relative bg-white px-4 text-center font-bold",
			style: {
				fontSize: `${globalSettings?.headerSize || 20}px`,
				color: themeColor
			},
			children: renderTitle
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/ExperienceSection.tsx
var ExperienceSection$3 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$3, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/EducationSection.tsx
var EducationSection$3 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$3, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: edu.school
							}),
							centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								suppressHydrationWarning: true,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					!centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/ProjectSection.tsx
var ProjectSection$3 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$3, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `underline ${flexLayout ? "" : "flex-1"}`,
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/SkillSection.tsx
var SkillSection$3 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$3, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$3 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$3, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/sections/CustomSection.tsx
var CustomSection$3 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$3, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/elegant/index.tsx
var ElegantTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$3, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$3, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$3, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$3, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$3, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$3, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$3, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$3, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full min-h-screen items-center",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: /* @__PURE__ */ jsx("div", {
			className: "w-full max-w-4xl",
			children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", {
				className: "w-full",
				children: renderSection(section.id)
			}, section.id))
		})
	});
};
//#endregion
//#region src/components/templates/creative/sections/BaseInfo.tsx
/**
* Creative template BaseInfo — white text, designed for the colored header block.
*/
var BaseInfo$2 = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-4 w-4 shrink-0" }) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 100}px`,
				height: `${basic.photoConfig?.height || 100}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex items-center justify-between gap-6",
			leftContent: "flex items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-left min-w-0 max-w-[16rem] flex-1"
		},
		right: {
			container: "flex items-center justify-between gap-6 flex-row-reverse",
			leftContent: "flex flex-row-reverse justify-start items-center gap-6 shrink-0 min-w-0 max-w-[42%]",
			fields: "grid flex-1 min-w-0 grid-cols-2 gap-x-6 gap-y-2 justify-start",
			nameTitle: "text-right min-w-0 max-w-[16rem] flex-1"
		},
		center: {
			container: "flex flex-col items-center gap-3",
			leftContent: "flex flex-col items-center gap-4",
			fields: "w-full flex justify-center items-center flex-wrap gap-3",
			nameTitle: "text-center min-w-0 max-w-full"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsx(SectionWrapper, {
		sectionId: "basic",
		children: /* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.leftContent,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col", styles.nameTitle),
					style: { color: "#fff" },
					children: [nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
						layout: "position",
						className: "font-bold whitespace-normal break-normal [overflow-wrap:normal]",
						style: {
							fontSize: "30px",
							color: "#fff"
						},
						children: basic[nameField.key]
					}), titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
						layout: "position",
						className: "whitespace-normal break-normal [overflow-wrap:normal]",
						style: {
							fontSize: "18px",
							color: "#fff"
						},
						children: basic[titleField.key]
					})]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.fields,
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					color: "#fff",
					maxWidth: layout === "center" ? "none" : "600px"
				},
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsx(motion.div, {
						className: "flex min-w-0 items-start text-baseFont",
						style: { color: "#fff" },
						children: useIconMode ? /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-1",
							style: { color: "#fff" },
							children: [getIcon(item.icon), item.key === "email" ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${item.value}`,
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								style: { color: "#fff" },
								children: item.value
							}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
								href: customFieldHref,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "min-w-0 underline [overflow-wrap:anywhere]",
								style: { color: "#fff" },
								children: item.value
							}) : /* @__PURE__ */ jsx("span", {
								className: "min-w-0 [overflow-wrap:anywhere]",
								style: { color: "#fff" },
								children: item.value
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex min-w-0 items-start gap-2",
							style: { color: "#fff" },
							children: [
								!item.custom && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									style: { color: "#fff" },
									children: [t(`basicPanel.basicFields.${item.key}`), ":"]
								}),
								item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsxs("span", {
									className: "shrink-0",
									style: { color: "#fff" },
									children: [item.label, ":"]
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "min-w-0 underline [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									style: { color: "#fff" },
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "min-w-0 [overflow-wrap:anywhere]",
									suppressHydrationWarning: true,
									style: { color: "#fff" },
									children: item.value
								})
							]
						})
					}, item.key);
				})
			})]
		})
	});
};
//#endregion
//#region src/components/templates/creative/sections/SectionTitle.tsx
var SectionTitle$2 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor;
	if (!showTitle) return null;
	return /* @__PURE__ */ jsx("h3", {
		className: "inline-block px-3 py-1 rounded text-white shadow-sm mb-3 font-bold",
		style: {
			fontSize: `${globalSettings?.headerSize || 16}px`,
			backgroundColor: themeColor,
			color: "#ffffff",
			marginBottom: `${globalSettings?.paragraphSpacing}px`
		},
		children: renderTitle
	});
};
//#endregion
//#region src/components/templates/creative/sections/ExperienceSection.tsx
var ExperienceSection$2 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$2, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.company
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: exp.position
							}),
							/* @__PURE__ */ jsx("div", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(exp.date, locale)
							})
						]
					}),
					exp.position && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
						className: "text-subtitleFont",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: exp.position
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						className: "mt-1 text-baseFont",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/creative/sections/EducationSection.tsx
var EducationSection$2 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$2, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `font-bold ${flexLayout ? "" : "flex-[1.5]"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: edu.school
							}),
							centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								suppressHydrationWarning: true,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})
						]
					}),
					!centerSubtitle && /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
					}),
					hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/creative/sections/ProjectSection.tsx
var ProjectSection$2 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$2, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
										children: /* @__PURE__ */ jsx("h3", {
											className: "font-bold",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										})
									}),
									projectLink && !centerSubtitle && /* @__PURE__ */ jsx("a", {
										href: projectLink.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: `underline ${flexLayout ? "" : "flex-1"}`,
										title: projectLink.title,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: projectLink.label
									}),
									!projectLink && !centerSubtitle && !flexLayout && /* @__PURE__ */ jsx("div", { className: "flex-1" }),
									centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
										layout: "position",
										className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: project.role
									}),
									/* @__PURE__ */ jsx("div", {
										className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
										style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
										children: formatDateString(project.date, locale)
									})
								]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "text-subtitleFont",
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: project.role
							}),
							projectLink && centerSubtitle && /* @__PURE__ */ jsx("a", {
								href: projectLink.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline",
								title: projectLink.title,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: projectLink.label
							}),
							project.description && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: "mt-1 text-baseFont",
								style: {
									fontSize: `${globalSettings?.baseFontSize || 14}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								},
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/creative/sections/SkillSection.tsx
var SkillSection$2 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$2, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/creative/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$2 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$2, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-baseFont",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/creative/sections/CustomSection.tsx
var CustomSection$2 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const flexLayout = globalSettings?.flexibleHeaderLayout;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$2, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex items-center gap-2 ${flexLayout ? "" : "flex-[1.5]"}`,
								children: /* @__PURE__ */ jsx("h4", {
									className: "font-bold",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								})
							}),
							centerSubtitle && /* @__PURE__ */ jsx(motion.div, {
								layout: "position",
								className: `text-subtitleFont ${flexLayout ? "ml-[16px]" : "flex-1"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: item.subtitle
							}),
							/* @__PURE__ */ jsx("span", {
								className: `text-subtitleFont shrink-0 ${flexLayout ? "ml-auto" : "flex-1 text-right"}`,
								style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
								children: formatDateString(item.dateRange, locale)
							})
						]
					}),
					!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "text-subtitleFont mt-1",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: item.subtitle
					}),
					item.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-1 text-baseFont",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 14}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
					})
				]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/creative/index.tsx
var CreativeTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const basicSection = enabledSections.find((s) => s.id === "basic");
	const otherSections = enabledSections.filter((s) => s.id !== "basic");
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$2, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$2, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$2, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$2, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$2, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$2, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$2, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full min-h-screen",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: [basicSection && /* @__PURE__ */ jsx("div", {
			className: "w-full relative py-8 px-4 rounded-b-3xl pr-0",
			style: {
				backgroundColor: data.globalSettings.themeColor,
				color: "#ffffff"
			},
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative z-10 w-full",
				children: [/* @__PURE__ */ jsx(BaseInfo$2, {
					basic: data.basic,
					globalSettings: data.globalSettings,
					template
				}), data.basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
					className: "mt-2 text-white",
					githubKey: data.basic.githubKey,
					username: data.basic.githubUseName
				})]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: " w-full w-max-4xl mx-auto",
			children: otherSections.map((section) => /* @__PURE__ */ jsx("div", { children: renderSection(section.id) }, section.id))
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/sections/BaseInfo.tsx
var BaseInfo$1 = ({ basic, globalSettings }) => {
	const locale = useLocale();
	const t = useTranslations("workbench");
	const getOrderedFields = React.useMemo(() => {
		if (!basic.fieldOrder) return [
			{
				key: "email",
				value: basic.email,
				custom: false,
				label: ""
			},
			{
				key: "phone",
				value: basic.phone,
				custom: false,
				label: ""
			},
			{
				key: "location",
				value: basic.location,
				custom: false,
				label: ""
			}
		].filter((f) => !!f.value);
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			label: field.label,
			custom: false
		})).filter((item) => !!item.value);
	}, [basic, locale]);
	const customFields = basic.customFields?.filter((f) => f.visible !== false && Boolean(getCustomFieldDisplayText(f))) || [];
	const allFields = [...getOrderedFields, ...customFields.map((f) => ({
		key: f.id,
		value: getCustomFieldDisplayText(f),
		custom: true,
		label: f.label,
		icon: f.icon,
		displayLabel: f.displayLabel,
		href: getCustomFieldHref(f)
	}))];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || { visible: true };
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || { visible: true };
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "mt-[0.2em] h-3.5 w-3.5 shrink-0" }) : null;
	};
	const showPhoto = basic.photo && basic.photoConfig?.visible;
	return /* @__PURE__ */ jsx(SectionWrapper, {
		sectionId: "basic",
		className: " w-full",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col w-full",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex-1 min-w-0",
						children: basic.name && nameField.visible !== false && /* @__PURE__ */ jsx(motion.h1, {
							layout: "position",
							className: "font-bold tracking-widest whitespace-normal break-normal [overflow-wrap:normal] text-black",
							style: {
								fontSize: `${(globalSettings?.headerSize || 20) * 2}px`,
								lineHeight: "1.1",
								marginBottom: "8px"
							},
							children: basic.name
						})
					}), showPhoto && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "shrink-0",
						children: /* @__PURE__ */ jsx("div", {
							style: {
								width: `${basic.photoConfig?.width || 100}px`,
								height: `${basic.photoConfig?.height || 100}px`,
								borderRadius: getBorderRadiusValue(basic.photoConfig || {
									borderRadius: "none",
									customBorderRadius: 0
								}),
								overflow: "hidden"
							},
							children: /* @__PURE__ */ jsx("img", {
								src: basic.photo,
								alt: `${basic.name}'s photo`,
								className: "w-full h-full object-cover"
							})
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "w-full h-[3px] my-4",
					style: { backgroundColor: globalSettings?.themeColor || "#000" }
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-start mt-10 w-full",
					children: [basic.title && titleField.visible !== false && /* @__PURE__ */ jsx("div", {
						className: "flex-1 min-w-[100px] shrink-0",
						children: /* @__PURE__ */ jsx(motion.h2, {
							layout: "position",
							className: "font-normal tracking-wide text-gray-700 whitespace-normal break-normal [overflow-wrap:normal]",
							style: {
								fontSize: `${globalSettings?.subheaderSize || 16}px`,
								lineHeight: "1.3"
							},
							children: basic.title
						})
					}), /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "flex flex-wrap items-center justify-end gap-x-6 gap-y-2 uppercase tracking-[0.05em] text-gray-500 w-[80%] flex-shrink-0",
						style: { fontSize: `${globalSettings?.baseFontSize || 14}px` },
						children: allFields.map((item) => {
							const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
							return /* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-2",
								children: [globalSettings?.useIconMode && /* @__PURE__ */ jsx("span", {
									className: "inline-flex shrink-0 text-gray-400",
									children: getIcon(item.custom ? item.icon : basic.icons?.[item.key])
								}), /* @__PURE__ */ jsx("div", {
									className: "min-w-0",
									children: item.key === "email" ? /* @__PURE__ */ jsxs("a", {
										href: `mailto:${item.value}`,
										className: "block min-w-0 transition-colors [overflow-wrap:anywhere] hover:text-black",
										children: [globalSettings?.useIconMode ? "" : `${t(`basicPanel.basicFields.${item.key}`)}: `, item.value]
									}) : item.key === "website" || item.key === "github" ? /* @__PURE__ */ jsxs("a", {
										href: item.value.startsWith("http") ? item.value : `https://${item.value}`,
										className: "block min-w-0 transition-colors [overflow-wrap:anywhere] hover:text-black",
										children: [globalSettings?.useIconMode ? "" : `${item.label}: `, item.value.replace(/^https?:\/\//, "")]
									}) : customFieldHref ? /* @__PURE__ */ jsx("a", {
										href: customFieldHref,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "block min-w-0 underline transition-colors [overflow-wrap:anywhere] hover:text-black",
										children: item.value
									}) : /* @__PURE__ */ jsxs("span", {
										className: "block min-w-0 [overflow-wrap:anywhere]",
										children: [globalSettings?.useIconMode ? "" : item.custom ? shouldShowCustomFieldLabelPrefix(item) ? `${item.label}: ` : "" : `${t(`basicPanel.basicFields.${item.key}`)}: `, item.value]
									})
								})]
							}, item.key);
						})
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/components/templates/editorial/sections/SectionTitle.tsx
var SectionTitle$1 = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	if (!showTitle) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "w-full shrink-0 mb-6",
		children: /* @__PURE__ */ jsx("h3", {
			className: "font-bold uppercase tracking-[0.2em]",
			style: {
				fontSize: `${globalSettings?.headerSize || 18}px`,
				color: globalSettings?.themeColor || "#8e8e8e",
				marginBottom: `${globalSettings?.paragraphSpacing || 16}px`
			},
			children: renderTitle
		})
	});
};
//#endregion
//#region src/components/templates/editorial/sections/ExperienceSection.tsx
var ExperienceSection$1 = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const showTimeline = visibleExperiences && visibleExperiences.length > 2;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		className: "w-full",
		style: { marginTop: `${globalSettings?.sectionSpacing || 32}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$1, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				className: cn("relative pb-6 last:border-0 last:pb-0", showTimeline ? "pl-5 border-l-[1.5px] border-[#e5e7eb]" : ""),
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					showTimeline && /* @__PURE__ */ jsx("div", { className: "absolute left-[-2.25px] top-2.5 w-1.5 h-1.5 bg-black rounded-full" }),
					/* @__PURE__ */ jsx(motion.h4, {
						layout: "position",
						className: "font-bold text-black",
						style: {
							fontSize: `${globalSettings?.subheaderSize || 18}px`,
							lineHeight: "1.2"
						},
						children: exp.company
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "uppercase tracking-[0.1em] text-gray-500 mt-2",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [
							exp.position ? /* @__PURE__ */ jsx("span", {
								className: "font-semibold text-black",
								children: exp.position
							}) : null,
							exp.position && " • ",
							formatDateString(exp.date, locale)
						]
					}),
					exp.details && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-2 text-gray-800 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-2 [&>ul]:mb-0 [&>ul>li]:my-0.5 marker:text-black",
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
						style: {
							fontSize: `${globalSettings?.baseFontSize || 13}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						}
					})
				]
			}, exp.id))
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/sections/EducationSection.tsx
var EducationSection$1 = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const showTimeline = visibleEducation && visibleEducation.length > 2;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		className: "w-full",
		style: { marginTop: `${globalSettings?.sectionSpacing || 32}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$1, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				className: cn("relative pb-6 last:border-0 last:pb-0", showTimeline ? "pl-5 border-l-[1.5px] border-[#e5e7eb]" : ""),
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [
					showTimeline && /* @__PURE__ */ jsx("div", { className: "absolute left-[-2.25px] top-2.5 w-1.5 h-1.5 bg-black rounded-full" }),
					/* @__PURE__ */ jsx(motion.h4, {
						layout: "position",
						className: "font-bold text-black",
						style: {
							fontSize: `${globalSettings?.subheaderSize || 18}px`,
							lineHeight: "1.2"
						},
						children: edu.school
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "uppercase tracking-[0.1em] text-gray-500 mt-2",
						style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
						children: [
							[edu.degree, edu.major].filter(Boolean).join(" in "),
							edu.degree || edu.major ? " • " : "",
							formatDateRange(edu.startDate, edu.endDate, locale),
							edu.gpa && ` • GPA: ${edu.gpa}`
						]
					}),
					edu.description && /* @__PURE__ */ jsx(motion.div, {
						layout: "position",
						className: "mt-2 text-gray-800 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-0 [&>ul>li]:my-0.5 marker:text-black",
						style: {
							fontSize: `${globalSettings?.baseFontSize || 13}px`,
							lineHeight: globalSettings?.lineHeight || 1.6
						},
						dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) }
					})
				]
			}, edu.id))
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/sections/ProjectSection.tsx
var ProjectSection$1 = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		className: "w-full",
		style: { marginTop: `${globalSettings?.sectionSpacing || 32}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$1, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleProjects.map((project) => {
				const projectLink = getProjectLinkMeta(project);
				return /* @__PURE__ */ jsxs(motion.div, {
					layout: "position",
					className: "relative pb-6 last:pb-0",
					style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
					children: [
						/* @__PURE__ */ jsx(motion.h4, {
							layout: "position",
							className: "font-bold text-black",
							style: {
								fontSize: `${globalSettings?.subheaderSize || 18}px`,
								lineHeight: "1.2"
							},
							children: project.name
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							layout: "position",
							className: "uppercase tracking-[0.1em] text-gray-500 mt-2",
							style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
							children: [
								project.role && /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-black",
									children: project.role
								}),
								project.role && " • ",
								formatDateString(project.date, locale),
								projectLink && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "mx-2",
									children: "•"
								}), /* @__PURE__ */ jsx("a", {
									href: projectLink.href,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "hover:text-black transition-colors",
									title: projectLink.title,
									children: projectLink.label
								})] })
							]
						}),
						project.description && /* @__PURE__ */ jsx(motion.div, {
							layout: "position",
							className: "mt-2 text-gray-800 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-0 [&>ul>li]:my-0.5 marker:text-black text-left",
							style: {
								fontSize: `${globalSettings?.baseFontSize || 13}px`,
								lineHeight: globalSettings?.lineHeight || 1.6
							},
							dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
						})
					]
				}, project.id);
			})
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/sections/SkillSection.tsx
var SkillSection$1 = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		className: "w-full",
		style: { marginTop: `${globalSettings?.sectionSpacing || 32}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$1, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-gray-800 prose prose-sm max-w-none prose-p:my-1 prose-strong:font-bold prose-ul:my-1 prose-li:my-0.5 [&>ul]:pl-4 marker:text-black",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection$1 = ({ content, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		className: "w-full",
		style: { marginTop: `${globalSettings?.sectionSpacing || 32}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$1, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-gray-800 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-0 [&>ul>li]:my-0.5 marker:text-black",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 14}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/sections/CustomSection.tsx
var CustomSection$1 = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		className: "w-full",
		style: { marginTop: `${globalSettings?.sectionSpacing || 32}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle$1, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				className: "relative pb-6 last:pb-0",
				style: { marginTop: `${globalSettings?.paragraphSpacing}px` },
				children: [/* @__PURE__ */ jsxs(motion.div, {
					layout: "position",
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex-[1.5]",
							children: /* @__PURE__ */ jsx("h4", {
								className: "font-bold text-black",
								style: { fontSize: `${globalSettings?.subheaderSize || 18}px` },
								children: item.title
							})
						}),
						item.subtitle && /* @__PURE__ */ jsx(motion.div, {
							layout: "position",
							className: "flex-1 text-gray-500",
							style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
							children: item.subtitle
						}),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1 text-right text-gray-500 shrink-0",
							style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
							children: formatDateString(item.dateRange, locale)
						})
					]
				}), item.description && /* @__PURE__ */ jsx(motion.div, {
					layout: "position",
					className: "mt-2 text-gray-800 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-0 [&>ul>li]:my-0.5 marker:text-black",
					style: {
						fontSize: `${globalSettings?.baseFontSize || 14}px`,
						lineHeight: globalSettings?.lineHeight || 1.6
					},
					dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) }
				})]
			}, item.id))
		})]
	});
};
//#endregion
//#region src/components/templates/editorial/index.tsx
var EditorialTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo$1, {
				basic: data.basic,
				globalSettings: data.globalSettings
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection$1, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection$1, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection$1, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection$1, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection$1, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				className: "w-full",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 32}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle$1, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })]
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection$1, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col min-h-[297mm] text-[#1a1a1a] editorial-print-container",
		style: {
			backgroundColor: colorScheme.background || "#FFFFFF",
			color: colorScheme.text || "#1a1a1a",
			margin: `-${data.globalSettings?.pagePadding || 0}px`,
			padding: `${data.globalSettings?.pagePadding || 0}px`,
			paddingTop: `${(data.globalSettings?.pagePadding || 0) + 16}px`
		},
		children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", {
			className: "w-full mb-1 border-none ring-0",
			children: renderSection(section.id)
		}, section.id))
	});
};
//#endregion
//#region src/components/templates/swiss/sections/BaseInfo.tsx
var BaseInfo = ({ basic = {}, globalSettings, template }) => {
	const t = useTranslations("workbench");
	const locale = useLocale();
	const useIconMode = globalSettings?.useIconMode ?? false;
	const layout = basic?.layout || "left";
	const themeColor = globalSettings?.themeColor || "#E31C24";
	const getIcon = (iconName) => {
		const IconComponent = Icons[iconName];
		return IconComponent ? /* @__PURE__ */ jsx(IconComponent, {
			className: "h-3.5 w-3.5 shrink-0",
			style: { color: themeColor }
		}) : null;
	};
	const allFields = [...React.useMemo(() => {
		if (!basic.fieldOrder) return [{
			key: "email",
			value: basic.email,
			icon: basic.icons?.email || "Mail",
			label: "电子邮箱",
			visible: true,
			custom: false
		}].filter((item) => Boolean(item.value && item.visible));
		return basic.fieldOrder.filter((field) => field.visible !== false && field.key !== "name" && field.key !== "title").map((field) => ({
			key: field.key,
			value: field.key === "birthDate" && basic[field.key] ? formatDateString(basic[field.key], locale) : basic[field.key],
			icon: basic.icons?.[field.key] || "User",
			label: field.label,
			visible: field.visible,
			custom: field.custom
		})).filter((item) => Boolean(item.value));
	}, [basic]), ...basic.customFields?.filter((field) => field.visible !== false && Boolean(getCustomFieldDisplayText(field))).map((field) => ({
		key: field.id,
		value: getCustomFieldDisplayText(field),
		icon: field.icon,
		label: field.label,
		visible: true,
		custom: true,
		displayLabel: field.displayLabel,
		href: getCustomFieldHref(field)
	})) || []];
	const nameField = basic.fieldOrder?.find((f) => f.key === "name") || {
		key: "name",
		label: "姓名",
		visible: true
	};
	const titleField = basic.fieldOrder?.find((f) => f.key === "title") || {
		key: "title",
		label: "职位",
		visible: true
	};
	const PhotoComponent = basic.photo && basic.photoConfig?.visible && /* @__PURE__ */ jsx(motion.div, {
		layout: "position",
		className: "shrink-0",
		children: /* @__PURE__ */ jsx("div", {
			style: {
				width: `${basic.photoConfig?.width || 90}px`,
				height: `${basic.photoConfig?.height || 90}px`,
				borderRadius: getBorderRadiusValue(basic.photoConfig || {
					borderRadius: "none",
					customBorderRadius: 0
				}),
				overflow: "hidden"
			},
			className: "border-2 border-white shadow-md ring-2 ring-slate-100",
			children: /* @__PURE__ */ jsx("img", {
				src: basic.photo,
				alt: `${basic.name}'s photo`,
				className: "w-full h-full object-cover"
			})
		})
	});
	const layoutStyles = {
		left: {
			container: "flex flex-col gap-6 w-full items-start justify-start",
			headerRow: "flex items-center gap-6 w-full text-left",
			nameTitle: "flex flex-col min-w-0 flex-1 relative pl-5",
			accentBar: "absolute left-0 top-1.5 bottom-1.5 w-1 rounded-sm",
			cardWrapper: "flex flex-wrap gap-2.5 w-full justify-start mt-2"
		},
		right: {
			container: "flex flex-col gap-6 w-full items-end justify-start",
			headerRow: "flex flex-row-reverse items-center gap-6 w-full text-right",
			nameTitle: "flex flex-col min-w-0 flex-1 relative pr-5",
			accentBar: "absolute right-0 top-1.5 bottom-1.5 w-1 rounded-sm",
			cardWrapper: "flex flex-wrap gap-2.5 w-full justify-end mt-2"
		},
		center: {
			container: "flex flex-col gap-6 w-full items-center justify-start text-center",
			headerRow: "flex flex-col items-center gap-4 w-full",
			nameTitle: "flex flex-col items-center min-w-0 w-full relative pb-4",
			accentBar: "absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-sm",
			cardWrapper: "flex flex-wrap gap-2.5 w-full justify-center mt-2"
		}
	};
	const styles = layoutStyles[layout] || layoutStyles.left;
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "basic",
		children: [/* @__PURE__ */ jsxs("div", {
			className: styles.container,
			children: [/* @__PURE__ */ jsxs("div", {
				className: styles.headerRow,
				children: [PhotoComponent, /* @__PURE__ */ jsxs("div", {
					className: styles.nameTitle,
					children: [
						/* @__PURE__ */ jsx(motion.div, {
							layout: "position",
							className: styles.accentBar,
							style: { backgroundColor: themeColor }
						}, `accent-${layout}`),
						nameField.visible !== false && basic[nameField.key] && /* @__PURE__ */ jsx(motion.h1, {
							layout: "position",
							className: "font-black tracking-tight whitespace-normal break-normal [overflow-wrap:normal] leading-none text-slate-800",
							style: { fontSize: "38px" },
							children: basic[nameField.key]
						}),
						titleField.visible !== false && basic[titleField.key] && /* @__PURE__ */ jsx(motion.h2, {
							layout: "position",
							className: "whitespace-normal break-normal [overflow-wrap:normal] font-bold tracking-widest mt-2.5 text-slate-400 uppercase text-[12px]",
							children: basic[titleField.key]
						})
					]
				})]
			}), /* @__PURE__ */ jsx(motion.div, {
				layout: "position",
				className: styles.cardWrapper,
				style: { fontSize: `${globalSettings?.baseFontSize || 13}px` },
				children: allFields.map((item) => {
					const customFieldHref = item.custom && "href" in item && typeof item.href === "string" ? item.href : null;
					return /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all duration-300 min-w-0 max-w-full flex-initial",
						children: [/* @__PURE__ */ jsx("div", {
							className: "shrink-0 group-hover:scale-110 transition-transform duration-300",
							children: getIcon(item.icon)
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1.5 min-w-0 leading-tight",
							children: [
								!useIconMode && !item.custom && /* @__PURE__ */ jsx("span", {
									className: "shrink-0 font-extrabold text-[12px] text-slate-400 uppercase tracking-wider",
									children: t(`basicPanel.basicFields.${item.key}`)
								}),
								!useIconMode && item.custom && shouldShowCustomFieldLabelPrefix(item) && /* @__PURE__ */ jsx("span", {
									className: "shrink-0 font-extrabold text-[12px] text-slate-400 uppercase tracking-wider",
									children: item.label
								}),
								customFieldHref ? /* @__PURE__ */ jsx("a", {
									href: customFieldHref,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "font-medium text-slate-600 hover:text-slate-900 underline truncate break-all [overflow-wrap:anywhere]",
									children: item.value
								}) : item.key === "email" ? /* @__PURE__ */ jsx("a", {
									href: `mailto:${item.value}`,
									className: "font-medium text-slate-600 hover:text-slate-900 underline truncate break-all [overflow-wrap:anywhere]",
									children: item.value
								}) : /* @__PURE__ */ jsx("span", {
									className: "font-medium text-slate-600 break-all [overflow-wrap:anywhere]",
									children: item.value
								})
							]
						})]
					}, item.key);
				})
			})]
		}), basic.githubContributionsVisible && /* @__PURE__ */ jsx(GithubContributions, {
			className: "mt-6 border border-slate-100 rounded-xl p-3 bg-slate-50/50",
			githubKey: basic.githubKey,
			username: basic.githubUseName
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/SectionTitle.tsx
var SectionTitle = ({ type, title, globalSettings, showTitle = true }) => {
	const { activeResume } = useResumeStore();
	const menuSections = useTemplateContext()?.menuSections ?? activeResume?.menuSections ?? [];
	const renderTitle = useMemo(() => {
		if (type === "custom") return title;
		return menuSections.find((s) => s.id === type)?.title;
	}, [
		menuSections,
		type,
		title
	]);
	const themeColor = globalSettings?.themeColor || "#E31C24";
	if (!showTitle) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full",
		style: { marginBottom: `${globalSettings?.paragraphSpacing || 12}px` },
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2.5",
			children: [/* @__PURE__ */ jsx("div", {
				className: "w-[6px] rounded-sm shrink-0",
				style: {
					height: `${(globalSettings?.headerSize || 18) * 1.1}px`,
					backgroundColor: themeColor
				}
			}), /* @__PURE__ */ jsx("h3", {
				className: "font-black tracking-wider uppercase",
				style: {
					fontSize: `${globalSettings?.headerSize || 18}px`,
					color: "#0f172a"
				},
				children: renderTitle
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full h-[1px] mt-2 opacity-15",
			style: { backgroundColor: "#0f172a" }
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/ExperienceSection.tsx
var ExperienceSection = ({ experiences, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleExperiences = experiences?.filter((exp) => exp.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const themeColor = globalSettings?.themeColor || "#E31C24";
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "experience",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			type: "experience",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-6",
				style: { marginTop: `${globalSettings?.paragraphSpacing || 16}px` },
				children: visibleExperiences?.map((exp) => /* @__PURE__ */ jsxs(motion.div, {
					layout: "position",
					className: "group",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-extrabold text-slate-800 tracking-tight",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: exp.company
								}), centerSubtitle && /* @__PURE__ */ jsx("span", {
									className: "font-medium text-slate-500 border-l border-slate-300 pl-3 text-[14px]",
									style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 1}px` },
									children: exp.position
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "ml-auto self-center font-mono text-slate-400 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded text-[11px] font-semibold shrink-0",
								children: formatDateString(exp.date, locale)
							})]
						}),
						exp.position && !centerSubtitle && /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-slate-500 mt-1 uppercase tracking-wider",
							style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 2}px` },
							children: exp.position
						}),
						exp.details && /* @__PURE__ */ jsxs(motion.div, {
							layout: "position",
							className: "relative pl-4 mt-2.5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute left-0 top-1 bottom-1 w-[1.5px] opacity-20 group-hover:opacity-100 transition-opacity",
								style: { backgroundColor: themeColor }
							}), /* @__PURE__ */ jsx("div", {
								className: "text-slate-600 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-1 [&>ul>li]:my-0.5 marker:text-slate-400",
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(exp.details) },
								style: {
									fontSize: `${globalSettings?.baseFontSize || 13}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								}
							})]
						})
					]
				}, exp.id))
			})
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/EducationSection.tsx
var EducationSection = ({ education, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleEducation = education?.filter((edu) => edu.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const themeColor = globalSettings?.themeColor || "#E31C24";
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "education",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			type: "education",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-6",
				style: { marginTop: `${globalSettings?.paragraphSpacing || 16}px` },
				children: visibleEducation?.map((edu) => /* @__PURE__ */ jsxs(motion.div, {
					layout: "position",
					className: "group",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-extrabold text-slate-800 tracking-tight",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: edu.school
								}), centerSubtitle && /* @__PURE__ */ jsxs("span", {
									className: "font-medium text-slate-500 border-l border-slate-300 pl-3 text-[14px]",
									style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 1}px` },
									children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "ml-auto self-center font-mono text-slate-400 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded text-[11px] font-semibold shrink-0",
								suppressHydrationWarning: true,
								children: formatDateRange(edu.startDate, edu.endDate, locale)
							})]
						}),
						!centerSubtitle && /* @__PURE__ */ jsxs("div", {
							className: "font-semibold text-slate-500 mt-1 uppercase tracking-wider",
							style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 2}px` },
							children: [[edu.major, edu.degree].filter(Boolean).join(" · "), edu.gpa && ` · GPA ${edu.gpa}`]
						}),
						hasMeaningfulRichTextContent(edu.description) && /* @__PURE__ */ jsxs(motion.div, {
							layout: "position",
							className: "relative pl-4 mt-2.5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute left-0 top-1 bottom-1 w-[1.5px] opacity-20 group-hover:opacity-100 transition-opacity",
								style: { backgroundColor: themeColor }
							}), /* @__PURE__ */ jsx("div", {
								className: "text-slate-600 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-1 [&>ul>li]:my-0.5 marker:text-slate-400",
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(edu.description) },
								style: {
									fontSize: `${globalSettings?.baseFontSize || 13}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								}
							})]
						})
					]
				}, edu.id))
			})
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/ProjectSection.tsx
var ProjectSection = ({ projects, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleProjects = projects?.filter((p) => p.visible);
	const centerSubtitle = globalSettings?.centerSubtitle;
	const themeColor = globalSettings?.themeColor || "#E31C24";
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "projects",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			type: "projects",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			layout: "position",
			className: "flex flex-col gap-6",
			style: { marginTop: `${globalSettings?.paragraphSpacing || 16}px` },
			children: /* @__PURE__ */ jsx(AnimatePresence, {
				mode: "popLayout",
				children: visibleProjects.map((project) => {
					const projectLink = getProjectLinkMeta(project, { preferFullUrl: centerSubtitle });
					return /* @__PURE__ */ jsxs(motion.div, {
						layout: "position",
						className: "group",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1",
									children: [
										/* @__PURE__ */ jsx("h4", {
											className: "font-extrabold text-slate-800 tracking-tight",
											style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
											children: project.name
										}),
										centerSubtitle && /* @__PURE__ */ jsx("span", {
											className: "font-medium text-slate-500 border-l border-slate-300 pl-3 text-[14px]",
											style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 1}px` },
											children: project.role
										}),
										projectLink && /* @__PURE__ */ jsxs("a", {
											href: projectLink.href,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors text-slate-500 font-medium",
											title: projectLink.title,
											children: [/* @__PURE__ */ jsx(Icons.ExternalLink, {
												className: "w-3 h-3 shrink-0",
												style: { color: themeColor }
											}), /* @__PURE__ */ jsx("span", { children: projectLink.label })]
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "ml-auto self-center font-mono text-slate-400 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded text-[11px] font-semibold shrink-0",
									children: formatDateString(project.date, locale)
								})]
							}),
							project.role && !centerSubtitle && /* @__PURE__ */ jsx("div", {
								className: "font-semibold text-slate-500 mt-1 uppercase tracking-wider",
								style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 2}px` },
								children: project.role
							}),
							project.description && /* @__PURE__ */ jsxs(motion.div, {
								layout: "position",
								className: "relative pl-4 mt-2.5",
								children: [/* @__PURE__ */ jsx("div", {
									className: "absolute left-0 top-1 bottom-1 w-[1.5px] opacity-20 group-hover:opacity-100 transition-opacity",
									style: { backgroundColor: themeColor }
								}), /* @__PURE__ */ jsx("div", {
									className: "text-slate-600 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-1 [&>ul>li]:my-0.5 marker:text-slate-400",
									style: {
										fontSize: `${globalSettings?.baseFontSize || 13}px`,
										lineHeight: globalSettings?.lineHeight || 1.6
									},
									dangerouslySetInnerHTML: { __html: normalizeRichTextContent(project.description) }
								})]
							})
						]
					}, project.id);
				})
			})
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/SkillSection.tsx
var SkillSection = ({ skill, globalSettings, showTitle = true }) => {
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "skills",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			type: "skills",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing || 16}px` },
			children: /* @__PURE__ */ jsx(motion.div, {
				className: "text-slate-600 prose prose-sm max-w-none prose-p:my-1 prose-strong:font-bold prose-ul:my-1 prose-li:my-0.5 [&>ul]:pl-4 marker:text-slate-400 p-4 rounded-xl bg-slate-50/50 border border-slate-100/50 hover:border-slate-200/60 transition-colors",
				layout: "position",
				style: {
					fontSize: `${globalSettings?.baseFontSize || 13}px`,
					lineHeight: globalSettings?.lineHeight || 1.6
				},
				dangerouslySetInnerHTML: { __html: normalizeRichTextContent(skill) }
			})
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/SelfEvaluationSection.tsx
var SelfEvaluationSection = ({ content, globalSettings, showTitle = true }) => {
	const themeColor = globalSettings?.themeColor || "#E31C24";
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId: "selfEvaluation",
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			type: "selfEvaluation",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(motion.div, {
			style: { marginTop: `${globalSettings?.paragraphSpacing || 16}px` },
			children: /* @__PURE__ */ jsxs(motion.div, {
				layout: "position",
				className: "relative pl-5 py-2 text-slate-600 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-1 [&>ul>li]:my-0.5 marker:text-slate-400 bg-slate-50/30 rounded-r-xl",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute left-0 top-0 bottom-0 w-[3px] rounded-l",
					style: { backgroundColor: themeColor }
				}), /* @__PURE__ */ jsx("div", {
					style: {
						fontSize: `${globalSettings?.baseFontSize || 13}px`,
						lineHeight: globalSettings?.lineHeight || 1.6
					},
					dangerouslySetInnerHTML: { __html: normalizeRichTextContent(content) }
				})]
			})
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/sections/CustomSection.tsx
var CustomSection = ({ sectionId, title, items, globalSettings, showTitle = true }) => {
	const locale = useLocale();
	const visibleItems = items?.filter((item) => item.visible && (item.title || item.description));
	const centerSubtitle = globalSettings?.centerSubtitle;
	const themeColor = globalSettings?.themeColor || "#E31C24";
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		sectionId,
		style: { marginTop: `${globalSettings?.sectionSpacing || 24}px` },
		children: [/* @__PURE__ */ jsx(SectionTitle, {
			title,
			type: "custom",
			globalSettings,
			showTitle
		}), /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "popLayout",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-6",
				style: { marginTop: `${globalSettings?.paragraphSpacing || 16}px` },
				children: visibleItems.map((item) => /* @__PURE__ */ jsxs(motion.div, {
					layout: "position",
					className: "group",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-extrabold text-slate-800 tracking-tight",
									style: { fontSize: `${globalSettings?.subheaderSize || 16}px` },
									children: item.title
								}), centerSubtitle && /* @__PURE__ */ jsx("span", {
									className: "font-medium text-slate-500 border-l border-slate-300 pl-3 text-[14px]",
									style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 1}px` },
									children: item.subtitle
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "ml-auto self-center font-mono text-slate-400 bg-slate-50 border border-slate-100/80 px-2 py-0.5 rounded text-[11px] font-semibold shrink-0",
								children: formatDateString(item.dateRange, locale)
							})]
						}),
						!centerSubtitle && item.subtitle && /* @__PURE__ */ jsx("div", {
							className: "font-semibold text-slate-500 mt-1 uppercase tracking-wider",
							style: { fontSize: `${(globalSettings?.subheaderSize || 16) - 2}px` },
							children: item.subtitle
						}),
						item.description && /* @__PURE__ */ jsxs(motion.div, {
							layout: "position",
							className: "relative pl-4 mt-2.5",
							children: [/* @__PURE__ */ jsx("div", {
								className: "absolute left-0 top-1 bottom-1 w-[1.5px] opacity-20 group-hover:opacity-100 transition-opacity",
								style: { backgroundColor: themeColor }
							}), /* @__PURE__ */ jsx("div", {
								className: "text-slate-600 prose prose-sm max-w-none prose-p:my-1 [&>ul]:pl-4 [&>ul]:mt-1 [&>ul>li]:my-0.5 marker:text-slate-400",
								dangerouslySetInnerHTML: { __html: normalizeRichTextContent(item.description) },
								style: {
									fontSize: `${globalSettings?.baseFontSize || 13}px`,
									lineHeight: globalSettings?.lineHeight || 1.6
								}
							})]
						})
					]
				}, item.id))
			})
		})]
	});
};
//#endregion
//#region src/components/templates/swiss/index.tsx
var SwissTemplate = ({ data, template }) => {
	const { colorScheme } = template;
	const enabledSections = (data.menuSections || []).filter((s) => s.enabled).sort((a, b) => a.order - b.order);
	const renderSection = (sectionId) => {
		switch (sectionId) {
			case "basic": return /* @__PURE__ */ jsx(BaseInfo, {
				basic: data.basic,
				globalSettings: data.globalSettings,
				template
			});
			case "experience": return /* @__PURE__ */ jsx(ExperienceSection, {
				experiences: data.experience,
				globalSettings: data.globalSettings
			});
			case "education": return /* @__PURE__ */ jsx(EducationSection, {
				education: data.education,
				globalSettings: data.globalSettings
			});
			case "skills": return /* @__PURE__ */ jsx(SkillSection, {
				skill: data.skillContent,
				globalSettings: data.globalSettings
			});
			case "projects": return /* @__PURE__ */ jsx(ProjectSection, {
				projects: data.projects,
				globalSettings: data.globalSettings
			});
			case "certificates": return /* @__PURE__ */ jsxs(SectionWrapper, {
				sectionId: "certificates",
				style: { marginTop: `${data.globalSettings?.sectionSpacing || 24}px` },
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					type: "certificates",
					globalSettings: data.globalSettings
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-4",
					children: /* @__PURE__ */ jsx(CertificatesSection, { certificates: data.certificates })
				})]
			});
			case "selfEvaluation": return /* @__PURE__ */ jsx(SelfEvaluationSection, {
				content: data.selfEvaluationContent,
				globalSettings: data.globalSettings
			});
			default:
				if (sectionId in data.customData) return /* @__PURE__ */ jsx(CustomSection, {
					title: data.menuSections.find((s) => s.id === sectionId)?.title || sectionId,
					sectionId,
					items: data.customData[sectionId],
					globalSettings: data.globalSettings
				});
				return null;
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full min-h-screen selection:bg-slate-100",
		style: {
			backgroundColor: colorScheme.background,
			color: colorScheme.text
		},
		children: enabledSections.map((section) => /* @__PURE__ */ jsx("div", {
			className: "w-full",
			children: renderSection(section.id)
		}, section.id))
	});
};
//#endregion
//#region src/components/templates/registry.ts
/**
* Unified template registry.
* To add a new template, create a directory under `templates/` with config.ts + index.tsx,
* then add one line here. No other files need to change.
*/
var TEMPLATE_REGISTRY = [
	{
		config: classicConfig,
		Component: ClassicTemplate
	},
	{
		config: modernConfig,
		Component: ModernTemplate
	},
	{
		config: leftRightConfig,
		Component: LeftRightTemplate
	},
	{
		config: timelineConfig,
		Component: TimelineTemplate
	},
	{
		config: minimalistConfig,
		Component: MinimalistTemplate
	},
	{
		config: elegantConfig,
		Component: ElegantTemplate
	},
	{
		config: creativeConfig,
		Component: CreativeTemplate
	},
	{
		config: editorialConfig,
		Component: EditorialTemplate
	},
	{
		config: swissConfig,
		Component: SwissTemplate
	}
];
/** All template configs — drop-in replacement for the old DEFAULT_TEMPLATES */
var DEFAULT_TEMPLATES = TEMPLATE_REGISTRY.map((entry) => entry.config);
/** Look up a template component by layout id */
function getTemplateComponent(layout) {
	return TEMPLATE_REGISTRY.find((entry) => entry.config.layout === layout)?.Component ?? ClassicTemplate;
}
//#endregion
//#region src/store/useResumeStore.ts
/** 获取今天的日期字符串（YYYY-MM-DD 格式） */
var getTodayDateStr = () => {
	const now = /* @__PURE__ */ new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
/** 将今天的日期追加到 activityDates（去重） */
var addActivityDate = (dates) => {
	const today = getTodayDateStr();
	const set = new Set(dates ?? []);
	set.add(today);
	return Array.from(set);
};
var parseTimestamp = (value) => {
	if (!value) return null;
	const timestamp = new Date(value).getTime();
	return Number.isFinite(timestamp) ? timestamp : null;
};
var shouldImportResumeFromFile = (fileResume, localResume, sourceModifiedAt) => {
	if (!localResume) return true;
	const fileUpdatedAt = parseTimestamp(fileResume.updatedAt);
	const localUpdatedAt = parseTimestamp(localResume.updatedAt);
	const fileModifiedAt = typeof sourceModifiedAt === "number" && Number.isFinite(sourceModifiedAt) ? sourceModifiedAt : null;
	if (fileUpdatedAt !== null && localUpdatedAt !== null) {
		if (fileUpdatedAt !== localUpdatedAt) return fileUpdatedAt > localUpdatedAt;
		return fileModifiedAt !== null && fileModifiedAt > localUpdatedAt + 1e3;
	}
	if (fileUpdatedAt !== null && localUpdatedAt === null) return true;
	if (fileUpdatedAt === null && localUpdatedAt !== null) return fileModifiedAt !== null && fileModifiedAt > localUpdatedAt + 1e3;
	return fileModifiedAt !== null;
};
var normalizeImportedResume = (resume, sourceModifiedAt) => {
	if (typeof sourceModifiedAt !== "number" || !Number.isFinite(sourceModifiedAt)) return resume;
	const fileUpdatedAt = parseTimestamp(resume.updatedAt);
	if (fileUpdatedAt !== null && fileUpdatedAt >= sourceModifiedAt) return resume;
	return {
		...resume,
		updatedAt: new Date(sourceModifiedAt).toISOString()
	};
};
var syncResumeToFile = async (resumeData, prevResume) => {
	try {
		const handle = await getFileHandle("syncDirectory");
		if (!handle) return;
		if (!await verifyPermission(handle)) return;
		const dirHandle = handle;
		try {
			await dirHandle.queryPermission({ mode: "readwrite" });
		} catch (error) {
			console.warn("Sync directory is no longer accessible, clearing handle:", error);
			localStorage.removeItem("syncDirectory");
			return;
		}
		if (prevResume && prevResume.id === resumeData.id && prevResume.title !== resumeData.title) try {
			await dirHandle.removeEntry(`${prevResume.title}.json`);
		} catch (error) {
			console.warn("Error deleting old file:", error);
		}
		const fileName = `${resumeData.title}.json`;
		const writable = await (await dirHandle.getFileHandle(fileName, { create: true })).createWritable();
		await writable.write(JSON.stringify(resumeData, null, 2));
		await writable.close();
	} catch (error) {
		if (error instanceof Error && (error.name === "NotFoundError" || error.name === "NotAllowedError")) {
			console.warn("Sync directory not found, clearing saved handle:", error);
			localStorage.removeItem("syncDirectory");
		} else console.error("Error syncing resume to file:", error);
	}
};
var syncTimer = null;
var debouncedSyncToFile = (resumeData, prevResume) => {
	if (syncTimer) clearTimeout(syncTimer);
	syncTimer = setTimeout(() => {
		syncResumeToFile(resumeData, prevResume);
		syncTimer = null;
	}, 1500);
};
var useResumeStore = create(persist((set, get) => ({
	resumes: {},
	activeResumeId: null,
	activeResume: null,
	createResume: (templateId = null, isBlank = false) => {
		const locale = typeof document !== "undefined" ? document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1] || "zh" : "zh";
		let initialResumeData;
		if (isBlank) initialResumeData = locale === "en" ? blankResumeStateEn : blankResumeState;
		else initialResumeData = locale === "en" ? initialResumeStateEn : initialResumeState;
		const id = generateUUID();
		const template = templateId ? DEFAULT_TEMPLATES.find((t) => t.id === templateId) : DEFAULT_TEMPLATES[0];
		const newResume = {
			...initialResumeData,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			templateId: template?.id,
			title: `${locale === "en" ? "New Resume" : "新建简历"} ${id.slice(0, 6)}`,
			activityDates: [getTodayDateStr()]
		};
		set((state) => ({
			resumes: {
				...state.resumes,
				[id]: newResume
			},
			activeResumeId: id,
			activeResume: newResume
		}));
		syncResumeToFile(newResume);
		return id;
	},
	updateResume: (resumeId, data) => {
		set((state) => {
			const resume = state.resumes[resumeId];
			if (!resume) return state;
			const updatedResume = {
				...resume,
				...data,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
				activityDates: addActivityDate(resume.activityDates)
			};
			debouncedSyncToFile(updatedResume, resume);
			return {
				resumes: {
					...state.resumes,
					[resumeId]: updatedResume
				},
				activeResume: state.activeResumeId === resumeId ? updatedResume : state.activeResume
			};
		});
	},
	updateResumeFromFile: (resume, sourceModifiedAt) => {
		const localResume = get().resumes[resume.id];
		if (!shouldImportResumeFromFile(resume, localResume, sourceModifiedAt)) return false;
		const importedResume = normalizeImportedResume(resume, sourceModifiedAt);
		set((state) => ({
			resumes: {
				...state.resumes,
				[importedResume.id]: importedResume
			},
			activeResume: state.activeResumeId === importedResume.id ? importedResume : state.activeResume
		}));
		return true;
	},
	updateResumeTitle: (title) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { title });
	},
	deleteResume: (resume) => {
		const resumeId = resume.id;
		console.log("Deleting resume:", resumeId, resume.title);
		set((state) => {
			const newResumes = {};
			Object.keys(state.resumes).forEach((id) => {
				if (id !== resumeId) newResumes[id] = state.resumes[id];
			});
			console.log("Before delete:", Object.keys(state.resumes));
			console.log("After delete:", Object.keys(newResumes));
			const newState = {
				resumes: newResumes,
				activeResumeId: state.activeResumeId === resumeId ? null : state.activeResumeId,
				activeResume: null
			};
			if (state.activeResumeId !== resumeId) newState.activeResume = state.activeResume;
			return newState;
		});
		(async () => {
			try {
				const handle = await getFileHandle("syncDirectory");
				if (!handle) return;
				if (!await verifyPermission(handle)) return;
				const dirHandle = handle;
				try {
					await dirHandle.removeEntry(`${resume.title}.json`);
				} catch (error) {
					console.log("Failed to delete file, but resume will still be deleted from store");
				}
			} catch (error) {
				console.error("Error deleting resume file:", error);
			}
		})();
	},
	duplicateResume: (resumeId) => {
		const newId = generateUUID();
		const originalResume = get().resumes[resumeId];
		const locale = typeof document !== "undefined" ? document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1] || "zh" : "zh";
		const duplicatedResume = {
			...originalResume,
			id: newId,
			title: `${originalResume.title} (${locale === "en" ? "Copy" : "复制"})`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			activityDates: [getTodayDateStr()]
		};
		set((state) => ({
			resumes: {
				...state.resumes,
				[newId]: duplicatedResume
			},
			activeResumeId: newId,
			activeResume: duplicatedResume
		}));
		return newId;
	},
	setActiveResume: (resumeId) => {
		const resume = get().resumes[resumeId];
		set({
			activeResume: resume ?? null,
			activeResumeId: resumeId
		});
	},
	updateBasicInfo: (data) => {
		const prevResume = get().activeResume;
		set((state) => {
			if (!state.activeResume) return state;
			const updatedResume = {
				...state.activeResume,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
				activityDates: addActivityDate(state.activeResume.activityDates),
				basic: {
					...state.activeResume.basic,
					...data
				}
			};
			return {
				resumes: {
					...state.resumes,
					[state.activeResume.id]: updatedResume
				},
				activeResume: updatedResume
			};
		});
		const updatedResume = get().activeResume;
		if (updatedResume) debouncedSyncToFile(updatedResume, prevResume || void 0);
	},
	updateEducation: (education) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const currentResume = resumes[activeResumeId];
		const newEducation = currentResume.education.some((e) => e.id === education.id) ? currentResume.education.map((e) => e.id === education.id ? education : e) : [...currentResume.education, education];
		get().updateResume(activeResumeId, { education: newEducation });
	},
	updateEducationBatch: (educations) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { education: educations });
	},
	deleteEducation: (id) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const updatedEducation = get().resumes[activeResumeId].education.filter((e) => e.id !== id);
			get().updateResume(activeResumeId, { education: updatedEducation });
		}
	},
	updateExperience: (experience) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const currentResume = resumes[activeResumeId];
		const newExperience = currentResume.experience.find((e) => e.id === experience.id) ? currentResume.experience.map((e) => e.id === experience.id ? experience : e) : [...currentResume.experience, experience];
		get().updateResume(activeResumeId, { experience: newExperience });
	},
	updateExperienceBatch: (experiences) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const updateData = { experience: experiences };
			get().updateResume(activeResumeId, updateData);
		}
	},
	deleteExperience: (id) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const updatedExperience = resumes[activeResumeId].experience.filter((e) => e.id !== id);
		get().updateResume(activeResumeId, { experience: updatedExperience });
	},
	updateProjects: (project) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const currentResume = resumes[activeResumeId];
		const newProjects = currentResume.projects.some((p) => p.id === project.id) ? currentResume.projects.map((p) => p.id === project.id ? project : p) : [...currentResume.projects, project];
		get().updateResume(activeResumeId, { projects: newProjects });
	},
	updateProjectsBatch: (projects) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const updateData = { projects };
			get().updateResume(activeResumeId, updateData);
		}
	},
	deleteProject: (id) => {
		const { activeResumeId } = get();
		if (!activeResumeId) return;
		const updatedProjects = get().resumes[activeResumeId].projects.filter((p) => p.id !== id);
		get().updateResume(activeResumeId, { projects: updatedProjects });
	},
	setDraggingProjectId: (id) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { draggingProjectId: id });
	},
	updateSkillContent: (skillContent) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { skillContent });
	},
	updateSelfEvaluationContent: (selfEvaluationContent) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { selfEvaluationContent });
	},
	reorderSections: (newOrder) => {
		const { activeResumeId, resumes } = get();
		if (activeResumeId) {
			const reorderedSections = [resumes[activeResumeId].menuSections.find((section) => section.id === "basic"), ...newOrder.filter((section) => section.id !== "basic")].map((section, index) => ({
				...section,
				order: index
			}));
			get().updateResume(activeResumeId, { menuSections: reorderedSections });
		}
	},
	toggleSectionVisibility: (sectionId) => {
		const { activeResumeId, resumes } = get();
		if (activeResumeId) {
			const updatedSections = resumes[activeResumeId].menuSections.map((section) => section.id === sectionId ? {
				...section,
				enabled: !section.enabled
			} : section);
			get().updateResume(activeResumeId, { menuSections: updatedSections });
		}
	},
	setActiveSection: (sectionId) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { activeSection: sectionId });
	},
	updateMenuSections: (sections) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { menuSections: sections });
	},
	addCustomData: (sectionId) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const updatedCustomData = {
				...get().resumes[activeResumeId].customData,
				[sectionId]: [{
					id: generateUUID(),
					title: "未命名模块",
					subtitle: "",
					dateRange: "",
					description: "",
					visible: true
				}]
			};
			get().updateResume(activeResumeId, { customData: updatedCustomData });
		}
	},
	updateCustomData: (sectionId, items) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const updatedCustomData = {
				...get().resumes[activeResumeId].customData,
				[sectionId]: items
			};
			get().updateResume(activeResumeId, { customData: updatedCustomData });
		}
	},
	removeCustomData: (sectionId) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const { [sectionId]: _, ...rest } = get().resumes[activeResumeId].customData;
			get().updateResume(activeResumeId, { customData: rest });
		}
	},
	addCustomItem: (sectionId) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const currentResume = get().resumes[activeResumeId];
			const updatedCustomData = {
				...currentResume.customData,
				[sectionId]: [...currentResume.customData[sectionId] || [], {
					id: generateUUID(),
					title: "未命名模块",
					subtitle: "",
					dateRange: "",
					description: "",
					visible: true
				}]
			};
			get().updateResume(activeResumeId, { customData: updatedCustomData });
		}
	},
	updateCustomItem: (sectionId, itemId, updates) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const currentResume = get().resumes[activeResumeId];
			const updatedCustomData = {
				...currentResume.customData,
				[sectionId]: currentResume.customData[sectionId].map((item) => item.id === itemId ? {
					...item,
					...updates
				} : item)
			};
			get().updateResume(activeResumeId, { customData: updatedCustomData });
		}
	},
	removeCustomItem: (sectionId, itemId) => {
		const { activeResumeId } = get();
		if (activeResumeId) {
			const currentResume = get().resumes[activeResumeId];
			const updatedCustomData = {
				...currentResume.customData,
				[sectionId]: currentResume.customData[sectionId].filter((item) => item.id !== itemId)
			};
			get().updateResume(activeResumeId, { customData: updatedCustomData });
		}
	},
	addCertificate: (certificate) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const currentResume = resumes[activeResumeId];
		const newCertificates = currentResume.certificates.some((c) => c.id === certificate.id) ? currentResume.certificates.map((c) => c.id === certificate.id ? certificate : c) : [...currentResume.certificates, certificate];
		get().updateResume(activeResumeId, { certificates: newCertificates });
	},
	updateCertificate: (id, updates) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const newCertificates = resumes[activeResumeId].certificates.map((c) => c.id === id ? {
			...c,
			...updates
		} : c);
		get().updateResume(activeResumeId, { certificates: newCertificates });
	},
	updateCertificatesBatch: (certificates) => {
		const { activeResumeId } = get();
		if (activeResumeId) get().updateResume(activeResumeId, { certificates });
	},
	removeCertificate: (id) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const updatedCertificates = resumes[activeResumeId].certificates.filter((c) => c.id !== id);
		get().updateResume(activeResumeId, { certificates: updatedCertificates });
	},
	updateGlobalSettings: (settings) => {
		const { activeResumeId, updateResume, activeResume } = get();
		if (activeResumeId) updateResume(activeResumeId, { globalSettings: {
			...activeResume?.globalSettings,
			...settings
		} });
	},
	setThemeColor: (color) => {
		const { activeResumeId, updateResume } = get();
		if (activeResumeId) updateResume(activeResumeId, { globalSettings: {
			...get().activeResume?.globalSettings,
			themeColor: color
		} });
	},
	setTemplate: (templateId) => {
		const { activeResumeId, resumes } = get();
		if (!activeResumeId) return;
		const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
		if (!template) return;
		const updatedResume = {
			...resumes[activeResumeId],
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			activityDates: addActivityDate(resumes[activeResumeId].activityDates),
			templateId,
			globalSettings: {
				...resumes[activeResumeId].globalSettings,
				themeColor: template.colorScheme.primary,
				sectionSpacing: template.spacing.sectionGap,
				paragraphSpacing: template.spacing.itemGap,
				pagePadding: template.spacing.contentPadding
			},
			basic: {
				...resumes[activeResumeId].basic,
				layout: template.basic.layout
			}
		};
		set({
			resumes: {
				...resumes,
				[activeResumeId]: updatedResume
			},
			activeResume: updatedResume
		});
		debouncedSyncToFile(updatedResume);
	},
	addResume: (resume) => {
		set((state) => ({
			resumes: {
				...state.resumes,
				[resume.id]: resume
			},
			activeResumeId: resume.id,
			activeResume: resume
		}));
		syncResumeToFile(resume);
		return resume.id;
	},
	clearAllResumes: () => {
		console.log("Clearing all resumes");
		set({
			resumes: {},
			activeResumeId: null,
			activeResume: null
		});
	}
}), {
	name: "resume-storage",
	partialize: (state) => ({
		resumes: state.resumes,
		activeResumeId: state.activeResumeId
	}),
	merge: (persistedState, currentState) => {
		const persisted = persistedState;
		const resumes = persisted.resumes ?? currentState.resumes;
		const activeResumeId = persisted.activeResumeId ?? currentState.activeResumeId;
		return {
			...currentState,
			...persisted,
			resumes,
			activeResumeId,
			activeResume: activeResumeId ? resumes[activeResumeId] ?? null : null
		};
	}
}));
//#endregion
export { verifyPermission as _, normalizeLinkHref as a, TemplateProvider as c, shouldShowCustomFieldLabelPrefix as d, getProjectLinkMeta as f, storeFileHandle as g, storeConfig as h, hasMeaningfulRichTextContent as i, getCustomFieldDisplayText as l, getFileHandle as m, DEFAULT_TEMPLATES as n, stripLegacyRichTextClasses as o, getConfig as p, getTemplateComponent as r, stripTrailingListParagraph as s, useResumeStore as t, getCustomFieldHref as u };
