import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/cn';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function Button({
  className,
  children,
  asChild = false,
  ...rest
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      className={cn(
        'inline-flex items-center justify-center px-6 py-[13px] font-title font-semibold bg-xblue rounded-3xl text-base text-white leading-[1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-xblue/80 hover:cursor-pointer active:scale-97',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
