import { o as useTranslations } from "./utils-CECdrI66.js";
import { _ as verifyPermission, g as storeFileHandle, h as storeConfig, m as getFileHandle, p as getConfig, t as useResumeStore } from "./useResumeStore-46XKG7Po.js";
import { t as syncResumesFromDirectory } from "./resumeFileSync-DkmptGMo.js";
import { t as Button } from "./button-BaBi_9yO.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DGtkjkTU.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Folder, Trash2 } from "lucide-react";
//#region src/app/app/dashboard/settings/page.tsx
var SettingsPage = () => {
	const [directoryHandle, setDirectoryHandle] = useState(null);
	const [folderPath, setFolderPath] = useState("");
	const t = useTranslations();
	const updateResumeFromFile = useResumeStore((state) => state.updateResumeFromFile);
	useEffect(() => {
		const loadSavedConfig = async () => {
			try {
				const handle = await getFileHandle("syncDirectory");
				const path = await getConfig("syncDirectoryPath");
				if (handle && path) {
					if (await verifyPermission(handle)) {
						setDirectoryHandle(handle);
						setFolderPath(path);
					}
				}
			} catch (error) {
				console.error("Error loading saved config:", error);
			}
		};
		loadSavedConfig();
	}, []);
	const handleSelectDirectory = async () => {
		try {
			if (!("showDirectoryPicker" in window)) {
				alert("Your browser does not support directory selection. Please use a modern browser.");
				return;
			}
			const handle = await window.showDirectoryPicker({ mode: "readwrite" });
			if (await verifyPermission(handle)) {
				setDirectoryHandle(handle);
				const path = handle.name;
				setFolderPath(path);
				await storeFileHandle("syncDirectory", handle);
				await storeConfig("syncDirectoryPath", path);
				await syncResumesFromDirectory(updateResumeFromFile);
			}
		} catch (error) {
			console.error("Error selecting directory:", error);
		}
	};
	const handleRemoveDirectory = async () => {
		try {
			setDirectoryHandle(null);
			setFolderPath("");
			await storeFileHandle("syncDirectory", null);
			await storeConfig("syncDirectoryPath", "");
		} catch (error) {
			console.error("Error removing directory:", error);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "w-full max-w-[1600px] mx-auto py-8 px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col space-y-8",
			children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", {
				className: "text-3xl font-bold tracking-tight",
				children: t("dashboard.settings.title")
			}) }), /* @__PURE__ */ jsx("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ jsxs(Card, {
					className: "overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900/50",
					children: [/* @__PURE__ */ jsx(CardHeader, {
						className: "border-b border-gray-100 dark:border-gray-800/50 pb-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 shrink-0",
								children: /* @__PURE__ */ jsx(Folder, { className: "h-6 w-6 text-[#D97757] dark:text-[#D97757]/90" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ jsx(CardTitle, {
									className: "text-xl font-semibold text-gray-900 dark:text-gray-100",
									children: t("dashboard.settings.sync.title")
								}), /* @__PURE__ */ jsx(CardDescription, {
									className: "text-base text-gray-500 dark:text-gray-400 leading-relaxed",
									children: t("dashboard.settings.sync.description")
								})]
							})]
						})
					}), /* @__PURE__ */ jsx(CardContent, {
						className: "pt-8 px-6 pb-8 md:px-8",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex-1 relative group",
								children: directoryHandle ? /* @__PURE__ */ jsxs("div", {
									className: "h-12 px-4 flex items-center gap-3 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors group-hover:border-[#D97757]/30 group-hover:bg-orange-50/30 dark:group-hover:bg-orange-900/10",
									children: [/* @__PURE__ */ jsx(Folder, { className: "h-5 w-5 text-[#D97757]" }), /* @__PURE__ */ jsx("span", {
										className: "truncate font-medium text-gray-700 dark:text-gray-300 font-mono text-sm",
										children: folderPath
									})]
								}) : /* @__PURE__ */ jsx("div", {
									className: "h-12 px-4 flex items-center justify-center sm:justify-start text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl",
									children: t("dashboard.settings.syncDirectory.noFolderConfigured")
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 w-full sm:w-auto",
								children: [/* @__PURE__ */ jsx(Button, {
									onClick: handleSelectDirectory,
									variant: "default",
									className: "flex-1 sm:flex-none h-12 px-6  text-white shadow-sm hover:shadow transition-all duration-200 rounded-xl font-medium cursor-pointer",
									children: t("dashboard.settings.sync.select")
								}), directoryHandle && /* @__PURE__ */ jsx(Button, {
									onClick: handleRemoveDirectory,
									variant: "outline",
									size: "icon",
									className: "h-12 w-12 rounded-xl border-gray-200 dark:border-gray-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:text-red-400 dark:hover:border-red-900/50 transition-colors",
									title: "Remove synced directory",
									children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" })
								})]
							})]
						})
					})]
				})
			})]
		})
	});
};
//#endregion
//#region src/routes/app/dashboard/settings.tsx?tsr-split=component
var SplitComponent = SettingsPage;
//#endregion
export { SplitComponent as component };
