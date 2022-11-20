import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./components/MenuBar";
import Link from "@tiptap/extension-link";
import MathExtension from "./extensions/MathExtension";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      MathExtension,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="border m-2">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="focus:outline-none py-2 px-1  "
      />
    </div>
  );
}
