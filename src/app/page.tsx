'use client';

import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/InputFile";
import { LoadingSpinner } from "@/components/ui/spinner";
import { IQuestion } from "@/constants/questions";
import { generateQuestions, saveQuestion } from "@/lib/questions";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = useCallback(async (file: File) => {
    const { extractText } = await import('@/lib/pdfReader');
    setLoading(true)
    const text = await extractText(file);
    const response = await generateQuestions(text)
    const savedQuestion = await saveQuestion(response.questions as IQuestion[])
    router.push(`/quiz/${savedQuestion.id}`);
  }, [router])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">{loading ? 'Generating Questions...' : 'PDF Quiz Generator'}</h1>
      {loading
        ? <LoadingSpinner />
        : (
          <>
            <InputFile onFileSelected={handleFileUpload} />
            <Button asChild>
              <Link href="/quiz/12312">go to quiz</Link>
            </Button>
          </>
      )}
    </div>
  );
}
