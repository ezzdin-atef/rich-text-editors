import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import Link from "@tiptap/extension-link";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Hello World!</p>",
  });

  // method to get the editor content output to be stored in the database
  const getOutputHtml = () => {
    console.log(editor?.getHTML());
  };

  // method to set the editor content from the database
  const setContent = (html: string) => {
    editor?.commands.setContent(html);
  };

  return (
    <div className="border m-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="focus:outline-none py-2 px-1" />
    </div>
  );
}
