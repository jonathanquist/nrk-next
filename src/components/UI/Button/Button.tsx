import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'small inline-flex items-center justify-center whitespace-nowrap rounded-md tracking text-base font-bold ring-offset-primary-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-accent-500 text-primary-100 hover:bg-accent-500/90',
        outline:
          'border border-accent-500 text-primary-900 bg-primary-100 bg-opacity-0 hover:bg-opacity-30 ',
        secondary: 'bg-primary-500 text-primary-100 hover:bg-primary-500/80',
        ghost: 'hover:bg-primary-100 hover:text-primary-900',
        link: 'font-fira text-primary-900 underline-offset-4 hover:underline',
      },
      size: {
        default: 'rounded-lg text-lg px-8 py-3 gap-1.5 tracking-wider',
        sm: 'rounded-md text-base h-8 px-4 pt-[2px]',
        lg: 'rounded-xl text-xl px-12 py-4 gap-2.5 ',
        snug: 'p-0 text-lg',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
