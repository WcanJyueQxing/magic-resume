import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/config/ai.ts
var AI_MODEL_CONFIGS = {
	doubao: {
		url: () => "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
		requiresModelId: true,
		headers: (apiKey) => ({
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		}),
		validate: (context) => !!(context.doubaoApiKey && context.doubaoModelId)
	},
	deepseek: {
		url: () => "https://api.deepseek.com/v1/chat/completions",
		requiresModelId: false,
		defaultModel: "deepseek-chat",
		headers: (apiKey) => ({
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		}),
		validate: (context) => !!context.deepseekApiKey
	},
	openai: {
		url: (endpoint) => `${(endpoint || "").trim().replace(/\/+$/, "")}/chat/completions`,
		requiresModelId: true,
		headers: (apiKey) => ({
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		}),
		validate: (context) => !!(context.openaiApiKey && context.openaiModelId && context.openaiApiEndpoint)
	},
	gemini: {
		url: () => "https://generativelanguage.googleapis.com/v1beta",
		requiresModelId: true,
		headers: (apiKey) => ({
			"Content-Type": "application/json",
			"x-goog-api-key": apiKey
		}),
		validate: (context) => !!(context.geminiApiKey && context.geminiModelId)
	},
	ollama: {
		url: (endpoint) => `${(endpoint || "").trim().replace(/\/+$/, "") || "http://localhost:11434"}/api/chat`,
		requiresModelId: true,
		defaultModel: "llama3",
		headers: () => ({ "Content-Type": "application/json" }),
		validate: (context) => !!(context.ollamaModelId && context.ollamaApiEndpoint)
	}
};
//#endregion
//#region src/routes/app/workbench/$id.tsx
var $$splitComponentImporter = () => import("./_id-Dck8gkz_.js");
var Route = createFileRoute("/app/workbench/$id")({
	head: () => ({ meta: [{
		name: "robots",
		content: "noindex,nofollow"
	}] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { AI_MODEL_CONFIGS as n, Route as t };
