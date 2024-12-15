"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EyeSlashFilledIcon } from "../ui/elements/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../ui/elements/EyeFilledIcon";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
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
  pathname?: string;
  readonly?: boolean;
}

export default function SHInput({
  variant = "underlined",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  color = "primary",
  pathname,
  readonly = false,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...register(name)}
      errorMessage={errors?.[name] ? (errors?.[name]?.message as string) : ""}
      isInvalid={!!errors?.[name]}
      variant={variant}
      size={size}
      required={required}
      type={type === "password" && isVisible ? "text" : type}
      label={label}
      color={color}
      readOnly={
        readonly ||
        (name === "email" && pathname !== "/login" && pathname !== "/register")
      }
      className="focus:border-primary-500 border-red-300 text-white"
      endContent={
        type === "password" && (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        )
      }
    />
  );
}