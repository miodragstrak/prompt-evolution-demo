'use client';

import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { buildDiffSegments } from './diffUtils';
import { generateSteps } from './generateSteps';
import PromptInput from './PromptInput';

import type {
  PipelineStep,
  StepMetaItem,
} from './types';

const DEFAULT_PROMPT = 'make ad';

function StepListItem({
  step,
  index,
  isActive,
  onClick,
}: {
  step: PipelineStep;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className={[
        'w-full rounded-lg border px-4 py-3 text-left transition-colors',
        isActive
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
      ].join(' ')}
    >
      <div className="text-xs font-medium uppercase tracking-wide opacity-80">
        Step {index + 1}
      </div>

      <div className="mt-1 text-sm font-semibold">
        {step.title}
      </div>
    </button>
  );
}

function DiffText({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const segments = useMemo(
    () => buildDiffSegments(before, after),
    [before, after],
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Changes
      </div>

      <div className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-800">
        {segments.map((segment, index) =>
          segment.type === 'added' ? (
            <span
              key={index}
              className="rounded bg-green-50 px-0.5 text-green-700"
            >
              {segment.text}
            </span>
          ) : (
            <span key={index}>
              {segment.text}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

function PromptBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-800">
        {value}
      </div>
    </section>
  );
}

function MetaList({
  title,
  items,
}: {
  title: string;
  items: StepMetaItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </div>

      <dl className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid gap-1 sm:grid-cols-[140px_1fr]"
          >
            <dt className="text-sm font-medium text-slate-600">
              {item.label}
            </dt>

            <dd className="text-sm text-slate-800">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function NavigationBar({
  isFirstStep,
  isLastStep,
  isPlaying,
  onPlayToggle,
  onPrevious,
  onNext,
  onReset,
}: {
  isFirstStep: boolean;
  isLastStep: boolean;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">

      {/* Previous */}

      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className="
          rounded-lg
          border border-slate-300
          bg-white
          px-4 py-2
          text-sm
          font-medium
          text-slate-700
          hover:bg-slate-50
          disabled:bg-slate-200
          disabled:text-slate-500
          disabled:border-slate-200
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        Previous
      </button>

      {/* Play / Pause */}

      <button
        onClick={onPlayToggle}
        className="
          rounded-lg
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          px-4 py-2
          text-sm
          shadow-sm
          transition-colors
        "
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Next */}

      <button
        onClick={onNext}
        disabled={isLastStep}
        className="
          rounded-lg
          bg-slate-900
          hover:bg-slate-800
          text-white
          font-medium
          px-4 py-2
          text-sm
          shadow-sm
          disabled:bg-slate-400
          disabled:cursor-not-allowed
        "
      >
        Next
      </button>

      {/* Reset */}

      <button
        onClick={onReset}
        className="
          rounded-lg
          border border-slate-300
          bg-white
          px-4 py-2
          text-sm
          font-medium
          text-slate-700
          hover:bg-slate-50
        "
      >
        Reset
      </button>

    </div>
  );
}

export default function PromptEvolutionDemo() {

  const [steps, setSteps] = useState<PipelineStep[]>(
    () => generateSteps(DEFAULT_PROMPT),
  );

  const [currentStepIndex, setCurrentStepIndex] =
    useState(0);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const currentStep =
    steps[currentStepIndex];

  const isFirstStep =
    currentStepIndex === 0;

  const isLastStep =
    currentStepIndex === steps.length - 1;

  const handlePrevious = useCallback(() => {

    if (currentStepIndex <= 0) return;

    setIsAnimating(true);

    setTimeout(() => {

      setCurrentStepIndex(prev =>
        Math.max(prev - 1, 0),
      );

      setIsAnimating(false);

    }, 180);

  }, [currentStepIndex]);

  const handleNext = useCallback(() => {

    if (currentStepIndex >= steps.length - 1) return;

    setIsAnimating(true);

    setTimeout(() => {

      setCurrentStepIndex(prev =>
        Math.min(
          prev + 1,
          steps.length - 1,
        ),
      );

      setIsAnimating(false);

    }, 180);

  }, [currentStepIndex, steps.length]);

useEffect(() => {
  if (!isPlaying) return;

  const timer = setTimeout(() => {
    if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    handleNext();
  }, 1400);

  return () => clearTimeout(timer);

}, [
  isPlaying,
  currentStepIndex,
  steps.length,
  handleNext,
]);

  function handleRun(prompt: string) {

    const normalizedPrompt =
      prompt.trim() || DEFAULT_PROMPT;

    setSteps(
      generateSteps(normalizedPrompt),
    );

    setCurrentStepIndex(0);

    setIsPlaying(false);

  }

  function handleReset() {

    setSteps(
      generateSteps(DEFAULT_PROMPT),
    );

    setCurrentStepIndex(0);

    setIsPlaying(false);

  }

  return (

    <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm md:p-6">

      <div className="mb-6">

        <PromptInput
          initialValue={DEFAULT_PROMPT}
          onRun={handleRun}
          onReset={handleReset}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

        <aside className="rounded-xl border border-slate-200 bg-white p-4">

          <div className="mb-4">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Pipeline
            </div>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Prompt Evolution
            </h2>

          </div>

          <div className="space-y-2">

            {steps.map((step, index) => (

              <StepListItem
                key={step.id}
                step={step}
                index={index}
                isActive={
                  index === currentStepIndex
                }
                onClick={
                  setCurrentStepIndex
                }
              />

            ))}

          </div>

        </aside>

        <main
          className={`
            min-w-0 rounded-xl border border-slate-200 bg-white p-4 md:p-6
            transition-all duration-200 ease-out
            ${
              isAnimating
                ? 'opacity-0 translate-y-2'
                : 'opacity-100 translate-y-0'
            }
          `}
        >

          <header className="mb-6 border-b border-slate-200 pb-4">

            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">

              Step {currentStepIndex + 1}
              {' '}of{' '}
              {steps.length}

            </div>

            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              {currentStep.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {currentStep.explanation}
            </p>

          </header>

          <div className="space-y-4">

            {currentStep.meta?.length ? (

              <MetaList
                title="Details"
                items={currentStep.meta}
              />

            ) : null}

            <PromptBlock
              label="Before Prompt"
              value={currentStep.before}
            />

            <PromptBlock
              label="After Prompt"
              value={currentStep.after}
            />

            <DiffText
              before={currentStep.before}
              after={currentStep.after}
            />

          </div>

          <div className="mt-6">

            <NavigationBar
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              isPlaying={isPlaying}
              onPlayToggle={() =>
                setIsPlaying(p => !p)
              }
              onPrevious={handlePrevious}
              onNext={handleNext}
              onReset={handleReset}
            />

          </div>

        </main>

      </div>

    </div>

  );
}