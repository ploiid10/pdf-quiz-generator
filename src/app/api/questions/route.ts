import { OPENAI_KEY } from '@/lib/envConfig';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

// TODO: use stream response for better handling on bigger files
export async function POST(req: NextRequest) {
  const { text } = await req.json();

  try {
    const prompt = `
Generate 5 multiple-choice questions (with 4 options each, and indicate the correct answer) based on the following text:
---
${text}
---
Return a JSON object that should have a key named "questions" which is an array of the questions. Each question should include the choices and the answer.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;
    // Try to parse JSON (you may need to sanitize)
    return NextResponse.json({ questions: content }, { status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
