import type { MarkdownNode } from '@nuxt/content';
import { serverQueryContent } from '#content/server';

function extractTextFromAst(node: MarkdownNode, ignoredTags: string[] = []) {
  let text = '';

  // Get text from markdown AST
  if (node.type === 'text') {
    text += (node.value || '');
  }

  // Do not explore children
  if (ignoredTags.includes(node.tag ?? '')) {
    return ''
  }

  // Explore children
  if (node.children?.length) {
    text += node.children.map((child: any) => extractTextFromAst(child, ignoredTags)).filter(Boolean).join('');
  }

  return text;
}

export default cachedEventHandler(async (event) => {
  const files = await serverQueryContent(event)
    .sort({
      _stem: 1,
    })
    .find();

  const categories = files.filter(row => row._partial).map(row => ({
    id: row._dir,
    title: row.title,
  }));

  const list = files.filter(row => !row._partial).map(row => ({
    id: row._path,
    categoryId: row._dir,
    title: row.title,
    description: (row.description || '').trim(),
    content: row.body ? extractTextFromAst(row.body, ['pre', 'code', 'iframe', 'img', 'video']) : '',
  }));

  return {
    categories,
    list,
  };
}, {
  maxAge: 60 * 60,
  getKey: () => '/api/contents',
});
