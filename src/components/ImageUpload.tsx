"use client"

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "./ui/button";

interface ImageUploadProps {
    value: string
    onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [preview, setPreview] = useState(value || null);

    useEffect(() => {
        if (value) {
            setPreview(value);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setPreview(result);
            onChange(result);
        }
        reader.readAsDataURL(file);
    }

    const handleRemove = () => {
        setPreview(null)
        onChange("");
    }

    return (
        <div className="space-y-4">
            {
                preview ? (
                    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                        <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center rounded-lg p-12 cursor-pointer">
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                <Upload className="h-6 w-6" />
                            </div>
                            <div className="text-sm font-medium">Drag & drop an image or click to browse</div>
                            <div className="text-xs text-muted-foreground">PNG, JPG or GIF up to 10MB</div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 cursor-pointer opacity-0 hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    </label>
                )}
        </div>
    );
}