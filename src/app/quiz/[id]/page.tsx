"use client";

import { Button } from "@/components/ui/button";
import Question from "@/components/Question";
import { IQuestion } from "@/constants/questions";
import useQuestions from "@/hooks/useQuestions";
import { useCallback, useMemo, useState } from "react";
import { Check, X } from "lucide-react"

interface QuestionsProps {
  questions: IQuestion[]
  handleSelect: (index: number, selected: string) => void
}

const Questions = ({ questions, handleSelect }: QuestionsProps) => {
  return (
    questions.map((q, i) =>
      <Question
        index={i}
        key={`${q.answer}-${i}`}
        question={q.question}
        choices={q.choices}
        onSelect={handleSelect}
      />
    )
  )
}
export default function Quiz() {
  const { questions } = useQuestions<IQuestion>()
  // TODO: make sure this should align with the questions length
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""))
  const [score, setScore] = useState<number>(0)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const correctAnswers = questions.map((q) => q.answer)

  const handleSelect = useCallback((index: number, selected: string) => {
    const updated = [...answers]
    updated[index] = selected
    setAnswers(updated)
  }, [answers])

  const handleSubmit = useCallback(() => {
    const score = answers.reduce((count, answer, i) => {
      return answer === correctAnswers[i] ? count + 1 : count
    }, 0)
    setScore(score)
    setSubmitted(true)
  }, [answers, questions])
  const allAnswered = useMemo(() =>  answers.every((a) => a !== ""), [answers])

  if (!questions) {
    return <div>Question Not found</div>
  }

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-xl space-y-6">
        <Questions handleSelect={handleSelect} questions={questions} />
        <Button
          className="w-full mt-2"
          onClick={handleSubmit}
          disabled={!allAnswered}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}