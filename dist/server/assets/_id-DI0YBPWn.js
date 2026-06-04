import { t as cn } from "./utils-CECdrI66.js";
import { i as ResumeTemplateComponent, r as normalizeFontFamily } from "./fonts-BxvXKZ7g.js";
import { i as getTemplateById, n as TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE, o as isTemplatePreviewLocale, r as createTemplatePreviewData, t as TEMPLATE_PREVIEW_HEIGHT_PX } from "./templatePreview-C8vKU-VK.js";
import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { jsx } from "react/jsx-runtime";
//#region src/components/preview/IframeTemplateViewer.tsx
var IframeTemplateViewer = () => {
	const { id } = useParams({ from: "/app/preview-template/$id" });
	const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
	const localeParam = searchParams?.get("locale");
	const cookieLocale = typeof document !== "undefined" ? document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="))?.split("=")[1] : null;
	const locale = isTemplatePreviewLocale(localeParam) ? localeParam : isTemplatePreviewLocale(cookieLocale) ? cookieLocale : "zh";
	const isSnapshotMode = searchParams?.get("snapshot") === "1";
	const template = useMemo(() => {
		return getTemplateById(id);
	}, [id]);
	const mockData = useMemo(() => {
		return createTemplatePreviewData(template, locale);
	}, [locale, template]);
	const selectedFontFamily = normalizeFontFamily(mockData.globalSettings?.fontFamily);
	return /* @__PURE__ */ jsx("div", {
		className: cn("w-full min-h-screen overflow-hidden bg-white", isSnapshotMode ? "flex items-start justify-start p-0" : "flex items-start justify-center"),
		children: /* @__PURE__ */ jsx("div", {
			[TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE]: "",
			className: cn("bg-white relative origin-top-left", isSnapshotMode ? "" : "mx-auto"),
			style: {
				width: `794px`,
				minWidth: `794px`,
				height: isSnapshotMode ? `${TEMPLATE_PREVIEW_HEIGHT_PX}px` : void 0,
				minHeight: `${TEMPLATE_PREVIEW_HEIGHT_PX}px`,
				overflow: "hidden",
				fontFamily: selectedFontFamily,
				padding: `${template.spacing.contentPadding}px`
			},
			children: /* @__PURE__ */ jsx(ResumeTemplateComponent, {
				data: mockData,
				template
			})
		})
	});
};
//#endregion
//#region src/routes/app/preview-template/$id.tsx?tsr-split=component
var SplitComponent = IframeTemplateViewer;
//#endregion
export { SplitComponent as component };
