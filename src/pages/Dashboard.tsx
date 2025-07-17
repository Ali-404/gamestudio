
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
import { LogOut, Users, Gamepad2, Newspaper } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-card border-b border-primary/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
            <p className="text-muted-foreground">Bienvenue, {user.name}</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {user.role === 'admin' ? (
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card">
              <TabsTrigger value="stats" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Statistiques
              </TabsTrigger>
              <TabsTrigger value="games" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Jeux
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Newspaper className="mr-2 h-4 w-4" />
                Actualités
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Users className="mr-2 h-4 w-4" />
                Équipe
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <DashboardStats />
            </TabsContent>

            <TabsContent value="games">
              <GameManagement />
            </TabsContent>

            <TabsContent value="news">
              <NewsManagement />
            </TabsContent>

            <TabsContent value="team">
              <TeamManagement />
            </TabsContent>
          </Tabs>
        ) : (
          // Vue membre de l'équipe (lecture seule)
          <div className="space-y-6">
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Espace Membre</CardTitle>
                <CardDescription>
                  Vous avez accès aux informations de l'équipe en lecture seule
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
