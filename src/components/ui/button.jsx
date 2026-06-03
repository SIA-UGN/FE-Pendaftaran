import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer font-urbanist",
  {
    variants: {
      variant: {
        // Fe-SIA-UGN compatible variants
        default:     "text-white hover:opacity-90",
        primary:     "text-white hover:opacity-90",
        secondary:   "text-white hover:opacity-90",
        warning:     "text-white hover:opacity-90",
        success:     "text-white hover:opacity-90",
        destructive: "text-white hover:opacity-90",
        outline:     "border-2 bg-transparent hover:opacity-90",
        ghost:       "bg-transparent hover:opacity-90",
        link:        "underline-offset-4 hover:underline bg-transparent",
        // Legacy aliases kept for backward compatibility
        green:       "text-white hover:opacity-90",
        yellow:      "hover:opacity-90",
        white:       "text-black hover:opacity-90",
        succed:      "text-white hover:opacity-90",
        matcha:      "hover:opacity-90",
      },
      size: {
        default: "h-12 px-4 py-2 has-[>svg]:px-3",
        sm:      "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg:      "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon:    "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({
  className,
  variant = "default",
  size,
  asChild = false,
  style,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button"

  // Inline styles matching Fe-SIA-UGN's brand color system
  const getCustomStyle = (variant) => {
    const baseStyle = { borderRadius: '12px', fontFamily: 'Urbanist, system-ui, sans-serif' }
    const styles = {
      default:     { ...baseStyle, backgroundColor: '#015023', color: '#ffffff' },
      primary:     { ...baseStyle, backgroundColor: '#015023', color: '#ffffff' },
      secondary:   { ...baseStyle, backgroundColor: '#DABC4E', color: '#015023' },
      warning:     { ...baseStyle, backgroundColor: '#BE0414', color: '#ffffff' },
      destructive: { ...baseStyle, backgroundColor: '#BE0414', color: '#ffffff' },
      success:     { ...baseStyle, backgroundColor: '#16874B', color: '#ffffff' },
      succed:      { ...baseStyle, backgroundColor: '#16874B', color: '#ffffff' },
      outline:     { ...baseStyle, borderColor: '#015023', color: '#015023', backgroundColor: 'transparent' },
      ghost:       { ...baseStyle, backgroundColor: 'transparent', color: '#015023' },
      link:        { borderRadius: '0', backgroundColor: 'transparent', color: '#015023', fontFamily: 'Urbanist, system-ui, sans-serif' },
      // Legacy
      green:       { ...baseStyle, backgroundColor: '#015023', color: '#DABC4E' },
      yellow:      { ...baseStyle, backgroundColor: '#DABC4E', color: '#015023' },
      white:       { ...baseStyle, backgroundColor: '#ffffff', color: '#015023' },
      matcha:      { ...baseStyle, backgroundColor: '#B0C9BB', color: '#015023' },
    }
    return styles[variant] || styles.default
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      style={{ ...getCustomStyle(variant), ...style }}
      ref={ref}
      {...props}
    />
  );
})
Button.displayName = "Button"

// Convenience components matching Fe-SIA-UGN pattern
const PrimaryButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="primary" {...props} />
))

const SecondaryButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="secondary" {...props} />
))

const WarningButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="warning" {...props} />
))

const SuccessButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="success" {...props} />
))

const OutlineButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="outline" {...props} />
))

const GhostButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="ghost" {...props} />
))

PrimaryButton.displayName = "PrimaryButton"
SecondaryButton.displayName = "SecondaryButton"
WarningButton.displayName = "WarningButton"
SuccessButton.displayName = "SuccessButton"
OutlineButton.displayName = "OutlineButton"
GhostButton.displayName = "GhostButton"

export {
  Button,
  buttonVariants,
  PrimaryButton,
  SecondaryButton,
  WarningButton,
  SuccessButton,
  OutlineButton,
  GhostButton
}
