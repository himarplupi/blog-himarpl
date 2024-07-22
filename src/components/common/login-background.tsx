"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function LoginBackground() {
  return (
    <div className="absolute h-screen w-screen overflow-hidden">
      <AnimatedGridPattern
        maxOpacity={0.3}
        duration={3}
        numSquares={200}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "lg:[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "absolute -inset-y-[40%] inset-x-0 h-[200%]",
        )}
      />
    </div>
  );
}
