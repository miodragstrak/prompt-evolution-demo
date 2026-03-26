import type { PipelineStep } from './types';

export function generateSteps(prompt: string): PipelineStep[] {
  const step1After = `${prompt} for a book Instagram profile`;

  const step2After = 'create an Instagram post promoting books';

  const enrichedPrompt = `Create a social media post promoting eco-fiction books
for Instagram users who love reading.
Use an intellectual library-style aesthetic.
Keep the tone thoughtful and calm.`;

  return [
    {
      id: 'inject-brain-context',
      title: 'Inject Brain Context',
      before: prompt,
      after: step1After,
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
      before: step1After,
      after: step2After,
      explanation: 'Detected the content type and platform.',
      meta: [
        { label: 'Content type', value: 'Social media post' },
        { label: 'Goal', value: 'Promotion' },
        { label: 'Platform', value: 'Instagram' },
      ],
    },
    {
      id: 'confidence-scoring',
      title: 'Confidence Scoring',
      before: step2After,
      after: step2After,
      explanation: 'Confidence evaluated as LOW.',
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
      before: step2After,
      after: enrichedPrompt,
      explanation: 'Expanded prompt with audience and tone.',
    },
    {
      id: 'tool-routing',
      title: 'Tool Routing',
      before: enrichedPrompt,
      after: `${enrichedPrompt}\n\nRoute to: Magic Studio`,
      explanation: 'Selected execution tool.',
      meta: [{ label: 'Selected tool', value: 'Magic Studio' }],
    },
    {
      id: 'final-prompt',
      title: 'Final Prompt',
      before: `${enrichedPrompt}\n\nRoute to: Magic Studio`,
      after: `Structured prompt ready for generation`,
      explanation: 'Final structured output.',
    },
  ];
}