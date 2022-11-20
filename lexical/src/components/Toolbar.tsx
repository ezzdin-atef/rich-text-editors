import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Button from "./Button";
import {
  FaBold,
  FaItalic,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from "react-icons/fa";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import HeadingSelect from "./HeadingSelect";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $selectAll,
  $wrapNodes,
} from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);
  const [heading, setHeading] = React.useState("");
  const [isSuperscript, setIsSuperscript] = React.useState(false);
  const [isSubscript, setIsSubscript] = React.useState(false);
  const [isLink, setIsLink] = React.useState(false);
  const [isQuote, setIsQuote] = React.useState(false);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (!headingSize) {
          return $wrapNodes(selection, () => $createParagraphNode());
        }
        $wrapNodes(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });
      setHeading($isHeadingNode(element) ? element.getTag() : "");
    }
  }, [editor]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  return (
    <div className="flex items-center gap-2 text-sm bg-slate-100 py-2 px-1  ">
      <Button onClick={() => editor.dispatchCommand(UNDO_COMMAND, void 1)}>
        <FaUndo />
      </Button>
      <Button onClick={() => editor.dispatchCommand(REDO_COMMAND, void 1)}>
        <FaRedo />
      </Button>
      <HeadingSelect
        value={heading}
        onChange={(value) => formatHeading(value as HeadingTagType)}
      />
      <Button
        isActive={isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <FaBold />
      </Button>
      <Button
        isActive={isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <FaItalic />
      </Button>
      <Button
        isActive={isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <FaUnderline />
      </Button>
      <Button
        isActive={isStrikethrough}
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
      >
        <FaStrikethrough />
      </Button>
    </div>
  );
}
