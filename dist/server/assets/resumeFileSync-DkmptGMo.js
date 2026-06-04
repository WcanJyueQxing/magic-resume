import { _ as verifyPermission, m as getFileHandle } from "./useResumeStore-46XKG7Po.js";
//#region src/utils/resumeFileSync.ts
var isResumeData = (value) => {
	if (!value || typeof value !== "object") return false;
	const resume = value;
	return typeof resume.id === "string" && resume.id.length > 0;
};
var syncResumesFromDirectory = async (updateResumeFromFile) => {
	const result = {
		synced: 0,
		skipped: 0,
		failed: 0
	};
	if (typeof window === "undefined" || typeof indexedDB === "undefined") return result;
	try {
		const handle = await getFileHandle("syncDirectory");
		if (!handle || handle.kind !== "directory") return result;
		if (!await verifyPermission(handle, "read")) return result;
		const entries = handle.values?.();
		if (!entries) return result;
		for await (const entry of entries) {
			if (entry.kind !== "file" || !entry.name.endsWith(".json")) {
				result.skipped += 1;
				continue;
			}
			try {
				const file = await entry.getFile();
				const content = await file.text();
				const resumeData = JSON.parse(content);
				if (!isResumeData(resumeData)) {
					result.skipped += 1;
					continue;
				}
				if (updateResumeFromFile(resumeData, file.lastModified)) result.synced += 1;
				else result.skipped += 1;
			} catch (error) {
				result.failed += 1;
				console.error(`Error reading resume file "${entry.name}":`, error);
			}
		}
	} catch (error) {
		console.error("Error syncing resumes from files:", error);
	}
	return result;
};
//#endregion
export { syncResumesFromDirectory as t };
