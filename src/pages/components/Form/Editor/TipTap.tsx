import Blockquote from "@tiptap/extension-blockquote";
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapProps {
  fnForSetValue: (html: string) => void;
}

const Tiptap = ({ fnForSetValue }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Blockquote],
    content: "oi",
    onUpdate({ editor }) {
      fnForSetValue(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            Toggle blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().setBlockquote().run()}
            disabled={!editor.can().setBlockquote()}
          >
            Set blockquote
          </button>
          <button
            onClick={() => editor.chain().focus().unsetBlockquote().run()}
            disabled={!editor.can().unsetBlockquote()}
          >
            Unset blockquote
          </button>
        </div>
      </div>

      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <svg>Bold icon</svg>
          </button>

          {/* ... */}

          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            <svg>Code icon</svg>
          </button>
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />
    </>
  );
};

// <EditorProvider extensions={extensions} content={content}>
//   <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
//   <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
// </EditorProvider>

export default Tiptap;
