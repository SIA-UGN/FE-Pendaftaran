import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:     "border-transparent text-white",
        secondary:   "border-transparent",
        destructive: "border-transparent text-white",
        outline:     "border-current bg-transparent",
        success:     "border-transparent text-white",
        warning:     "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const badgeStyles = {
  default:     { backgroundColor: '#015023', color: '#ffffff', fontFamily: 'Urbanist, sans-serif' },
  secondary:   { backgroundColor: '#DABC4E', color: '#015023', fontFamily: 'Urbanist, sans-serif' },
  destructive: { backgroundColor: '#BE0414', color: '#ffffff', fontFamily: 'Urbanist, sans-serif' },
  outline:     { backgroundColor: 'transparent', color: '#015023', borderColor: '#015023', fontFamily: 'Urbanist, sans-serif' },
  success:     { backgroundColor: '#16874B', color: '#ffffff', fontFamily: 'Urbanist, sans-serif' },
  warning:     { backgroundColor: '#DABC4E', color: '#015023', fontFamily: 'Urbanist, sans-serif' },
}

function Badge({
  className,
  variant = 'default',
  asChild = false,
  style,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      style={{ ...(badgeStyles[variant] || badgeStyles.default), ...style }}
      {...props} />
  );
}

export { Badge, badgeVariants }
