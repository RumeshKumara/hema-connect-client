type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  maxWidthClassName?: string;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  maxWidthClassName = "max-w-md",
}: AuthCardProps) {
  return (
    <div className={`mx-auto w-full ${maxWidthClassName} rounded-4xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:p-10`}>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-center ">{title}</h1>
      <p className="mt-2 text-sm text-zinc-600 text-center">{subtitle}</p>
      {children}
    </div>
  );
}
