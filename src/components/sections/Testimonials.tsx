import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getTestimonials } from '@/lib/portfolio-config';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  createdAt: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Load testimonials from config and localStorage on component mount
  useEffect(() => {
    const configTestimonials = getTestimonials();
    const savedTestimonials = localStorage.getItem('portfolio-testimonials');
    
    if (savedTestimonials) {
      const parsed = JSON.parse(savedTestimonials);
      // Merge config testimonials with saved ones, avoiding duplicates
      const merged = [...configTestimonials];
      parsed.forEach((saved: Testimonial) => {
        if (!merged.find(t => t.id === saved.id)) {
          merged.push(saved);
        }
      });
      setTestimonials(merged);
    } else {
      setTestimonials(configTestimonials);
      localStorage.setItem('portfolio-testimonials', JSON.stringify(configTestimonials));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newTestimonial: Testimonial = {
      id: `user-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedTestimonials = [newTestimonial, ...testimonials];
    setTestimonials(updatedTestimonials);
    localStorage.setItem('portfolio-testimonials', JSON.stringify(updatedTestimonials));

    setFormData({ name: '', role: '', company: '', content: '', rating: 5 });
    setIsOpen(false);
    toast.success('Thank you for your testimonial!');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
      />
    ));
  };

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=14b8a6&color=fff&size=128`;
  };

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
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-900" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Client <span className="gradient-text-primary">Testimonials</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              What clients say about working with me
            </p>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-bg-primary hover:shadow-lg hover:shadow-teal-500/25 text-white font-semibold transition-all duration-300 hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-900 dark:text-white">Share Your Experience</DialogTitle>
                  <DialogDescription className="text-slate-600 dark:text-slate-300">
                    Your feedback helps me improve and showcases our collaboration
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                  <Input
                    placeholder="Your Role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                  <Input
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                  <Textarea
                    placeholder="Share your experience working with me *"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={4}
                    required
                    className="border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Rating</label>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleInputChange('rating', i + 1)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 gradient-bg-primary text-white font-semibold">
                      Submit
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-slate-50 dark:bg-slate-800 shadow-lg hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img
                        src={getAvatarUrl(testimonial.name)}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-600"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                          {testimonial.role}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {renderStars(testimonial.rating)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      "{testimonial.content}"
                    </p>
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