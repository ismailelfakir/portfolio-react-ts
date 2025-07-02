import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { getPersonalInfo, getNavigation } from '@/lib/portfolio-config';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const personalInfo = getPersonalInfo();
  const navItems = getNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Profile */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="relative group">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-12 h-12 rounded-full object-cover border-3 border-white dark:border-slate-800 shadow-xl hover:scale-105 transition-all duration-300 ring-2 ring-teal-500/50 hover:ring-teal-500"
                style={{
                  filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
                  imageRendering: 'crisp-edges',
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 group-hover:from-teal-500/20 group-hover:to-emerald-500/20 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold gradient-text-primary leading-tight">{personalInfo.name}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight">{personalInfo.title}</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Buttons (theme + blog + mobile) */}
          <div className="flex items-center space-x-4">
            {/* Blog Button - Only visible on md+ screens */}
            <div className="hidden md:block">
              <a href="https://blogs.ismailelfakir.com" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                >
                  My Blog
                </Button>
              </a>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="absolute h-4 w-4" />
              ) : (
                <Menu className="absolute h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Blog Link shown last in mobile */}
              <a
                href="https://blogs.ismailelfakir.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-base font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Blog
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}