"use client";

import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface ITextareaProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  label: string;
  name: string;
  color?:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  placeholder?: string;
  rows?: number;
  readonly?: boolean;
}

export default function SHTextarea({
  variant = "flat",
  size = "md",
  required = false,
  label,
  name,
  color = "primary",
  placeholder = "Enter text...",
  rows = 3,
  readonly = false,
}: ITextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors?.[name] ? (errors?.[name]?.message as string) : ""}
      isInvalid={!!errors?.[name]}
      variant={variant}
      size={size}
      required={required}
      label={label}
      color={color}
      readOnly={readonly}
      placeholder={placeholder}
      rows={rows}
      className="focus:border-primary-500 border-red-300 text-white"
    />
  );
}