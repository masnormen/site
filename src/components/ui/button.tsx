import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils/cn';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export function Button({ className, children, asChild = false, ...rest }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      className={cn(
        'font-title bg-xblue focus-visible:ring-ring hover:bg-xblue/80 inline-flex items-center justify-center rounded-3xl px-6 py-[13px] text-base leading-[1] font-semibold text-white transition-all duration-200 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-97 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
