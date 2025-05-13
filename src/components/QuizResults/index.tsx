
// should move to components/ScoreSummary.tsx
import { Button } from "@/components/ui/button"

interface ScoreSummaryProps {
  score: number
  total: number
  onRetry: () => void
}

// components/QuizResults.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

interface Question {
  question: string
  options: string[]
}

interface QuizResultsProps {
  questions: Question[]
  answers: string[]
  correctAnswers: string[]
  onRetry: () => void
}


function ScoreSummary({ score, total, onRetry }: ScoreSummaryProps) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-bold">
        You scored {score} out of {total}
      </h2>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  )
}

export default function QuizResults({
  questions,
  answers,
  correctAnswers,
  onRetry,
}: QuizResultsProps) {
  const score = answers.reduce((total, answer, i) =>
    answer === correctAnswers[i] ? total + 1 : total, 0)

  return (
    <div className="w-full max-w-xl space-y-6">
      {questions.map((q, index) => {
        const selected = answers[index]
        const correct = correctAnswers[index]

        return (
          <Card key={index} className="rounded-2xl shadow w-full">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">{q.question}</h2>

              <div className="space-y-2">
                {q.options.map((option) => {
                  const isCorrect = option === correct
                  const isSelected = option === selected
                  const statusIcon = isSelected
                    ? isCorrect
                      ? <Check className="w-4 h-4 text-green-600" />
                      : <X className="w-4 h-4 text-red-600" />
                    : null

                  return (
                    <div
                      key={option}
                      className={`flex items-center space-x-2 ${
                        isSelected
                          ? isCorrect
                            ? "text-green-600"
                            : "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      {statusIcon}
                      <span>{option}</span>
                    </div>
                  )
                })}

                {selected !== correct && (
                  <p className="text-sm text-gray-500">
                    Correct Answer: <strong>{correct}</strong>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}

      <ScoreSummary score={score} total={questions.length} onRetry={onRetry} />
    </div>
  )
}
