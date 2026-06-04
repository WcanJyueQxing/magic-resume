import { t as cn } from "./utils-CECdrI66.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/ui/card.tsx
var Card = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", {
	ref,
	className: cn("text-2xl font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
export { CardHeader as a, CardFooter as i, CardContent as n, CardTitle as o, CardDescription as r, Card as t };
