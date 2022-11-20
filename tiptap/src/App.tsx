import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import Link from "@tiptap/extension-link";
import MathExtension from "./MathExtension";

export default function App() {
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
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
