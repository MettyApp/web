"use client";

import { useState } from 'react';

export type FilledButtonProps = {
  disabled?: boolean;
  onClick: () => Promise<void>;
  icon?: JSX.Element;
  label: String;
};

export default function FilledButton({ disabled, onClick, icon, label }: FilledButtonProps) {
  const [loading, setLoading] = useState(false);
  return <button type='button' disabled={disabled||loading} onClick={async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  }} className="flex-1 flex bg-black hover:enabled:bg-black-700 text-white font-bold py-2 px-4 rounded focus:enabled:outline-none disabled:opacity-30 hover:enabled:bg-opacity-80">
    {(loading && icon) && <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>}
    {(!loading && icon) && icon}
    <span className='flex-1'>{label}</span>
  </button>
}