"use client";

import { useCVStore } from "@/lib/cv-store";
import { ModernTemplate } from "./templates/modern-template";
import { ClassicTemplate } from "./templates/classic-template";
import { MinimalTemplate } from "./templates/minimal-template";
import { ExecutiveTemplate } from "./templates/executive-template";
import { CreativeTemplate } from "./templates/creative-template";
import { CompactTemplate } from "./templates/compact-template";

const paperSizeClasses = {
  A4: "w-[210mm] min-h-[297mm]",
  Letter: "w-[216mm] min-h-[279mm]",
  Auto: "w-full min-h-full",
};

export function CVPreview() {
  const { data } = useCVStore();

  const Template = () => {
    switch (data.template) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "compact":
        return <CompactTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className={`mx-auto ${paperSizeClasses[data.paperSize]}`}>
      <Template />
    </div>
  );
}