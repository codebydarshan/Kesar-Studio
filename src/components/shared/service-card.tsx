"use client";

import {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Brain,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HoverLift, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

const iconMap = {
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Brain,
  Lightbulb,
} as const;

export type ServiceIconName = keyof typeof iconMap;

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: ServiceIconName;
  className?: string;
  large?: boolean;
}

export function ServiceCard({
  title,
  description,
  iconName,
  className,
  large = false,
}: ServiceCardProps) {
  const Icon: LucideIcon = iconMap[iconName];

  return (
    <StaggerItem>
      <HoverLift>
        <Card
          className={cn(
            "group h-full border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
            className
          )}
        >
          <CardContent className={cn("p-6", large && "p-8")}>
            <div
              className={cn(
                "mb-4 flex items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15",
                large ? "h-14 w-14" : "h-12 w-12"
              )}
            >
              <Icon
                className={cn("text-primary", large ? "h-7 w-7" : "h-6 w-6")}
                aria-hidden="true"
              />
            </div>
            <h3 className={cn("font-semibold mb-2", large ? "text-xl" : "text-lg")}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </HoverLift>
    </StaggerItem>
  );
}
