import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code,
  Link as LinkIcon, AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, RemoveFormatting, Image as ImageIcon
} from 'lucide-react';

const ToolbarButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all duration-150 ${
      active
        ? 'bg-[#564c38] text-white shadow-md'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

const ToolbarDivider = () => (
  <div className="w-px h-8 bg-gray-300 mx-1" />
);

const RichTextEditor = ({ value, onChange, placeholder = 'Start writing...', minHeight = '300px', showStats = true }) => {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const updateStats = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      setReadingTime(Math.max(1, Math.ceil(words.length / 200)));
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
      updateStats();
    }
  }, [value, updateStats]);

  const execCommand = (command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    handleEditorInput();
  };

  const handleEditorInput = () => {
    const html = editorRef.current?.innerHTML || '';
    onChange(html);
    updateStats();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) execCommand('insertImage', url);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-2 flex flex-wrap items-center gap-1 bg-gray-50">
        <ToolbarButton onClick={() => execCommand('undo')} title="Undo"><Undo className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('redo')} title="Redo"><Redo className="w-4 h-4" /></ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H1')} title="Heading 1"><Heading1 className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H2')} title="Heading 2"><Heading2 className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', 'H3')} title="Heading 3"><Heading3 className="w-4 h-4" /></ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton onClick={() => execCommand('bold')} title="Bold"><Bold className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('italic')} title="Italic"><Italic className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('underline')} title="Underline"><Underline className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('strikeThrough')} title="Strikethrough"><Strikethrough className="w-4 h-4" /></ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List"><List className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List"><ListOrdered className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')} title="Quote"><Quote className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('formatBlock', 'PRE')} title="Code"><Code className="w-4 h-4" /></ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left"><AlignLeft className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center"><AlignCenter className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right"><AlignRight className="w-4 h-4" /></ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton onClick={insertLink} title="Insert Link"><LinkIcon className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={insertImage} title="Insert Image"><ImageIcon className="w-4 h-4" /></ToolbarButton>
        <ToolbarButton onClick={() => execCommand('removeFormat')} title="Clear Formatting"><RemoveFormatting className="w-4 h-4" /></ToolbarButton>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleEditorInput}
        suppressContentEditableWarning
        className="p-6 prose prose-sm max-w-none focus:outline-none"
        style={{ minHeight, lineHeight: '1.8' }}
        data-placeholder={placeholder}
      />
      {showStats && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>{wordCount} words</span>
          <span>{readingTime} min read</span>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
