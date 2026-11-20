export default defineEventHandler(async (event) => {
  const sections = await loadLlmsSections(event);
  const parts = [`# ${LLMS_TITLE}\n\n> ${LLMS_SUMMARY}`];

  for (const section of sections) {
    for (const page of section.pages) {
      const header = [`# ${page.title}`, '', `Source: ${page.url}`];
      if (page.description) {
        header.push('', page.description);
      }
      parts.push(`${header.join('\n')}\n\n${await readLlmsMarkdown(page)}`);
    }
  }

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  return `${parts.join('\n\n---\n\n')}\n`;
});
