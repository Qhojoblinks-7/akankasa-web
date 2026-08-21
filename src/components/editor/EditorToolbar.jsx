import React, { useState, useEffect } from 'react';
import {
  Bold, Italic, Underline, Strikethrough, Type, List, ListOrdered,
  Quote, Code, Link as LinkIcon, Image as ImageIcon, Film, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, RemoveFormatting, Smile,
} from 'lucide-react';

const GROUPED_COLORS = [
  { name: 'Default', value: '' },
  { name: 'Amber', value: '#ca8a04' },
  { name: 'Brown', value: '#564c38' },
  { name: 'Gold', value: '#f59e0b' },
  { name: 'Dark', value: '#111827' },
];

const HEADINGS = [
  { label: 'Paragraph', value: 'P' },
  { label: 'Heading 1', value: 'H1' },
  { label: 'Heading 2', value: 'H2' },
  { label: 'Heading 3', value: 'H3' },
  { label: 'Heading 4', value: 'H4' },
];

const currentBlockLabel = () => {
  const val = queryCommandValue('formatBlock') || 'P';
  return HEADINGS.find((h) => h.value === val)?.label || 'Paragraph';
};

const ToolbarButton = ({ onClick, active, title, children, small }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-label={title}
    className={`flex items-center justify-center rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
      small ? 'w-7 h-7 text-sm' : 'w-8 h-8'
    } ${
      active
        ? 'bg-[#e6dbaf] text-[#564c38] shadow'
        : 'text-gray-700 hover:bg-[#f1d799]/30'
    }`}
  >
    {children}
  </button>
);

const ToolbarDivider = () => <div className="w-px h-9 bg-gray-300 mx-1" />;

const Dropdown = ({ label, value, options, onChange, icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-[#f1d799]/30 transition-colors"
        title={label}
      >
        <span className="truncate max-w-[110px]">{label}</span>
        {icon}
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute z-20 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm max-h-64 overflow-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`block w-full text-left px-3 py-1.5 hover:bg-[#f1d799]/30 ${
                  value === opt.value ? 'bg-[#f1d799]/40 font-medium' : ''
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ColorPicker = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Text color"
        className="flex items-center justify-center w-8 h-8 rounded-md text-gray-700 hover:bg-[#f1d799]/30 transition-colors"
      >
        <Type className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1">
            {GROUPED_COLORS.map((c) => (
              <button
                key={c.value || 'default'}
                type="button"
                onClick={() => {
                  onSelect(c.value);
                  setOpen(false);
                }}
                className="flex items-center w-full gap-3 px-3 py-1.5 text-left hover:bg-[#f1d799]/30"
              >
                <span
                  className="w-4 h-4 rounded-sm border border-gray-300"
                  style={{ backgroundColor: c.value || '#fff' }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const queryCommandState = (command) => {
  try {
    return document.queryCommandState(command);
  } catch {
    return false;
  }
};

const queryCommandValue = (command) => {
  try {
    return document.queryCommandValue(command);
  } catch {
    return '';
  }
};

const EditorToolbar = ({ onInsertLink, onInsertImage, onInsertVideo, onEmoji }) => {
  const [updateFlag, setUpdateFlag] = useState(0);

  useEffect(() => {
    const onSelectionChange = () => setUpdateFlag((u) => u + 1);
    document.addEventListener('selectionchange', onSelectionChange);
    return () => document.removeEventListener('selectionchange', onSelectionChange);
  }, []);

  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
  };

  const toggleHeading = (tag) => {
    document.execCommand('formatBlock', false, tag);
  };

  const insertLink = () => {
    const url = prompt('Enter a link URL:', 'https://');
    if (url) {
      if (onInsertLink) onInsertLink(url);
      else exec('createLink', url);
    }
  };

  const insertImage = () => {
    if (onInsertImage) onInsertImage();
    else {
      const url = prompt('Enter an image URL:');
      if (url) exec('insertImage', url);
    }
  };

  const insertVideo = () => {
    if (onInsertVideo) onInsertVideo();
    else {
      const url = prompt('Enter a video URL:');
      if (url) exec('insertHTML', `<video controls src="${url.replace(/"/g, '&quot;')}" style="max-width:100%;"></video>`);
    }
  };

  const insertEmoji = () => {
    if (onEmoji) onEmoji();
    else {
      const emoji = prompt('Enter an emoji:');
      if (emoji) exec('insertText', emoji);
    }
  };

  const setColor = (color) => {
    const cmd = color ? 'foreColor' : 'removeFormat';
    exec(cmd, color);
  };

  return (
    <div className="flex items-center gap-1 flex-wrap bg-white border-b border-gray-200 px-3 py-2 sticky top-0 z-20">
      <ToolbarButton onClick={() => exec('undo')} title="Undo" key={`u-${updateFlag}`}>
        <Undo className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={() => exec('redo')} title="Redo" key={`r-${updateFlag}`}>
        <Redo className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarDivider />

      <Dropdown
        label={currentBlockLabel()}
        value={queryCommandValue('formatBlock')}
        options={HEADINGS}
        onChange={toggleHeading}
        icon={<Type className="w-3 h-3 ml-1" />}
      />
      <ToolbarDivider />

      <ToolbarButton
        onClick={() => exec('bold')}
        active={queryCommandState('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('italic')}
        active={queryCommandState('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('underline')}
        active={queryCommandState('underline')}
        title="Underline (Ctrl+U)"
      >
        <Underline className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('strikeThrough')}
        active={queryCommandState('strikeThrough')}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </ToolbarButton>
      <ColorPicker onSelect={setColor} />
      <ToolbarDivider />

      <ToolbarButton
        onClick={() => exec('insertUnorderedList')}
        title="Bulleted list"
      >
        <List className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('insertOrderedList')}
        title="Numbered list"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('formatBlock', 'BLOCKQUOTE')}
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('formatBlock', 'PRE')}
        title="Code block"
      >
        <Code className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarDivider />

      <ToolbarButton
        onClick={() => exec('justifyLeft')}
        active={queryCommandState('justifyLeft')}
        title="Align left"
      >
        <AlignLeft className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('justifyCenter')}
        active={queryCommandState('justifyCenter')}
        title="Align center"
      >
        <AlignCenter className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('justifyRight')}
        active={queryCommandState('justifyRight')}
        title="Align right"
      >
        <AlignRight className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarDivider />

      <ToolbarButton onClick={insertLink} title="Insert link">
        <LinkIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={insertImage} title="Insert image">
        <ImageIcon className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={insertVideo} title="Insert video">
        <Film className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton onClick={insertEmoji} title="Insert emoji">
        <Smile className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => exec('removeFormat')}
        title="Clear formatting"
      >
        <RemoveFormatting className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
