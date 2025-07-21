import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cap } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: t("messageSentTitle"),
      description: t("messageSentDesc"),
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {cap(t("contact"))} <span className="text-primary">{cap(t("us"))}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("contactDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-dark/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>{t("sendUsMessage")}</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t("formSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      {t("fullName")}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-dark/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                      placeholder={t("yourName")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-dark/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                      placeholder={t("yourEmail")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    {t("subject")}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-dark/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                    placeholder={t("subjectPlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    {t("subject")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-dark/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
                    placeholder={t("messagePlaceholder")}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("sendMessage")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-dark/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t("contactInfo")}</CardTitle>
                <CardDescription className="text-gray-400">
                  {t("contactWays")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-400">contact@gamestudio.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{t("phone")}</h3>
                    <p className="text-gray-400">+33 1 23 45 67 89</p>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{t("address")}</h3>
                    <p className="text-gray-400">
                      123 Rue du Gaming<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            {/* Business Hours */}
            {/* <Card className="bg-dark/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t("openingHours")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>{t("mondayFriday")}</span>
                  <span>9h00 - 18h00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t("saturday")}</span>
                  <span>10h00 - 16h00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t("sunday")}</span>
                  <span>{t("closed")}</span>
                </div>
              </CardContent>
            </Card> */}

            {/* FAQ Section */}
            {/* <Card className="bg-dark/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t("faq")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-primary font-semibold mb-2">{t("customGamesQuestion")}</h4>
                  <p className="text-gray-400 text-sm">
                    {t("customGamesAnswer")}
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-semibold mb-2">{t("responseTimeQuestion")}</h4>
                  <p className="text-gray-400 text-sm">
                    {t("responseTimeAnswer")}
                  </p>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
