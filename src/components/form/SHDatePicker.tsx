"use client";

import React, { useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { useFormContext } from "react-hook-form";

interface IDatePickerProps {
  name: string;
  label: string;
  required?: boolean;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  color?:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  maxDate?: string;
}

export default function SHDatePicker({
  name,
  label,
  required = false,
  variant = "bordered",
  size = "md",
  color = "primary",
  maxDate,
}: IDatePickerProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Initialize the date with today's date
  const currentDate = today(getLocalTimeZone());
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(
    currentDate
  );

  const handleChange = (date: DateValue | null) => {
    setSelectedDate(date);
    setValue(name, date?.toString() || ""); // Update form state
  };

  return (
    <div className="flex flex-col gap-y-2">
      <DatePicker
        {...register(name)}
        className="focus:border-primary-500 border-red-300 text-white"
        label={label}
        value={selectedDate}
        onChange={handleChange}
        variant={variant}
        size={size}
        color={color}
        minValue={currentDate} // Set today's date as the minimum
        maxValue={
          maxDate
            ? today(getLocalTimeZone()).add({ days: parseInt(maxDate) })
            : undefined
        }
        errorMessage={errors?.[name]?.message as string}
        isInvalid={!!errors?.[name]}
        isRequired={required}
      />
      {errors[name]?.message && (
        <span className="text-red-500 text-sm">
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
}