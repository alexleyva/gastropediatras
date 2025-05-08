
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icons';
import type { IconKeys } from '@/components/icons';

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  iconName: IconKeys;
  linkText: string;
}

function DashboardCard({ title, description, href, iconName, linkText }: DashboardCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        <Icon name={iconName} className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        <Button asChild className="w-full sm:w-auto">
          <Link href={href}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem("isAuthenticated");
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to GastroKid Eval</h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive solution for pediatric gastroenterology evaluations.
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="shadow-md">
          <Icon name="LogOut" className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="New Evaluation"
          description="Start a new patient evaluation process."
          href="/evaluations/new"
          iconName="FilePlus2"
          linkText="Create Evaluation"
        />
        <DashboardCard
          title="Patient Records"
          description="Manage and search existing patient records."
          href="/patients"
          iconName="Users2"
          linkText="View Patients"
        />
        <DashboardCard
          title="Laboratory Exams"
          description="Upload and manage lab results and imaging."
          href="/lab-exams"
          iconName="Beaker"
          linkText="Manage Exams"
        />
      </section>

      {/* Placeholder for additional dashboard elements */}
      {/* <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to display.</p>
          </CardContent>
        </Card>
      </section> */}
    </div>
  );
}

