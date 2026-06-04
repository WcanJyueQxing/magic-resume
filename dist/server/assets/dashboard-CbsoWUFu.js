import { a as useLocale, o as useTranslations, t as cn } from "./utils-CECdrI66.js";
import { n as useRouter, t as usePathname } from "./navigation-DRQZI54s.js";
import { t as Button } from "./button-BaBi_9yO.js";
import { t as Logo } from "./Logo-B6x1BhhN.js";
import { a as Input, i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-8aXINjtu.js";
import * as React$1 from "react";
import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { PanelLeft, X } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SheetPrimitive from "@radix-ui/react-dialog";
//#region src/components/shared/icons/SidebarIcons.tsx
/**
* Modern Flat Vibrant Icons
* Style: 2D, bold solid colors, no heavy shadows/skeuomorphism.
* Designed to fill the viewport for maximum visibility.
*/
var IconResumes = ({ size = 24, className, active }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 40 40",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className,
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "4",
			y: "4",
			width: "32",
			height: "32",
			rx: "6",
			fill: "#0066FF"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "10",
			width: "20",
			height: "3",
			rx: "1",
			fill: "white"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "17",
			width: "14",
			height: "3",
			rx: "1",
			fill: "white",
			fillOpacity: "0.8"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "24",
			width: "20",
			height: "3",
			rx: "1",
			fill: "white",
			fillOpacity: "0.8"
		}),
		active && /* @__PURE__ */ jsx("circle", {
			cx: "32",
			cy: "32",
			r: "5",
			fill: "#FF4D4F",
			stroke: "white",
			strokeWidth: "2"
		})
	]
});
var IconTemplates = ({ size = 24, className, active }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 40 40",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className,
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "4",
			y: "4",
			width: "15",
			height: "15",
			rx: "3",
			fill: "#FF4D4F"
		}),
		" ",
		/* @__PURE__ */ jsx("rect", {
			x: "21",
			y: "4",
			width: "15",
			height: "15",
			rx: "3",
			fill: "#FAAD14"
		}),
		" ",
		/* @__PURE__ */ jsx("rect", {
			x: "4",
			y: "21",
			width: "15",
			height: "15",
			rx: "3",
			fill: "#52C41A"
		}),
		" ",
		/* @__PURE__ */ jsx("rect", {
			x: "21",
			y: "21",
			width: "15",
			height: "15",
			rx: "3",
			fill: "#1890FF"
		}),
		" ",
		/* @__PURE__ */ jsx("circle", {
			cx: "9",
			cy: "9",
			r: "2",
			fill: "white",
			fillOpacity: "0.5"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "26",
			cy: "9",
			r: "2",
			fill: "white",
			fillOpacity: "0.5"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "9",
			cy: "26",
			r: "2",
			fill: "white",
			fillOpacity: "0.5"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "26",
			cy: "26",
			r: "2",
			fill: "white",
			fillOpacity: "0.5"
		})
	]
});
var IconSettings = ({ size = 24, className, active }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 40 40",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className,
	children: [
		/* @__PURE__ */ jsx("path", {
			d: "M20 12.5C15.8579 12.5 12.5 15.8579 12.5 20C12.5 24.1421 15.8579 27.5 20 27.5C24.1421 27.5 27.5 24.1421 27.5 20C27.5 15.8579 24.1421 12.5 20 12.5ZM7.5 20C7.5 13.0964 13.0964 7.5 20 7.5V2.5C10.335 2.5 2.5 10.335 2.5 20C2.5 29.665 10.335 37.5 20 37.5V32.5C13.0964 32.5 7.5 26.9036 7.5 20ZM32.5 20C32.5 26.9036 26.9036 32.5 20 32.5V37.5C29.665 37.5 37.5 29.665 37.5 20C37.5 10.335 29.665 2.5 20 2.5V7.5C26.9036 7.5 32.5 13.0964 32.5 20Z",
			fill: "#434343"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M20 5V2.5M20 37.5V35M37.5 20H35M5 20H2.5",
			stroke: "#434343",
			strokeWidth: "5",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M32.3744 7.62561L34.1421 5.85786M5.85786 34.1421L7.62561 32.3744M32.3744 32.3744L34.1421 34.1421M5.85786 5.85786L7.62561 7.62561",
			stroke: "#434343",
			strokeWidth: "5",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "20",
			cy: "20",
			r: "4",
			fill: active ? "#1890FF" : "white"
		})
	]
});
var IconAI = ({ size = 24, className, active }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 40 40",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className,
	children: [
		/* @__PURE__ */ jsx("path", {
			d: "M20 2L24.5 14L37 18.5L24.5 23L20 35L15.5 23L3 18.5L15.5 14L20 2Z",
			fill: "#722ED1"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M20 8L22 16L30 18.5L22 21L20 29L18 21L10 18.5L18 16L20 8Z",
			fill: "#B37FEB"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "32",
			cy: "10",
			r: "4",
			fill: "#1890FF"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "5",
			y: "28",
			width: "8",
			height: "8",
			rx: "2",
			fill: "#FA8C16",
			transform: "rotate(25 9 32)"
		})
	]
});
var IconDashboard = ({ size = 24, className, active }) => /* @__PURE__ */ jsxs("svg", {
	width: size,
	height: size,
	viewBox: "0 0 40 40",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className,
	children: [
		/* @__PURE__ */ jsx("rect", {
			x: "4",
			y: "4",
			width: "32",
			height: "32",
			rx: "6",
			fill: active ? "#722ED1" : "#434343"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "10",
			y: "24",
			width: "4",
			height: "10",
			rx: "2",
			fill: "white"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "18",
			y: "16",
			width: "4",
			height: "18",
			rx: "2",
			fill: "white"
		}),
		/* @__PURE__ */ jsx("rect", {
			x: "26",
			y: "10",
			width: "4",
			height: "24",
			rx: "2",
			fill: "white"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: "20",
			cy: "12",
			r: "3",
			fill: "#FA8C16"
		})
	]
});
//#endregion
//#region src/hooks/use-mobile.tsx
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = React$1.useState(void 0);
	React$1.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
