
import { useState } from 'react';
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  MapPin, Phone, Mail, Clock, Check
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
        action: (
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        className="py-16 bg-gray-900 text-white"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            GET IN <span className="text-brand-orange">TOUCH</span>
          </h1>
          <p className="text-lg opacity-90 mb-8 animate-fade-in">
            We’re here to support you with every aspect of your shipping journey—whether you need a personalized quote, real-time tracking updates, customs clearance guidance, or answers about our logistics solutions and partnerships.
          </p>
        </div>
      </HeroSection>

      {/* Contact Information & Form */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">CONTACT INFORMATION</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-brand-orange/10 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <address className="not-italic text-gray-600">
                    Samakhusi-3<br />
                    Kathmandu, Nepal
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-orange/10 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telephone</h3>
                  <p className="text-gray-600">
                    Customer Service: <a href="tel:01-4974691" className="text-brand-orange hover:underline">01-4974691</a><br />
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-orange/10 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">
                    Customer Support: <a href="mailto:orderinstant088@gmail.com" className="text-brand-orange hover:underline">orderinstant088@gmail.com</a><br />
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-orange/10 p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 8:00 PM<br />
                    Saturday: 9:00 AM - 5:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">SEND US A MESSAGE</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      placeholder="Your phone number" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="Subject of your message" 
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder="How can we help you?" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="text-right">
                  <Button 
                    type="submit" 
                    className="bg-brand-orange hover:bg-brand-dark-orange text-white" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section className="bg-gray-50 pb-0">
        <h2 className="text-2xl font-bold mb-6 text-center">OUR LOCATION</h2>
        <div className="w-full h-96 bg-gray-300 rounded-t-lg overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7063.192690686976!2d85.31012089318007!3d27.729746754678693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19006c7fc47f%3A0x761e27b66a9d46f6!2sOrder%20instant%20courier%20and%20cargo!5e0!3m2!1sne!2snp!4v1753273209269!5m2!1sne!2snp" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </Section>
    </>
  );
};

export default Contact;
