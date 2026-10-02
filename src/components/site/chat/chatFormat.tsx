import type { ReactNode } from "react";

/**
 * The tiny subset of markup answers are allowed to use: paragraphs, bullets, numbered
 * steps, bold and inline code.
 *
 * Everything is emitted as React text nodes, so there is no dangerouslySetInnerHTML and no
 * markdown dependency. Inline links are deliberately unsupported — links belong to the
 * source chips, which are one consistent affordance built from server-side URLs, so nothing
 * the answer text contains can ever become a clickable destination.
 */
const INLINE = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\([^)]*\)/g;
const BULLET = /^\s*-\s+/;
const NUMBER = /^\s*\d+[.)]\s+/;

function inline(source: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of source.matchAll(INLINE)) {
    const at = match.index ?? 0;
    if (at > last) nodes.push(source.slice(last, at));
    if (match[1] !== undefined) nodes.push(<strong key={(key += 1)}>{match[1]}</strong>);
    else if (match[2] !== undefined) nodes.push(<code key={(key += 1)}>{match[2]}</code>);
    // A markdown link degrades to its label rather than rendering as broken syntax.
    else if (match[3] !== undefined) nodes.push(match[3]);
    last = at + match[0].length;
  }

  if (last < source.length) nodes.push(source.slice(last));
  return nodes;
}

export function renderAnswer(text: string): ReactNode {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const lines = block.split("\n").filter((line) => line.trim());
      if (lines.length > 1 && lines.every((line) => BULLET.test(line))) {
        return (
          <ul key={index}>
            {lines.map((line, item) => (
              <li key={item}>{inline(line.replace(BULLET, ""))}</li>
            ))}
          </ul>
        );
      }
      if (lines.length > 1 && lines.every((line) => NUMBER.test(line))) {
        return (
          <ol key={index}>
            {lines.map((line, item) => (
              <li key={item}>{inline(line.replace(NUMBER, ""))}</li>
            ))}
          </ol>
        );
      }
      return <p key={index}>{inline(block)}</p>;
    });
}
