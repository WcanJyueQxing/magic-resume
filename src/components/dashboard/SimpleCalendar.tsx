"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

interface SimpleCalendarProps {
  /** 活动数据：key 为 YYYY-MM-DD，value 为当日简历操作数 */
  data?: Record<string, number>;
}

// 中国节日（公历固定日期）
const SOLAR_HOLIDAYS: Record<string, { name: string; emoji: string }> = {
  "01-01": { name: "元旦", emoji: "🎍" },
  "02-14": { name: "情人节", emoji: "💕" },
  "03-08": { name: "妇女节", emoji: "🌸" },
  "05-01": { name: "劳动节", emoji: "💪" },
  "05-04": { name: "青年节", emoji: "🌟" },
  "06-01": { name: "儿童节", emoji: "🎈" },
  "07-01": { name: "建党节", emoji: "🏛️" },
  "08-01": { name: "建军节", emoji: "⭐" },
  "09-10": { name: "教师节", emoji: "📚" },
  "10-01": { name: "国庆节", emoji: "🇨🇳" },
  "12-25": { name: "圣诞节", emoji: "🎄" },
};

// 农历节日映射表（2024-2027年）
const LUNAR_HOLIDAYS: Record<string, { name: string; emoji: string }> = {
  // 2024 年
  "2024-02-10": { name: "春节", emoji: "🧧" },
  "2024-02-24": { name: "元宵", emoji: "🏮" },
  "2024-04-04": { name: "清明", emoji: "🌿" },
  "2024-06-10": { name: "端午", emoji: "🐉" },
  "2024-08-10": { name: "七夕", emoji: "💫" },
  "2024-09-17": { name: "中秋", emoji: "🥮" },
  "2024-10-11": { name: "重阳", emoji: "🍂" },
  // 2025 年
  "2025-01-29": { name: "春节", emoji: "🧧" },
  "2025-02-12": { name: "元宵", emoji: "🏮" },
  "2025-04-04": { name: "清明", emoji: "🌿" },
  "2025-05-31": { name: "端午", emoji: "🐉" },
  "2025-08-29": { name: "七夕", emoji: "💫" },
  "2025-10-06": { name: "中秋", emoji: "🥮" },
  "2025-10-29": { name: "重阳", emoji: "🍂" },
  // 2026 年
  "2026-02-17": { name: "春节", emoji: "🧧" },
  "2026-03-03": { name: "元宵", emoji: "🏮" },
  "2026-04-05": { name: "清明", emoji: "🌿" },
  "2026-06-19": { name: "端午", emoji: "🐉" },
  "2026-08-19": { name: "七夕", emoji: "💫" },
  "2026-09-25": { name: "中秋", emoji: "🥮" },
  "2026-10-18": { name: "重阳", emoji: "🍂" },
  // 2027 年
  "2027-02-06": { name: "春节", emoji: "🧧" },
  "2027-02-20": { name: "元宵", emoji: "🏮" },
  "2027-04-05": { name: "清明", emoji: "🌿" },
  "2027-06-09": { name: "端午", emoji: "🐉" },
  "2027-08-08": { name: "七夕", emoji: "💫" },
  "2027-09-15": { name: "中秋", emoji: "🥮" },
  "2027-10-07": { name: "重阳", emoji: "🍂" },
};

// 24 节气（主要节气）
const SOLAR_TERMS: Record<string, { name: string; emoji: string }> = {
  "02-04": { name: "立春", emoji: "🌱" },
  "03-21": { name: "春分", emoji: "🌸" },
  "05-06": { name: "立夏", emoji: "☀️" },
  "06-21": { name: "夏至", emoji: "🌞" },
  "08-07": { name: "立秋", emoji: "🍁" },
  "09-23": { name: "秋分", emoji: "🍂" },
  "11-07": { name: "立冬", emoji: "❄️" },
  "12-22": { name: "冬至", emoji: "🧣" },
};

const WEEKDAY_NAMES = ["日", "一", "二", "三", "四", "五", "六"];

// 活动等级配色（绿色系）
const ACTIVITY_COLORS = {
  light: [
    "", // 0 次
    "bg-emerald-50 border-emerald-200", // 1 次
    "bg-emerald-200 border-emerald-300", // 2-3 次
    "bg-emerald-400 border-emerald-500 text-white", // 4-5 次
    "bg-emerald-600 border-emerald-700 text-white", // 6+ 次
  ],
  dark: [
    "", // 0 次
    "dark:bg-emerald-950 dark:border-emerald-800", // 1 次
    "dark:bg-emerald-900 dark:border-emerald-700", // 2-3 次
    "dark:bg-emerald-700 dark:border-emerald-600 dark:text-white", // 4-5 次
    "dark:bg-emerald-600 dark:border-emerald-500 dark:text-white", // 6+ 次
  ],
};

// 获取某天的节日信息
function getHolidayInfo(
  dateStr: string,
): { name: string; emoji: string } | null {
  const monthDay = dateStr.slice(5); // MM-DD

  // 检查农历节日
  if (LUNAR_HOLIDAYS[dateStr]) {
    return LUNAR_HOLIDAYS[dateStr];
  }

  // 检查公历节日
  if (SOLAR_HOLIDAYS[monthDay]) {
    return SOLAR_HOLIDAYS[monthDay];
  }

  // 检查节气
  if (SOLAR_TERMS[monthDay]) {
    return SOLAR_TERMS[monthDay];
  }

  return null;
}

// 获取活动等级索引
function getActivityLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

