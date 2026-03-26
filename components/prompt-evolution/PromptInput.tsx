'use client';

import { useState } from 'react';

interface PromptInputProps {
  initialValue: string;
  onRun: (prompt: string) => void;
  onReset: () => void;
}

export default function PromptInput({
  initialValue,
  onRun,
  onReset,
}: PromptInputProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        User Prompt
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="Enter your prompt..."
        className="
          w-full resize-none rounded-lg
          border border-slate-300
          bg-white
          p-3
          text-sm
          text-slate-900
          placeholder:text-slate-400
          focus:border-slate-900
          focus:outline-none
          focus:ring-1
          focus:ring-slate-900
        "
      />

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onRun(value)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Run Simulation
        </button>

        <button
          onClick={() => {
            setValue(initialValue);
            onReset();
          }}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}