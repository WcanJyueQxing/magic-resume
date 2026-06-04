import { t as cn } from "./utils-CECdrI66.js";
import { n as DEFAULT_TEMPLATES } from "./useResumeStore-46XKG7Po.js";
import { n as buttonVariants } from "./button-BaBi_9yO.js";
import { a as getTemplateSnapshotSrc, o as isTemplatePreviewLocale } from "./templatePreview-C8vKU-VK.js";
import * as React$1 from "react";
import { useEffect, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
//#region src/generated/templateSnapshotManifest.ts
var TEMPLATE_SNAPSHOT_MANIFEST = {
	"version": 1,
	"generatedAt": "2026-06-01T05:05:39.212Z",
	"locales": {
		"zh": {
			"classic": "/template-snapshots/zh/classic.png?v=2026-06-01T05%3A05%3A39.212Z",
			"modern": "/template-snapshots/zh/modern.png?v=2026-06-01T05%3A05%3A39.212Z",
			"left-right": "/template-snapshots/zh/left-right.png?v=2026-06-01T05%3A05%3A39.212Z",
			"timeline": "/template-snapshots/zh/timeline.png?v=2026-06-01T05%3A05%3A39.212Z",
			"minimalist": "/template-snapshots/zh/minimalist.png?v=2026-06-01T05%3A05%3A39.212Z",
			"elegant": "/template-snapshots/zh/elegant.png?v=2026-06-01T05%3A05%3A39.212Z",
			"creative": "/template-snapshots/zh/creative.png?v=2026-06-01T05%3A05%3A39.212Z",
			"editorial": "/template-snapshots/zh/editorial.png?v=2026-06-01T05%3A05%3A39.212Z",
			"swiss": "/template-snapshots/zh/swiss.png?v=2026-06-01T05%3A05%3A39.212Z"
		},
		"en": {
			"classic": "/template-snapshots/en/classic.png?v=2026-06-01T05%3A05%3A39.212Z",
			"modern": "/template-snapshots/en/modern.png?v=2026-06-01T05%3A05%3A39.212Z",
			"left-right": "/template-snapshots/en/left-right.png?v=2026-06-01T05%3A05%3A39.212Z",
			"timeline": "/template-snapshots/en/timeline.png?v=2026-06-01T05%3A05%3A39.212Z",
			"minimalist": "/template-snapshots/en/minimalist.png?v=2026-06-01T05%3A05%3A39.212Z",
			"elegant": "/template-snapshots/en/elegant.png?v=2026-06-01T05%3A05%3A39.212Z",
			"creative": "/template-snapshots/en/creative.png?v=2026-06-01T05%3A05%3A39.212Z",
			"editorial": "/template-snapshots/en/editorial.png?v=2026-06-01T05%3A05%3A39.212Z",
			"swiss": "/template-snapshots/en/swiss.png?v=2026-06-01T05%3A05%3A39.212Z"
		}
	}
};
//#endregion
//#region src/hooks/useTemplateSnapshots.ts
var useTemplateSnapshots = (locale) => {
	const resolvedLocale = isTemplatePreviewLocale(locale) ? locale : "zh";
	const snapshotMap = useMemo(() => Object.fromEntries(DEFAULT_TEMPLATES.map((template) => [template.id, getTemplateSnapshotSrc(TEMPLATE_SNAPSHOT_MANIFEST, resolvedLocale, template.id)])), [resolvedLocale]);
	useEffect(() => {
		const preloaders = Object.values(snapshotMap).filter((src) => Boolean(src)).map((src) => {
			const image = new window.Image();
			image.decoding = "async";
			image.src = src;
			return image;
		});
		return () => {
			preloaders.forEach((image) => {
				image.src = "";
			});
		};
	}, [snapshotMap]);
	return {
		resolvedLocale,
		snapshotMap
	};
};
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [/* @__PURE__ */ jsx(AlertDialogOverlay, {}), /* @__PURE__ */ jsx(AlertDialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
//#endregion
export { AlertDialogDescription as a, AlertDialogTitle as c, AlertDialogContent as i, AlertDialogTrigger as l, AlertDialogAction as n, AlertDialogFooter as o, AlertDialogCancel as r, AlertDialogHeader as s, AlertDialog as t, useTemplateSnapshots as u };
