"use client";

import React, { ReactNode } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Copy } from "lucide-react";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {});
};

export const CodeBlock = ({
  children,
  language = "text",
  title,
}: {
  children: ReactNode;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}) => {
  const codeText = React.Children.toArray(children).join("");

  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      {title && (
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-mono">
              {language}
            </Badge>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {title}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(codeText)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed font-mono">
          <code className="text-slate-800 dark:text-slate-200">{children}</code>
        </pre>
        {!title && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(codeText)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
