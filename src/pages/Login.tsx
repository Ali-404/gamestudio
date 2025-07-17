
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Gamepad2, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans votre espace admin !",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Gamepad2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Connexion Admin</CardTitle>
          <CardDescription className="text-muted-foreground">
            Accédez à votre espace de gestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-dark border-primary/30 text-white focus:border-primary"
                placeholder="admin@gamestudio.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark border-primary/30 text-white focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="mb-2">Comptes de test :</p>
            <p>Admin: admin@gamestudio.com / admin123</p>
            <p>Membre: member@gamestudio.com / member123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