//#endregion
//#region src/components/ui/separator.tsx
var Separator = React$1.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = SeparatorPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = SheetPrimitive.Root;
var SheetPortal = SheetPrimitive.Portal;
var SheetOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React$1.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(SheetPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(SheetPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
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
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
//#endregion
//#region src/components/ui/sidebar.tsx
var SIDEBAR_COOKIE_NAME = "sidebar:state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "4rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React$1.createContext(null);
function useSidebar() {
	const context = React$1.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
var SidebarProvider = React$1.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React$1.useState(false);
	const [_open, _setOpen] = React$1.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React$1.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = React$1.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	React$1.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = React$1.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ jsx(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ jsx("div", {
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
				ref,
				...props,
				children
			})
		})
	});
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = React$1.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ jsx("div", {
		className: cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className),
		ref,
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ jsx(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ jsx(SheetContent, {
			"data-sidebar": "sidebar",
			"data-mobile": "true",
			className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: /* @__PURE__ */ jsx("div", {
				className: "flex h-full w-full flex-col",
				children
			})
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "group peer hidden md:block text-sidebar-foreground",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		children: [/* @__PURE__ */ jsx("div", { className: cn("duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]") }), /* @__PURE__ */ jsx("div", {
			className: cn("duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ jsx("div", {
				"data-sidebar": "sidebar",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
				children
			})
		})]
	});
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = React$1.forwardRef(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ jsxs(Button, {
		ref,
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		className: cn("h-7 w-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ jsx(PanelLeft, {}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = React$1.forwardRef(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ jsx("button", {
		ref,
		"data-sidebar": "rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	});
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("main", {
		ref,
		className: cn("relative flex min-h-svh flex-1 flex-col bg-background", "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
		...props
	});
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(Input, {
		ref,
		"data-sidebar": "input",
		className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
		...props
	});
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(Separator, {
		ref,
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	});
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = React$1.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "div", {
		ref,
		"data-sidebar": "group-label",
		className: cn("duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
		...props
	});
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = React$1.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "group-action",
		className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	"data-sidebar": "group-content",
	className: cn("w-full text-sm", className),
	...props
}));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", {
	ref,
	"data-sidebar": "menu",
	className: cn("flex w-full min-w-0 flex-col gap-1", className),
	...props
}));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	"data-sidebar": "menu-item",
	className: cn("relative flex w-full min-w-0 items-center gap-2", "group-data-[collapsible=icon]:justify-center", className),
	...props
}));
SidebarMenuItem.displayName = "SidebarMenuItem";
var SidebarMenuButton = React$1.forwardRef(({ asChild = false, isActive = false, className, children, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "a", {
		ref,
		"data-sidebar": "menu-button",
		"data-active": isActive,
		className: cn("flex h-9 w-full min-w-0 cursor-pointer select-none items-center rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10", isActive && "bg-sidebar-accent text-sidebar-accent-foreground", className),
		...props,
		children
	});
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = React$1.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "menu-action",
		className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
		...props
	});
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	"data-sidebar": "menu-badge",
	className: cn("absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = React$1.forwardRef(({ className, showIcon = false, ...props }, ref) => {
	const width = React$1.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		"data-sidebar": "menu-skeleton",
		className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className),
		...props,
		children: [showIcon && /* @__PURE__ */ jsx(Skeleton, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}), /* @__PURE__ */ jsx(Skeleton, {
			className: "h-4 flex-1 max-w-[--skeleton-width]",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": width }
		})]
	});
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", {
	ref,
	"data-sidebar": "menu-sub",
	className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React$1.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	...props
}));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = React$1.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "a", {
		ref,
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
//#endregion
//#region src/app/app/dashboard/client.tsx
var DashboardLayout = ({ children }) => {
	const t = useTranslations("dashboard");
	const sidebarItems = [
		{
			title: "仪表盘",
			url: "/app/dashboard/dashboard",
			icon: IconDashboard
		},
		{
			title: t("sidebar.resumes"),
			url: "/app/dashboard/resumes",
			icon: IconResumes
		},
		{
			title: t("sidebar.templates"),
			url: "/app/dashboard/templates",
			icon: IconTemplates
		},
		{
			title: t("sidebar.ai"),
			url: "/app/dashboard/ai",
			icon: IconAI
		},
		{
			title: t("sidebar.settings"),
			url: "/app/dashboard/settings",
			icon: IconSettings
		}
	];
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();
	const [open, setOpen] = useState(true);
	const [collapsible, setCollapsible] = useState("icon");
	const handleItemClick = (item) => {
		if (item.items) {} else router.push(item.url || item.href || "/");
	};
	const isItemActive = (item) => {
		if (item.items) return item.items.some((subItem) => pathname === subItem.href);
		return item.url === pathname || item.href === pathname;
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex h-screen bg-background",
		children: /* @__PURE__ */ jsxs(SidebarProvider, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ jsxs(Sidebar, {
				collapsible,
				className: "border-r border-border/40 bg-card/50 backdrop-blur-xl",
				children: [
					/* @__PURE__ */ jsx(SidebarHeader, {
						className: "h-16 flex items-center justify-center border-b border-border/40",
						children: /* @__PURE__ */ jsxs("div", {
							className: "w-full cursor-pointer justify-center flex items-center",
							onClick: () => router.push(`/${locale}`),
							children: [/* @__PURE__ */ jsx(Logo, {
								className: " hover:opacity-80 transition-opacity",
								size: 48
							}), open && /* @__PURE__ */ jsx("span", {
								className: "font-bold text-lg tracking-tight",
								children: t("sidebar.appName")
							})]
						})
					}),
					/* @__PURE__ */ jsx(SidebarContent, {
						className: "px-3 py-4",
						children: /* @__PURE__ */ jsx(SidebarGroup, { children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, {
							className: "space-y-1",
							children: sidebarItems.map((item) => {
								const active = isItemActive(item);
								return /* @__PURE__ */ jsx(TooltipProvider, {
									delayDuration: 0,
									children: /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
										asChild: true,
										children: /* @__PURE__ */ jsxs(SidebarMenuItem, { children: [/* @__PURE__ */ jsx(SidebarMenuButton, {
											asChild: true,
											isActive: active,
											className: `w-full transition-all duration-200 ease-in-out h-12 mb-1 [&>svg]:size-auto ${active ? "bg-primary/10 text-primary font-bold hover:bg-primary/20 hover:text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`,
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 px-2 cursor-pointer",
												onClick: () => handleItemClick(item),
												children: [/* @__PURE__ */ jsx(item.icon, {
													size: 24,
													active
												}), open && /* @__PURE__ */ jsx("span", {
													className: "flex-1 text-sm",
													children: item.title
												})]
											})
										}), item.items && open && /* @__PURE__ */ jsx("div", {
											className: "ml-9 mt-1 space-y-1 border-l-2 border-muted pl-2",
											children: item.items.map((subItem) => /* @__PURE__ */ jsx("div", {
												className: `cursor-pointer px-3 py-2 rounded-md text-sm transition-colors ${pathname === subItem.href ? "text-primary font-medium bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
												onClick: () => router.push(subItem.href),
												children: subItem.title
											}, subItem.href))
										})] }, item.title)
									}), !open && /* @__PURE__ */ jsx(TooltipContent, {
										side: "right",
										className: "font-medium",
										children: item.title
									})] })
								}, item.title);
							})
						}) }) })
					}),
					/* @__PURE__ */ jsx(SidebarFooter, {})
				]
			}), /* @__PURE__ */ jsxs("main", {
				className: "flex-1 flex flex-col bg-background min-h-full",
				children: [/* @__PURE__ */ jsx("div", {
					className: "p-2",
					children: /* @__PURE__ */ jsx(SidebarTrigger, {})
				}), /* @__PURE__ */ jsx("div", {
					className: "flex-1 bg-background",
					children
				})]
			})]
		})
	});
};
//#endregion
//#region src/routes/app/dashboard.tsx?tsr-split=component
function DashboardRouteLayout() {
	return /* @__PURE__ */ jsx(DashboardLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
//#endregion
export { DashboardRouteLayout as component };
