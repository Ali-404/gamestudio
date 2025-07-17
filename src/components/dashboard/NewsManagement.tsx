
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Calendar, User, Eye, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: 'announcement' | 'update' | 'event' | 'release';
  views?: number;
  likes?: number;
  comments?: number;
}

export const NewsManagement = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Nouvelle mise à jour majeure disponible',
      content: 'Découvrez les nouvelles fonctionnalités de notre dernier jeu avec des améliorations graphiques, de nouveaux niveaux et des mécaniques de gameplay révolutionnaires qui changeront votre expérience de jeu.',
      author: 'Admin',
      date: '2024-01-15',
      category: 'update',
      views: 1250,
      likes: 89,
      comments: 23
    },
    {
      id: '2',
      title: 'Extension de notre studio de développement',
      content: 'Nous agrandissons notre équipe avec de nouveaux talents créatifs pour développer des expériences gaming encore plus immersives et innovantes.',
      author: 'Admin',
      date: '2024-01-10',
      category: 'announcement',
      views: 890,
      likes: 67,
      comments: 12
    },
    {
      id: '3',
      title: 'Participation au Game Developers Conference',
      content: 'Retrouvez-nous au GDC 2024 où nous présenterons nos dernières innovations et technologies de développement.',
      author: 'Marketing Team',
      date: '2024-01-08',
      category: 'event',
      views: 634,
      likes: 45,
      comments: 8
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
    title: '',
    content: '',
    author: 'Admin',
    date: '',
    category: 'announcement'
  });

  const { toast } = useToast();

  const handleAddNews = () => {
    if (!newNews.title || !newNews.content) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    const newsItem: NewsItem = {
      ...newNews,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0
    };

    setNews([newsItem, ...news]);
    setNewNews({ title: '', content: '', author: 'Admin', date: '', category: 'announcement' });
    setIsAdding(false);
    
    toast({
      title: "Article publié",
      description: "L'article a été publié avec succès",
    });
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé avec succès",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'update': return 'bg-green-100 text-green-800 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'release': return 'bg-brandRed-100 text-brandRed-800 border-brandRed-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'announcement': return 'Annonce';
      case 'update': return 'Mise à jour';
      case 'event': return 'Événement';
      case 'release': return 'Sortie';
      default: return category;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Gestion des Actualités</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Publiez et gérez les actualités de votre studio
          </p>
        </div>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-gradient-to-r from-primary to-brandRed-600 hover:from-primary/90 hover:to-brandRed-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouvel article
        </Button>
      </div>

      {/* Add News Form */}
      {isAdding && (
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-t-lg">
            <CardTitle className="text-slate-900 dark:text-white flex items-center">
              <Plus className="mr-2 h-5 w-5 text-primary" />
              Nouvel Article
            </CardTitle>
            <CardDescription>Rédigez et publiez un nouvel article</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700 dark:text-slate-300 font-medium">
                  Titre de l'article
                </Label>
                <Input
                  id="title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="h-11 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary"
                  placeholder="Ex: Nouvelle mise à jour disponible"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700 dark:text-slate-300 font-medium">
                  Catégorie
                </Label>
                <select
                  id="category"
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })}
                  className="h-11 w-full px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="announcement">Annonce</option>
                  <option value="update">Mise à jour</option>
                  <option value="event">Événement</option>
                  <option value="release">Sortie</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-700 dark:text-slate-300 font-medium">
                Contenu de l'article
              </Label>
              <textarea
                id="content"
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Rédigez votre article ici..."
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleAddNews} 
                className="bg-gradient-to-r from-primary to-brandRed-600 hover:from-primary/90 hover:to-brandRed-600/90 text-white shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Publier l'article
              </Button>
              <Button 
                onClick={() => setIsAdding(false)} 
                variant="outline"
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* News List */}
      <div className="space-y-6">
        {news.map((item, index) => (
          <Card 
            key={item.id} 
            className="group border-0 shadow-lg hover:shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Stats */}
                  {(item.views || item.likes || item.comments) && (
                    <div className="flex items-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {item.views && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Eye className="h-4 w-4" />
                          <span>{item.views.toLocaleString()} vues</span>
                        </div>
                      )}
                      {item.likes && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Heart className="h-4 w-4" />
                          <span>{item.likes} likes</span>
                        </div>
                      )}
                      {item.comments && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <MessageCircle className="h-4 w-4" />
                          <span>{item.comments} commentaires</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteNews(item.id)}
                    className="border-brandRed-300 dark:border-brandRed-600 text-brandRed-600 hover:bg-brandRed-100 dark:hover:bg-brandRed-900/20 hover:text-brandRed-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Aucun article pour le moment</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Commencez par publier votre premier article</p>
          <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Button>
        </div>
      )}
    </div>
  );
};
