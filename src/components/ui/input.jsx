import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "h-12 w-full min-w-0 border bg-white px-4 py-2 text-sm",
        "transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2",
        "aria-invalid:border-destructive",
        className
      )}
      style={{ borderRadius: '10px', borderColor: '#D1D5DB', fontFamily: 'Urbanist, system-ui, sans-serif' }}
      onFocus={e => { e.target.style.borderColor = '#015023'; e.target.style.boxShadow = '0 0 0 3px rgba(1,80,35,0.15)'; }}
      onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
      {...props} />
  );
}

export { Input }
