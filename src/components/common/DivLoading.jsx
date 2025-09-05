'use client';
import { useApp } from '@sistec/context/AppContext';
import React from 'react';

export default function DivLoading() {
  const { loading } = useApp();
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-800 border-t-transparent"></div>
      </div>
    );
  } else {
    return <></>;
  }
}
