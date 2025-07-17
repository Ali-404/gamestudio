
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Newspaper, Users, TrendingUp } from 'lucide-react';

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Jeux développés',
      value: '12',
      description: '+2 ce mois',
      icon: Gamepad2,
      color: 'text-primary'
    },
    {
      title: 'Articles publiés',
      value: '48',
      description: '+8 cette semaine',
      icon: Newspaper,
      color: 'text-green-500'
    },
    {
      title: 'Membres équipe',
      value: '15',
      description: '+1 ce mois',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Vues mensuelles',
      value: '24.5k',
      description: '+12% vs mois dernier',
      icon: TrendingUp,
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
