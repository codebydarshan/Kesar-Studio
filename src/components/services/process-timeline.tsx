"use client";

import { FadeIn } from "@/components/shared/motion";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-1/2 sm:-translate-x-px"
        aria-hidden="true"
      />
      <div className="space-y-12">
        {steps.map((item, index) => (
          <FadeIn key={item.step} delay={index * 0.08}>
            <div
              className={`relative flex flex-col gap-4 sm:flex-row sm:items-start ${
                index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden sm:block sm:w-1/2" />
              <div
                className={`sm:w-1/2 ${
                  index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                } pl-12 sm:pl-0`}
              >
                <span className="text-sm font-medium text-primary">{item.step}</span>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background sm:left-1/2 sm:-translate-x-1/2">
                <span className="text-xs font-bold text-primary">{item.step}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
