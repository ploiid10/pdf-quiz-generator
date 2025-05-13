import { IQuestion } from "@/constants/questions";

export const generateQuestions = async (textArray: string[]) => {
  const text = textArray.join('\n').slice(0, 200000 ); // trim to avoid token limit

  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  if (data.questions) {
    return JSON.parse(data.questions)
    // Navigate or render them
  } else {
    console.error('OpenAI Error:');
  }
};

export const generateQuestionId = (length: number = 16): string => {
  return Math.random().toString(36).substring(2, 2 + length);
}

export const saveQuestion = (questions: IQuestion[]) => {
  const questionId = generateQuestionId()
  localStorage.setItem(questionId, JSON.stringify(questions));
  return { id: questionId };
}