import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"



const buttonVariants = cva(
  "items-center hidden text-gray-600 transition-colors duration-300  focus:outline-none",
  {
    variants: {
      variant: {
        default:"",
        iconText: "hover:bg-green-300 hover:text-white text-md transform border",
        
      },
      size: {
        default: "",
        iconText:'rounded-full px-2 lg:flex p-2 space-x-1 h-10'
      },
    },
    defaultVariants: {
      variant: "default",
      size:"default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean,
  active?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active,  asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, className, size, }))}
        ref={ref}
        {...props}
      >
        </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
