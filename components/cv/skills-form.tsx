"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useCVStore } from "@/lib/cv-store";
import { Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from "@/lib/uuid";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const skillSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  level: z.number().min(1).max(5),
});

type SkillValues = z.infer<typeof skillSchema>;

interface SkillsFormProps {
  onComplete: () => void;
}

export function SkillsForm({ onComplete }: SkillsFormProps) {
  const { data, addSkill, updateSkill, removeSkill, setTemplate, setPaperSize } = useCVStore();
  const [editing, setEditing] = useState<string | null>(null);
  
  const form = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      level: 3,
    },
  });

  function onSubmit(values: SkillValues) {
    if (editing) {
      updateSkill(editing, values);
      setEditing(null);
    } else {
      addSkill({
        id: uuidv4(),
        ...values,
      });
    }
    form.reset({
      name: "",
      level: 3,
    });
  }

  function handleEdit(id: string) {
    const skill = data.skills.find((s) => s.id === id);
    if (skill) {
      form.reset(skill);
      setEditing(id);
    }
  }

  function handleDelete(id: string) {
    removeSkill(id);
    if (editing === id) {
      setEditing(null);
      form.reset({
        name: "",
        level: 3,
      });
    }
  }

  function handleCancel() {
    setEditing(null);
    form.reset({
      name: "",
      level: 3,
    });
  }

  function handleTemplateChange(value: string) {
    setTemplate(value);
  }

  function handlePaperSizeChange(value: string) {
    setPaperSize(value as "A4" | "Letter" | "Auto");
  }

  function getLevelLabel(level: number) {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Basic";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Intermediate";
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h3 className="text-lg font-medium mb-4">Your Skills</h3>
        {data.skills.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {data.skills.map((skill) => (
              <Card key={skill.id} className={editing === skill.id ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleEdit(skill.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-destructive"
                        onClick={() => handleDelete(skill.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground w-20">
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No skills added yet</p>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">
          {editing ? "Edit Skill" : "Add Skill"}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., JavaScript, Project Management" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a skill relevant to your professional background
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency Level: {getLevelLabel(field.value)}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Rate your proficiency from Beginner (1) to Expert (5)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            </div>

            <div className="flex justify-between gap-2">
              <div className="flex gap-2">
                {editing && (
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="gap-1">
                  {editing ? "Update" : <><Plus className="h-4 w-4" /> Add</>}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <Separator />

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Choose CV Template</h3>
          <RadioGroup 
            defaultValue={data.template} 
            onValueChange={handleTemplateChange}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="modern" id="modern" className="sr-only" />
              <label
                htmlFor="modern"
                className={`border-2 rounded-lg p-2 block cursor-pointer transition-all hover:border-primary ${
                  data.template === "modern" ? "border-primary" : "border-muted"
                }`}
              >
                <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                    <div className="w-full h-8 bg-primary mb-2 rounded"></div>
                    <div className="flex-1 flex">
                      <div className="w-1/3 bg-secondary/50 mr-2 rounded"></div>
                      <div className="flex-1 flex flex-col">
                        <div className="h-24 bg-secondary/50 mb-2 rounded"></div>
                        <div className="flex-1 bg-secondary/50 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center font-medium">Modern</p>
              </label>
            </div>

            <div>
              <RadioGroupItem value="classic" id="classic" className="sr-only" />
              <label
                htmlFor="classic"
                className={`border-2 rounded-lg p-2 block cursor-pointer transition-all hover:border-primary ${
                  data.template === "classic" ? "border-primary" : "border-muted"
                }`}
              >
                <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                    <div className="w-full h-10 bg-background mb-2 rounded">
                      <div className="w-1/2 h-4 bg-primary mt-1 ml-1 rounded"></div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="h-20 bg-secondary/50 mb-2 rounded"></div>
                      <div className="h-20 bg-secondary/50 mb-2 rounded"></div>
                      <div className="flex-1 bg-secondary/50 rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center font-medium">Classic</p>
              </label>
            </div>

            <div>
              <RadioGroupItem value="minimal" id="minimal" className="sr-only" />
              <label
                htmlFor="minimal"
                className={`border-2 rounded-lg p-2 block cursor-pointer transition-all hover:border-primary ${
                  data.template === "minimal" ? "border-primary" : "border-muted"
                }`}
              >
                <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                    <div className="w-full h-6 mb-2 rounded">
                      <div className="w-1/3 h-4 bg-primary rounded"></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-4 bg-secondary/50 w-5/6 rounded"></div>
                      <div className="h-4 bg-secondary/50 w-4/6 rounded"></div>
                      <div className="h-20 mt-2 bg-secondary/50 rounded"></div>
                      <div className="h-20 bg-secondary/50 rounded"></div>
                      <div className="h-4 bg-secondary/50 w-5/6 rounded"></div>
                      <div className="h-4 bg-secondary/50 w-4/6 rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center font-medium">Minimal</p>
              </label>
            </div>

            <div>
              <RadioGroupItem value="executive" id="executive" className="sr-only" />
              <label
                htmlFor="executive"
                className={`border-2 rounded-lg p-2 block cursor-pointer transition-all hover:border-primary ${
                  data.template === "executive" ? "border-primary" : "border-muted"
                }`}
              >
                <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                    <div className="w-full h-12 bg-gray-100 mb-2 rounded"></div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-16 bg-secondary/50 rounded"></div>
                      <div className="h-24 bg-secondary/50 rounded"></div>
                      <div className="h-16 bg-secondary/50 rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center font-medium">Executive</p>
              </label>
            </div>

            <div>
              <RadioGroupItem value="creative" id="creative" className="sr-only" />
              <label
                htmlFor="creative"
                className={`border-2 rounded-lg p-2 block cursor-pointer transition-all hover:border-primary ${
                  data.template === "creative" ? "border-primary" : "border-muted"
                }`}
              >
                <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                    <div className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 mb-2 rounded"></div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <div className="h-20 bg-secondary/50 rounded"></div>
                        <div className="h-20 bg-secondary/50 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-12 bg-secondary/50 rounded"></div>
                        <div className="h-28 bg-secondary/50 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center font-medium">Creative</p>
              </label>
            </div>

            <div>
              <RadioGroupItem value="compact" id="compact" className="sr-only" />
              <label
                htmlFor="compact"
                className={`border-2 rounded-lg p-2 block cursor-pointer transition-all hover:border-primary ${
                  data.template === "compact" ? "border-primary" : "border-muted"
                }`}
              >
                <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-card flex flex-col p-2">
                    <div className="w-full h-8 border-b-4 border-gray-900 mb-2"></div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-3 bg-secondary/50 w-3/4 rounded"></div>
                      <div className="h-3 bg-secondary/50 w-2/3 rounded"></div>
                      <div className="h-12 bg-secondary/50 mt-2 rounded"></div>
                      <div className="h-12 bg-secondary/50 rounded"></div>
                      <div className="h-12 bg-secondary/50 rounded"></div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center font-medium">Compact</p>
              </label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Paper Size</h3>
          <Select defaultValue={data.paperSize} onValueChange={handlePaperSizeChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select paper size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
              <SelectItem value="Letter">US Letter (216 × 279 mm)</SelectItem>
              <SelectItem value="Auto">Auto (Fit to Content)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button onClick={onComplete} disabled={data.skills.length === 0}>
            Preview CV
          </Button>
        </div>
      </div>
    </div>
  );
}