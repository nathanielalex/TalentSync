import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
// import { insertUserSchema } from "@shared/schema";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";


export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 grid md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:flex flex-col justify-center p-8 bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to TalentSync</h1>
          <p className="text-lg mb-8">
            Connect with top employers and find your dream job, or hire the best
            talent for your company.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554774853-b415df9eeb92"
                alt="Professional"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496358773-bdcdbd984982"
                alt="Professional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const { loginMutation } = useAuth();
  const form = useForm({
    resolver: zodResolver(insertUserSchema.pick({ username: true, password: true })),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))}
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          Login
        </Button>
      </form>
    </Form>
  );
}

function RegisterForm() {
  const { registerMutation } = useAuth();
  const [skillInput, setSkillInput] = useState("");
  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      isEmployer: false,
      skills: [],
      skillLevels: [],
    },
  });

  const isEmployer = form.watch("isEmployer");

  const addSkill = () => {
    if (!skillInput.trim()) return;

    const currentSkills = form.getValues("skills") || [];
    const currentLevels = form.getValues("skillLevels") || [];

    form.setValue("skills", [...currentSkills, skillInput.trim()]);
    form.setValue("skillLevels", [...currentLevels, 3]); // Default level is 3
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills") || [];
    const currentLevels = form.getValues("skillLevels") || [];

    form.setValue("skills", currentSkills.filter((_, i) => i !== index));
    form.setValue("skillLevels", currentLevels.filter((_, i) => i !== index));
  };

  const updateSkillLevel = (index: number, level: number) => {
    const currentLevels = form.getValues("skillLevels") || [];
    const newLevels = [...currentLevels];
    newLevels[index] = level;
    form.setValue("skillLevels", newLevels);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))}
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isEmployer"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!mt-0">I'm an employer</FormLabel>
            </FormItem>
          )}
        />
        {isEmployer ? (
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
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

            <div className="space-y-4">
              <FormLabel>Your Skills</FormLabel>
              <FormDescription>
                Add your skills and rate your proficiency level (1-5)
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
                {form.watch("skills")?.map((skill, index) => (
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
          </>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          Register
        </Button>
      </form>
    </Form>
  );
}