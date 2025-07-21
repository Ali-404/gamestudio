import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Calendar, Code, Image as ImageIcon, Play, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: string;
  title: string;
  description: string;
  technologies: string;
  image: string;
  releaseDate: string;
  status: 'development' | 'released' | 'beta';
  downloads?: number;
}

export const GameManagement = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      title: 'Mystic Adventures',
      description: t('game1Desc'),
      technologies: 'Unity, C#, Blender',
      image: '/placeholder.svg',
      releaseDate: '2024-01-15',
      status: 'released',
      downloads: 12500
    },
    {
      id: '2',
      title: 'Space Explorer',
      description: t('game2Desc'),
      technologies: 'Unreal Engine, Blueprint, Maya',
      image: '/placeholder.svg',
      releaseDate: '2024-03-20',
      status: 'beta',
      downloads: 3200
    },
    {
      id: '3',
      title: 'Cyber Legends',
      description: t('game3Desc'),
      technologies: 'Unity, C#, Photoshop',
      image: '/placeholder.svg',
      releaseDate: '2024-06-10',
      status: 'development'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newGame, setNewGame] = useState<Omit<Game, 'id'>>({
    title: '',
    description: '',
    technologies: '',
    image: '',
    releaseDate: '',
    status: 'development'
  });

  const { toast } = useToast();

  const handleAddGame = () => {
    if (!newGame.title || !newGame.description) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: 'destructive',
      });
      return;
    }

    const game: Game = {
      ...newGame,
      id: Date.now().toString()
    };

    setGames([...games, game]);
    setNewGame({ title: '', description: '', technologies: '', image: '', releaseDate: '', status: 'development' });
    setIsAdding(false);
    
    toast({
      title: t('gameAdded'),
      description: t('gameAddedDesc'),
    });
  };

  const handleDeleteGame = (id: string) => {
    setGames(games.filter(game => game.id !== id));
    toast({
      title: t('gameDeleted'),
      description: t('gameDeletedDesc'),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'released': return 'bg-green-100 text-green-800 border-green-200';
      case 'beta': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'development': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'released': return <Play className="h-3 w-3" />;
      case 'beta': return <Download className="h-3 w-3" />;
      case 'development': return <Code className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('gameManagementTitle')}</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{t('gameManagementDesc')}</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="bg-gradient-to-r from-primary to-brandRed-600 hover:from-primary/90 hover:to-brandRed-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          {t('newGame')}
        </Button>
      </div>

      {isAdding && (
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-t-lg">
            <CardTitle className="text-slate-900 dark:text-white flex items-center">
              <Plus className="mr-2 h-5 w-5 text-primary" />
              {t('newGame')}
            </CardTitle>
            <CardDescription>{t('newGameDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700 dark:text-slate-300 font-medium">
                  {t('gameTitle')}
                </Label>
                <Input
                  id="title"
                  value={newGame.title}
                  onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                  className="h-11"
                  placeholder={t('gameTitlePlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technologies" className="text-slate-700 dark:text-slate-300 font-medium">
                  {t('technologiesUsed')}
                </Label>
                <Input
                  id="technologies"
                  value={newGame.technologies}
                  onChange={(e) => setNewGame({ ...newGame, technologies: e.target.value })}
                  className="h-11"
                  placeholder={t('technologiesPlaceholder')}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-700 dark:text-slate-300 font-medium">
                {t('description')}
              </Label>
              <textarea
                id="description"
                value={newGame.description}
                onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                className="w-full min-h-[100px]"
                placeholder={t('descriptionPlaceholder')}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAddGame} className="bg-gradient-to-r from-primary to-brandRed-600 text-white shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                {t('addGame')}
              </Button>
              <Button onClick={() => setIsAdding(false)} variant="outline">
                {t('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {games.map((game, index) => (
          <Card key={game.id} className="group border-0 shadow-lg hover:shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-0">
              <div className="relative h-32 bg-gradient-to-br from-primary/10 to-brandRed-600/10 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(game.status)}`}>
                    {getStatusIcon(game.status)}
                    {t(game.status)}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteGame(game.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {game.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    {game.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    <span>{game.technologies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {game.downloads && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{t('downloads')}</span>
                      <span className="text-lg font-bold text-primary">
                        {game.downloads.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{t('noGamesYet')}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{t('startByAdding')}</p>
          <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            {t('addGame')}
          </Button>
        </div>
      )}
    </div>
  );
};
