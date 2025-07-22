
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameManagement } from '@/components/dashboard/GameManagement';
import { NewsManagement } from '@/components/dashboard/NewsManagement';
import { TeamManagement } from '@/components/dashboard/TeamManagement';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { LogOut, Users, Gamepad2, Newspaper, BarChart3, Settings, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-brandRed-600 rounded-xl flex items-center justify-center">
                  <img src='/images/4.png' />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Fuyoz Games
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t("dashboard.subtitle")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-brandRed-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-brandRed-500 rounded-full"></span>
              </Button>

              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>

              <Button onClick={handleLogout} variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                <LogOut className="mr-2 h-4 w-4" />
                {t("dashboard.logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {user.role === 'admin' ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {t("dashboard.welcome")}, {user.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {t("dashboard.description")}
              </p>
            </div>

            <Tabs defaultValue="stats" className="space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-700">
                <TabsList className="bg-transparent h-auto p-0 space-x-8">
                  <TabsTrigger value="stats" className="...">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    {t("dashboard.tabs.stats")}
                  </TabsTrigger>
                  <TabsTrigger value="games" className="...">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    {t("dashboard.tabs.games")}
                  </TabsTrigger>
                  <TabsTrigger value="news" className="...">
                    <Newspaper className="mr-2 h-5 w-5" />
                    {t("dashboard.tabs.news")}
                  </TabsTrigger>
                  <TabsTrigger value="team" className="...">
                    <Users className="mr-2 h-5 w-5" />
                    {t("dashboard.tabs.team")}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="stats" className="mt-8">
                <DashboardStats />
              </TabsContent>

              <TabsContent value="games" className="mt-8">
                <GameManagement />
              </TabsContent>

              <TabsContent value="news" className="mt-8">
                <NewsManagement />
              </TabsContent>

              <TabsContent value="team" className="mt-8">
                <TeamManagement />
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {t("dashboard.memberSpace")}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {t("dashboard.memberWelcome")}, {user.name}
              </p>
            </div>

            <Card className="border-0 shadow-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  {t("dashboard.teamInfoTitle")}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 text-base">
                  {t("dashboard.teamInfoDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamManagement readonly />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;