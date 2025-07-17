
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const games = [
    {
      id: '1',
      title: 'Cyber Legends',
      description: 'Un RPG futuriste dans un monde cyberpunk immersif avec des mécaniques de combat innovantes.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      technologies: ['Unity', 'C#', 'Blender'],
      releaseDate: '2024',
      players: 'Solo / Multi',
      status: 'En développement' as const,
    },
    {
      id: '2',
      title: 'Mystic Realms',
      description: 'Aventure fantastique en monde ouvert avec des quêtes épiques et un système de magie unique.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400',
      technologies: ['Unreal Engine', 'Blueprint', 'Maya'],
      releaseDate: '2023',
      players: 'Solo',
      status: 'Publié' as const,
    },
    {
      id: '3',
      title: 'Racing Thunder',
      description: 'Jeu de course arcade avec des voitures personnalisables et des circuits spectaculaires.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
      technologies: ['Unity', 'C#', 'Photon'],
      releaseDate: '2024',
      players: 'Multi',
      status: 'Bêta' as const,
    },
    {
      id: '4',
      title: 'Space Odyssey',
      description: 'Exploration spatiale en réalité virtuelle avec des combats épiques et des planètes à découvrir.',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
      technologies: ['Unity VR', 'C#', 'OpenXR'],
      releaseDate: '2023',
      players: 'Solo',
      status: 'Publié' as const,
    },
    {
      id: '5',
      title: 'Medieval Conquest',
      description: 'Stratégie en temps réel dans un univers médiéval avec gestion de royaume et batailles massives.',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
      technologies: ['Unreal Engine', 'C++', 'MySQL'],
      releaseDate: '2024',
      players: 'Multi',
      status: 'En développement' as const,
    },
    {
      id: '6',
      title: 'Puzzle Master',
      description: 'Jeu de réflexion innovant avec des mécaniques de puzzle en 3D et des défis créatifs.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      technologies: ['Unity', 'C#', 'ProBuilder'],
      releaseDate: '2023',
      players: 'Solo',
      status: 'Publié' as const,
    },
  ];

  const categories = ['Tous', 'RPG', 'Course', 'Stratégie', 'Puzzle', 'VR'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || 
                           game.technologies.some(tech => tech.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos <span className="text-primary">Jeux</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez notre portfolio de jeux innovants, chacun conçu avec passion et expertise
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un jeu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-dark/50 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-primary text-white" 
                      : "border-gray-600 text-gray-400 hover:text-primary hover:border-primary"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredGames.length} jeu{filteredGames.length > 1 ? 's' : ''} trouvé{filteredGames.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun jeu trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
