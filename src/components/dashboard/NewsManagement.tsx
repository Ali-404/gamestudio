/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Calendar, User, Eye, Heart, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: t('sampleTitle1'),
      content: t('sampleContent1'),
      author: 'Admin',
      date: '2024-01-15',
      category: 'update',
      views: 1250,
      likes: 89,
      comments: 23
    },
    {
      id: '2',
      title: t('sampleTitle2'),
      content: t('sampleContent2'),
      author: 'Admin',
      date: '2024-01-10',
      category: 'announcement',
      views: 890,
      likes: 67,
      comments: 12
    },
    {
      id: '3',
      title: t('sampleTitle3'),
      content: t('sampleContent3'),
      author: 'Marketing Team',
      date: '2024-01-08',
      category: 'event',
      views: 634,
      likes: 45,
      comments: 8
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id' | 'views' | 'likes' | 'comments'>>({
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
        title: t('error'),
        description: t('fillAllFields'),
        variant: 'destructive',
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
      title: t('articlePublished'),
      description: t('articlePublishedDesc'),
    });
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
    toast({
      title: t('articleDeleted'),
      description: t('articleDeletedDesc'),
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
      case 'announcement': return t('categoryAnnouncement');
      case 'update': return t('categoryUpdate');
      case 'event': return t('categoryEvent');
      case 'release': return t('categoryRelease');
      default: return category;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('newsManagementTitle')}</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {t('newsManagementDesc')}
          </p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-gradient-to-r from-primary to-brandRed-600 hover:from-primary/90 hover:to-brandRed-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('newArticle')}
        </Button>
      </div>

      {/* Add News Form */}
      {isAdding && (
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-t-lg">
            <CardTitle className="text-slate-900 dark:text-white flex items-center">
              <Plus className="mr-2 h-5 w-5 text-primary" />
              {t('newArticle')}
            </CardTitle>
            <CardDescription>{t('newArticleDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-700 dark:text-slate-300 font-medium">
                  {t('articleTitle')}
                </Label>
                <Input
                  id="title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="h-11 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary"
                  placeholder={t('articleTitlePlaceholder')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700 dark:text-slate-300 font-medium">
                  {t('category')}
                </Label>
                <select
                  id="category"
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })}
                  className="h-11 w-full px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="announcement">{t('categoryAnnouncement')}</option>
                  <option value="update">{t('categoryUpdate')}</option>
                  <option value="event">{t('categoryEvent')}</option>
                  <option value="release">{t('categoryRelease')}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-700 dark:text-slate-300 font-medium">
                {t('content')}
              </Label>
              <textarea
                id="content"
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder={t('contentPlaceholder')}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddNews}
                className="bg-gradient-to-r from-primary to-brandRed-600 hover:from-primary/90 hover:to-brandRed-600/90 text-white shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t('publishArticle')}
              </Button>
              <Button
                onClick={() => setIsAdding(false)}
                variant="outline"
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {t('cancel')}
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
                          <span>{item.views.toLocaleString()} {t('views')}</span>
                        </div>
                      )}
                      {item.likes && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Heart className="h-4 w-4" />
                          <span>{item.likes} {t('likes')}</span>
                        </div>
                      )}
                      {item.comments && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <MessageCircle className="h-4 w-4" />
                          <span>{item.comments} {t('comments')}</span>
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
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{t('noArticlesYet')}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{t('startByPublishing')}</p>
          <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            {t('newArticle')}
          </Button>
        </div>
      )}
    </div>
  );
};
