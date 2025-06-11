import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { getPersonalInfo, getContactInfo } from '@/lib/portfolio-config';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const personalInfo = getPersonalInfo();
  const contactInfo = getContactInfo();

  const contactDetails = [
    {
      icon: Mail,
      title: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'from-teal-500 to-emerald-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: personalInfo.location,
      href: `https://maps.google.com/maps?q=${encodeURIComponent(personalInfo.location)}`,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would send the data to your backend
      console.log('Form submitted:', data);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      form.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900/50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              {contactInfo.title.split(' ').map((word, index) => 
                index === contactInfo.title.split(' ').length - 1 ? (
                  <span key={index} className="gradient-text-primary">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {contactInfo.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Let's Connect</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  I'm always excited to collaborate on innovative projects and help bring your digital vision to life.
                </p>
              </div>

              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, title, value, href, color }) => (
                  <motion.a
                    key={title}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 group border border-slate-200 dark:border-slate-700"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
                      <p className="text-slate-600 dark:text-slate-300">{value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Office Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{contactInfo.officeHours.weekdays}</span>
                    <span className="text-slate-900 dark:text-white font-medium">{contactInfo.officeHours.weekdaysTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{contactInfo.officeHours.saturday}</span>
                    <span className="text-slate-900 dark:text-white font-medium">{contactInfo.officeHours.saturdayTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{contactInfo.officeHours.sunday}</span>
                    <span className="text-slate-900 dark:text-white font-medium">{contactInfo.officeHours.sundayTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-0 bg-white dark:bg-slate-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white font-bold">Send me a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-900 dark:text-white font-semibold">Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your full name" 
                                  {...field}
                                  className="border-slate-300 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-900 dark:text-white font-semibold">Email *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your.email@example.com" 
                                  {...field}
                                  className="border-slate-300 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-900 dark:text-white font-semibold">Subject *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What's this about?" 
                                {...field}
                                className="border-slate-300 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-900 dark:text-white font-semibold">Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell me about your project or how I can help you..."
                                rows={6}
                                {...field}
                                className="border-slate-300 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500 resize-none bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full gradient-bg-primary hover:shadow-lg hover:shadow-teal-500/25 text-white py-3 font-semibold transition-all duration-300 hover:scale-105"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}