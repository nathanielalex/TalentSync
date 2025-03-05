import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Job } from "@shared/schema";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import SkillMatchVisualizer from "./skill-match-visualizer";

export default function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const applyMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/jobs/${job.id}/apply`, {
        coverLetter,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Application submitted successfully",
      });
      setOpen(false);
    },
  });

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(job.postedAt), "MMM d, yyyy")}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm">
              <strong>Salary:</strong> {job.salary}
            </p>
          </div>

          <p className="text-sm line-clamp-3 mb-4">{job.description}</p>

          {/* Add skill visualizer */}
          {!user?.isEmployer && (
            <div className="mb-4">
              <SkillMatchVisualizer job={job} user={user} />
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t pt-4">
          {!user?.isEmployer && (
            <Button onClick={() => setOpen(true)} className="w-full">
              Apply Now
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply to {job.title}</DialogTitle>
            <DialogDescription>
              Submit your application for {job.company}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Letter</label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Why are you a good fit for this position?"
                rows={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => applyMutation.mutate()}
              disabled={applyMutation.isPending}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}