import { Alert } from "flowbite-react";

interface AlertProps {
  message: string;
}

export function AlertComponent({ message }: AlertProps) {
  return (
    <Alert color="success" className="fixed bottom-0 right-0 m-4" withBorderAccent>
      <span>
        <span className="font-medium">Salvando Progressão:</span> {message}
      </span>
    </Alert>
  );
}
