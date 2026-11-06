"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Icon from "@/components/Icons/Icons";
import css from "./CatalogFilters.module.css";

interface FilterSelectProps {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  displayValue?: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label, placeholder, value, options, displayValue, onChange,
}: FilterSelectProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    if (open) {
      list.current?.focus();
      list.current?.children[active]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, active]);

  function show(last = false) {
    const index = options.findIndex((option) => option.value === value);
    setActive(index >= 0 ? index : last ? options.length - 1 : 0);
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    trigger.current?.focus();
  }

  function handleKeys(event: KeyboardEvent<HTMLUListElement>) {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " ", "Escape"].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === "ArrowDown") setActive((index) => Math.min(index + 1, options.length - 1));
    if (event.key === "ArrowUp") setActive((index) => Math.max(index - 1, 0));
    if (event.key === "Home") setActive(0);
    if (event.key === "End") setActive(options.length - 1);
    if (event.key === "Enter" || event.key === " ") choose(active);
    if (event.key === "Escape") {
      setOpen(false);
      trigger.current?.focus();
    }
    if (event.key.length === 1 && event.key !== " ") {
      const index = options.findIndex((option) => option.label.toLowerCase().startsWith(event.key.toLowerCase()));
      if (index >= 0) setActive(index);
    }
  }

  return (
    <div
      className={css.field}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <span id={`${id}-label`} className={css.label}>{label}</span>
      <button
        ref={trigger}
        id={`${id}-trigger`}
        className={css.select}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => open ? setOpen(false) : show()}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            show(event.key === "ArrowUp");
          }
        }}
      >
        <span id={`${id}-value`}>{selected ? displayValue ?? selected.label : placeholder}</span>
        <Icon name="chevron" className={open ? css.chevronOpen : css.chevron} />
      </button>
      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          className={css.options}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={options.length ? `${id}-option-${active}` : undefined}
          onKeyDown={handleKeys}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              className={`${css.option} ${active === index ? css.highlighted : ""}`}
              onPointerMove={() => setActive(index)}
              onClick={() => choose(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
