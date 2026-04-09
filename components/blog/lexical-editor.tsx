"use client";

import { useCallback, useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $insertNodes,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
  createCommand,
} from "lexical";
import type { EditorState, LexicalCommand, SerializedEditorState } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode } from "lexical";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { ImageNode, $createImageNode } from "./nodes/image-node";

export const INSERT_IMAGE_COMMAND: LexicalCommand<{ src: string; altText: string }> =
  createCommand("INSERT_IMAGE_COMMAND");

const NODES = [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, ImageNode];

const THEME = {
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
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, updateToolbar]);

  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/blog/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error ?? "Upload failed");
          return;
        }
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: data.url,
          altText: file.name,
        });
      } catch {
        toast.error("Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [editor],
  );

  const formatHeading = (level: "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(level));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-1 border-b p-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={formatParagraph}
      >
        P
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => formatHeading("h1")}
      >
        H1
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => formatHeading("h2")}
      >
        H2
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => formatHeading("h3")}
      >
        H3
      </Button>
      <div className="w-px bg-border mx-1" />
      <Button
        type="button"
        variant={isBold ? "secondary" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs font-bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        B
      </Button>
      <Button
        type="button"
        variant={isItalic ? "secondary" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs italic"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        I
      </Button>
      <div className="w-px bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
      >
        UL
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
      >
        OL
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={formatQuote}
      >
        Quote
      </Button>
      <div className="w-px bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon className="size-3.5" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageUpload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: { src: string; altText: string }) => {
        const imageNode = $createImageNode(payload.src, payload.altText);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}

function onError(error: Error) {
  console.error("Lexical editor error:", error);
}

type LexicalEditorProps = {
  initialContent?: SerializedEditorState | null;
  onChange: (state: SerializedEditorState) => void;
  className?: string;
};

export function LexicalEditor({
  initialContent,
  onChange,
  className,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "BlogEditor",
    nodes: NODES,
    editable: true,
    editorState: initialContent ? JSON.stringify(initialContent) : undefined,
    onError,
    theme: THEME,
  };

  const handleChange = useCallback(
    (editorState: EditorState) => {
      onChange(editorState.toJSON());
    },
    [onChange],
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn(
          "rounded-md border bg-background",
          className,
        )}
      >
        <ToolbarPlugin />
        <div className="relative min-h-[300px] p-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="outline-none min-h-[280px]" />
            }
            ErrorBoundary={({ children }) => <>{children}</>}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagePlugin />
          <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
        </div>
      </div>
    </LexicalComposer>
  );
}
