"use client";

import { useState, useMemo } from "react";

export interface DayData {
  dateStr: string; // YYYY-MM-DD
  date: Date;
  count: number;
  level: number;
}

interface HeatmapCalendarProps {
  /** 真实活动数据：key 为 YYYY-MM-DD，value 为当日贡献数 */
  data?: Record<string, number>;
  /** 当无 data 时，用于随机生成的总贡献数（兼容旧接口） */
  totalContributions?: number;
  year?: number;
}

const COLORS = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
] as const;

const DARK_COLORS = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
] as const;

const WEEKDAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

function formatDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 生成过去一年的日期数据
 * @param activityData 真实活动数据 map
 * @param totalContributions 兼容旧接口：当无 activityData 时随机生成
 */
function generateYearData(
  activityData?: Record<string, number>,
  totalContributions?: number,
): DayData[] {
  const data: DayData[] = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // 从 52 周前的周日开始（与 GitHub 对齐）
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);
  // 回退到该周的周日
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // 随机数据 fallback
  const contributionDays = new Map<number, number>();
  if (!activityData && totalContributions && totalContributions > 0) {
    let remaining = totalContributions;
    while (remaining > 0) {
      const dayOffset = Math.floor(Math.random() * 365);
      const current = contributionDays.get(dayOffset) || 0;
      if (current < 5) {
        const add = Math.min(Math.floor(Math.random() * 3) + 1, remaining);
        contributionDays.set(dayOffset, current + add);
        remaining -= add;
      }
    }
  }

  const current = new Date(startDate);
  let dayOffset = 0;

  while (current <= today) {
    const dateStr = formatDateStr(current);
    let count: number;

    if (activityData) {
      count = activityData[dateStr] || 0;
    } else {
      count = contributionDays.get(dayOffset) || 0;
    }

    data.push({
      dateStr,
      date: new Date(current),
      count,
      level: getLevel(count),
    });

    current.setDate(current.getDate() + 1);
    dayOffset++;
  }

  return data;
}

/**
 * 根据每周第一天的月份生成月份标签
 */
function getMonthLabels(data: DayData[]): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  for (let i = 0; i < data.length; i += 7) {
    const month = data[i]?.date.getMonth();
    const weekIndex = Math.floor(i / 7);
    if (month !== lastMonth && month !== undefined) {
      labels.push({ label: MONTHS[month], weekIndex });
      lastMonth = month;
    }
  }

  return labels;
}

export function HeatmapCalendar({
  data: activityData,
  totalContributions = 122,
  year = new Date().getFullYear(),
}: HeatmapCalendarProps): React.ReactElement {
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dayData = useMemo(
    () => generateYearData(activityData, activityData ? undefined : totalContributions),
    [activityData, totalContributions],
  );

  const total = dayData.reduce((sum, d) => sum + d.count, 0);
  const monthLabels = useMemo(() => getMonthLabels(dayData), [dayData]);

  // 将数据按周分组（每列 7 天）
  const weeks: DayData[][] = useMemo(() => {
    const result: DayData[][] = [];
    for (let i = 0; i < dayData.length; i += 7) {
      result.push(dayData.slice(i, i + 7));
    }
    return result;
  }, [dayData]);

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const day = dayData[index];
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      date: formatDateDisplay(day.date),
      count: day.count,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setHoveredIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl font-sans">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            {total}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            contributions in the last year
          </span>
        </div>
        <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {year}
        </span>
      </div>

      {/* 日历主体 */}
      <div className="flex gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto">
        {/* 星期标签 */}
        <div className="flex flex-col gap-[3px] pt-5 shrink-0">
          {WEEKDAYS.map((day, i) => (
            <div
              key={i}
              className="text-[11px] text-gray-500 dark:text-gray-400 leading-3 h-3 min-w-8 text-right pr-1.5"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 网格区域 */}
        <div className="flex flex-col min-w-0">
          {/* 月份标签 */}
          <div
            className="grid gap-[3px] mb-[3px]"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, 14px)` }}
          >
            {monthLabels.map((item, i) => (
              <div
                key={i}
                className="text-[11px] text-gray-500 dark:text-gray-400 text-left"
                style={{
                  gridColumn: `${item.weekIndex + 1} / span ${
                    i < monthLabels.length - 1
                      ? monthLabels[i + 1].weekIndex - item.weekIndex
                      : weeks.length - item.weekIndex
                  }`,
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* 日期方块 */}
          <div className="flex flex-col gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex gap-[3px]">
                {week.map((day, dayIndex) => {
                  const index = weekIndex * 7 + dayIndex;
                  const isHovered = hoveredIndex === index;
                  return (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-[3px] cursor-pointer transition-transform duration-150 ease-in-out dark:ring-1 dark:ring-gray-700/50"
                      style={{
                        backgroundColor:
                          typeof document !== "undefined" &&
                          document.documentElement.classList.contains("dark")
                            ? DARK_COLORS[day.level]
                            : COLORS[day.level],
                        transform: isHovered ? "scale(1.3)" : "scale(1)",
                        boxShadow: isHovered
                          ? "0 0 8px rgba(0, 0, 0, 0.2)"
                          : "none",
                        zIndex: isHovered ? 10 : 1,
                      }}
                      onMouseEnter={(e) => handleMouseEnter(index, e)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部图例 */}
      <div className="flex items-center justify-end gap-1.5 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          Less
        </span>
        <div className="flex gap-[3px]">
          {COLORS.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-[3px] dark:hidden"
              style={{ backgroundColor: color }}
            />
          ))}
          {DARK_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-[3px] hidden dark:block"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          More
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed bg-gray-900 dark:bg-gray-700 text-white px-3 py-2 rounded-lg text-xs pointer-events-none z-[1000] shadow-lg -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="mb-1">{tooltip.date}</div>
          <div className="text-green-400">
            {tooltip.count}{" "}
            {tooltip.count === 1 ? "contribution" : "contributions"}
          </div>
        </div>
      )}
    </div>
  );
}
