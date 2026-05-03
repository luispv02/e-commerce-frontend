import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  hint?: string | number;
  icon: ReactNode;
  className?: string;
  textColor?: string;
}

export const StatCard = ({ title, value, hint, icon, className, textColor }: Props) => {

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>
          <p
            className={`mt-1 text-2xl sm:text-3xl font-bold tabular-nums wrap-break-word ${textColor}`}
          >
            {value}
          </p>
          {hint ? (
            <p className="mt-1.5 text-xs text-gray-500 leading-snug">{hint}</p>
          ) : null}
        </div>
        <div
          className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border text-lg ${className}`}
          aria-hidden
        >
          {icon}
        </div>
      </div>
    </div>
  )
};
