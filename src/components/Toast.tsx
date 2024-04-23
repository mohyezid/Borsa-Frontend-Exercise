import { useEffect, useRef } from "react";

export default function Toast({
  message,
  time = 4000,
  severity = "error",
}: {
  message: string;
  time?: number;
  severity?: string;
}) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    // display the toast if a new message has been sent from the parent
    if (message && ref.current) {
      ref.current.style.display = "flex";
      setTimeout(closeToast, time);
    }
  }, [message]);

  const closeToast = () => {
    if (ref.current) ref.current.style.display = "none";
  };

  if (!message) return;

  return (
    <div
      ref={(el) => (el ? (ref.current = el) : null)}
      id="toast-default"
      className={`fixed flex bottom-4 right-4 z-[99999] items-center w-full max-w-xs p-4 rounded-lg shadow text-white  ${
        severity === "error" ? "bg-red-500" : "bg-green-500"
      }`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
          severity === "error"
            ? "bg-red-800 text-red-200"
            : "bg-green-800 text-green-200"
        }`}
      >
        {severity === "error" ? (
          <>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </>
        )}
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 ${
          severity === "error" ? "hover:bg-red-800" : "hover:bg-green-800"
        }`}
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={closeToast}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}