// 生成月历数据
function generateMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay(); // 0=周日
  const daysInMonth = lastDay.getDate();

  const days: { date: Date; dateStr: string; isCurrentMonth: boolean }[] = [];

  // 填充上个月的日期
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(year, month - 1, day);
    days.push({
      date,
      dateStr: formatDateStr(date),
      isCurrentMonth: false,
    });
  }

  // 当月日期
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({
      date,
      dateStr: formatDateStr(date),
      isCurrentMonth: true,
    });
  }

  // 填充下个月的日期（补齐到 6 行 * 7 列 = 42 天）
  const remaining = 42 - days.length;
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(year, month + 1, day);
    days.push({
      date,
      dateStr: formatDateStr(date),
      isCurrentMonth: false,
    });
  }

  return days;
}

function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isToday(dateStr: string): boolean {
  return formatDateStr(new Date()) === dateStr;
}

export function SimpleCalendar({ data = {} }: SimpleCalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showHolidayPanel, setShowHolidayPanel] = useState(false);

  const monthData = useMemo(
    () => generateMonthData(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

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

  // 计算当月活动统计
  const monthStats = useMemo(() => {
    let activeDays = 0;
    let totalActivities = 0;
    const holidaysInMonth: { date: string; name: string; emoji: string }[] = [];

    monthData.forEach(({ dateStr, isCurrentMonth, date }) => {
      if (isCurrentMonth) {
        const count = data[dateStr] || 0;
        if (count > 0) {
          activeDays++;
          totalActivities += count;
        }

        // 收集当月节日
        const holiday = getHolidayInfo(dateStr);
        if (holiday) {
          holidaysInMonth.push({
            date: `${date.getDate()}日`,
            ...holiday,
          });
        }
      }
    });
    return { activeDays, totalActivities, holidaysInMonth };
  }, [monthData, data]);

  const monthName = `${currentYear} 年 ${currentMonth + 1} 月`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl font-sans">
      {/* 头部：月份导航 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthName}
          </h3>
          <button
            onClick={goToToday}
            className="text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            今天
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowHolidayPanel(!showHolidayPanel)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="查看当月节日"
          >
            <Info className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={goToPrevMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* 节日面板（可折叠） */}
      {showHolidayPanel && monthStats.holidaysInMonth.length > 0 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border border-red-100 dark:border-red-900/50">
          <div className="flex flex-wrap gap-2">
            {monthStats.holidaysInMonth.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-full text-xs shadow-sm"
              >
                <span>{h.emoji}</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {h.date} {h.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 星期标题 */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAY_NAMES.map((name, i) => (
          <div
            key={name}
            className={`text-center text-xs font-medium py-2 ${
              i === 0 || i === 6
                ? "text-red-500 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-0.5">
        {monthData.map(({ date, dateStr, isCurrentMonth }) => {
          const count = data[dateStr] || 0;
          const holiday = getHolidayInfo(dateStr);
          const todayFlag = isToday(dateStr);
          const isSelected = selectedDate === dateStr;
          const day = date.getDate();
          const dayOfWeek = date.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const activityLevel = getActivityLevel(count);

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(isSelected ? null : dateStr)}
              className={`
                relative flex flex-col items-center justify-center p-1 min-h-[56px] rounded-lg transition-all border
                ${
                  isCurrentMonth
                    ? isWeekend
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-900 dark:text-white"
                    : "text-gray-300 dark:text-gray-600"
                }
                ${
                  todayFlag
                    ? "ring-2 ring-blue-500 dark:ring-blue-400 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30"
                    : isSelected
                      ? "ring-2 ring-purple-500 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30"
                      : holiday && isCurrentMonth
                        ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20"
                        : count > 0 && isCurrentMonth
                          ? `${ACTIVITY_COLORS.light[activityLevel]} ${ACTIVITY_COLORS.dark[activityLevel]}`
                          : "border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }
              `}
            >
              {/* 日期数字 */}
              <span
                className={`text-sm font-medium ${
                  todayFlag
                    ? "text-blue-600 dark:text-blue-400 font-bold"
                    : ""
                }`}
              >
                {day}
              </span>

              {/* 节日标记 */}
              {holiday && isCurrentMonth && (
                <span
                  className="text-[9px] leading-tight truncate max-w-full px-0.5 text-amber-700 dark:text-amber-400"
                  title={`${holiday.emoji} ${holiday.name}`}
                >
                  {holiday.emoji}
                  {holiday.name}
                </span>
              )}

              {/* 活动数量指示器 */}
              {count > 0 && isCurrentMonth && !holiday && (
                <span
                  className={`text-[10px] font-semibold ${
                    activityLevel >= 3
                      ? "text-white/90"
                      : "text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  {count}次
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 底部：选中日期详情 */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {selectedDate}
              </span>
              {isToday(selectedDate) && (
                <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] rounded-full">
                  今天
                </span>
              )}
              {getHolidayInfo(selectedDate) && (
                <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] rounded-full">
                  {getHolidayInfo(selectedDate)!.emoji}{" "}
                  {getHolidayInfo(selectedDate)!.name}
                </span>
              )}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">简历操作：</span>
              <span
                className={`font-bold ml-1 ${
                  (data[selectedDate] || 0) > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-400"
                }`}
              >
                {data[selectedDate] || 0} 次
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 底部统计和图例 */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              活跃：
              <span className="font-semibold text-gray-900 dark:text-white">
                {monthStats.activeDays} 天
              </span>
            </span>
            <span className="text-gray-500">
              操作：
              <span className="font-semibold text-gray-900 dark:text-white">
                {monthStats.totalActivities} 次
              </span>
            </span>
          </div>

          {/* 图例 */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-400 mr-1">少</span>
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm border ${ACTIVITY_COLORS.light[level].split(" ").slice(0, 2).join(" ")}`}
              />
            ))}
            <span className="text-[10px] text-gray-400 ml-1">多</span>
          </div>
        </div>
      </div>
    </div>
  );
}
