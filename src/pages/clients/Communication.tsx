import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, Clock, Send, Edit, Plus } from "lucide-react";

// Dummy data for demonstration
const metricsData = [
  { name: 'Mon', value: 85 },
  { name: 'Tue', value: 78 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 88 },
  { name: 'Fri', value: 95 },
  { name: 'Sat', value: 75 },
  { name: 'Sun', value: 82 },
];

const Communication = () => {
  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Send className="h-5 w-5" />
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Mail className="h-5 w-5" />
              Open Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">87%</div>
            <p className="text-sm text-muted-foreground">Industry avg: 75%</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5" />
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <p className="text-sm text-muted-foreground">Messages pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Chart */}
      <Card className="bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground">Engagement Overview</CardTitle>
          <CardDescription className="text-muted-foreground">Message performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    color: 'var(--foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--primary)' }}
                  activeDot={{ r: 6, fill: 'var(--primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Automation and Templates Section */}
      <Tabs defaultValue="automation" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="automation" className="text-foreground">Automation</TabsTrigger>
          <TabsTrigger value="templates" className="text-foreground">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="automation" className="space-y-4">
          <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Automation Rules</CardTitle>
              <CardDescription className="text-muted-foreground">Set up triggers and actions for automated messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg bg-background/50 hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground">Onboarding Welcome</h4>
                  <p className="text-sm text-muted-foreground">Sends after client signup</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg bg-background/50 hover:bg-accent/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground">Payment Success</h4>
                  <p className="text-sm text-muted-foreground">Confirms successful payments</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>

              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create New Automation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Message Templates</CardTitle>
              <CardDescription className="text-muted-foreground">Pre-made templates for common scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-background/50 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground">Welcome Message</h4>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Hello {'{ClientName}'}, welcome to our service! We're excited to have you..."
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-background/50 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-foreground">Payment Reminder</h4>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Hi {'{ClientName}'}, this is a friendly reminder about your upcoming payment..."
                  </p>
                </div>

                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communication;