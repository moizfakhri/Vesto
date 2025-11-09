import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LineChart, TrendingUp, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Master Financial Analysis
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn to analyze companies through interactive modules and practice with our AI-powered stock simulator
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/learn">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Start Learning
            </Button>
          </Link>
          <Link href="/simulator">
            <Button size="lg" variant="outline" className="gap-2">
              <LineChart className="h-5 w-5" />
              Try Simulator
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
            <CardTitle>Interactive Modules</CardTitle>
            <CardDescription>
              Learn fundamentals, 10-K analysis, and competitive analysis through structured lessons
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
            <CardTitle>AI-Powered Feedback</CardTitle>
            <CardDescription>
              Get detailed, rubric-based feedback on your analysis from our AI grading system
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Award className="h-10 w-10 text-purple-600 mb-2" />
            <CardTitle>Stock Simulator</CardTitle>
            <CardDescription>
              Pitch stocks to our AI Fund Manager and build a paper trading portfolio
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Vesto Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Learn the Fundamentals</h3>
              <p className="text-sm text-muted-foreground">
                Start with Module 1 to understand P/E ratios, EBITDA, ROE, and other key metrics
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Analyze Real Companies</h3>
              <p className="text-sm text-muted-foreground">
                Practice analyzing 20 major companies using real financial data and mock 10-K reports
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Get AI Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Receive detailed feedback on your analysis scored across 5 criteria worth 100 points
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Test Your Skills</h3>
              <p className="text-sm text-muted-foreground">
                Pitch stocks to our AI Fund Manager and build a paper trading portfolio with $10,000
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join Vesto and start mastering financial analysis today
          </p>
          <Link href="/learn">
            <Button size="lg" variant="secondary">
              Begin Your Journey
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
