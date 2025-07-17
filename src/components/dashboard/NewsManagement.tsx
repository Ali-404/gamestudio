
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export const NewsManagement = () => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Nouvelle mise à jour disponible',
      content: 'Découvrez les nouvelles fonctionnalités de notre dernier jeu...',
      author: 'Admin',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Extension du studio',
      content: 'Nous agrandissons notre équipe avec de nouveaux talents...',
      author: 'Admin',
      date: '2024-01-10'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
    title: '',
    content: '',
    author: 'Admin',
    date: ''
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
      date: new Date().toISOString().split('T')[0]
    };

    setNews([newsItem, ...news]);
    setNewNews({ title: '', content: '', author: 'Admin', date: '' });
    setIsAdding(false);
    
    toast({
      title: "Article ajouté",
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Actualités</h2>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouvel article
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Nouvel Article</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-white">Titre</Label>
              <Input
                id="title"
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                className="bg-dark border-primary/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-white">Contenu</Label>
              <textarea
                id="content"
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-primary/30 bg-dark text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Rédigez votre article..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddNews} className="bg-primary hover:bg-primary/90">
                Publier
              </Button>
              <Button 
                onClick={() => setIsAdding(false)} 
                variant="outline"
                className="border-primary/30 text-white hover:bg-primary/10"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id} className="bg-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-2">{item.content}</p>
                  <p className="text-sm text-primary">Par {item.author} • {item.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteNews(item.id)}
                    className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
