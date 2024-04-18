"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col max-w-screen h-[95vh] text-center px-4 pt-[10vh] gap-4 md:gap-[1em] relative">
      <span className="h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-[250px] h-[250px] fill-red-400 m-auto"
        >
          <path d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path>
        </svg>
        <h2 className="text-xl my-4">Something went wrong! Please try again later.</h2>
        <Link className="text-red-400 font-bold px-4 uppercase underline text-xl rounded-sm" href={'/'}>Back Home</Link>
      </span>
    </div>
  );
}
