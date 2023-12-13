
function extractTextNodes(node, result = []) {
  if (node && typeof node === 'object') {
    if (node.type === 'text') {
      result.push(node.text);
    }
    if (Array.isArray(node.content)) {
      node.content.forEach((contentNode) => {
        extractTextNodes(contentNode, result);
      });
    }
  }
  return result;
}


export function extractTextNodesFromTipTapDoc(doc) {
  const nodes = extractTextNodes(doc, [])
  return nodes.join(' ')
}