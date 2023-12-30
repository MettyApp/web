import React from 'react';

export default async function PingLoader() {
  return (
    <div className='h-full flex min-h-full min-w-0 items-center justify-center'>
      <span className="flex h-3 w-3">
        <span className="p-3 animate-ping inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
      </span>
    </div>)
}