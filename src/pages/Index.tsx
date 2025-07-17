
import Hero from '@/components/Hero';
import GameCard from '@/components/GameCard';
import NewsCard from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredGames = [
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
  ];

  const latestNews = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pourquoi choisir <span className="text-primary">GameStudio</span> ?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Notre passion pour l'innovation et notre expertise technique nous permettent de créer des expériences gaming exceptionnelles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Innovation</h3>
              <p className="text-gray-400">
                Nous repoussons constamment les limites de la technologie gaming pour offrir des expériences uniques et mémorables.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Équipe Expert</h3>
              <p className="text-gray-400">
                Notre équipe talentueuse réunit des professionnels passionnés avec des années d'expérience dans l'industrie.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
              <p className="text-gray-400">
                Nous optimisons chaque aspect de nos jeux pour garantir des performances fluides sur toutes les plateformes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Jeux <span className="text-primary">Populaires</span>
              </h2>
              <p className="text-xl text-gray-400">
                Découvrez nos créations les plus appréciées
              </p>
            </div>
            <Link to="/games">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Voir tous les jeux
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Dernières <span className="text-primary">Actualités</span>
              </h2>
              <p className="text-xl text-gray-400">
                Restez informé de nos dernières nouvelles
              </p>
            </div>
            <Link to="/news">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Voir toutes les actualités
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à créer quelque chose d'<span className="text-primary">extraordinaire</span> ?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Contactez-nous pour discuter de votre projet de jeu vidéo et découvrir comment nous pouvons le réaliser ensemble
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold">
                Démarrer un projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/team">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-dark px-8 py-4 text-lg font-semibold"
              >
                Rencontrer l'équipe
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
