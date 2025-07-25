"use client"

import { useState } from "react"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ParagraphNode, TextNode } from "lexical"

import { ContentEditable } from "@/registry/new-york-v4/editor/editor-ui/content-editable"
import { AutoEmbedPlugin } from "@/registry/new-york-v4/editor/plugins/embeds/auto-embed-plugin"
import { FigmaPlugin } from "@/registry/new-york-v4/editor/plugins/embeds/figma-plugin"
import { TwitterPlugin } from "@/registry/new-york-v4/editor/plugins/embeds/twitter-plugin"
import { YouTubePlugin } from "@/registry/new-york-v4/editor/plugins/embeds/youtube-plugin"
import { BlockInsertPlugin } from "@/registry/new-york-v4/editor/plugins/toolbar/block-insert-plugin"
import { InsertEmbeds } from "@/registry/new-york-v4/editor/plugins/toolbar/block-insert/insert-embeds"
import { ToolbarPlugin } from "@/registry/new-york-v4/editor/plugins/toolbar/toolbar-plugin"
import { editorTheme } from "@/registry/new-york-v4/editor/themes/editor-theme"
import { TooltipProvider } from "@/registry/new-york-v4/ui/tooltip"

import { FigmaNode } from "../editor/nodes/embeds/figma-node"
import { TweetNode } from "../editor/nodes/embeds/tweet-node"
import { YouTubeNode } from "../editor/nodes/embeds/youtube-node"

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    LinkNode,
    AutoLinkNode,
    FigmaNode,
    TweetNode,
    YouTubeNode,
  ],
  onError: (error: Error) => {
    console.error(error)
  },
}

export default function RichTextEditorDemo() {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
        }}
      >
        <TooltipProvider>
          <Plugins />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}

const placeholder = "Start typing..."

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null)

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <BlockInsertPlugin>
              <InsertEmbeds />
            </BlockInsertPlugin>
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block h-72 min-h-72 min-h-full overflow-auto px-8 py-4 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoEmbedPlugin />
        <FigmaPlugin />
        <TwitterPlugin />
        <YouTubePlugin />
        {/* rest of the plugins */}
      </div>
    </div>
  )
}
