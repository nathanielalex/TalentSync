import { Job, User } from "@shared/schema";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateJobMatch } from "@/lib/job-matching";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface SkillMatchVisualizerProps {
  job: Job;
  user?: User;
}

export default function SkillMatchVisualizer({ job, user }: SkillMatchVisualizerProps) {
  // Get match data from our algorithm
  const matchData = calculateJobMatch(job, user);

  // Prepare data for the radar chart
  const data = job.requiredSkills?.map((skill, index) => {
    const userSkillIndex = user?.skills?.indexOf(skill) ?? -1;
    return {
      skill,
      required: job.skillLevels?.[index] ?? 0,
      current: userSkillIndex >= 0 ? user?.skillLevels?.[userSkillIndex] : 0,
    };
  }) ?? [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Match Analysis</span>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Skills: {Math.round(matchData.skillMatch)}%
            </div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(matchData.overall)}% Match
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Required Skills"
                dataKey="required"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.3}
              />
              {user && (
                <Radar
                  name="Your Skills"
                  dataKey="current"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.3}
                />
              )}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {matchData.skillGaps.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Skills to Improve</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchData.skillGaps.map((gap, index) => (
                <Badge key={index} variant="secondary" className="bg-amber-50">
                  {gap.skill} (Level {gap.required} needed)
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}