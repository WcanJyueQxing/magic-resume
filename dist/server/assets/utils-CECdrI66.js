import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/i18n/compat/utils.ts
function getByPath(source, path) {
	if (!path) return source;
	if (source == null) return void 0;
	return path.split(".").reduce((acc, segment) => acc != null && typeof acc === "object" ? acc[segment] : void 0, source);
}
function interpolate(message, values) {
	if (!values) return message;
	return message.replace(/\{(\w+)\}/g, (_match, key) => {
		const value = values[key];
		return value == null ? `{${key}}` : String(value);
	});
}
function createTranslator(messages, namespace) {
	const scopedSource = (namespace ? getByPath(messages, namespace) : messages) ?? {};
	const translate = ((key, values) => {
		const value = getByPath(scopedSource, key);
		if (typeof value === "string") return interpolate(value, values);
		if (value == null) return key;
		return String(value);
	});
	translate.raw = (key) => getByPath(scopedSource, key);
	return translate;
}
//#endregion
//#region src/i18n/compat/client.tsx
var I18nContext = createContext(null);
function NextIntlClientProvider({ locale, messages, timeZone, children }) {
	const value = useMemo(() => ({
		locale,
		messages,
		timeZone
	}), [
		locale,
		messages,
		timeZone
	]);
	return /* @__PURE__ */ jsx(I18nContext.Provider, {
		value,
		children
	});
}
function useI18nContext() {
	const context = useContext(I18nContext);
	if (!context) throw new Error("I18n context is not available. Wrap with NextIntlClientProvider.");
	return context;
}
function useLocale() {
	return useI18nContext().locale;
}
function useTranslations(namespace) {
	const { messages } = useI18nContext();
	return useMemo(() => createTranslator(messages, namespace), [messages, namespace]);
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var DATE_RANGE_SEPARATOR = " - ";
function parseToDate(dateStr) {
	let year = null;
	let month = null;
	if (dateStr.match(/^\d{4}-\d{2}$/)) {
		const parts = dateStr.split("-");
		year = parseInt(parts[0], 10);
		month = parseInt(parts[1], 10);
	} else if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
		const parts = dateStr.split("-");
		year = parseInt(parts[0], 10);
		month = parseInt(parts[1], 10);
	} else if (dateStr.match(/^\d{4}\.\d{2}$/)) {
		const parts = dateStr.split(".");
		year = parseInt(parts[0], 10);
		month = parseInt(parts[1], 10);
	} else if (dateStr.match(/^\d{4}\/\d{2}$/)) {
		const parts = dateStr.split("/");
		year = parseInt(parts[0], 10);
		month = parseInt(parts[1], 10);
	}
	if (year !== null && month !== null) return new Date(Date.UTC(year, month - 1, 1));
	return null;
}
function formatDateString(dateStr, locale = "zh") {
	if (!dateStr) return "";
	if (dateStr.includes(DATE_RANGE_SEPARATOR)) {
		const [start, end] = dateStr.split(DATE_RANGE_SEPARATOR);
		return formatDateRange(start, end, locale);
	}
	const date = parseToDate(dateStr);
	if (!date) return dateStr;
	try {
		if (locale === "zh" || locale === "zh-CN") return `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
		return new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "2-digit",
			timeZone: "UTC"
		}).format(date);
	} catch (e) {
		return dateStr;
	}
}
function formatDateRange(startDate, endDate, locale = "zh") {
	return [formatDateString(startDate, locale).trim(), formatDateString(endDate, locale).trim()].filter(Boolean).join(DATE_RANGE_SEPARATOR);
}
//#endregion
export { useLocale as a, NextIntlClientProvider as i, formatDateRange as n, useTranslations as o, formatDateString as r, cn as t };
