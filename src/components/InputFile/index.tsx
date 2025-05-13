'use client';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InputFileProps = {
  onFileSelected?: (file: File) => void;
};

export function InputFile({ onFileSelected }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="file">Upload PDF file to generate Questions</Label>
      <Input
        id="file"
        type="file"
        accept=".pdf"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file && onFileSelected) {
              onFileSelected(file);
            }
          }
        }}
      />
    </div>
  )
}
