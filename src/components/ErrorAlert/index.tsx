// components/PdfErrorAlert.tsx

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface IErrorAlertProps {
  message: string
}

export default function ErrorAlert({ message }: IErrorAlertProps) {
  if (!message) return null

  return (
    <Alert variant="destructive" className="w-full max-w-2xl" >
      <AlertCircle className="h-4 w-4" />
      <div>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  )
}
