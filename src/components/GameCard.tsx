
import { Calendar, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { cap } from '@/lib/utils';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    releaseDate: string;
    players: string;
    status: 'En développement' | 'Publié' | 'Bêta';
  };
}

const GameCard = ({ game }: GameCardProps) => {
  const {t} = useTranslation()
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publié':
        return 'bg-green-500/20 text-green-400';
      case 'Bêta':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <Card className="group bg-dark/50 border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(game.status)}>
            {game.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-white group-hover:text-primary transition-colors">
          {game.title}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {game.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{game.releaseDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{game.players}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {game.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-brandRed-600/10 text-brandRed-600">
              {tech}
            </Badge>
          ))}
        </div>
        
        <Button className="w-full bg-brandRed-600/10 border border-brandRed-600 text-brandRed-600 hover:bg-brandRed-600 hover:text-white transition-all duration-300">
          {cap(t('seeMore'))}
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;
