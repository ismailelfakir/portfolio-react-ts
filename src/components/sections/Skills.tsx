import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSkills, getAllTechnologies } from '@/lib/portfolio-config';

const skillCategoryTitles = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  tools: 'Tools & Technologies',
  database: 'Database & Cloud'
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const skills = getSkills();
  const technologies = getAllTechnologies();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Technical <span className="gradient-text-primary">Skills</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Comprehensive expertise across the full technology stack
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div key={category} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-slate-50 dark:bg-slate-800 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-slate-900 dark:text-white font-bold">
                      {skillCategoryTitles[category as keyof typeof skillCategoryTitles]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {skillList.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                          <span className="text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-2 py-1 rounded-full">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                            <motion.div
                              className="h-3 rounded-full gradient-bg-primary shadow-sm"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{
                                duration: 1.5,
                                delay: (categoryIndex * 0.2) + (skillIndex * 0.1),
                                ease: "easeOut"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 bg-slate-50 dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-slate-900 dark:text-white font-bold text-xl">Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 justify-center">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform cursor-default bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}