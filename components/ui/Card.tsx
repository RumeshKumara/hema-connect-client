type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ${className}`}>
      {children}
    </div>
  );
}
