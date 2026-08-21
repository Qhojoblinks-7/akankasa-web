function isElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

function isText(node) {
  return node && node.nodeType === Node.TEXT_NODE;
}

function childIndex(node) {
  if (!node || !node.parentNode) return 0;
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}

function pathTo(node, root) {
  const path = [];
  let cur = node;
  while (cur && cur !== root) {
    path.unshift(childIndex(cur));
    cur = cur.parentNode;
  }
  return path;
}

function nodeFromPath(root, path) {
  let cur = root;
  for (let i = 0; i < path.length; i++) {
    const idx = path[i];
    if (!cur || idx < 0 || idx >= cur.childNodes.length) return null;
    cur = cur.childNodes[idx];
  }
  return cur || null;
}

function normalizeAnchor(editor, node, offset) {
  if (!node) return { node: editor, offset: 0 };
  if (node === editor) {
    const children = editor.childNodes;
    if (offset === 0 && children.length > 0) return { node: children[0], offset: 0 };
    return { node: editor, offset };
  }
  if (isElement(node)) {
    const children = node.childNodes;
    if (children.length === 0) return { node, offset: 0 };
    if (offset >= children.length) {
      const last = children[children.length - 1];
      if (isText(last)) return { node: last, offset: last.length };
      return { node: last, offset: 0 };
    }
    if (offset === 0) {
      return { node: children[0], offset: 0 };
    }
    const prev = children[offset - 1];
    if (isText(prev)) return { node: prev, offset: prev.length };
    return { node: children[offset], offset: 0 };
  }
  return { node, offset };
}

export function getBookmark(editor) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  const range = sel.getRangeAt(0);
  const start = normalizeAnchor(editor, range.startContainer, range.startOffset);
  const end = range.collapsed
    ? { node: start.node, offset: start.offset }
    : normalizeAnchor(editor, range.endContainer, range.endOffset);
  return {
    collapsed: range.collapsed,
    startPath: pathTo(start.node, editor),
    startOffset: start.offset,
    endPath: pathTo(end.node, editor),
    endOffset: end.offset,
  };
}

export function restoreBookmark(editor, bookmark) {
  if (!bookmark) return false;
  const startNode = nodeFromPath(editor, bookmark.startPath);
  const endNode = bookmark.collapsed ? startNode : nodeFromPath(editor, bookmark.endPath);
  if (!startNode || !endNode) return false;
  const range = document.createRange();
  try {
    range.setStart(startNode, bookmark.startOffset);
    range.setEnd(endNode, bookmark.endOffset);
  } catch {
    return false;
  }
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  return true;
}

export function getSelectionTextOffset(editor, selection) {
  if (!selection.rangeCount) return 0;
  const range = selection.getRangeAt(0);
  const pre = range.cloneRange();
  pre.selectNodeContents(editor);
  pre.setEnd(range.endContainer, range.endOffset);
  const text = pre.toString();
  const match = text.match(/\S/);
  const start = match ? match.index : text.length;
  return start;
}

export function textNodeAtOffset(editor, offset) {
  const textNodes = [];
  const walk = (node) => {
    if (isText(node)) textNodes.push(node);
    else if (isElement(node) && node !== editor) {
      for (const child of node.childNodes) walk(child);
    }
  };
  for (const child of editor.childNodes) walk(child);
  let remaining = offset;
  for (const tn of textNodes) {
    if (tn.length >= remaining) {
      if (tn.length === remaining) {
        return { node: tn, offset: tn.length, nextBlockStart: false };
      }
      return { node: tn, offset: remaining };
    }
    remaining -= tn.length;
  }
  const last = textNodes[textNodes.length - 1];
  return { node: last || editor, offset: last ? last.length : 0 };
}
