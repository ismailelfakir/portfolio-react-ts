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
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);
  const [showAll, setShowAll] = useState(false);
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

  // Deduplicate testimonials by name and content
  const deduplicateTestimonials = (testimonials: Testimonial[]): Testimonial[] => {
    const seen = new Set<string>();
    return testimonials.filter((t) => {
      const key = `${t.name}|${t.content}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  // Shuffle array and select up to 6 testimonials
  const shuffleArray = (array: Testimonial[]): Testimonial[] => {
    return array
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(6, array.length));
  };

  // Load testimonials from both Firebase and portfolio-config
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Fetch from Firebase
        const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const firestoreTestimonials = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Testimonial[];

        // Fetch from portfolio-config
        const configTestimonials = getTestimonials();

        // Merge and deduplicate
        const mergedTestimonials = deduplicateTestimonials([
          ...firestoreTestimonials,
          ...configTestimonials
        ]);

        setTestimonials(mergedTestimonials);
        setDisplayedTestimonials(shuffleArray(mergedTestimonials));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to portfolio-config testimonials
        const configTestimonials = getTestimonials();
        setTestimonials(configTestimonials);
        setDisplayedTestimonials(shuffleArray(configTestimonials));
      }
    };

    fetchTestimonials();
  }, []);

  // Update displayed testimonials when showAll toggles
  useEffect(() => {
    if (showAll) {
      setDisplayedTestimonials(testimonials);
    } else {
      setDisplayedTestimonials(shuffleArray(testimonials));
    }
  }, [showAll, testimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addDoc(collection(db, 'testimonials'), {
        ...formData,
        createdAt: serverTimestamp()
      });

      toast.success('Thank you for your testimonial!');
      setFormData({ name: '', role: '', company: '', content: '', rating: 5 });
      setIsOpen(false);

      // Re-fetch from Firebase
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const firestoreTestimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Testimonial[];

      // Re-fetch from portfolio-config
      const configTestimonials = getTestimonials();

      // Merge and deduplicate
      const mergedTestimonials = deduplicateTestimonials([
        ...firestoreTestimonials,
        ...configTestimonials
      ]);

      setTestimonials(mergedTestimonials);
      setDisplayedTestimonials(showAll ? mergedTestimonials : shuffleArray(mergedTestimonials));
    } catch (error) {
      console.error('Error submitting or fetching testimonials:', error);
      toast.error('Failed to send testimonial. Displaying default testimonials.');
      const configTestimonials = getTestimonials();
      setTestimonials(configTestimonials);
      setDisplayedTestimonials(showAll ? configTestimonials : shuffleArray(configTestimonials));
    }
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
            
            <div className="flex gap-4 justify-center">
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
                            onClick={() => handleInputChange(' rating', i + 1)}
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
              {testimonials.length > 6 && (
                <Button
                  onClick={() => setShowAll(!showAll)}
                  className="gradient-bg-primary hover:shadow-lg hover:shadow-teal-500/25 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  {showAll ? 'Show Less' : 'Show All'}
                </Button>
              )}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial, index) => (
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