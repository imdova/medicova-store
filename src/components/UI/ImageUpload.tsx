"use client";

import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label?: string;
  required?: boolean;
  maxSizeMB?: number;
  aspectRatio?: string;
  className?: string;
}

const ImageUpload = <T extends FieldValues>({
  name,
  register,
  errors,
  label = "Upload Image",
  required = true,
  maxSizeMB = 2,
  aspectRatio = "1:1",
  className = "",
}: ImageUploadProps<T>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLLabelElement>) => {
      let file: File | null = null;

      if ("dataTransfer" in e) {
        e.preventDefault();
        e.stopPropagation();
        file = e.dataTransfer.files?.[0] ?? null;
      } else {
        file = e.target.files?.[0] ?? null;
      }

      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please upload an image file");
          return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`Image size should be less than ${maxSizeMB}MB`);
          return;
        }

        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
      }
    },
    [maxSizeMB],
  );

  const removeImage = useCallback(() => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
    const input = document.getElementById(name) as HTMLInputElement | null;
    if (input) input.value = "";
  }, [previewImage, name]);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const baseClasses =
    "group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all";
  const borderColor = previewImage
    ? "border-transparent"
    : isDragging
      ? "border-primary bg-primary/10"
      : "border-gray-300 hover:border-primary";

  const error = errors[name];
  const errorClass = error ? "border-red-500" : "";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <label
        htmlFor={name}
        className={`${baseClasses} ${borderColor} ${errorClass}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          handleImageChange(e);
          setIsDragging(false);
        }}
      >
        {previewImage ? (
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Image
              width={300}
              height={300}
              src={previewImage}
              alt="Preview"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-gray-700 shadow-sm transition-all hover:bg-white hover:text-red-600"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center px-4 text-center">
            <div className="group-hover:bg-primary/10 mb-3 rounded-full bg-gray-100 p-4 text-gray-500 transition-all group-hover:text-primary">
              {isDragging ? <UploadCloud size={24} /> : <ImageIcon size={24} />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                <span className="text-primary">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                {aspectRatio && `Ratio ${aspectRatio} • `}Max {maxSizeMB}MB
              </p>
            </div>
          </div>
        )}

        <input
          id={name}
          type="file"
          accept="image/*"
          className="sr-only"
          {...register(name, {
            required: required ? `${label || "Image"} is required` : false,
            onChange: handleImageChange,
          })}
        />
      </label>

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {(error as { message?: string })?.message}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
