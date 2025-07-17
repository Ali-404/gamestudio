
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    publishedAt: string;
    category: string;
  };
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <Card className="group bg-dark/50 border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-white group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </CardTitle>
        <CardDescription className="text-gray-400 line-clamp-3">
          {article.excerpt}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{article.publishedAt}</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full text-primary hover:bg-primary/10 transition-all duration-300"
        >
          Lire l'article
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
