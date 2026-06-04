import { createFileRoute } from "@tanstack/react-router";
import PdfParserPage from "@/app/app/pdf-parser/page";

export const Route = createFileRoute("/app/pdf-parser")({
  component: PdfParserPage
});
