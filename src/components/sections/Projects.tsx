import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github as GitHub, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getProjects, getProjectsByCategory } from '@/lib/portfolio-config';

const categories = ['All', 'Web', 'Mobile', 'Design'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const projects = getProjects();
  const filteredProjects = getProjectsByCategory(selectedCategory);

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
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Featured <span className="gradient-text-primary">Projects</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Showcasing innovative solutions that drive digital transformation
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "gradient-bg-primary text-white font-semibold shadow-lg hover:shadow-teal-500/25" 
                    : "border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-semibold"
                  }
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-0 bg-white dark:bg-slate-800 shadow-lg hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-slate-900 dark:text-white font-bold">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      {project.links.github && (
                        <Button variant="outline" size="sm" asChild className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500">
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <GitHub className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="ml-auto gradient-bg-primary text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-slate-900 dark:text-white">{project.title}</DialogTitle>
                            <DialogDescription className="text-slate-600 dark:text-slate-300">{project.description}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {project.longDescription}
                            </p>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-slate-900 dark:text-white">Key Features:</h4>
                              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                                {project.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-slate-900 dark:text-white">Technologies Used:</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                              {project.links.github && (
                                <Button variant="outline" asChild className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                    <GitHub className="w-4 h-4 mr-2" />
                                    View Code
                                  </a>
                                </Button>
                              )}
                              <Button asChild className="gradient-bg-primary text-white font-semibold hover:shadow-lg hover:shadow-teal-500/25">
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </a>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}