import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  // Mock account data
  const account = {
    name: 'Demo User',
    email: 'demo@vesto.app',
    stats: {
      pitches: 0,
      approved: 0,
      accuracy: 0,
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">
          Manage your profile and settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This is how your profile appears</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Name</span>
            <span className="text-lg">{account.name}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Email</span>
            <span className="text-lg">{account.email}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Edit Profile</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulator Stats</CardTitle>
          <CardDescription>Your performance with the AI Fund Manager</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Pitches Made</p>
              <p className="text-2xl font-semibold">{account.stats.pitches}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pitches Approved</p>
              <p className="text-2xl font-semibold">{account.stats.approved}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approval Rate</p>
              <p className="text-2xl font-semibold">{account.stats.accuracy}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p>Appearance</p>
            <Button variant="outline">Toggle Dark Mode</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">Log Out</Button>
        </CardFooter>
      </Card>

      <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="text-lg">MVP Note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            This is a demo MVP. In production, authentication will be handled by NextAuth with email/Google login,
            and all user data will be stored in Supabase with proper session management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

