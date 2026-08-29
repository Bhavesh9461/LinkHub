
export function parseNumberedList(text) {
  if (!text) return null;

  const regex = /(\d+)[.)]\s*([^]*?)(?=\d+[.)]\s|$)/g;
  const items = [];
  let match;

  while ((match = regex.exec(text.trim())) !== null) {
    const content = match[2].trim();
    if (content) items.push(content);
  }

  return items.length > 1 ? items : null;
}