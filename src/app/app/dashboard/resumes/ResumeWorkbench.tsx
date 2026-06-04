import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "@/i18n/compat/client";
import { useRouter } from "@/lib/navigation";
import { Plus, Settings, AlertCircle, FileText, Scan, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getConfig, getFileHandle } from "@/utils/fileSystem";
import { parseResumeFromText } from "@/utils/pdfResumeParser";
import { useResumeStore } from "@/store/useResumeStore";
import { DEFAULT_TEMPLATES } from "@/config";
import { CreateResumeModal } from "./CreateResumeModal";
import { ImportResumeDialog } from "./ImportResumeDialog";
import { ImportResultDialog } from "./ImportResultDialog";
import { ResumeCardItem } from "./ResumeCardItem";
import { AnimatedImportButton } from "./AnimatedImportButton";

export const ResumeWorkbench = () => {
    const t = useTranslations();
    const locale = useLocale();
    const {
        resumes,
        setActiveResume,
        addResume,
        deleteResume,
        createResume,
    } = useResumeStore();
    const router = useRouter();
    const [hasConfiguredFolder, setHasConfiguredFolder] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importProgress, setImportProgress] = useState(0);
    const [importStatus, setImportStatus] = useState("");
    const [isUsingOCR, setIsUsingOCR] = useState(false);
    const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
    const [importSuccess, setImportSuccess] = useState(false);
    const [importMessage, setImportMessage] = useState("");
    const [importedResumeId, setImportedResumeId] = useState<string | undefined>(undefined);
    const [importedFileName, setImportedFileName] = useState<string | undefined>(undefined);
    const [importedFormat, setImportedFormat] = useState<string | undefined>(undefined);
    const jsonFileInputRef = useRef<HTMLInputElement>(null);
    const pdfFileInputRef = useRef<HTMLInputElement>(null);
    const wordFileInputRef = useRef<HTMLInputElement>(null);
    const markdownFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadSavedConfig = async () => {
            try {
                const handle = await getFileHandle("syncDirectory");
                const path = await getConfig("syncDirectoryPath");
                if (handle && path) {
                    setHasConfiguredFolder(true);
                }
            } catch (error) {
                console.error("Error loading saved config:", error);
            }
        };

        loadSavedConfig();
    }, []);

    const handleCreateFromModal = (templateId: string | null) => {
        const isBlank = !templateId;
        const newId = createResume(templateId, isBlank);

        if (templateId) {
            const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
            if (template) {
                const { resumes, updateResume } = useResumeStore.getState();
                const resume = resumes[newId];
                if (resume) {
                    updateResume(newId, {
                        globalSettings: {
                            ...resume.globalSettings,
                            themeColor: template.colorScheme.primary,
                            sectionSpacing: template.spacing.sectionGap,
                            paragraphSpacing: template.spacing.itemGap,
                            pagePadding: template.spacing.contentPadding,
                        },
                        basic: {
                            ...resume.basic,
                            layout: template.basic.layout,
                        },
                    });
                }
            }
        }

        setIsCreateModalOpen(false);
        setActiveResume(newId);
        router.push(`/app/workbench/${newId}`);
    };

    const duplicateResume = async (resume: any) => {
        const { generateUUID } = await import("@/utils/uuid");
        const now = new Date().toISOString();

        const { id, ...rest } = resume;
        const newResume = {
            ...rest,
            id: generateUUID(),
            title: `${resume.title || t("dashboard.resumes.untitled")} - ${t("common.copy")}`,
            createdAt: now,
            updatedAt: now,
        };

        const resumeId = addResume(newResume);
        toast.success(t("previewDock.copyResume.success"));
    };

    const convertTemplateJsonToResumeData = (config: any, initialState: any) => {
        if (config.personalInfo || config.skills || config.selfEvaluation) {
            const converted: any = { ...initialState };
            
            if (config.personalInfo) {
                converted.basic = {
                    ...initialState.basic,
                    name: config.personalInfo.name || "",
                    title: config.personalInfo.jobIntent || config.personalInfo.title || "",
                    phone: config.personalInfo.phone || "",
                    email: config.personalInfo.email || "",
                    location: config.personalInfo.location || "",
                };
            }
            
            if (config.education) {
                converted.education = config.education.map((edu: any) => ({
                    id: edu.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    school: edu.school || "",
                    major: edu.major || "",
                    degree: edu.degree || "",
                    startDate: edu.startTime || edu.startDate || "",
                    endDate: edu.endTime || edu.endDate || "",
                    visible: true,
                    gpa: "",
                    description: edu.description ? `<p>${edu.description}</p>` : "",
                }));
            }
            
            if (config.skills) {
                const skillList: string[] = [];
                if (Array.isArray(config.skills)) {
                    skillList.push(...config.skills);
                } else if (typeof config.skills === "object") {
                    Object.entries(config.skills).forEach(([category, skills]) => {
                        if (Array.isArray(skills)) {
                            skillList.push(`${category}: ${skills.join(", ")}`);
                        }
                    });
                }
                converted.skillContent = `<div class="skill-content"><ul><li>${skillList.join("</li><li>")}</li></ul></div>`;
            }
            
            if (config.selfEvaluation) {
                converted.selfEvaluationContent = `<p>${config.selfEvaluation}</p>`;
            }
            
            if (config.projects) {
                converted.projects = config.projects.map((proj: any) => ({
                    id: proj.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    name: proj.name || "",
                    role: proj.role || proj.position || "",
                    date: proj.time || proj.date || "",
                    description: Array.isArray(proj.description) 
                        ? `<ul><li>${proj.description.join("</li><li>")}</li></ul>`
                        : `<p>${proj.description || proj.techStack || ""}</p>`,
                    visible: true,
                }));
            }
            
            if (config.experience) {
                converted.experience = config.experience.map((exp: any) => ({
                    id: exp.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    company: exp.company || "",
                    position: exp.position || "",
                    date: exp.time || exp.date || "",
                    visible: true,
                    details: Array.isArray(exp.description)
                        ? `<ul><li>${exp.description.join("</li><li>")}</li></ul>`
                        : `<p>${exp.description || ""}</p>`,
                }));
            }
            
            const menuSections = [{
                id: "basic",
                title: "基本信息",
                icon: "👤",
                enabled: true,
                order: 0,
            }];
            if (converted.skillContent) menuSections.push({ id: "skills", title: "专业技能", icon: "⚡", enabled: true, order: 1 });
            if (converted.experience && converted.experience.length > 0) menuSections.push({ id: "experience", title: "工作经验", icon: "💼", enabled: true, order: 2 });
            if (converted.projects && converted.projects.length > 0) menuSections.push({ id: "projects", title: "项目经历", icon: "🚀", enabled: true, order: 3 });
            if (converted.education && converted.education.length > 0) menuSections.push({ id: "education", title: "教育经历", icon: "🎓", enabled: true, order: 4 });
            converted.menuSections = menuSections;
            
            return converted;
        }
        return null;
    };

    const importResumeFromJson = async (file: File) => {
        try {
            const content = await file.text();
            const config = JSON.parse(content);
            const now = new Date().toISOString();
            const { generateUUID } = await import("@/utils/uuid");
            const { initialResumeState } = await import("@/config/initialResumeData");

            const convertedConfig = convertTemplateJsonToResumeData(config, initialResumeState);
            
            let newResume;
            if (convertedConfig) {
                newResume = {
                    ...initialResumeState,
                    ...convertedConfig,
                    id: generateUUID(),
                    createdAt: now,
                    updatedAt: now,
                };
            } else {
                newResume = {
                    ...config,
                    id: generateUUID(),
                    createdAt: now,
                    updatedAt: now,
                };
            }
            
            const resumeId = addResume(newResume);
            setActiveResume(resumeId);
            setIsImportDialogOpen(false);
            setImportedResumeId(resumeId);
            setImportedFileName(file.name);
            setImportedFormat("json");
            setImportSuccess(true);
            setImportMessage(t("dashboard.resumes.importSuccess") || "JSON 导入成功");
            setIsResultDialogOpen(true);
        } catch (error) {
            console.error("Import JSON error:", error);
            const message = error instanceof Error ? error.message : "JSON 导入失败";
            setImportedFileName(file.name);
            setImportedFormat("json");
            setImportSuccess(false);
            setImportMessage(message);
            setIsResultDialogOpen(true);
        }
    };

    const importResumeFromPdf = async (file: File) => {
        setImportStatus("正在解析 PDF 文档...");
        setImportProgress(10);

        try {
            let fullText = "";
            let images: string[] = [];

            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "pdf");

            setImportProgress(20);
            const response = await fetch("/api/document-parse", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "PDF 解析失败");
            }

            const result = await response.json();
            setImportProgress(60);

            fullText = result.text || "";

            setImportProgress(70);

            setImportStatus("智能解析简历内容...");

            const now = new Date().toISOString();
            const { generateUUID } = await import("@/utils/uuid");
            const { blankResumeState } = await import("@/config/initialResumeData");

            const nameWithoutExt = file.name.replace(/\.[^.]+$/, "").trim();

            // 使用解析器（传入文本和图片）
            const parsedData = parseResumeFromText(fullText, images);

            // 构建技能内容
            let skillContent = "";
            if (parsedData.skills.length > 0) {
                skillContent = `<div class="skill-content"><ul><li>${parsedData.skills.join("</li><li>")}</li></ul></div>`;
            }

            const newResume = {
                ...blankResumeState,
                id: generateUUID(),
                title: nameWithoutExt || t("dashboard.resumes.untitled"),
                createdAt: now,
                updatedAt: now,
                summary: {
                    ...blankResumeState.summary,
                    content: parsedData.fullText,
                },
                basic: {
                    ...blankResumeState.basic,
                    name: parsedData.name || "",
                    phone: parsedData.phone || "",
                    email: parsedData.email || "",
                    location: parsedData.location || "",
                    title: parsedData.title || "",
                    photo: parsedData.photo || "",
                },
                education: parsedData.education,
                experience: parsedData.experience,
                projects: parsedData.projects,
                skillContent: skillContent,
                selfEvaluationContent: parsedData.summary,
            };

            // 根据实际内容调整菜单显示
            const menuSections = [{
                id: "basic",
                title: "基本信息",
                icon: "👤",
                enabled: true,
                order: 0,
            }];

            if (parsedData.skills.length > 0) {
                menuSections.push({
                    id: "skills",
                    title: "专业技能",
                    icon: "⚡",
                    enabled: true,
                    order: 1,
                });
            }

            if (parsedData.experience.length > 0) {
                menuSections.push({
                    id: "experience",
                    title: "工作经验",
                    icon: "💼",
                    enabled: true,
                    order: 2,
                });
            }

            if (parsedData.projects.length > 0) {
                menuSections.push({
                    id: "projects",
                    title: "项目经历",
                    icon: "🚀",
                    enabled: true,
                    order: 3,
                });
            }

            if (parsedData.education.length > 0) {
                menuSections.push({
                    id: "education",
                    title: "教育经历",
                    icon: "🎓",
                    enabled: true,
                    order: 4,
                });
            }

            newResume.menuSections = menuSections;

            setImportProgress(100);
            setImportStatus("创建简历...");

            const resumeId = addResume(newResume);
            setActiveResume(resumeId);
            setIsImportDialogOpen(false);
            setImportedResumeId(resumeId);
            setImportedFileName(file.name);
            setImportedFormat("pdf");
            setImportSuccess(true);
            setImportMessage(t("dashboard.resumes.importSuccess") || "PDF 导入成功");
            setIsResultDialogOpen(true);

            setTimeout(() => {
                setImportProgress(0);
                setImportStatus("");
                setIsUsingOCR(false);
            }, 1000);
        } catch (error) {
            console.error("Import PDF error:", error);
            const message = error instanceof Error ? error.message : "PDF 导入失败";
            setImportedFileName(file.name);
            setImportedFormat("pdf");
            setImportSuccess(false);
            setImportMessage(message);
            setIsResultDialogOpen(true);
        }
    };

    const importResumeFromText = async (file: File, fileType: "word" | "markdown") => {
        setImportStatus(fileType === "word" ? "正在解析 Word 文档..." : "正在解析 Markdown...");
        setImportProgress(10);

        try {
            let fullText = "";

            if (fileType === "word") {
                setImportProgress(20);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("type", "word");

                const response = await fetch("/api/document-parse", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Word 解析失败");
                }

                const result = await response.json();
                setImportProgress(60);
                fullText = result.text || "";
            } else {
                setImportProgress(30);
                fullText = await file.text();
                setImportProgress(60);
            }

            if (!fullText.trim()) {
                throw new Error("未能提取任何内容");
            }

            setImportProgress(70);
            setImportStatus("智能解析简历内容...");

            const now = new Date().toISOString();
            const { generateUUID } = await import("@/utils/uuid");
            const { blankResumeState } = await import("@/config/initialResumeData");

            const nameWithoutExt = file.name.replace(/\.[^.]+$/, "").trim();

            const parsedData = parseResumeFromText(fullText, []);

            let skillContent = "";
            if (parsedData.skills.length > 0) {
                skillContent = `<div class="skill-content"><ul><li>${parsedData.skills.join("</li><li>")}</li></ul></div>`;
            }

            const newResume = {
                ...blankResumeState,
                id: generateUUID(),
                title: nameWithoutExt || t("dashboard.resumes.untitled"),
                createdAt: now,
                updatedAt: now,
                summary: {
                    ...blankResumeState.summary,
                    content: parsedData.fullText,
                },
                basic: {
                    ...blankResumeState.basic,
                    name: parsedData.name || "",
                    phone: parsedData.phone || "",
                    email: parsedData.email || "",
                    location: parsedData.location || "",
                    title: parsedData.title || "",
                    photo: parsedData.photo || "",
                },
                education: parsedData.education,
                experience: parsedData.experience,
                projects: parsedData.projects,
                skillContent: skillContent,
                selfEvaluationContent: parsedData.summary,
            };

            const menuSections = [{
                id: "basic",
                title: "基本信息",
                icon: "👤",
                enabled: true,
                order: 0,
            }];

            if (parsedData.skills.length > 0) {
                menuSections.push({ id: "skills", title: "专业技能", icon: "⚡", enabled: true, order: 1 });
            }
            if (parsedData.experience.length > 0) {
                menuSections.push({ id: "experience", title: "工作经验", icon: "💼", enabled: true, order: 2 });
            }
            if (parsedData.projects.length > 0) {
                menuSections.push({ id: "projects", title: "项目经历", icon: "🚀", enabled: true, order: 3 });
            }
            if (parsedData.education.length > 0) {
                menuSections.push({ id: "education", title: "教育经历", icon: "🎓", enabled: true, order: 4 });
            }

            newResume.menuSections = menuSections;

            setImportProgress(100);
            setImportStatus("创建简历...");

            const resumeId = addResume(newResume);
            setActiveResume(resumeId);
            setIsImportDialogOpen(false);
            setImportedResumeId(resumeId);
            setImportedFileName(file.name);
            setImportedFormat(fileType);
            setImportSuccess(true);
            setImportMessage(t("dashboard.resumes.importSuccess") || (fileType === "word" ? "Word 导入成功" : "Markdown 导入成功"));
            setIsResultDialogOpen(true);

            setTimeout(() => {
                setImportProgress(0);
                setImportStatus("");
            }, 1000);
        } catch (error) {
            console.error(`Import ${fileType} error:`, error);
            const message = error instanceof Error ? error.message : `${fileType === "word" ? "Word" : "Markdown"} 导入失败`;
            setImportedFileName(file.name);
            setImportedFormat(fileType);
            setImportSuccess(false);
            setImportMessage(message);
            setIsResultDialogOpen(true);
        }
    };

    const handleWordFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file || isImporting) return;

        try {
            setIsImporting(true);
            await importResumeFromText(file, "word");
        } catch (error) {
            console.error("Import Word error:", error);
            const message = error instanceof Error && error.message ? error.message : "Word 导入失败";
            setImportedFileName(file.name);
            setImportedFormat("word");
            setImportSuccess(false);
            setImportMessage(message);
            setIsResultDialogOpen(true);
        } finally {
            setIsImporting(false);
        }
    };

    const handleMarkdownFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file || isImporting) return;

        try {
            setIsImporting(true);
            await importResumeFromText(file, "markdown");
        } catch (error) {
            console.error("Import Markdown error:", error);
            const message = error instanceof Error && error.message ? error.message : "Markdown 导入失败";
            setImportedFileName(file.name);
            setImportedFormat("markdown");
            setImportSuccess(false);
            setImportMessage(message);
            setIsResultDialogOpen(true);
        } finally {
            setIsImporting(false);
        }
    };

    const handleJsonFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file || isImporting) return;

        try {
            setIsImporting(true);
            await importResumeFromJson(file);
        } finally {
            setIsImporting(false);
        }
    };

    const handlePdfFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file || isImporting) return;

        try {
            setIsImporting(true);
            await importResumeFromPdf(file);
        } finally {
            setIsImporting(false);
        }
    };

    const handlePdfFileChangeWithMethod = async (file: File) => {
        if (isImporting) return;

        try {
            setIsImporting(true);
            await importResumeFromPdf(file);
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <ScrollArea className="h-[calc(100vh-2rem)] w-full">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 space-y-6 py-8"
            >
                <motion.div
                    className="flex w-full items-center justify-center px-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {hasConfiguredFolder ? (
                        <Alert className="mb-6 bg-green-50/50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
                            <AlertDescription className="flex items-center justify-between">
                                <span className="text-green-700 dark:text-green-400">
                                    {t("dashboard.resumes.synced")}
                                </span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="ml-4 hover:bg-green-100 dark:hover:bg-green-900"
                                    onClick={() => {
                                        router.push("/app/dashboard/settings");
                                    }}
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    {t("dashboard.resumes.view")}
                                </Button>
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert
                            variant="destructive"
                            className="mb-6 bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                        >
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t("dashboard.resumes.notice.title")}</AlertTitle>
                            <AlertDescription className="flex items-center justify-between">
                                <span className="text-red-700 dark:text-red-400">
                                    {t("dashboard.resumes.notice.description")}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-4 hover:bg-red-100 dark:hover:bg-red-900"
                                    onClick={() => {
                                        router.push("/app/dashboard/settings");
                                    }}
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    {t("dashboard.resumes.notice.goToSettings")}
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}
                </motion.div>

                <motion.div
                    className="px-4 sm:px-6 flex items-center justify-between"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {t("dashboard.resumes.myResume")}
                    </h1>
                    <div className="flex items-center space-x-2">
                        <AnimatedImportButton onClick={() => setIsImportDialogOpen(true)} t={t} />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                variant="default"
                                className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {t("dashboard.resumes.create")}
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex-1 w-full p-3 sm:p-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Card
                                className={cn(
                                    "relative border border-dashed cursor-pointer transition-all duration-200 aspect-[210/297] flex flex-col",
                                    "hover:border-gray-400 hover:bg-gray-50",
                                    "dark:hover:border-primary dark:hover:bg-primary/10"
                                )}
                            >
                                <CardContent className="flex-1 p-0 text-center flex flex-col items-center justify-center">
                                    <motion.div
                                        className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-primary/10"
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Plus className="h-8 w-8 text-gray-600 dark:text-primary" />
                                    </motion.div>
                                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100 px-4">
                                        {t("dashboard.resumes.newResume")}
                                    </CardTitle>
                                    <CardDescription className="mt-2 text-gray-600 dark:text-gray-400 px-4">
                                        {t("dashboard.resumes.newResumeDescription")}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <AnimatePresence>
                            {Object.entries(resumes)
                                .sort(([, a], [, b]) => {
                                    const dateA = new Date(a.createdAt || 0).getTime();
                                    const dateB = new Date(b.createdAt || 0).getTime();
                                    return dateB - dateA;
                                })
                                .map(([id, resume], index) => (
                                    <ResumeCardItem
                                        key={id}
                                        id={id}
                                        resume={resume}
                                        t={t}
                                        locale={locale}
                                        setActiveResume={setActiveResume}
                                        router={router}
                                        deleteResume={deleteResume}
                                        duplicateResume={duplicateResume}
                                        index={index}
                                    />
                                ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <CreateResumeModal
                    open={isCreateModalOpen}
                    onOpenChange={setIsCreateModalOpen}
                    onCreate={handleCreateFromModal}
                />

                <ImportResumeDialog
                    open={isImportDialogOpen}
                    isImporting={isImporting}
                    importProgress={importProgress}
                    importStatus={importStatus}
                    isUsingOCR={isUsingOCR}
                    onOpenChange={setIsImportDialogOpen}
                    jsonFileInputRef={jsonFileInputRef}
                    pdfFileInputRef={pdfFileInputRef}
                    wordFileInputRef={wordFileInputRef}
                    markdownFileInputRef={markdownFileInputRef}
                    onJsonFileChange={handleJsonFileChange}
                    onPdfFileChange={handlePdfFileChange}
                    onWordFileChange={handleWordFileChange}
                    onMarkdownFileChange={handleMarkdownFileChange}
                />
                
                <ImportResultDialog
                    open={isResultDialogOpen}
                    success={importSuccess}
                    message={importMessage}
                    resumeId={importedResumeId}
                    fileName={importedFileName}
                    format={importedFormat}
                    onOpenChange={setIsResultDialogOpen}
                    onNavigate={() => {
                        if (importedResumeId) {
                            router.push(`/app/workbench/${importedResumeId}`);
                        }
                    }}
                />
            </motion.div>
        </ScrollArea>
    );
};
