"use client";

import { XCircleIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface SHDropzoneInputProps {
  name: string;
  label: string;
  allowMultiple?: boolean;
}

const SHFileInput = ({
  name,
  label,
  allowMultiple = false,
}: SHDropzoneInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setValue(name, allowMultiple ? selectedFiles : selectedFiles[0]);
      setFileNames(selectedFiles.map((file) => file.name));
    }
  };

  const clearFileSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileNames([]);
    setValue(name, allowMultiple ? [] : null);
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
          fileNames.length === 0
            ? "hover:bg-gray-900 bg-gray-800 border-gray-600 hover:border-gray-500"
            : "bg-gray-700 border-gray-600"
        }`}
      >
        {fileNames.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">{label}</span>
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-4">
            <p className="text-sm font-medium text-white truncate">
              Selected Files: {fileNames.join(", ")}
            </p>
            <XCircleIcon
              className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={clearFileSelection}
            />
          </div>
        )}
        <input
          id={name}
          type="file"
          ref={(e) => {
            fileInputRef.current = e;
            register(name).ref(e);
          }}
          multiple={allowMultiple}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {errors?.[name] && errors[name]?.message && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as React.ReactNode}
        </p>
      )}
    </div>
  );
};

export default SHFileInput;