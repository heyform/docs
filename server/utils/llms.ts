import type { H3Event } from 'h3';
import { serverQueryContent } from '#content/server';

export const LLMS_SITE_URL = 'https://docs.heyform.net';
export const LLMS_TITLE = 'HeyForm Help Center';
export const LLMS_SUMMARY = 'HeyForm is an open-source form builder for conversational forms, surveys, quizzes, and polls. This documentation covers building and sharing forms, integrations, self-hosting, configuration, and the REST API.';

export interface LlmsPage {
  url: string;
  file: string;
  title: string;
  description: string;
}

export interface LlmsSection {
  title: string;
  pages: LlmsPage[];
}

// Sort `2.quickstart/10.foo.md` after `2.quickstart/9.bar.md`, like the sidebar.
function compareFiles(a: string, b: string) {
  const left = a.split('/');
  const right = b.split('/');
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const diff = (Number.parseInt(left[i], 10) || 0) - (Number.parseInt(right[i], 10) || 0);
    if (diff) {
      return diff;
    }
    if (left[i] !== right[i]) {
      return left[i].localeCompare(right[i]);
    }
  }
  return left.length - right.length;
}

export async function loadLlmsSections(event: H3Event): Promise<LlmsSection[]> {
  const rows = (await serverQueryContent(event).find()).sort((a, b) => compareFiles(a._file!, b._file!));
  const titles = new Map(rows.filter(row => row._partial).map(row => [row._file!.replace(/\/?_dir\.yml$/, ''), row.title as string]));
  const sections = new Map<string, LlmsSection>();

  for (const row of rows) {
    if (row._partial || !row._file?.endsWith('.md')) {
      continue;
    }
    const dir = row._file.includes('/') ? row._file.split('/')[0] : '';
    if (!sections.has(dir)) {
      sections.set(dir, { title: titles.get(dir) || row.title, pages: [] });
    }
    sections.get(dir)!.pages.push({
      url: LLMS_SITE_URL + row._path,
      file: row._file,
      title: row.title,
      description: (row.description || '').trim(),
    });
  }

  return [...sections.values()];
}

export async function readLlmsMarkdown(page: LlmsPage) {
  const raw = await useStorage('assets:docs').getItemRaw(page.file);
  return String(raw ?? '')
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replaceAll('](/', `](${LLMS_SITE_URL}/`)
    .trim();
}
