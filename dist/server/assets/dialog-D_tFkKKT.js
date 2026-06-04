import { t as cn } from "./utils-CECdrI66.js";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
//#region src/components/ui/scroll-area.tsx
var ScrollArea = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ jsx(ScrollBar, {}),
		/* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
	]
}));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React$1.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React$1.forwardRef(({ className, children, hideClose, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
	...props,
	children: [children, !hideClose && /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
export { DialogHeader as a, ScrollArea as c, DialogFooter as i, ScrollBar as l, DialogContent as n, DialogTitle as o, DialogDescription as r, DialogTrigger as s, Dialog as t };
