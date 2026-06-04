"use client";

import { useState, useMemo } from "react";
import { FileText, Users, Layout, Sparkles, BarChart3, Calendar } from "lucide-react";
import { SimpleCalendar } from "@/components/dashboard/SimpleCalendar";
import { useResumeStore } from "@/store/useResumeStore";
import { DEFAULT_TEMPLATES } from "@/config";

export default function DashboardPage() {
  const { resumes } = useResumeStore();

  const resumeList = useMemo(() => Object.values(resumes), [resumes]);

  const stats = useMemo(() => {
    const totalResumes = resumeList.length;
    const templateUsage: Record<string, number> = {};

    resumeList.forEach((resume) => {
      const templateId = resume.templateId || "";
      templateUsage[templateId] = (templateUsage[templateId] || 0) + 1;
    });

    const sortedTemplates = Object.entries(templateUsage)
      .map(([id, count]) => {
        const template = DEFAULT_TEMPLATES.find((t) => t.id === id);
        return {
          id,
          name: template?.name || "未知模板",
          count,
          color: template?.colorScheme.primary || "#6B7280",
        };
      })
      .sort((a, b) => b.count - a.count);

    const maxTemplateCount = Math.max(...sortedTemplates.map((t) => t.count), 1);

    // 从所有简历的 activityDates、createdAt、updatedAt 构建活动数据
    const activityMap: Record<string, number> = {};
    resumeList.forEach((resume) => {
      // 追加创建日期
      if (resume.createdAt) {
        const dateStr = resume.createdAt.split("T")[0];
        if (dateStr) {
          activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
        }
      }
      // 追加更新日期
      if (resume.updatedAt) {
        const dateStr = resume.updatedAt.split("T")[0];
        if (dateStr) {
          activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
        }
      }
      // 追加活动日期记录
      if (resume.activityDates) {
        resume.activityDates.forEach((dateStr) => {
          activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
        });
      }
    });

    const totalContributions = Object.values(activityMap).reduce(
      (sum, count) => sum + count,
      0,
    );

    return {
      totalResumes,
      templateUsageCount: Object.keys(templateUsage).length,
      sortedTemplates,
      maxTemplateCount,
      activityMap,
      totalContributions,
    };
  }, [resumeList]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            简历统计
          </h1>
          <p className="text-gray-500 mt-1">
            查看简历生成的使用情况和统计数据
          </p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "总简历数",
            value: stats.totalResumes.toLocaleString(),
            icon: FileText,
            color: "bg-blue-500",
          },
          {
            label: "当前用户",
            value: "1",
            icon: Users,
            color: "bg-green-500",
          },
          {
            label: "模板使用",
            value: stats.templateUsageCount.toString(),
            icon: Layout,
            color: "bg-purple-500",
          },
          {
            label: "活动天数",
            value: Object.keys(stats.activityMap).length.toString(),
            icon: Calendar,
            color: "bg-orange-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={stat.color + " p-3 rounded-xl"}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 模板使用统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              模板使用统计
            </h2>
            <Layout className="w-5 h-5 text-gray-400" />
          </div>
          {stats.sortedTemplates.length > 0 ? (
            stats.sortedTemplates.map((t, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {t.name}
                  </span>
                  <span className="text-gray-500">{t.count}次</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: (t.count / stats.maxTemplateCount) * 100 + "%",
                      backgroundColor: t.color,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">暂无模板使用数据</p>
          )}
        </div>

        {/* 风格偏好统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              风格偏好统计
            </h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left pb-3 font-medium text-gray-500">
                  风格类型
                </th>
                <th className="text-right pb-3 font-medium text-gray-500">
                  使用次数
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.sortedTemplates.length > 0 ? (
                stats.sortedTemplates.map((s, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {s.name}
                    </td>
                    <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                      {s.count}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-8 text-center text-gray-500">
                    暂无风格统计数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 简历活动日历 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            简历活动日历
          </h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <SimpleCalendar data={stats.activityMap} />
      </div>
    </div>
  );
}
