import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "small inline-flex hover:underline items-center justify-center whitespace-nowrap rounded-md tracking text-base font-bold ring-offset-primary-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-500 text-primary-100 hover:bg-accent-500/90",
        outline:
          "border border-accent-500 text-primary-900 bg-primary-100 bg-opacity-0 hover:bg-opacity-30 ",
        secondary: "bg-primary-500 text-primary-100 hover:bg-primary-500/80",
        ghost: "hover:bg-primary-100 hover:text-primary-900",
        link: "font-fira text-primary-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "rounded-lg text-lg px-8 py-3 gap-1.5 tracking-wider",
        sm: "rounded-md text-base h-8 px-4 pt-[2px]",
        lg: "rounded-xl text-xl px-12 py-4 gap-2.5 ",
        snug: "p-0 text-lg",
        icon: "",
      },
      hasIcon: {
        left: "",
        right: "",
        none: "",
      },
    },
    compoundVariants: [
      { size: "default", hasIcon: "left", className: "pl-5" },
      { size: "default", hasIcon: "right", className: "pr-5" },
      { size: "sm", hasIcon: "left", className: "pl-2" },
      { size: "sm", hasIcon: "right", className: "pr-2" },
      { size: "lg", hasIcon: "left", className: "pl-8" },
      { size: "lg", hasIcon: "right", className: "pr-8" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      hasIcon: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  Icon?: React.ElementType;
  iconClassName?: string;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      Icon,
      iconPosition = "left",
      iconClassName,
      ...props
    },
    ref
  ) => {
    const Comp = "button";

    const iconPaddingClass = Icon
      ? iconPosition === "left"
        ? "pl-4"
        : "pr-4"
      : "";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            hasIcon: Icon ? iconPosition : "none",
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className={iconClassName} />}
        {children}
        {Icon && iconPosition === "right" && <Icon className={iconClassName} />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
