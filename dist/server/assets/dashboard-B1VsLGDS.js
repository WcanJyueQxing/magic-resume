import { n as DEFAULT_TEMPLATES, t as useResumeStore } from "./useResumeStore-46XKG7Po.js";
import { useCallback, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { BarChart3, Calendar, ChevronLeft, ChevronRight, FileText, Info, Layout, Users } from "lucide-react";
//#region src/components/dashboard/SimpleCalendar.tsx
var SOLAR_HOLIDAYS = {
	"01-01": {
		name: "元旦",
		emoji: "🎍"
	},
	"02-14": {
		name: "情人节",
		emoji: "💕"
	},
	"03-08": {
		name: "妇女节",
		emoji: "🌸"
	},
	"05-01": {
		name: "劳动节",
		emoji: "💪"
	},
	"05-04": {
		name: "青年节",
		emoji: "🌟"
	},
	"06-01": {
		name: "儿童节",
		emoji: "🎈"
	},
	"07-01": {
		name: "建党节",
		emoji: "🏛️"
	},
	"08-01": {
		name: "建军节",
		emoji: "⭐"
	},
	"09-10": {
		name: "教师节",
		emoji: "📚"
	},
	"10-01": {
		name: "国庆节",
		emoji: "🇨🇳"
	},
	"12-25": {
		name: "圣诞节",
		emoji: "🎄"
	}
};
var LUNAR_HOLIDAYS = {
	"2024-02-10": {
		name: "春节",
		emoji: "🧧"
	},
	"2024-02-24": {
		name: "元宵",
		emoji: "🏮"
	},
	"2024-04-04": {
		name: "清明",
		emoji: "🌿"
	},
	"2024-06-10": {
		name: "端午",
		emoji: "🐉"
	},
	"2024-08-10": {
		name: "七夕",
		emoji: "💫"
	},
	"2024-09-17": {
		name: "中秋",
		emoji: "🥮"
	},
	"2024-10-11": {
		name: "重阳",
		emoji: "🍂"
	},
	"2025-01-29": {
		name: "春节",
		emoji: "🧧"
	},
	"2025-02-12": {
		name: "元宵",
		emoji: "🏮"
	},
	"2025-04-04": {
		name: "清明",
		emoji: "🌿"
	},
	"2025-05-31": {
		name: "端午",
		emoji: "🐉"
	},
	"2025-08-29": {
		name: "七夕",
		emoji: "💫"
	},
	"2025-10-06": {
		name: "中秋",
		emoji: "🥮"
	},
	"2025-10-29": {
		name: "重阳",
		emoji: "🍂"
	},
	"2026-02-17": {
		name: "春节",
		emoji: "🧧"
	},
	"2026-03-03": {
		name: "元宵",
		emoji: "🏮"
	},
	"2026-04-05": {
		name: "清明",
		emoji: "🌿"
	},
	"2026-06-19": {
		name: "端午",
		emoji: "🐉"
	},
	"2026-08-19": {
		name: "七夕",
		emoji: "💫"
	},
	"2026-09-25": {
		name: "中秋",
		emoji: "🥮"
	},
	"2026-10-18": {
		name: "重阳",
		emoji: "🍂"
	},
	"2027-02-06": {
		name: "春节",
		emoji: "🧧"
	},
	"2027-02-20": {
		name: "元宵",
		emoji: "🏮"
	},
	"2027-04-05": {
		name: "清明",
		emoji: "🌿"
	},
	"2027-06-09": {
		name: "端午",
		emoji: "🐉"
	},
	"2027-08-08": {
		name: "七夕",
		emoji: "💫"
	},
	"2027-09-15": {
		name: "中秋",
		emoji: "🥮"
	},
	"2027-10-07": {
		name: "重阳",
		emoji: "🍂"
	}
};
var SOLAR_TERMS = {
	"02-04": {
		name: "立春",
		emoji: "🌱"
	},
	"03-21": {
		name: "春分",
		emoji: "🌸"
	},
	"05-06": {
		name: "立夏",
		emoji: "☀️"
	},
	"06-21": {
		name: "夏至",
		emoji: "🌞"
	},
	"08-07": {
		name: "立秋",
		emoji: "🍁"
	},
	"09-23": {
		name: "秋分",
		emoji: "🍂"
	},
	"11-07": {
		name: "立冬",
		emoji: "❄️"
	},
	"12-22": {
		name: "冬至",
		emoji: "🧣"
	}
};
var WEEKDAY_NAMES = [
	"日",
	"一",
	"二",
	"三",
	"四",
	"五",
	"六"
];
var ACTIVITY_COLORS = {
	light: [
		"",
		"bg-emerald-50 border-emerald-200",
		"bg-emerald-200 border-emerald-300",
		"bg-emerald-400 border-emerald-500 text-white",
		"bg-emerald-600 border-emerald-700 text-white"
	],
	dark: [
		"",
		"dark:bg-emerald-950 dark:border-emerald-800",
		"dark:bg-emerald-900 dark:border-emerald-700",
		"dark:bg-emerald-700 dark:border-emerald-600 dark:text-white",
		"dark:bg-emerald-600 dark:border-emerald-500 dark:text-white"
	]
};
function getHolidayInfo(dateStr) {
	const monthDay = dateStr.slice(5);
	if (LUNAR_HOLIDAYS[dateStr]) return LUNAR_HOLIDAYS[dateStr];
	if (SOLAR_HOLIDAYS[monthDay]) return SOLAR_HOLIDAYS[monthDay];
	if (SOLAR_TERMS[monthDay]) return SOLAR_TERMS[monthDay];
	return null;
}
function getActivityLevel(count) {
	if (count === 0) return 0;
	if (count <= 1) return 1;
	if (count <= 3) return 2;
	if (count <= 5) return 3;
	return 4;
}
function generateMonthData(year, month) {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const startDayOfWeek = firstDay.getDay();
	const daysInMonth = lastDay.getDate();
	const days = [];
	const prevMonthLastDay = new Date(year, month, 0).getDate();
	for (let i = startDayOfWeek - 1; i >= 0; i--) {
		const day = prevMonthLastDay - i;
		const date = new Date(year, month - 1, day);
		days.push({
			date,
			dateStr: formatDateStr(date),
			isCurrentMonth: false
		});
	}
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		days.push({
			date,
			dateStr: formatDateStr(date),
			isCurrentMonth: true
		});
	}
	const remaining = 42 - days.length;
	for (let day = 1; day <= remaining; day++) {
		const date = new Date(year, month + 1, day);
		days.push({
			date,
			dateStr: formatDateStr(date),
			isCurrentMonth: false
		});
	}
	return days;
}
function formatDateStr(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function isToday(dateStr) {
	return formatDateStr(/* @__PURE__ */ new Date()) === dateStr;
}
function SimpleCalendar({ data = {} }) {
	const today = /* @__PURE__ */ new Date();
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [selectedDate, setSelectedDate] = useState(null);
	const [showHolidayPanel, setShowHolidayPanel] = useState(false);
	const monthData = useMemo(() => generateMonthData(currentYear, currentMonth), [currentYear, currentMonth]);
	const goToPrevMonth = useCallback(() => {
		setCurrentMonth((prev) => {
			if (prev === 0) {
				setCurrentYear((y) => y - 1);
				return 11;
			}
			return prev - 1;
		});
		setSelectedDate(null);
	}, []);
	const goToNextMonth = useCallback(() => {
		setCurrentMonth((prev) => {
			if (prev === 11) {
				setCurrentYear((y) => y + 1);
				return 0;
			}
			return prev + 1;
		});
		setSelectedDate(null);
	}, []);
	const goToToday = useCallback(() => {
		setCurrentYear(today.getFullYear());
		setCurrentMonth(today.getMonth());
		setSelectedDate(formatDateStr(today));
	}, [today]);
	const monthStats = useMemo(() => {
		let activeDays = 0;
		let totalActivities = 0;
		const holidaysInMonth = [];
		monthData.forEach(({ dateStr, isCurrentMonth, date }) => {
			if (isCurrentMonth) {
				const count = data[dateStr] || 0;
				if (count > 0) {
					activeDays++;
					totalActivities += count;
				}
				const holiday = getHolidayInfo(dateStr);
				if (holiday) holidaysInMonth.push({
					date: `${date.getDate()}日`,
					...holiday
				});
			}
		});
		return {
			activeDays,
			totalActivities,
			holidaysInMonth
		};
	}, [monthData, data]);
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-white dark:bg-gray-800 rounded-xl font-sans",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold text-gray-900 dark:text-white",
						children: `${currentYear} 年 ${currentMonth + 1} 月`
					}), /* @__PURE__ */ jsx("button", {
						onClick: goToToday,
						className: "text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors",
						children: "今天"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setShowHolidayPanel(!showHolidayPanel),
							className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
							title: "查看当月节日",
							children: /* @__PURE__ */ jsx(Info, { className: "w-4 h-4 text-gray-500" })
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: goToPrevMonth,
							className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
							children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 text-gray-600 dark:text-gray-300" })
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: goToNextMonth,
							className: "p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
							children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-600 dark:text-gray-300" })
						})
					]
				})]
			}),
			showHolidayPanel && monthStats.holidaysInMonth.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border border-red-100 dark:border-red-900/50",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-2",
					children: monthStats.holidaysInMonth.map((h, i) => /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-xs shadow-sm",
						children: [/* @__PURE__ */ jsx("span", { children: h.emoji }), /* @__PURE__ */ jsxs("span", {
							className: "text-gray-700 dark:text-gray-300",
							children: [
								h.date,
								" ",
								h.name
							]
						})]
					}, i))
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-7 mb-1",
				children: WEEKDAY_NAMES.map((name, i) => /* @__PURE__ */ jsx("div", {
					className: `text-center text-xs font-medium py-2 ${i === 0 || i === 6 ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`,
					children: name
				}, name))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-7 gap-0.5",
				children: monthData.map(({ date, dateStr, isCurrentMonth }) => {
					const count = data[dateStr] || 0;
					const holiday = getHolidayInfo(dateStr);
					const todayFlag = isToday(dateStr);
					const isSelected = selectedDate === dateStr;
					const day = date.getDate();
					const dayOfWeek = date.getDay();
					const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
					const activityLevel = getActivityLevel(count);
					return /* @__PURE__ */ jsxs("button", {
						onClick: () => setSelectedDate(isSelected ? null : dateStr),
						className: `
                relative flex flex-col items-center justify-center p-1 min-h-[56px] rounded-lg transition-all border
                ${isCurrentMonth ? isWeekend ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white" : "text-gray-300 dark:text-gray-600"}
                ${todayFlag ? "ring-2 ring-blue-500 dark:ring-blue-400 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30" : isSelected ? "ring-2 ring-purple-500 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30" : holiday && isCurrentMonth ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20" : count > 0 && isCurrentMonth ? `${ACTIVITY_COLORS.light[activityLevel]} ${ACTIVITY_COLORS.dark[activityLevel]}` : "border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"}
              `,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: `text-sm font-medium ${todayFlag ? "text-blue-600 dark:text-blue-400 font-bold" : ""}`,
								children: day
							}),
							holiday && isCurrentMonth && /* @__PURE__ */ jsxs("span", {
								className: "text-[9px] leading-tight truncate max-w-full px-0.5 text-amber-700 dark:text-amber-400",
								title: `${holiday.emoji} ${holiday.name}`,
								children: [holiday.emoji, holiday.name]
							}),
							count > 0 && isCurrentMonth && !holiday && /* @__PURE__ */ jsxs("span", {
								className: `text-[10px] font-semibold ${activityLevel >= 3 ? "text-white/90" : "text-emerald-700 dark:text-emerald-300"}`,
								children: [count, "次"]
							})
						]
					}, dateStr);
				})
			}),
			selectedDate && /* @__PURE__ */ jsx("div", {
				className: "mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-sm font-medium text-gray-900 dark:text-white",
								children: selectedDate
							}),
							isToday(selectedDate) && /* @__PURE__ */ jsx("span", {
								className: "px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] rounded-full",
								children: "今天"
							}),
							getHolidayInfo(selectedDate) && /* @__PURE__ */ jsxs("span", {
								className: "px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] rounded-full",
								children: [
									getHolidayInfo(selectedDate).emoji,
									" ",
									getHolidayInfo(selectedDate).name
								]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-sm",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-gray-500",
							children: "简历操作："
						}), /* @__PURE__ */ jsxs("span", {
							className: `font-bold ml-1 ${(data[selectedDate] || 0) > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`,
							children: [data[selectedDate] || 0, " 次"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 pt-3 border-t border-gray-200 dark:border-gray-700",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-gray-500",
							children: ["活跃：", /* @__PURE__ */ jsxs("span", {
								className: "font-semibold text-gray-900 dark:text-white",
								children: [monthStats.activeDays, " 天"]
							})]
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-gray-500",
							children: ["操作：", /* @__PURE__ */ jsxs("span", {
								className: "font-semibold text-gray-900 dark:text-white",
								children: [monthStats.totalActivities, " 次"]
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-gray-400 mr-1",
								children: "少"
							}),
							[
								1,
								2,
								3,
								4
							].map((level) => /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-sm border ${ACTIVITY_COLORS.light[level].split(" ").slice(0, 2).join(" ")}` }, level)),
							/* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-gray-400 ml-1",
								children: "多"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/app/app/dashboard/dashboard/page.tsx
function DashboardPage() {
	const { resumes } = useResumeStore();
	const resumeList = useMemo(() => Object.values(resumes), [resumes]);
	const stats = useMemo(() => {
		const totalResumes = resumeList.length;
		const templateUsage = {};
		resumeList.forEach((resume) => {
			const templateId = resume.templateId || "";
			templateUsage[templateId] = (templateUsage[templateId] || 0) + 1;
		});
		const sortedTemplates = Object.entries(templateUsage).map(([id, count]) => {
			const template = DEFAULT_TEMPLATES.find((t) => t.id === id);
			return {
				id,
				name: template?.name || "未知模板",
				count,
				color: template?.colorScheme.primary || "#6B7280"
			};
		}).sort((a, b) => b.count - a.count);
		const maxTemplateCount = Math.max(...sortedTemplates.map((t) => t.count), 1);
		const activityMap = {};
		resumeList.forEach((resume) => {
			if (resume.createdAt) {
				const dateStr = resume.createdAt.split("T")[0];
				if (dateStr) activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
			}
			if (resume.updatedAt) {
				const dateStr = resume.updatedAt.split("T")[0];
				if (dateStr) activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
			}
			if (resume.activityDates) resume.activityDates.forEach((dateStr) => {
				activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
			});
		});
		const totalContributions = Object.values(activityMap).reduce((sum, count) => sum + count, 0);
		return {
			totalResumes,
			templateUsageCount: Object.keys(templateUsage).length,
			sortedTemplates,
			maxTemplateCount,
			activityMap,
			totalContributions
		};
	}, [resumeList]);
	return /* @__PURE__ */ jsxs("div", {
		className: "p-6 max-w-7xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-gray-900 dark:text-white",
					children: "简历统计"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-gray-500 mt-1",
					children: "查看简历生成的使用情况和统计数据"
				})] })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					{
						label: "总简历数",
						value: stats.totalResumes.toLocaleString(),
						icon: FileText,
						color: "bg-blue-500"
					},
					{
						label: "当前用户",
						value: "1",
						icon: Users,
						color: "bg-green-500"
					},
					{
						label: "模板使用",
						value: stats.templateUsageCount.toString(),
						icon: Layout,
						color: "bg-purple-500"
					},
					{
						label: "活动天数",
						value: Object.keys(stats.activityMap).length.toString(),
						icon: Calendar,
						color: "bg-orange-500"
					}
				].map((stat, index) => /* @__PURE__ */ jsx("div", {
					className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-gray-500 dark:text-gray-400",
								children: stat.label
							}), /* @__PURE__ */ jsx("p", {
								className: "text-2xl font-bold text-gray-900 dark:text-white mt-1",
								children: stat.value
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: stat.color + " p-3 rounded-xl",
							children: /* @__PURE__ */ jsx(stat.icon, { className: "w-5 h-5 text-white" })
						})]
					})
				}, index))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-gray-900 dark:text-white",
							children: "模板使用统计"
						}), /* @__PURE__ */ jsx(Layout, { className: "w-5 h-5 text-gray-400" })]
					}), stats.sortedTemplates.length > 0 ? stats.sortedTemplates.map((t, i) => /* @__PURE__ */ jsxs("div", {
						className: "mb-4 last:mb-0",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-sm mb-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium text-gray-900 dark:text-white",
								children: t.name
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-gray-500",
								children: [t.count, "次"]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full rounded-full",
								style: {
									width: t.count / stats.maxTemplateCount * 100 + "%",
									backgroundColor: t.color
								}
							})
						})]
					}, i)) : /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-center py-8",
						children: "暂无模板使用数据"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-gray-900 dark:text-white",
							children: "风格偏好统计"
						}), /* @__PURE__ */ jsx(BarChart3, { className: "w-5 h-5 text-gray-400" })]
					}), /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-gray-200 dark:border-gray-700",
							children: [/* @__PURE__ */ jsx("th", {
								className: "text-left pb-3 font-medium text-gray-500",
								children: "风格类型"
							}), /* @__PURE__ */ jsx("th", {
								className: "text-right pb-3 font-medium text-gray-500",
								children: "使用次数"
							})]
						}) }), /* @__PURE__ */ jsx("tbody", { children: stats.sortedTemplates.length > 0 ? stats.sortedTemplates.map((s, i) => /* @__PURE__ */ jsxs("tr", {
							className: "border-t border-gray-100 dark:border-gray-700",
							children: [/* @__PURE__ */ jsx("td", {
								className: "py-3 font-medium text-gray-900 dark:text-white",
								children: s.name
							}), /* @__PURE__ */ jsx("td", {
								className: "py-3 text-right text-gray-600 dark:text-gray-400",
								children: s.count
							})]
						}, i)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 2,
							className: "py-8 text-center text-gray-500",
							children: "暂无风格统计数据"
						}) }) })]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-semibold text-gray-900 dark:text-white",
						children: "简历活动日历"
					}), /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-gray-400" })]
				}), /* @__PURE__ */ jsx(SimpleCalendar, { data: stats.activityMap })]
			})
		]
	});
}
//#endregion
//#region src/routes/app/dashboard/dashboard.tsx?tsr-split=component
var SplitComponent = DashboardPage;
//#endregion
export { SplitComponent as component };
