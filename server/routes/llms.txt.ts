export default defineEventHandler(async (event) => {
  const sections = await loadLlmsSections(event);
  const lines = [`# ${LLMS_TITLE}`, '', `> ${LLMS_SUMMARY}`, '', `The full documentation in a single file: ${LLMS_SITE_URL}/llms-full.txt`];

  for (const section of sections) {
    lines.push('', `## ${section.title}`, '');
    for (const page of section.pages) {
      lines.push(`- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ''}`);
    }
  }

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  return `${lines.join('\n')}\n`;
});
