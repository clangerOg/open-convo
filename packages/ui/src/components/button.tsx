import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../utils";

const buttonVariants = cva(
  "font-medium text-white rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-offset-background focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default:
          "bg-accent-500 border border-accent-400 shadow-inner shadow-white/20",
        outline: "border border-border hover:bg-zinc-100",
      },
      size: { default: "text-sm px-2.5 py-1" },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { asChild = false, variant, size, className, ...rest } = props;

    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        {...rest}
        className={cn(buttonVariants({ variant, size, className }))}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
