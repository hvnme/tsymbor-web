// components/ui/haptic-button.tsx
import * as React from "react";
import { Button, buttonVariants } from "./button";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { type VariantProps } from "class-variance-authority";

interface HapticButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  hapticType?: "light" | "medium" | "heavy" | "rigid";
  asChild?: boolean;
}

const HapticButton = React.forwardRef<HTMLButtonElement, HapticButtonProps>(
  ({ hapticType = "light", onClick, ...props }, ref) => {
    const { impactOccurred } = useHapticFeedback();

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      impactOccurred(hapticType);
      onClick?.(event);
    };

    return <Button ref={ref} onClick={handleClick} {...props} />;
  }
);

HapticButton.displayName = "HapticButton";

export { HapticButton };
export type { HapticButtonProps };
