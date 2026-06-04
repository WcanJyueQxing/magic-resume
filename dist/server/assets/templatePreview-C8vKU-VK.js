import { a as initialResumeStateEn, i as initialResumeState } from "./initialResumeData-KCtMeTPD.js";
import { n as DEFAULT_TEMPLATES } from "./useResumeStore-46XKG7Po.js";
//#region src/lib/templatePreview.ts
var TEMPLATE_PREVIEW_HEIGHT_PX = 1123;
var TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE = "data-template-snapshot-root";
`${TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE}`;
var isTemplatePreviewLocale = (value) => value === "zh" || value === "en";
var getTemplateById = (templateId) => DEFAULT_TEMPLATES.find((template) => template.id === templateId) ?? DEFAULT_TEMPLATES[0];
var getTemplatePreviewBaseData = (locale) => locale === "en" ? initialResumeStateEn : initialResumeState;
var createTemplatePreviewData = (template, locale) => {
	const baseData = getTemplatePreviewBaseData(locale);
	return {
		...baseData,
		id: `preview-mock-${locale}-${template.id}`,
		templateId: template.id,
		createdAt: (/* @__PURE__ */ new Date(0)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date(0)).toISOString(),
		globalSettings: {
			...baseData.globalSettings,
			themeColor: template.colorScheme.primary,
			sectionSpacing: template.spacing.sectionGap,
			paragraphSpacing: template.spacing.itemGap,
			pagePadding: template.spacing.contentPadding
		},
		basic: {
			...baseData.basic,
			layout: template.basic.layout
		}
	};
};
var getTemplateSnapshotSrc = (manifest, locale, templateId) => manifest.locales[locale][templateId] ?? null;
//#endregion
export { getTemplateSnapshotSrc as a, getTemplateById as i, TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE as n, isTemplatePreviewLocale as o, createTemplatePreviewData as r, TEMPLATE_PREVIEW_HEIGHT_PX as t };
