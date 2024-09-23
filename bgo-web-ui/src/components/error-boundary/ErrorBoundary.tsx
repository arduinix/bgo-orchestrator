import { ReactElement, useState } from "react";

interface ErrorBoundaryProps {
  children?: ReactElement;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError] = useState(false);

  return (
    <>
      {hasError ? (
        <p>Oops, it seems that something went wrong. Sorry about that.</p>
      ) : (
        children
      )}
    </>
  );
}
