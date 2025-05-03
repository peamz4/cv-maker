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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCVStore } from "@/lib/cv-store";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "@/lib/uuid";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const experienceSchema = z.object({
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  location: z.string().optional(),
  startDate: z.string().min(2, {
    message: "Please enter a valid date.",
  }),
  endDate: z.string().min(2, {
    message: "Please enter a valid date.",
  }).or(z.literal("")),
  current: z.boolean().default(false),
  description: z.string().min(10, {
    message: "Please provide a brief description of your responsibilities.",
  }),
});

type ExperienceValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  onComplete: () => void;
}

export function ExperienceForm({ onComplete }: ExperienceFormProps) {
  const { data, addExperience, updateExperience, removeExperience } = useCVStore();
  const [editing, setEditing] = useState<string | null>(null);
  
  const form = useForm<ExperienceValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  // Watch for changes to the "current" checkbox
  const currentJob = form.watch("current");
  
  useEffect(() => {
    // If "current job" is checked, set end date to "Present" and disable the field
    if (currentJob) {
      form.setValue("endDate", "Present");
    } else if (form.getValues("endDate") === "Present") {
      form.setValue("endDate", "");
    }
  }, [currentJob, form]);

  function onSubmit(values: ExperienceValues) {
    if (editing) {
      updateExperience(editing, values);
      setEditing(null);
    } else {
      addExperience({
        id: uuidv4(),
        ...values,
        location: values.location ?? "",
      });
    }
    form.reset({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  }

  function handleEdit(id: string) {
    const experience = data.experience.find((exp) => exp.id === id);
    if (experience) {
      form.reset(experience);
      setEditing(id);
    }
  }

  function handleDelete(id: string) {
    removeExperience(id);
    if (editing === id) {
      setEditing(null);
      form.reset({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
    }
  }

  function handleCancel() {
    setEditing(null);
    form.reset({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h3 className="text-lg font-medium mb-4">Your Work Experience</h3>
        {data.experience.length > 0 ? (
          <div className="space-y-4">
            {data.experience.map((experience) => (
              <Card key={experience.id} className={editing === experience.id ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{experience.position}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(experience.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(experience.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{experience.company}</p>
                  {experience.location && (
                    <p className="text-sm text-muted-foreground">{experience.location}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    {experience.startDate} - {experience.endDate}
                  </p>
                  <p className="mt-2 text-sm">{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No work experience entries yet</p>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">
          {editing ? "Edit Experience" : "Add Experience"}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country or Remote" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan 2020" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Dec 2022" 
                        {...field} 
                        disabled={form.watch("current")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="current"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      This is my current job
                    </FormLabel>
                    <FormDescription>
                      If checked, end date will be set to &quot;Present&quot;
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use bullet points (•) to highlight key responsibilities and achievements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                {data.experience.length > 0 && !editing && (
                  <Button type="button" onClick={onComplete}>
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}