// diffUtils.ts
import type { DiffSegment } from './types';

function normalizeWhitespace(value: string): string[] {
  return value.split(/(\s+)/).filter((token) => token.length > 0);
}

function buildLcsMatrix(a: string[], b: string[]): number[][] {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0),
  );

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  return matrix;
}

export function buildDiffSegments(before: string, after: string): DiffSegment[] {
  const beforeTokens = normalizeWhitespace(before);
  const afterTokens = normalizeWhitespace(after);
  const matrix = buildLcsMatrix(beforeTokens, afterTokens);

  const reversedSegments: DiffSegment[] = [];
  let i = beforeTokens.length;
  let j = afterTokens.length;

  while (i > 0 && j > 0) {
    if (beforeTokens[i - 1] === afterTokens[j - 1]) {
      reversedSegments.push({
        text: afterTokens[j - 1],
        type: 'unchanged',
      });
      i -= 1;
      j -= 1;
    } else if (matrix[i][j - 1] >= matrix[i - 1][j]) {
      reversedSegments.push({
        text: afterTokens[j - 1],
        type: 'added',
      });
      j -= 1;
    } else {
      i -= 1;
    }
  }

  while (j > 0) {
    reversedSegments.push({
      text: afterTokens[j - 1],
      type: 'added',
    });
    j -= 1;
  }

  const ordered = reversedSegments.reverse();
  const merged: DiffSegment[] = [];

  for (const segment of ordered) {
    const previous = merged[merged.length - 1];

    if (previous && previous.type === segment.type) {
      previous.text += segment.text;
    } else {
      merged.push({ ...segment });
    }
  }

  return merged;
}