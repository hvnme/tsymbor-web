// components/ui/haptic-wrapper.tsx
import * as React from "react";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

interface HapticWrapperProps {
  children: React.ReactNode;
  hapticType?: "light" | "medium" | "heavy" | "rigid";
  onClick?: () => void;
  className?: string;
}

export const HapticWrapper: React.FC<HapticWrapperProps> = ({
  children,
  hapticType = "light",
  onClick,
  className,
}) => {
  const { impactOccurred } = useHapticFeedback();

  const handleClick = () => {
    impactOccurred(hapticType);
    onClick?.();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
