import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const  useQuestions = <T  = unknown>(): { questions: T[]} => {
  const params = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<T[]>([]);

  useEffect(() => {
    if (params?.id) {
      const storedQuestions = localStorage.getItem(params.id) as string;
      setQuestions(JSON.parse(storedQuestions) as T[]);
    }
  }, [params?.id]);

  return { questions }
}

export default useQuestions