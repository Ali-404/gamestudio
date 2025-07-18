
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { cap } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {t} = useTranslation()

  const navigation = [
    { name: cap(t("home")), href: '/' },
    { name: cap(t("games")), href: '/games' },
    { name: cap(t("news")), href: '/news' },
    { name: cap(t("team")), href: '/team' },
    { name: cap(t("contact")), href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 z-50 w-full bg-dark/95 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src='/public/images/6.png' width={40} />
              <span className="font-bold text-xl text-white">Fuyoz Games</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.name === 'Contact' ? (
                <Link key={item.name} to={item.href}>
                  <Button variant="outline" className="border-brandRed-600 text-brandRed-600 hover:bg-brandRed-600 hover:text-white transition-colors">
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-brandRed-600 bg-brandRed-600/10'
                      : 'text-white hover:text-brandRed-600 hover:bg-brandRed-600/10'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-dark/98 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              item.name === 'Contact' ? (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-brandRed-600 text-brandRed-600 hover:bg-brandRed-600 hover:text-white transition-colors">
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-brandRed-600 bg-brandRed-600/10'
                      : 'text-white hover:text-brandRed-600 hover:bg-brandRed-600/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
