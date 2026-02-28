import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground flex field-sizing-content min-h-[100px] w-full border bg-transparent px-4 py-3 text-sm",
        "transition-[color,box-shadow] outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-500",
        className
      )}
      style={{ borderRadius: '10px', borderColor: '#D1D5DB', fontFamily: 'Urbanist, system-ui, sans-serif' }}
      onFocus={e => { e.target.style.borderColor = '#015023'; e.target.style.boxShadow = '0 0 0 3px rgba(1,80,35,0.15)'; }}
      onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = 'none'; }}
      {...props} />
  );
}

export { Textarea }
