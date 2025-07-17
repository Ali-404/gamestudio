
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Newspaper, Users, TrendingUp, Eye, Download, Star, Activity } from 'lucide-react';

export const DashboardStats = () => {
  const stats = [
    {
      title: 'Jeux Développés',
      value: '12',
      description: '+2 ce mois',
      icon: Gamepad2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      trend: '+16.7%',
      trendUp: true
    },
    {
      title: 'Articles Publiés',
      value: '48',
      description: '+8 cette semaine',
      icon: Newspaper,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      trend: '+12.3%',
      trendUp: true
    },
    {
      title: 'Membres Équipe',
      value: '15',
      description: '+1 ce mois',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      trend: '+6.7%',
      trendUp: true
    },
    {
      title: 'Vues Mensuelles',
      value: '124.5k',
      description: '+12% vs mois dernier',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      trend: '+12.1%',
      trendUp: true
    },
    {
      title: 'Téléchargements',
      value: '8.2k',
      description: 'Ce mois',
      icon: Download,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/20',
      trend: '+28.4%',
      trendUp: true
    },
    {
      title: 'Note Moyenne',
      value: '4.8',
      description: '/5 étoiles',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      trend: '+0.2',
      trendUp: true
    },
    {
      title: 'Activité',
      value: '94%',
      description: 'Engagement',
      icon: Activity,
      color: 'text-brandRed-600',
      bgColor: 'bg-brandRed-100 dark:bg-brandRed-900/20',
      trend: '+5.1%',
      trendUp: true
    },
    {
      title: 'Croissance',
      value: '2.4x',
      description: 'Cette année',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
      trend: '+140%',
      trendUp: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Tableau de Bord Analytique
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Vue d'ensemble des performances de votre studio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className={`flex items-center text-xs font-medium ${
                  stat.trendUp ? 'text-green-600' : 'text-brandRed-600'
                }`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${stat.trendUp ? '' : 'rotate-180'}`} />
                  {stat.trend}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Chart Placeholder */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Performance des Jeux
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Évolution des téléchargements sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Graphique de performance (à intégrer avec Recharts)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Activité Récente
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Dernières actions dans le studio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: 'Nouveau jeu publié', time: 'Il y a 2 heures', type: 'game' },
              { action: 'Article de blog ajouté', time: 'Il y a 5 heures', type: 'news' },
              { action: 'Membre ajouté à l\'équipe', time: 'Il y a 1 jour', type: 'team' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'game' ? 'bg-blue-500' :
                  activity.type === 'news' ? 'bg-green-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
