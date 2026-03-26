// stepsData.ts
import type { PipelineStep } from './types';

export const stepsData: PipelineStep[] = [
  {
    id: 'inject-brain-context',
    title: 'Inject Brain Context',
    before: 'make ad',
    after: 'make ad for a book Instagram profile',
    explanation: 'Added brand context from Brain.',
    meta: [
      { label: 'Brand', value: 'Book Instagram profile' },
      { label: 'Audience', value: 'Book lovers' },
      { label: 'Style', value: 'Intellectual library aesthetic' },
    ],
  },
  {
    id: 'intent-recognition',
    title: 'Intent Recognition',
    before: 'make ad for a book Instagram profile',
    after: 'create an Instagram post promoting books',
    explanation: 'Detected the content type, goal, and platform, then reframed the request.',
    meta: [
      { label: 'Content type', value: 'Social media post' },
      { label: 'Goal', value: 'Promotion' },
      { label: 'Platform', value: 'Instagram' },
    ],
  },
  {
    id: 'confidence-scoring',
    title: 'Confidence Scoring',
    before: 'create an Instagram post promoting books',
    after: 'create an Instagram post promoting books',
    explanation: 'Confidence evaluated as LOW because the request is still missing key details.',
    meta: [
      { label: 'Confidence', value: 'LOW' },
      { label: 'Missing', value: 'Format' },
      { label: 'Missing', value: 'Tone' },
      { label: 'Missing', value: 'Constraints' },
    ],
  },
  {
    id: 'prompt-enrichment',
    title: 'Prompt Enrichment',
    before: 'create an Instagram post promoting books',
    after: `Create a social media post promoting eco-fiction books
for Instagram users who love reading.
Use an intellectual library-style aesthetic.
Keep the tone thoughtful and calm.`,
    explanation: 'Expanded the prompt with audience, style, category, and tone guidance.',
  },
  {
    id: 'tool-routing',
    title: 'Tool Routing',
    before: `Create a social media post promoting eco-fiction books
for Instagram users who love reading.
Use an intellectual library-style aesthetic.
Keep the tone thoughtful and calm.`,
    after: `Create a social media post promoting eco-fiction books
for Instagram users who love reading.
Use an intellectual library-style aesthetic.
Keep the tone thoughtful and calm.

Route to: Magic Studio`,
    explanation: 'Selected the appropriate product surface for generation.',
    meta: [{ label: 'Selected tool', value: 'Magic Studio' }],
  },
  {
    id: 'final-prompt',
    title: 'Final Prompt',
    before: `Create a social media post promoting eco-fiction books
for Instagram users who love reading.
Use an intellectual library-style aesthetic.
Keep the tone thoughtful and calm.

Route to: Magic Studio`,
    after: `Create a polished Instagram promotional post for eco-fiction books.

Audience:
Book lovers and Instagram users who enjoy thoughtful reading content.

Style:
Intellectual library aesthetic with a calm, literary tone.

Constraints:
Keep the copy concise, promotional, and visually aligned with a premium book-focused brand.

Destination:
Magic Studio`,
    explanation: 'Produced the final structured prompt ready for generation.',
  },
];