import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 transition-all",
  {
    variants: {
      variant: {
        default:     "bg-[#E6EEE9] text-[#015023] border-[#D9E5DE] [&>svg]:text-[#015023]",
        destructive: "bg-red-50 text-[#BE0414] border-red-200 [&>svg]:text-[#BE0414]",
        success:     "bg-[#E6EEE9] text-[#16874B] border-[#D9E5DE] [&>svg]:text-[#16874B]",
        warning:     "bg-yellow-50 text-[#92620A] border-yellow-200 [&>svg]:text-[#92620A]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    style={{ borderRadius: '12px', fontFamily: 'Urbanist, system-ui, sans-serif' }}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
