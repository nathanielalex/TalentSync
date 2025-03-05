import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export default function PostJob() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [skillInput, setSkillInput] = useState("");
  const form = useForm({
    resolver: zodResolver(insertJobSchema),
    defaultValues: {
      requiredSkills: [],
      skillLevels: [],
    },
  });

  const addSkill = () => {
    if (!skillInput.trim()) return;

    const currentSkills = form.getValues("requiredSkills") || [];
    const currentLevels = form.getValues("skillLevels") || [];

    form.setValue("requiredSkills", [...currentSkills, skillInput.trim()]);
    form.setValue("skillLevels", [...currentLevels, 3]); // Default level is 3
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("requiredSkills") || [];
    const currentLevels = form.getValues("skillLevels") || [];

    form.setValue("requiredSkills", currentSkills.filter((_, i) => i !== index));
    form.setValue("skillLevels", currentLevels.filter((_, i) => i !== index));
  };

  const updateSkillLevel = (index: number, level: number) => {
    const currentLevels = form.getValues("skillLevels") || [];
    const newLevels = [...currentLevels];
    newLevels[index] = level;
    form.setValue("skillLevels", newLevels);
  };

  const postJobMutation = useMutation({
    mutationFn: async (data: unknown) => {
      const res = await apiRequest("POST", "/api/jobs", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({
        title: "Success",
        description: "Job posted successfully",
      });
      setLocation("/");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Post a New Job</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => postJobMutation.mutate(data))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. $80,000 - $100,000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Required Skills</FormLabel>
              <FormDescription>
                Add skills and set their required proficiency level (1-5)
              </FormDescription>

              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {form.watch("requiredSkills")?.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-lg p-2"
                  >
                    <Badge variant="secondary">{skill}</Badge>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={form.watch("skillLevels")?.[index] ?? 3}
                      onChange={(e) => updateSkillLevel(index, parseInt(e.target.value))}
                      className="w-16"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={postJobMutation.isPending}
            >
              Post Job
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}