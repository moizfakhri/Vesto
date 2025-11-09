'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MODULES } from "@/types";
import Link from "next/link";

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
        <p className="text-muted-foreground">
          From basic definitions to expert-level comparative analysis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((module, index) => {
          const progress = index === 0 ? 60 : index === 1 ? 20 : 0; // Mock progress
          const levelColors = {
            easy: "secondary",
            intermediate: "default",
            advanced: "default",
            expert: "destructive"
          };

          return (
            <Card key={module.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <Badge variant={levelColors[module.level] as any} className="capitalize">
                    {module.level}
                  </Badge>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Progress value={progress} className="mb-2" />
                <p className="text-xs text-muted-foreground">{progress}% complete</p>
              </CardContent>
              <CardFooter>
                <Link href={`/learn/${module.id}`} className="w-full">
                  <Button className="w-full">
                    {progress === 0 ? 'Start Module' : 'Continue Module'}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>How Learning Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Each module focuses on specific aspects of financial analysis</p>
          <p>• Select a company ticker to analyze and answer questions about their financials</p>
          <p>• Get AI-powered feedback on your written responses (scored 0-100)</p>
          <p>• Track your progress and improve your analysis skills</p>
        </CardContent>
      </Card>
    </div>
  );
}

