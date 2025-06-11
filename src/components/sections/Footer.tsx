import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPersonalInfo, getNavigation } from '@/lib/portfolio-config';

export default function Footer() {
  const personalInfo = getPersonalInfo();
  const navItems = getNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    twitter: Twitter
  };

  const socialColors = {
    github: 'hover:bg-slate-100 dark:hover:bg-slate-800',
    linkedin: 'hover:bg-teal-50 dark:hover:bg-teal-950/30',
    email: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/30',
    twitter: 'hover:bg-blue-50 dark:hover:bg-blue-950/30'
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold gradient-text-primary">
                {personalInfo.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {personalInfo.title} specializing in {personalInfo.subtitle}.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navItems.slice(1).map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href}
                      className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="font-medium">Web Development</li>
                <li className="font-medium">Mobile Applications</li>
                <li className="font-medium">Digital Transformation</li>
                <li className="font-medium">Technical Consulting</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white">Get in Touch</h4>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p className="font-medium">{personalInfo.location}</p>
                <p className="font-medium">{personalInfo.email}</p>
                <p className="font-medium">{personalInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>© {currentYear} {personalInfo.name}. All rights reserved.</span>
              </div>

              <div className="flex items-center gap-4">
                {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  if (!Icon) return null;

                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target={platform !== 'email' ? '_blank' : undefined}
                      rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-full bg-slate-100 dark:bg-slate-800 ${socialColors[platform as keyof typeof socialColors]} transition-colors border border-slate-200 dark:border-slate-700`}
                      aria-label={platform}
                    >
                      <Icon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                    </motion.a>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={scrollToTop}
                  className="ml-4 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}