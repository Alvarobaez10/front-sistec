'use client';

import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from './Command';
import { cn } from '@sistec/helpers/utils';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

export function ComboBox({
  labelNotFound,
  labelSearch,
  placeholder,
  disabled,
  value,
  options,
  id,
  clearable = false,
  className,
  onChange,
  creatable = false,
  setOptions,
  allOptions,
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [open]);

  let labelSelected = placeholder ?? 'Seleccionar';
  if (value && value !== '-1') {
    labelSelected = options?.find((option) => option.value === value)?.label;
  }

  function handleClean(e) {
    e.preventDefault();
    e.stopPropagation();
    onChange?.('-1');
    setInputValue('');
  }

  function handleCreate() {
    if (
      labelSearch &&
      creatable &&
      !options?.filter((item) => item.label === labelSearch)[0]?.value
    ) {
      const newOption = { value: inputValue, label: inputValue, field: id };
      let copyAllOptions = allOptions ?? [];
      copyAllOptions = copyAllOptions.filter((item) => item.field !== id);
      let copyOptions = options ?? [];
      copyOptions = copyOptions.filter(
        (item) => item.label !== inputValue && item.value !== 'newItem'
      );
      copyOptions.push(newOption);
      setOptions?.([...copyOptions, ...copyAllOptions]);
      onChange?.(inputValue);
      setOpen(false);
      setInputValue('');
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        asChild
        className={cn(
          'flex gap-1  h-[35px] w-full items-center !whitespace-normal justify-between border border-gray-300 rounded-[5px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus::ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ',
          className
        )}
      >
        <Button variant="outline" role="combobox" aria-expanded={open} disabled={disabled}>
          <span className="text-left">{labelSelected}</span>
          {value && value !== '-1' && clearable ? (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleClean(e);
              }}
              className="text-gray-500 hover:text-gray-700 ml-auto"
            >
              <Cross2Icon className="w-4 h-4" />
            </span>
          ) : (
            <></>
          )}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 z-[99999999]">
        <Command>
          <CommandInput
            placeholder={labelSearch ?? 'Buscar'}
            className="h-9"
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>{labelNotFound ?? 'Sin resultados'}</CommandEmpty>
            {inputValue &&
              creatable &&
              !options?.filter((item) => item.label === inputValue)[0]?.value && (
                <div className="p-2">
                  <Button variant="secondary" onClick={handleCreate} className="w-full">
                    Registrar "{inputValue}"
                  </Button>
                </div>
              )}
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={String(option.label)}
                  onSelect={(currentValue) => {
                    const valueOption = options.filter((item) => item.label === currentValue)[0]
                      .value;
                    onChange?.(valueOption);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
