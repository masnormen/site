import { cn } from '@/utils/cn';

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
        'bg-xyellow inline-flex items-center justify-center rounded-[10px] px-2 py-1 text-xs leading-[1] font-semibold whitespace-nowrap text-white uppercase',
        className,
      )}
      {...rest}
    >
      {label}
    </div>
  );
}
