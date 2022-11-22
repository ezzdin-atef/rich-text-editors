import { Editor } from "@tiptap/react";
import React, { useCallback } from "react";
import TiptapButton from "./TiptapButton";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaRemoveFormat,
  FaStrikethrough,
  FaUndo,
} from "react-icons/fa";
import TiptapDropdown from "./TiptapDropdown";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const setLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("link")) {
      return editor.chain().focus().unsetLink().run();
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-slate-100 py-2 px-1 flex gap-2 text-sm flex-wrap">
      <TiptapButton onClick={setLink} isActive={editor.isActive("link")}>
        <FaLink />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <FaBold />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <FaItalic />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <FaStrikethrough />
      </TiptapButton>
      {/* <TiptapButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
      >
        <FaCode />
      </TiptapButton> */}
      <TiptapButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <FaRemoveFormat />
      </TiptapButton>
      <TiptapDropdown>
        <TiptapButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
        >
          paragraph
        </TiptapButton>
        <TiptapButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          h1
        </TiptapButton>
        <TiptapButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          h2
        </TiptapButton>
        <TiptapButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
        >
          h3
        </TiptapButton>
        <TiptapButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={editor.isActive("heading", { level: 4 })}
        >
          h4
        </TiptapButton>
        <TiptapButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          isActive={editor.isActive("heading", { level: 5 })}
        >
          h5
        </TiptapButton>
        <TiptapButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          isActive={editor.isActive("heading", { level: 6 })}
        >
          h6
        </TiptapButton>
      </TiptapDropdown>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <FaListUl />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <FaListOl />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
      >
        <FaCode />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      >
        <FaQuoteLeft />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </TiptapButton>
      <TiptapButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </TiptapButton>
    </div>
  );
};
