import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionProps {
  choices: string[]
  question: string
  index: number
  onSelect: (index: number, selected: string) => void
}

export default function Question({ question, choices: options, onSelect, index }: QuestionProps) {
  return (
    <Card className="w-full mx-auto rounded-2xl shadow-lg p-4">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">{question}</h2>
        <RadioGroup onValueChange={(value) => onSelect(index, value)}>
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2 p-2">
              <RadioGroupItem value={option} id={option} className="cursor-pointer"/>
              <Label htmlFor={option} className="cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
