import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-silver-light bg-white text-text",
          "focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20",
          "transition-all duration-200 placeholder:text-text-muted/50",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className,
  id,
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-silver-light bg-white text-text",
          "focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20",
          "transition-all duration-200 placeholder:text-text-muted/50 resize-none",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-navy mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-silver-light bg-white text-text",
          "focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20",
          "transition-all duration-200",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
