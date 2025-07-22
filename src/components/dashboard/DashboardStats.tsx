import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Newspaper, Users, TrendingUp, Eye, Download, Star, Activity } from 'lucide-react';

interface Stat {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  trendUp: boolean;
}

export const DashboardStats = () => {
  const { t } = useTranslation();

  const stats: Stat[] = [
    { key: 'developedGames',    icon: Gamepad2,   color: 'text-blue-600',    bgColor: 'bg-blue-100 dark:bg-blue-900/20',    trendUp: true },
    { key: 'publishedArticles', icon: Newspaper,  color: 'text-green-600',   bgColor: 'bg-green-100 dark:bg-green-900/20',   trendUp: true },
    { key: 'teamMembers',       icon: Users,      color: 'text-purple-600',  bgColor: 'bg-purple-100 dark:bg-purple-900/20',  trendUp: true },
    { key: 'monthlyViews',      icon: Eye,        color: 'text-orange-600',  bgColor: 'bg-orange-100 dark:bg-orange-900/20',  trendUp: true },
    { key: 'downloads',         icon: Download,   color: 'text-cyan-600',    bgColor: 'bg-cyan-100 dark:bg-cyan-900/20',     trendUp: true },
    { key: 'averageRating',     icon: Star,       color: 'text-yellow-600',  bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',  trendUp: true },
    { key: 'engagement',        icon: Activity,   color: 'text-brandRed-600',bgColor: 'bg-brandRed-100 dark:bg-brandRed-900/20', trendUp: true },
    { key: 'growth',            icon: TrendingUp, color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',  trendUp: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t('dashboardStats.title')}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {t('dashboardStats.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.key}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t(`dashboardStats.stats.${stat.key}.title`)}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {t(`dashboardStats.stats.${stat.key}.value`)}
                </div>
                <div
                  className={`flex items-center text-xs font-medium ${
                    stat.trendUp ? 'text-green-600' : 'text-brandRed-600'
                  }`}
                >
                  <TrendingUp
                    className={`h-3 w-3 mr-1 ${stat.trendUp ? '' : 'rotate-180'}`}
                  />
                  {t(`dashboardStats.stats.${stat.key}.trend`)}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t(`dashboardStats.stats.${stat.key}.description`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Chart */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              {t('dashboardStats.performanceChart.title')}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              {t('dashboardStats.performanceChart.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {t('dashboardStats.performanceChart.placeholder')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              {t('dashboardStats.recentActivity.title')}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              {t('dashboardStats.recentActivity.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {['newGame', 'newArticle', 'newMember'].map((actKey, idx) => {
              const activity = t(`dashboardStats.recentActivity.items.${actKey}.action`);
              const time     = t(`dashboardStats.recentActivity.items.${actKey}.time`);
              const type     = t(`dashboardStats.recentActivity.items.${actKey}.type`);
              return (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      type === 'game' ? 'bg-blue-500' :
                      type === 'news' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {time}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
);
};
