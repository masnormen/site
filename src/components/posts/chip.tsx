import { cn } from "@/utils/cn";

export function Chip({
  label,
  className = '',
  ...rest
}: {
  label: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-2 py-1 leading-[1] text-xs font-semibold bg-xyellow text-white rounded-[10px] uppercase whitespace-nowrap',
        className,
      )}
      {...rest}
    >
      {label}
    </div>
  );
}
