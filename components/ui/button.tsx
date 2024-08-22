import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"



const buttonVariants = cva(
  "items-center hidden text-gray-600 transition-colors duration-300  focus:outline-none",
  {
    variants: {
      variant: {
        default:'',
        iconText: "hover:bg-green-300 hover:text-white text-md transform border",
        // destructive:
        //   "bg-red-500 text-gray-50 hover:bg-red-500/90  ",
        // outline:
        //   "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900   ",
        // secondary:
        //   "bg-gray-100 text-gray-900 hover:bg-gray-100/80  ",
        // ghost: "hover:bg-gray-100 hover:text-gray-900 ",
        // link: "text-gray-900 underline-offset-4 hover:underline ",
      },
      size: {
        default: "",
        // sm: "h-9 rounded-md px-3",
        // lg: "h-11 rounded-md px-8",
        // icon: "h-10 w-10",
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
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size,  asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, className, size }))}
        ref={ref}
        {...props}
      >
        </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
