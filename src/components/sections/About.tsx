import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Award, Users, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPersonalInfo } from '@/lib/portfolio-config';

const stats = [
  { icon: Code, label: 'Projects Completed', value: '15+' },
  { icon: Users, label: 'Happy Clients', value: '10+' },
  { icon: Award, label: 'Years Experience', value: '3+' }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              About <span className="gradient-text-primary">Me</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Passionate about bridging the gap between technology and human potential
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <img
                  src={'./about_img.png'}
                  alt={`${personalInfo.name} - Professional headshot`}
                  className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800 hover:scale-105 transition-all duration-500 ring-4 ring-teal-500/20 hover:ring-teal-500/40"
                  style={{
                    filter: 'brightness(1.05) contrast(1.1) saturate(1.05)',
                    imageRendering: 'crisp-edges'
                  }}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-600/10 to-emerald-600/10 group-hover:from-teal-600/20 group-hover:to-emerald-600/20 transition-all duration-500" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{personalInfo.subtitle}</h3>
                {personalInfo.bio.map((paragraph, index) => (
                  <p key={index} className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Location:</span>
                  <span className="text-slate-600 dark:text-slate-300 ml-2">{personalInfo.location}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Email:</span>
                  <span className="text-slate-600 dark:text-slate-300 ml-2">{personalInfo.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Availability:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 ml-2 font-medium">Open to new opportunities</span>
                </div>
              </div>

              <Button className="gradient-bg-primary hover:shadow-lg hover:shadow-teal-500/25 text-white font-semibold transition-all duration-300 hover:scale-105">
                <a href="/ismail-elfakir-cv.pdf" download className="flex text-slate-900 dark:text-white items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map(({ icon: Icon, label, value }, index) => (
                <Card key={label} className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-slate-800 shadow-lg hover:scale-105">
                  <CardContent className="p-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="w-16 h-16 gradient-bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="text-3xl font-bold mb-2 text-slate-900 dark:text-white"
                    >
                      {value}
                    </motion.h3>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}