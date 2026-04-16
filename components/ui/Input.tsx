type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-zinc-300 px-4 py-3 text-zinc-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 ${className}`}
    />
  );
}
