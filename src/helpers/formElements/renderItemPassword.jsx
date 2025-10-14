import React from 'react';
import { cn } from '../utils';

export default function renderItemPassword(
  config,
  className,
  value,
  showPassword,
  setShowPassword
) {
  const { confirmPassword, ...otherConfig } = config;
  let { disabled } = config;
  let isDisabled = false;
  let key = otherConfig.id;
  disabled = disabled || isDisabled;

  return (
    <div className="relative w-full">
      <input
        key={key}
        className={`
        w-full border border-gray-300 rounded-[5px] pl-2 pr-7 py-1 text-sm 
        focus:outline-none focus:ring-1 focus:ring-blue-300 
        disabled:bg-gray-100 disabled:cursor-not-allowed 
        h-[35px] ${className}
      `}
        {...otherConfig}
        disabled={disabled}
        autoComplete="off"
        value={value ?? ''}
        type={showPassword ? 'text' : 'password'}
      />
      <div
        className={cn(
          'absolute top-1/2 right-2 -translate-y-1/2 bg-no-repeat bg-center cursor-pointer h-5 w-4',
          showPassword ? 'icon-password' : 'icon-password-show'
        )}
        onClick={() => setShowPassword((prev) => !prev)}
        title={showPassword ? 'Ocultar' : 'Mostrar'}
      />
    </div>
  );
}
