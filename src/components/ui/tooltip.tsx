
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({ delayDuration = 300, ...props }) => {
  const isMobile = useIsMobile();
  // 在移动端上延长延迟时间以获得更好的触摸体验
  const mobileDelayDuration = isMobile ? 800 : delayDuration;
  
  return <TooltipPrimitive.Root delayDuration={mobileDelayDuration} {...props} />
};

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={isMobile ? 8 : sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-xl border border-border/30 bg-card/95 backdrop-blur-sm px-3 py-1.5 text-xs text-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-md",
        isMobile ? "max-w-[280px] text-sm py-2.5 px-4" : "",
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
