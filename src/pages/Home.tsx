
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Section, HeroSection } from "@/components/ui/containers";
import { 
  Clock, Package, Truck, Globe, 
  CheckCircle2, Shield, Clock3, PieChart 
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            FAST, RELIABLE <span className="text-brand-orange">DELIVERY</span> SERVICES
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in">
            Whether it's across town or across the world, we deliver your packages 
            quickly, safely, and at competitive rates.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Link to="/shipping">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-dark-orange text-white">
                SHIP NOW
              </Button>
            </Link>
            <Link to="/track">
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                TRACK PACKAGE
              </Button>
            </Link>
          </div>
        </div>
      </HeroSection>

      {/* Services Preview */}
      <Section className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR DELIVERY SOLUTIONS</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Choose the service that best fits your shipping needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-2"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-gray-600">
                Urgent packages delivered within hours. Perfect for time-sensitive documents and items.
              </p>
            </CardContent>
          </Card>

          {/* Service 2 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-2"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Next Day Delivery</h3>
              <p className="text-gray-600">
                Guaranteed delivery by the next business day for all your important shipments.
              </p>
            </CardContent>
          </Card>

          {/* Service 3 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-2"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freight Shipping</h3>
              <p className="text-gray-600">
                Efficient solutions for large shipments. Includes LTL and FTL options.
              </p>
            </CardContent>
          </Card>

          {/* Service 4 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-2"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">International</h3>
              <p className="text-gray-600">
                Global shipping solutions with customs clearance assistance and tracking.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link to="/services">
            <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
              View All Services
            </Button>
          </Link>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">WHY CHOOSE ORDER <span className="text-brand-orange">INSTANT</span>?</h2>
            <p className="text-gray-600 mb-8">
              We've built our reputation on reliability, speed, and customer satisfaction. When you ship with us, you're choosing a partner who cares about your delivery as much as you do.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Real-Time Tracking</h3>
                  <p className="text-gray-600">Know where your package is at all times with our advanced tracking system.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Safe & Secure</h3>
                  <p className="text-gray-600">Your packages are handled with care and fully insured during transit.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Flexible Options</h3>
                  <p className="text-gray-600">Choose from various service levels to match your budget and timeframe.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Dedicated Support</h3>
                  <p className="text-gray-600">Our customer service team is available 24/7 to assist with any questions.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-3xl font-bold mb-1">10k+</h3>
                <p className="text-gray-600">Packages Delivered</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-3xl font-bold mb-1">99.8%</h3>
                <p className="text-gray-600">Delivery Success</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock3 className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-3xl font-bold mb-1">24/7</h3>
                <p className="text-gray-600">Customer Support</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-brand-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-3xl font-bold mb-1">5+</h3>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">HOW IT WORKS</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Shipping with OrderInstant is quick and easy. Follow these simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-brand-orange text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Order</h3>
            <p className="text-gray-600">
              Enter your shipment details and select the service that meets your needs.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-brand-orange text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Pickup & Delivery</h3>
            <p className="text-gray-600">
              We'll collect your package and deliver it safely to its destination.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-brand-orange text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Confirm</h3>
            <p className="text-gray-600">
              Follow your shipment in real-time and receive delivery confirmation.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/shipping">
            <Button className="bg-brand-orange hover:bg-brand-dark-orange text-white">
              Ship Now
            </Button>
          </Link>
        </div>
      </Section>

      {/* Customer Testimonials */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">WHAT OUR CUSTOMERS SAY</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Don't take our word for it – hear from some of our satisfied customers.
          </p>
        </div>

        <Tabs defaultValue="businesses" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="businesses">BUSINESSES</TabsTrigger>
            <TabsTrigger value="individuals">INDIVIDUALS</TabsTrigger>
          </TabsList>
          
          <TabsContent value="businesses" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="font-semibold text-gray-600">TC</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Tech Components Inc.</h4>
                      <p className="text-gray-500 text-sm">Electronics Manufacturer</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "OrderInstant has transformed our logistics operations. Their reliable overnight shipping ensures our components arrive on time, every time. Their API integration with our system makes shipping effortless."
                  </p>
                  <div className="flex mt-4 text-brand-orange">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="font-semibold text-gray-600">FG</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Fresh Grocers</h4>
                      <p className="text-gray-500 text-sm">Online Food Retailer</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Our perishable items require special care and timely delivery. OrderInstant's same-day service has been crucial to our business growth and customer satisfaction. Highly recommend!"
                  </p>
                  <div className="flex mt-4 text-brand-orange">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="individuals" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="font-semibold text-gray-600">JD</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">John D.</h4>
                      <p className="text-gray-500 text-sm">Online Seller</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "As someone who ships products regularly for my small business, OrderInstant makes it easy and affordable. Their website is intuitive, and the delivery is always prompt."
                  </p>
                  <div className="flex mt-4 text-brand-orange">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="font-semibold text-gray-600">SM</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah M.</h4>
                      <p className="text-gray-500 text-sm">Frequent Shopper</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "I needed to send my mother a birthday gift urgently, and OrderInstant delivered it the same day! The tracking feature kept me updated throughout. Excellent service!"
                  </p>
                  <div className="flex mt-4 text-brand-orange">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* CTA Section */}
      <section className="bg-brand-orange py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">READY TO SHIP WITH CONFIDENCE?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust OrderInstant with their shipping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100">
                  CREATE ACCOUNT
                </Button>
              </Link>
              <Link to="/shipping">
                <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100">
                  SHIP NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
