
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import GameCard from '@/components/GameCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { cap } from '@/lib/utils';

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("all");

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
   
  ];

  const {t} = useTranslation()
  
  const categories = ["all", 'RPG', 'Course', 'Stratégie', 'Puzzle', 'VR'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           game.technologies.some(tech => tech.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {cap(t("our"))} <span className="text-primary">{cap(t("games"))}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("gamesCaption")}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t("searchAGame")}
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
            {filteredGames.length} {t("game")}{filteredGames.length > 1 ? 's' : ''} {t("found")}{filteredGames.length > 1 ? 's' : ''}
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
