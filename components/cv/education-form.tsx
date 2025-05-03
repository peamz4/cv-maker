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
import { useCVStore } from "@/lib/cv-store";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "@/lib/uuid";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const educationSchema = z.object({
  institution: z.string().min(2, {
    message: "Institution name must be at least 2 characters.",
  }),
  degree: z.string().min(2, {
    message: "Degree must be at least 2 characters.",
  }),
  field: z.string().min(2, {
    message: "Field of study must be at least 2 characters.",
  }),
  startDate: z.string().min(4, {
    message: "Please enter a valid year.",
  }),
  endDate: z.string().min(4, {
    message: "Please enter a valid year.",
  }).or(z.literal("Present")),
  description: z.string().optional(),
});

type EducationValues = z.infer<typeof educationSchema>;

interface EducationFormProps {
  onComplete: () => void;
}

export function EducationForm({ onComplete }: EducationFormProps) {
  const { data, addEducation, updateEducation, removeEducation } = useCVStore();
  const [editing, setEditing] = useState<string | null>(null);
  
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  function onSubmit(values: EducationValues) {
    if (editing) {
      updateEducation(editing, {
        ...values,
        description: values.description || ""
      });
      setEditing(null);
    } else {
      addEducation({
        id: uuidv4(),
        ...values,
        description: values.description || ""
      });
    }
    form.reset({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  function handleEdit(id: string) {
    const education = data.education.find((edu) => edu.id === id);
    if (education) {
      form.reset(education);
      setEditing(id);
    }
  }

  function handleDelete(id: string) {
    removeEducation(id);
    if (editing === id) {
      setEditing(null);
      form.reset({
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  }

  function handleCancel() {
    setEditing(null);
    form.reset({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h3 className="text-lg font-medium mb-4">Your Education</h3>
        {data.education.length > 0 ? (
          <div className="space-y-4">
            {data.education.map((education) => (
              <Card key={education.id} className={editing === education.id ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{education.institution}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(education.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(education.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{education.degree} in {education.field}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {education.startDate} - {education.endDate}
                  </p>
                  {education.description && <p className="mt-2 text-sm">{education.description}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No education entries yet</p>
          </div>
        )}
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">
          {editing ? "Edit Education" : "Add Education"}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University/School Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor's, Master's, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science, Business, etc." {...field} />
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
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2018" {...field} />
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
                    <FormLabel>End Year (or &quot;Present&quot;)</FormLabel>
                    <FormControl>
                      <Input placeholder="2022 or Present" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Courses, achievements, activities..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include relevant courses, achievements, or activities
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
                {data.education.length > 0 && !editing && (
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