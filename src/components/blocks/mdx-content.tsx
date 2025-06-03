import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MDXOptions } from "@/lib/mdx";
import Image from "next/image";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

const CodeBlock = ({
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

const CalloutBox = ({
  children,
  type = "info",
  title,
}: {
  children: ReactNode;
  type?: "info" | "warning" | "error" | "success";
  title?: string;
}) => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle,
  };

  const styles = {
    info: "bg-blue-50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-100",
    warning:
      "bg-amber-50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-100",
    error:
      "bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-800/50 text-red-900 dark:text-red-100",
    success:
      "bg-emerald-50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100",
  };

  const iconStyles = {
    info: "text-blue-600 dark:text-blue-400",
    warning: "text-amber-600 dark:text-amber-400",
    error: "text-red-600 dark:text-red-400",
    success: "text-emerald-600 dark:text-emerald-400",
  };

  const Icon = icons[type];

  return (
    <div className={cn("rounded-lg border p-4", styles[type])}>
      <div className="flex gap-3">
        <Icon
          className={cn("h-5 w-5 mt-0.5 flex-shrink-0", iconStyles[type])}
        />
        <div className="flex-1">
          {title && <h4 className="font-semibold text-base mb-2">{title}</h4>}
          <div className="text-sm leading-relaxed [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="text-3xl font-bold tracking-tight pb-4 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-semibold tracking-tight mt-8 mb-4 text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold tracking-tight mt-6 mb-3 text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="text-lg font-semibold tracking-tight mt-4 mb-2 text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h5: (props) => (
    <h5
      className="text-base font-semibold tracking-tight mt-3 mb-1 text-slate-900 dark:text-slate-100"
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      className="text-sm font-semibold tracking-tight mt-2 mb-1 text-slate-900 dark:text-slate-100 uppercase"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="leading-7 mb-4 text-slate-700 dark:text-slate-300 text-sm"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 decoration-1 hover:decoration-2 transition-all"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {props.children}
      {props.href?.startsWith("http") && <ExternalLink className="h-3 w-3" />}
    </a>
  ),
  ul: (props) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-slate-700 dark:text-slate-300 text-sm flex flex-col"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-slate-700 dark:text-slate-300 text-sm flex flex-col"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-slate-300 dark:border-slate-600 pl-6 italic text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/30 py-4 rounded-r text-sm"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="relative rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
      {...props}
    />
  ),
  pre: (props) => <CodeBlock>{props.children}</CodeBlock>,
  img: (props) => (
    <Image
      height="500"
      width="500"
      alt="mdx item"
      className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm max-w-full h-auto"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="border-slate-200 dark:border-slate-700" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table
        className="w-full border-collapse bg-white dark:bg-slate-900"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-slate-50 dark:bg-slate-800" {...props} />
  ),
  tbody: (props) => (
    <tbody
      className="divide-y divide-slate-200 dark:divide-slate-700"
      {...props}
    />
  ),
  tr: (props) => (
    <tr
      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      {...props}
    />
  ),
  th: (props) => (
    <th
      className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 text-left text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800"
      {...props}
    />
  ),
  CalloutBox,
  CodeBlock,
} satisfies MDXRemoteProps["components"];

interface MDXContentProps {
  source: string;
  className?: string;
}

export default function MDXContent({ source, className }: MDXContentProps) {
  return (
    <div
      className={cn(
        "max-w-4xl mx-auto bg-white dark:bg-slate-900",
        "px-8 py-12 pb-0 lg:px-12 lg:py-16 lg:pb-0",
        "text-slate-700 dark:text-slate-300",
        "[&>*]:mb-0 [&>*+*]:mt-0",
        className
      )}
    >
      <MDXRemote source={source} options={MDXOptions} components={components} />
    </div>
  );
}
