import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Gamepad2, Loader, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      toast({
        title: t('login.successTitle'),
        description: t('login.successDesc'),
      });
      navigate('/dashboard');
    } else {
      toast({
        title: t('login.errorTitle'),
        description: t('login.errorDesc'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-brandRed-500/10 rounded-full blur-3xl opacity-20"></div>

      <Card className="w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-0 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-brandRed-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-brandRed-600/20 rounded-2xl blur-xl"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {t('login.title')}
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 text-lg mt-2">
            {t('login.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.emailLabel')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12"
                  placeholder={t('login.emailPlaceholder')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('login.passwordLabel')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-12"
                  placeholder={t('login.passwordPlaceholder')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  {t('login.loading')}
                </div>
              ) : (
                t('login.submit')
              )}
            </Button>
          </form>

          <div className="pt-6 border-t">
            <div className="text-center text-sm">
              <p className="mb-3 font-medium">{t('login.testAccounts')}</p>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg">
                  <p className="font-semibold">Admin</p>
                  <p>admin@gamestudio.com / admin123</p>
                </div>
                <div className="p-3 rounded-lg">
                  <p className="font-semibold">{t('login.member')}</p>
                  <p>member@gamestudio.com / member123</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
