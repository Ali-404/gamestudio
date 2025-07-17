
import { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    {
      id: '1',
      title: 'Cyber Legends : Nouvelle bande-annonce révélée',
      excerpt: 'Découvrez les dernières fonctionnalités de notre RPG cyberpunk avec des séquences de gameplay inédites.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      author: 'Marie Dubois',
      publishedAt: '15 Jan 2024',
      category: 'Actualités',
    },
    {
      id: '2',
      title: 'GameStudio remporte le prix de l\'innovation',
      excerpt: 'Notre studio a été récompensé lors de la cérémonie des Game Awards pour nos avancées technologiques.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400',
      author: 'Pierre Martin',
      publishedAt: '12 Jan 2024',
      category: 'Récompenses',
    },
    {
      id: '3',
      title: 'Mise à jour majeure pour Mystic Realms',
      excerpt: 'La version 2.0 apporte de nouveaux sorts, quêtes et un système de compagnons révolutionnaire.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
      author: 'Sophie Laurent',
      publishedAt: '08 Jan 2024',
      category: 'Mises à jour',
    },
    {
      id: '4',
      title: 'Interview : L\'avenir du gaming en VR',
      excerpt: 'Notre directeur technique partage sa vision sur les technologies immersives et l\'avenir du jeu vidéo.',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
      author: 'Alex Bernard',
      publishedAt: '05 Jan 2024',
      category: 'Interviews',
    },
    {
      id: '5',
      title: 'Recrutement : Rejoignez notre équipe',
      excerpt: 'Nous recherchons des développeurs passionnés pour renforcer notre équipe créative et talentueuse.',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400',
      author: 'Julie Moreau',
      publishedAt: '03 Jan 2024',
      category: 'Carrières',
    },
    {
      id: '6',
      title: 'Beta ouverte pour Racing Thunder',
      excerpt: 'Testez notre nouveau jeu de course en avant-première et donnez-nous vos retours pour améliorer l\'expérience.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      author: 'Thomas Petit',
      publishedAt: '01 Jan 2024',
      category: 'Bêta',
    },
  ];

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-primary">Actualités</span> & Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Restez informé des dernières nouvelles, mises à jour et coulisses de notre studio
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark/50 border-gray-700 text-white placeholder-gray-400 focus:border-primary"
            />
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div className="mb-12">
            <div className="relative rounded-lg overflow-hidden bg-dark/50 border border-gray-700">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={filteredArticles[0].image} 
                    alt={filteredArticles[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      À la une
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <span>Par {filteredArticles[0].author}</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{filteredArticles[0].publishedAt}</span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-white w-fit">
                    Lire l'article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun article trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
