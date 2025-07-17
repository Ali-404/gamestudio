
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: string;
  title: string;
  description: string;
  technologies: string;
  image: string;
  releaseDate: string;
}

export const GameManagement = () => {
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      title: 'Mystic Adventures',
      description: 'Un RPG fantastique immersif',
      technologies: 'Unity, C#',
      image: '/placeholder.svg',
      releaseDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Space Explorer',
      description: 'Exploration spatiale en 3D',
      technologies: 'Unreal Engine, Blueprint',
      image: '/placeholder.svg',
      releaseDate: '2024-03-20'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newGame, setNewGame] = useState<Omit<Game, 'id'>>({
    title: '',
    description: '',
    technologies: '',
    image: '',
    releaseDate: ''
  });

  const { toast } = useToast();

  const handleAddGame = () => {
    if (!newGame.title || !newGame.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    const game: Game = {
      ...newGame,
      id: Date.now().toString()
    };

    setGames([...games, game]);
    setNewGame({ title: '', description: '', technologies: '', image: '', releaseDate: '' });
    setIsAdding(false);
    
    toast({
      title: "Jeu ajouté",
      description: "Le jeu a été ajouté avec succès",
    });
  };

  const handleDeleteGame = (id: string) => {
    setGames(games.filter(game => game.id !== id));
    toast({
      title: "Jeu supprimé",
      description: "Le jeu a été supprimé avec succès",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Jeux</h2>
        <Button 
          onClick={() => setIsAdding(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un jeu
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Nouveau Jeu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="title" className="text-white">Titre</Label>
                <Input
                  id="title"
                  value={newGame.title}
                  onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                  className="bg-dark border-primary/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="technologies" className="text-white">Technologies</Label>
                <Input
                  id="technologies"
                  value={newGame.technologies}
                  onChange={(e) => setNewGame({ ...newGame, technologies: e.target.value })}
                  className="bg-dark border-primary/30 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Input
                id="description"
                value={newGame.description}
                onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                className="bg-dark border-primary/30 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddGame} className="bg-primary hover:bg-primary/90">
                Ajouter
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
        {games.map((game) => (
          <Card key={game.id} className="bg-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{game.title}</h3>
                  <p className="text-muted-foreground mb-2">{game.description}</p>
                  <p className="text-sm text-primary">{game.technologies}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteGame(game.id)}
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
