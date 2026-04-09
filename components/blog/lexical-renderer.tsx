"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import type { SerializedEditorState } from "lexical";

import { cn } from "@/lib/utils";
import { ImageNode } from "./nodes/image-node";

const NODES = [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, ImageNode];

function onError(error: Error) {
  console.error("Lexical read-only error:", error);
}

type LexicalRendererProps = {
  content: SerializedEditorState;
  className?: string;
};

export function LexicalRenderer({ content, className }: LexicalRendererProps) {
  const initialConfig = {
    namespace: "BlogReader",
    nodes: NODES,
    editable: false,
    editorState: JSON.stringify(content),
    onError,
    theme: {
      root: "lexical-root",
      heading: {
        h1: "text-3xl font-bold mt-6 mb-3",
        h2: "text-2xl font-semibold mt-5 mb-2",
        h3: "text-xl font-semibold mt-4 mb-2",
      },
      paragraph: "mb-3 leading-relaxed",
      quote:
        "border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4",
      list: {
        ul: "list-disc ml-6 mb-3 space-y-1",
        ol: "list-decimal ml-6 mb-3 space-y-1",
        listitem: "leading-relaxed",
        nested: {
          listitem: "list-none",
        },
      },
      link: "text-primary underline hover:text-primary/80",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
        code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
      },
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          ErrorBoundary={({ children }) => <>{children}</>}
        />
        <ListPlugin />
      </div>
    </LexicalComposer>
  );
}
