import { Node, mergeAttributes } from "@tiptap/core";
import "https://unpkg.com/@nagwa-limited/mathlive@latest";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    math: {
      /**
       * Add an image
       */
      setEquation: () => ReturnType;
    };
  }
}

const MathExtension = Node.create({
  name: "MathExtension",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group: "block",

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: "math-field",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "math-field",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setEquation:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});

export default MathExtension;
