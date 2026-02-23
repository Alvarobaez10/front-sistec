import { Buffer } from 'buffer';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const buildUrlParams = (url, params) => {
  const paramsURL = new URLSearchParams(params).toString();
  const builtURL = url + '?' + paramsURL;
  return builtURL;
};

export function getValueSelect(event, mode) {
  let valueSelect = '';
  if (mode === 'single') {
    valueSelect = event.target.value;
  } else if (mode === 'autocomplete' || mode === 'async') {
    valueSelect = event ? event : null;
  } else if (mode === 'multi') {
    valueSelect = event.map((item) => item.value);
  }
  return valueSelect;
}

export default function encode64(dato) {
  return Buffer.from(String(dato), 'utf8').toString('base64');
}

export function decode64(encodedData) {
  const decoded = Buffer.from(encodedData, 'base64').toString('utf8');
  const output = decoded
    .replace(/\|\|a\|\|/g, '\xe1')
    .replace(/\|\|e\|\|/g, '\xe9')
    .replace(/\|\|i\|\|/g, '\xed')
    .replace(/\|\|o\|\|/g, '\xf3')
    .replace(/\|\|u\|\|/g, '\xfa')
    .replace(/\|\|A\|\|/g, '\xc1')
    .replace(/\|\|E\|\|/g, '\xc9')
    .replace(/\|\|I\|\|/g, '\xcd')
    .replace(/\|\|O\|\|/g, '\xd3')
    .replace(/\|\|U\|\|/g, '\xda')
    .replace(/\|\|n\|\|/g, '\xf1')
    .replace(/\|\|N\|\|/g, '\xd1')
    .replace(/\|\|!\|\|/g, '\xa1')
    .replace(/\|\|\?\|\|/g, '\xbf')
    .replace(/\|\|UU\|\|/g, '\xdc')
    .replace(/\|\|uu\|\|/g, '\xfc')
    .replace(/\|\|\.\|\|/g, '.');
  return output;
}

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
