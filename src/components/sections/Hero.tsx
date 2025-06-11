import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPersonalInfo } from '@/lib/portfolio-config';

export default function Hero() {
  const personalInfo = getPersonalInfo();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    twitter: Twitter
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 border border-teal-200 dark:border-teal-800 rounded-full text-sm font-semibold text-teal-700 dark:text-teal-300 mb-6 shadow-sm">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text-primary">
              {personalInfo.title}
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-slate-600 dark:text-slate-300 font-medium">
              {personalInfo.subtitle}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" className="gradient-bg-primary hover:shadow-lg hover:shadow-teal-500/25 text-white px-8 py-3 font-semibold transition-all duration-300 hover:scale-105">
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 font-semibold border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300">
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
              const Icon = socialIcons[platform as keyof typeof socialIcons];
              if (!Icon) return null;

              const colorClasses = {
                github: 'hover:bg-slate-100 dark:hover:bg-slate-800',
                linkedin: 'hover:bg-teal-50 dark:hover:bg-teal-950/30',
                email: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/30',
                twitter: 'hover:bg-blue-50 dark:hover:bg-blue-950/30'
              };

              return (
                <motion.a
                  key={platform}
                  href={url}
                  target={platform !== 'email' ? '_blank' : undefined}
                  rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full bg-white dark:bg-slate-800 shadow-md ${colorClasses[platform as keyof typeof colorClasses]} transition-all duration-300 border border-slate-200 dark:border-slate-700`}
                  aria-label={platform}
                >
                  <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-slate-400 dark:text-slate-500"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}