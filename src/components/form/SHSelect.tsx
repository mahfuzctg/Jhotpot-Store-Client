"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

interface IProps {
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
  items: { key: string | boolean; label: string }[];
}

export default function SHSelect({
  variant = "underlined",
  size = "md",
  required = false,
  label,
  name,
  color = "primary",
  items,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      errorMessage={errors?.[name] ? (errors?.[name]?.message as string) : ""}
      isInvalid={!!errors?.[name]}
      variant={variant}
      size={size}
      required={required}
      label={label}
      color={color}
      className=""
    >
      {items.map((item) => (
        <SelectItem
          key={String(item.key)}
          value={String(item.key)}
          className=""
        >
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}