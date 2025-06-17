"use client";

import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

function Editor({
  defaultValue = `# Edit your content here`,
  handleSave,
}: {
  defaultValue?: string;
  handleSave: (data: string) => void;
}) {
  const { theme } = useTheme();

  return (
    <div className="rounded-lg mt-4 overflow-hidden border border-gray-200 dark:border-gray-700">
      <MarkdownEditor
        data-color-mode={theme === "dark" ? "dark" : "light"}
        className="!border-0 h-[600px] overflow-y-scroll"
        value={defaultValue}
        onChange={handleSave}
      />
    </div>
  );
}

export default Editor;
