import { a as useLocale, o as useTranslations, t as cn } from "./utils-CECdrI66.js";
import { a as localeNames, i as replacePathLocale, n as getLocaleFromPathname, o as locales, t as Route } from "./_locale-CcjCQDoe.js";
import { t as usePathname } from "./navigation-DRQZI54s.js";
import { t as Button } from "./button-BaBi_9yO.js";
import { n as Image$1, t as Logo } from "./Logo-B6x1BhhN.js";
import { a as ThemeToggle, c as DropdownMenuItem, i as AccordionTrigger, l as DropdownMenuTrigger, n as AccordionContent, o as DropdownMenu, r as AccordionItem, s as DropdownMenuContent, t as Accordion } from "./accordion-CTvhKNVD.js";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Link, notFound, useLocation, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, ChevronRight, Languages, Menu, Moon, Play, Shield, Sparkles, Star, Sun, X } from "lucide-react";
//#region src/components/shared/LanguageSwitch.tsx
function LanguageSwitch() {
	const locale = useLocale();
	const navigate = useNavigate();
	const pathname = useLocation({ select: (location) => location.pathname });
	const handleSwitchLocale = (nextLocale) => {
		document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
		if (getLocaleFromPathname(pathname)) navigate({ to: replacePathLocale(pathname, nextLocale) });
	};
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			variant: "ghost",
			size: "icon",
			className: "h-8 w-8 relative hover:bg-accent/50",
			children: /* @__PURE__ */ jsx(Languages, { className: "h-[1.2rem] w-[1.2rem]" })
		})
	}), /* @__PURE__ */ jsx(DropdownMenuContent, {
		align: "end",
		children: locales.map((loc) => {
			return /* @__PURE__ */ jsx(DropdownMenuItem, {
				className: locale === loc ? "bg-accent" : "",
				onClick: () => handleSwitchLocale(loc),
				children: /* @__PURE__ */ jsxs("span", {
					className: "flex items-center gap-2",
					children: [localeNames[loc], locale === loc && /* @__PURE__ */ jsx("span", {
						className: "text-xs text-muted-foreground",
						children: "✓"
					})]
				})
			}, loc);
		})
	})] });
}
//#endregion
//#region src/components/shared/GitHubStars.tsx
var REPO_URL = "https://github.com/JOYCEQL/magic-resume";
var API_URL = "https://api.github.com/repos/JOYCEQL/magic-resume";
function GitHubStars() {
	const [stars, setStars] = useState(null);
	const [isHovered, setIsHovered] = useState(false);
	useEffect(() => {
		fetch(API_URL).then((res) => res.json()).then((data) => {
			setStars(data.stargazers_count);
		}).catch((error) => {
			console.error("Error fetching GitHub stars:", error);
		});
	}, []);
	return /* @__PURE__ */ jsxs(motion.a, {
		href: REPO_URL,
		target: "_blank",
		rel: "noopener noreferrer",
		className: cn("relative inline-flex items-center gap-2 h-8 px-3 rounded-full", "bg-background/50 dark:bg-background/20 backdrop-blur-md", "border border-border/40 dark:border-white/20", "hover:border-border/80 dark:hover:border-white/40", "shadow-sm hover:shadow-md", "cursor-pointer select-none", "group overflow-hidden"),
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		whileHover: { scale: 1.02 },
		whileTap: { scale: .98 },
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .3 },
		children: [
			/* @__PURE__ */ jsx("div", { className: cn("absolute inset-0", "bg-[length:400%_400%] animate-gradient-xy", "bg-gradient-to-r from-violet-200/30 via-pink-200/30 to-cyan-200/30", "dark:from-violet-500/10 dark:via-pink-500/10 dark:to-cyan-500/10", "group-hover:from-violet-200/40 group-hover:via-pink-200/40 group-hover:to-cyan-200/40", "dark:group-hover:from-violet-500/15 dark:group-hover:via-pink-500/15 dark:group-hover:to-cyan-500/15", "transition-colors duration-500") }),
			/* @__PURE__ */ jsx(motion.div, {
				className: "relative z-10 flex items-center",
				animate: isHovered ? { rotate: 180 } : { rotate: 0 },
				transition: { duration: .3 },
				children: /* @__PURE__ */ jsx(Star, {
					className: cn("h-4 w-4", "text-yellow-500/70 dark:text-yellow-400/70", "transition-colors duration-300", isHovered && "text-yellow-500 dark:text-yellow-400"),
					fill: isHovered ? "currentColor" : "none"
				})
			}),
			/* @__PURE__ */ jsx("span", {
				className: "relative z-10 text-sm font-medium",
				children: "Star on GitHub"
			}),
			stars !== null && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { className: cn("relative z-10 w-px h-3", "bg-border/60 dark:bg-white/20", "transition-colors duration-300") }), /* @__PURE__ */ jsx(motion.span, {
				className: "relative z-10 text-sm tabular-nums",
				initial: {
					opacity: 0,
					scale: .8
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { delay: .1 },
				children: stars?.toLocaleString()
			})] })
		]
	});
}
//#endregion
//#region src/components/home/client/ScrollHeader.tsx
function ScrollHeader({ children }) {
	const { scrollY } = useScroll();
	const [isScrolled, setIsScrolled] = useState(false);
	useEffect(() => {
		const unsubscribe = scrollY.on("change", (latest) => {
			setIsScrolled(latest > 0);
		});
		return () => {
			unsubscribe();
		};
	}, [scrollY]);
	return /* @__PURE__ */ jsx("header", {
		className: `fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${isScrolled ? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"}`,
		children
	});
}
//#endregion
//#region src/lib/link.tsx
var Link$2 = forwardRef(function Link$3({ href, children, ...rest }, ref) {
	return /* @__PURE__ */ jsx(Link, {
		ref,
		to: href,
		...rest,
		children
	});
});
//#endregion
//#region src/components/home/client/MobileMenu.tsx
function MobileMenu({ isOpen, onClose, buttonText, extraItems = [] }) {
	useTranslations("home");
	useLocale();
	if (!isOpen) return null;
	return /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -20
		},
		className: "fixed inset-x-0 top-16 z-50 md:hidden",
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-b dark:border-gray-800",
			children: /* @__PURE__ */ jsxs("nav", {
				className: "mx-auto max-w-[1200px] px-4 py-6 flex flex-col gap-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-8",
						children: [
							/* @__PURE__ */ jsx(LanguageSwitch, {}),
							/* @__PURE__ */ jsx(ThemeToggle, { children: /* @__PURE__ */ jsxs("div", {
								className: "w-8 h-8 relative cursor-pointer rounded-md hover:bg-accent/50 flex items-center justify-center",
								children: [/* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] absolute inset-0 m-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), /* @__PURE__ */ jsx(Moon, { className: "h-[1.2rem] w-[1.2rem] absolute inset-0 m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })]
							}) }),
							/* @__PURE__ */ jsx(GitHubStars, {})
						]
					}),
					extraItems && extraItems.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "flex flex-col items-center justify-center gap-2",
						children: extraItems.map((item, index) => /* @__PURE__ */ jsx("div", { children: item.component }, index))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-col gap-3 px-4",
						children: /* @__PURE__ */ jsx(Button, {
							size: "default",
							className: "bg-primary hover:opacity-90 text-white w-full py-6",
							asChild: true,
							children: /* @__PURE__ */ jsx(Link$2, {
								href: "/app/dashboard",
								onClick: onClose,
								children: buttonText
							})
						})
					})
				]
			})
		})
	});
}
//#endregion
//#region src/components/home/GoDashboard.tsx
function GoDashboard({ children, type = "dashboard" }) {
	const navigate = useNavigate();
	const routeMap = {
		dashboard: "/app/dashboard",
		resumes: "/app/dashboard/resumes",
		templates: "/app/dashboard/templates"
	};
	return /* @__PURE__ */ jsx("form", {
		onSubmit: (event) => {
			event.preventDefault();
			navigate({ to: routeMap[type] });
		},
		children
	});
}
//#endregion
//#region src/components/home/LandingHeader.tsx
function LandingHeader() {
	const t = useTranslations("home");
	const locale = usePathname().split("/")[1];
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ScrollHeader, { children: /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-[1200px] px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between h-20",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center  cursor-pointer group",
					onClick: () => window.location.href = `/${locale}/`,
					children: [/* @__PURE__ */ jsx(Logo, { size: 60 }), /* @__PURE__ */ jsx("span", {
						className: "font-serif text-[24px] tracking-tight font-semibold text-foreground/90",
						children: t("header.title")
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "hidden md:flex items-center gap-4",
					children: [
						/* @__PURE__ */ jsx(LanguageSwitch, {}),
						/* @__PURE__ */ jsx(ThemeToggle, { children: /* @__PURE__ */ jsxs("div", {
							className: "w-9 h-9 relative cursor-pointer rounded-xl hover:bg-accent/80 flex items-center justify-center transition-colors",
							children: [/* @__PURE__ */ jsx(Sun, { className: "h-[1.1rem] w-[1.1rem] absolute inset-0 m-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), /* @__PURE__ */ jsx(Moon, { className: "h-[1.1rem] w-[1.1rem] absolute inset-0 m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })]
						}) }),
						/* @__PURE__ */ jsx(GitHubStars, {}),
						/* @__PURE__ */ jsx(GoDashboard, { children: /* @__PURE__ */ jsx(Button, {
							className: "rounded-xl px-6 h-10 font-medium transition-all hover:opacity-90 active:scale-95",
							children: t("header.startButton")
						}) })
					]
				}),
				/* @__PURE__ */ jsx("button", {
					className: "md:hidden p-2.5 hover:bg-accent rounded-xl transition-colors",
					onClick: () => setIsMenuOpen(!isMenuOpen),
					children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
				})
			]
		})
	}) }), /* @__PURE__ */ jsx(MobileMenu, {
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		buttonText: t("header.startButton")
	})] });
}
//#endregion
//#region src/components/home/client/ScrollBackground.tsx
function ScrollBackground() {
	const { scrollY } = useScroll();
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute inset-0 -z-10",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 md:opacity-100" }),
			/* @__PURE__ */ jsx("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50 md:opacity-100" }),
			/* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl opacity-30 md:opacity-60" }),
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute inset-0 opacity-[0.15]",
				style: {
					backgroundSize: "30px 30px",
					y: scrollY
				}
			})
		]
	});
}
//#endregion
//#region src/components/home/client/AnimatedFeature.tsx
function AnimatedFeature({ children, delay = 0 }) {
	return /* @__PURE__ */ jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		transition: {
			duration: .6,
			delay
		},
		children
	});
}
//#endregion
//#region src/components/home/HeroSection.tsx
function HeroSection() {
	const t = useTranslations("home");
	return /* @__PURE__ */ jsxs("section", {
		className: "relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ jsx(ScrollBackground, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-blob" }), /* @__PURE__ */ jsx("div", { className: "absolute bottom-40 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] animate-blob animation-delay-2000" })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "container relative z-10 mx-auto px-6 text-center max-w-4xl",
				children: [/* @__PURE__ */ jsxs(AnimatedFeature, { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary mb-10 backdrop-blur-sm",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm font-medium tracking-wide italic",
							children: t("hero.badge")
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-5xl md:text-7xl font-serif font-semibold tracking-tight leading-[1.1] mb-8 text-foreground/90",
						children: t("hero.title")
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light",
						children: t("hero.subtitle")
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row items-center justify-center gap-5",
						children: [/* @__PURE__ */ jsx(GoDashboard, { children: /* @__PURE__ */ jsxs(Button, {
							size: "lg",
							className: "rounded-2xl h-14 px-10 text-lg font-medium shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all group",
							children: [t("hero.cta"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" })]
						}) }), /* @__PURE__ */ jsx(GoDashboard, {
							type: "templates",
							children: /* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								size: "lg",
								className: "rounded-2xl h-14 px-10 text-lg font-medium border-border/60 hover:bg-secondary/80 active:scale-95 transition-all",
								children: [/* @__PURE__ */ jsx(Play, { className: "w-4 h-4 mr-2 fill-current" }), t("hero.secondary")]
							})
						})]
					})
				] }), /* @__PURE__ */ jsx(AnimatedFeature, {
					delay: .3,
					children: /* @__PURE__ */ jsxs("div", {
						className: "mt-20 relative px-4 sm:px-0",
						children: [/* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-b from-primary/5 to-transparent rounded-[3rem] blur-2xl -z-10" }), /* @__PURE__ */ jsx("div", {
							className: "relative rounded-3xl border border-border/50 bg-secondary/30 p-2 sm:p-4 backdrop-blur-sm shadow-2xl overflow-hidden group",
							children: /* @__PURE__ */ jsx(Image$1, {
								src: "/web-shot.png",
								alt: "Resume Editor Preview",
								width: 1200,
								height: 800,
								className: "rounded-2xl shadow-sm group-hover:scale-[1.01] transition-transform duration-700",
								priority: true
							})
						})]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/home/FeaturesSection.tsx
var features = [{
	icon: Sparkles,
	badge: "features.ai.badge",
	badgeColor: "bg-primary/10 text-primary",
	title: "features.ai.title",
	description: "features.ai.description",
	items: [{
		title: "features.ai.item1",
		description: "features.ai.item1_description",
		image: "/features/svg/polish.svg"
	}, {
		title: "features.ai.item2",
		description: "features.ai.item2_description",
		image: "/features/svg/grammar.svg"
	}]
}, {
	icon: Shield,
	badge: "features.storage.badge",
	badgeColor: "bg-emerald-500/10 text-emerald-600",
	title: "features.storage.title",
	description: "features.storage.description",
	items: [{
		title: "features.storage.item1",
		description: "features.storage.item1_description",
		image: "/features/svg/local-storage.svg"
	}, {
		title: "features.storage.item2",
		description: "features.storage.item2_description",
		image: "/features/svg/export-formats.svg"
	}]
}];
var SLIDE_DURATION = 6e3;
function FeaturesSection() {
	const t = useTranslations("home");
	const [activeFeatures, setActiveFeatures] = useState(features.map(() => 0));
	const [progresses, setProgresses] = useState(features.map(() => 0));
	const intervalRefs = useRef(features.map(() => null));
	const startProgressTimer = useCallback((categoryIndex) => {
		if (intervalRefs.current[categoryIndex]) clearInterval(intervalRefs.current[categoryIndex]);
		const updateInterval = 50;
		const progressIncrement = updateInterval / SLIDE_DURATION * 100;
		intervalRefs.current[categoryIndex] = setInterval(() => {
			setProgresses((prev) => {
				const newProgresses = [...prev];
				if (newProgresses[categoryIndex] < 100) newProgresses[categoryIndex] += progressIncrement;
				return newProgresses;
			});
		}, updateInterval);
	}, []);
	useEffect(() => {
		progresses.forEach((progress, index) => {
			if (progress >= 100) {
				setProgresses((prev) => {
					const next = [...prev];
					next[index] = 0;
					return next;
				});
				setActiveFeatures((prevActive) => {
					const next = [...prevActive];
					const max = features[index].items.length - 1;
					next[index] = next[index] < max ? next[index] + 1 : 0;
					return next;
				});
			}
		});
	}, [progresses]);
	useEffect(() => {
		features.forEach((_, index) => startProgressTimer(index));
		return () => {
			intervalRefs.current.forEach((ref) => {
				if (ref) clearInterval(ref);
			});
		};
	}, [startProgressTimer]);
	const handleSlideChange = (categoryIndex, featureIndex) => {
		setActiveFeatures((prev) => {
			const next = [...prev];
			next[categoryIndex] = featureIndex;
			return next;
		});
		setProgresses((prev) => {
			const next = [...prev];
			next[categoryIndex] = 0;
			return next;
		});
		startProgressTimer(categoryIndex);
	};
	return /* @__PURE__ */ jsx("section", {
		className: "py-24 md:py-40 bg-background overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-6 max-w-6xl",
			children: [/* @__PURE__ */ jsx(AnimatedFeature, { children: /* @__PURE__ */ jsxs("div", {
				className: "text-center mb-24 md:mb-32",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground/90 mb-6",
						children: t("features.title")
					}),
					/* @__PURE__ */ jsx("div", { className: "w-20 h-1 bg-primary/20 mx-auto rounded-full mb-8" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed",
						children: t("features.subtitle")
					})
				]
			}) }), /* @__PURE__ */ jsx("div", {
				className: "space-y-40",
				children: features.map((category, catIndex) => /* @__PURE__ */ jsxs("div", {
					className: `flex flex-col gap-16 lg:gap-24 items-center ${catIndex % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`,
					children: [/* @__PURE__ */ jsxs("div", {
						className: "w-full lg:w-5/12 space-y-10",
						children: [/* @__PURE__ */ jsx(AnimatedFeature, {
							delay: .1,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: `inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${category.badgeColor}`,
										children: [/* @__PURE__ */ jsx(category.icon, { className: "w-4 h-4" }), t(category.badge)]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-3xl md:text-4xl font-serif font-medium tracking-tight text-foreground/90",
										children: t(category.title)
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-lg text-muted-foreground/90 leading-relaxed font-light",
										children: t(category.description)
									})
								]
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-4",
							children: category.items.map((item, itemIndex) => /* @__PURE__ */ jsxs("button", {
								onClick: () => handleSlideChange(catIndex, itemIndex),
								className: `w-full text-left group p-5 rounded-2xl transition-all relative border overflow-hidden ${activeFeatures[catIndex] === itemIndex ? "bg-secondary border-border shadow-sm" : "bg-transparent border-transparent hover:bg-secondary/40"}`,
								children: [activeFeatures[catIndex] === itemIndex && /* @__PURE__ */ jsx("div", {
									className: "absolute bottom-0 left-0 h-0.5 bg-primary/30 transition-all duration-75 ease-linear",
									style: { width: `${progresses[catIndex]}%` }
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ jsx("h4", {
											className: `font-semibold transition-colors ${activeFeatures[catIndex] === itemIndex ? "text-primary" : "text-foreground/70"}`,
											children: t(item.title)
										}), /* @__PURE__ */ jsx("p", {
											className: "text-sm text-muted-foreground line-clamp-1",
											children: t(item.description)
										})]
									}), /* @__PURE__ */ jsx(ChevronRight, { className: `w-5 h-5 transition-all ${activeFeatures[catIndex] === itemIndex ? "text-primary translate-x-1" : "text-muted-foreground/30"}` })]
								})]
							}, itemIndex))
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "w-full lg:w-7/12",
						children: /* @__PURE__ */ jsx(AnimatedFeature, {
							delay: .2,
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative aspect-[16/10] bg-secondary/20 rounded-3xl border border-border/50 p-6 sm:p-10 shadow-2xl backdrop-blur-sm group overflow-hidden",
								children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" }), /* @__PURE__ */ jsx("div", {
									className: "relative w-full h-full transform group-hover:scale-[1.02] transition-transform duration-700",
									children: /* @__PURE__ */ jsx(Image$1, {
										src: category.items[activeFeatures[catIndex]].image,
										alt: t(category.items[activeFeatures[catIndex]].title),
										fill: true,
										className: "object-contain",
										sizes: "(max-width: 1024px) 100vw, 40vw"
									})
								})]
							})
						}, `${catIndex}-${activeFeatures[catIndex]}`)
					})]
				}, catIndex))
			})]
		})
	});
}
//#endregion
//#region src/components/home/CTASection.tsx
function CTASection() {
	const t = useTranslations("home");
	return /* @__PURE__ */ jsxs("section", {
		className: "py-24 md:py-44 bg-secondary/30 relative overflow-hidden",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 translate-x-1/2" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10 -translate-x-1/2" }),
			/* @__PURE__ */ jsx("div", {
				className: "container mx-auto px-6 max-w-4xl relative text-center",
				children: /* @__PURE__ */ jsx(AnimatedFeature, { children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "p-3 rounded-2xl bg-primary/10 text-primary mb-8",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "w-8 h-8" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-4xl md:text-6xl font-serif font-semibold tracking-tight text-foreground/90 mb-8 leading-[1.15]",
							children: t("cta.title")
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xl md:text-2xl text-muted-foreground/80 mb-14 max-w-2xl font-light leading-relaxed",
							children: t("cta.description")
						}),
						/* @__PURE__ */ jsx(GoDashboard, { children: /* @__PURE__ */ jsxs(Button, {
							size: "lg",
							className: "rounded-2xl h-16 px-12 text-xl font-medium shadow-2xl shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all group",
							children: [t("cta.button"), /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 ml-3 group-hover:translate-x-1.5 transition-transform" })]
						}) })
					]
				}) })
			})
		]
	});
}
//#endregion
//#region src/components/home/FAQSection.tsx
function FAQSection() {
	const t = useTranslations("home.faq");
	const faqItems = t.raw("items");
	return /* @__PURE__ */ jsx("section", {
		className: "py-24 md:py-40 bg-background relative overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto px-6 max-w-3xl",
			children: [/* @__PURE__ */ jsx(AnimatedFeature, { children: /* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16 md:mb-20",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-4xl md:text-5xl font-serif font-semibold tracking-tight text-foreground/90",
					children: t("title")
				}), /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-primary/20 mx-auto rounded-full mt-6" })]
			}) }), /* @__PURE__ */ jsx(AnimatedFeature, {
				delay: .2,
				children: /* @__PURE__ */ jsx(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full space-y-4",
					children: faqItems.map((item, index) => /* @__PURE__ */ jsxs(AccordionItem, {
						value: `item-${index}`,
						className: "border border-border/50 rounded-2xl px-6 bg-secondary/20 hover:bg-secondary/40 transition-colors overflow-hidden",
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "text-left text-lg font-medium py-6 hover:no-underline",
							children: /* @__PURE__ */ jsx("span", {
								className: "pr-4",
								children: item.question
							})
						}), /* @__PURE__ */ jsx(AccordionContent, {
							className: "text-muted-foreground leading-relaxed text-base pb-6 font-light",
							children: item.answer
						})]
					}, index))
				})
			})]
		})
	});
}
//#endregion
//#region src/app/(public)/[locale]/page.tsx
function LandingPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative bg-gradient-to-b from-[#f8f9fb] to-white dark:from-gray-900 dark:to-gray-800",
		children: [
			/* @__PURE__ */ jsx(LandingHeader, {}),
			/* @__PURE__ */ jsx(HeroSection, {}),
			/* @__PURE__ */ jsx(FeaturesSection, {}),
			/* @__PURE__ */ jsx(FAQSection, {}),
			/* @__PURE__ */ jsx(CTASection, {})
		]
	});
}
//#endregion
//#region src/routes/$locale.tsx?tsr-split=component
function LocaleLandingPage() {
	const { locale } = Route.useParams();
	if (!locales.includes(locale)) notFound();
	return /* @__PURE__ */ jsx(LandingPage, {});
}
//#endregion
export { LocaleLandingPage as component };
