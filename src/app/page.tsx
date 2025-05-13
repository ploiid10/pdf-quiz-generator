'use client';

import { InputFile } from "@/components/InputFile";
import { LoadingSpinner } from "@/components/ui/spinner";
import { IQuestion } from "@/constants/questions";
import { generateQuestions, saveQuestion } from "@/lib/questions";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  // Auto-dismiss logic
  // TODO: needs to update or create better logic
  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => setError(""), 5000)
    return () => clearTimeout(timer)
  }, [error])

  const handleFileUpload = useCallback(async (file: File) => {
    const { extractText } = await import('@/lib/pdfReader');
    setLoading(true)
    const { pages: text, error } = await extractText(file);

    if (error) {
      setLoading(false)
      setError(error)
      return
    }
    const response = await generateQuestions(text)
    const savedQuestion = await saveQuestion(response.questions as IQuestion[])
    router.push(`/quiz/${savedQuestion.id}`);
  }, [router])



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">{loading ? 'Generating Questions...' : 'PDF Quiz Generator'}</h1>
      {error && <ErrorAlert message={error} />}
      {loading
        ? <LoadingSpinner />
        : (
          <InputFile onFileSelected={handleFileUpload} />
      )}
    </div>
  );
}
