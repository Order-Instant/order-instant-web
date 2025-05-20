
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Section, HeroSection } from "@/components/ui/containers";
import { 
  Clock, Package, Truck, Globe, Briefcase, 
  Building, Archive, ShieldCheck
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Services = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        className="py-16 bg-gray-900 text-white"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            OUR <span className="text-brand-orange">DELIVERY</span> SERVICES
          </h1>
          <p className="text-lg opacity-90 mb-8 animate-fade-in">
            We offer a range of shipping options to meet all your delivery needs, 
            whether you're sending documents across town or goods across the globe.
          </p>
        </div>
      </HeroSection>

      {/* Main Services */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Service 1 */}
          <Card className="overflow-hidden animate-hover">
            <CardContent className="p-0">
              <div className="bg-brand-orange text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold">Same Day Delivery</h3>
                  </div>
                  <span className="bg-white text-brand-orange px-3 py-1 text-sm font-semibold rounded-full">Fastest</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Need something delivered urgently? Our Same Day service ensures your package is picked up and delivered within hours in the same city.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Delivery within 2-8 hours (city limits)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time tracking
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Proof of delivery
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 20kg per package
                  </li>
                </ul>
                <div className="text-center">
                  <Link to="/shipping">
                    <Button className="bg-brand-orange hover:bg-brand-dark-orange text-white">
                      Ship Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service 2 */}
          <Card className="overflow-hidden animate-hover">
            <CardContent className="p-0">
              <div className="bg-brand-orange text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-7 w-7 mr-3" />
                    <h3 className="text-xl font-semibold">Next Day Delivery</h3>
                  </div>
                  <span className="bg-white text-brand-orange px-3 py-1 text-sm font-semibold rounded-full">Popular</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Send your packages with guaranteed delivery by the next business day. Perfect for less urgent but still time-sensitive shipments.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Delivery by end of next business day
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Nationwide coverage
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Tracking and notifications
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 30kg per package
                  </li>
                </ul>
                <div className="text-center">
                  <Link to="/shipping">
                    <Button className="bg-brand-orange hover:bg-brand-dark-orange text-white">
                      Ship Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Service 3 */}
          <Card className="overflow-hidden animate-hover">
            <CardContent className="p-0">
              <div className="bg-brand-orange text-white p-6">
                <div className="flex items-center">
                  <Truck className="h-7 w-7 mr-3" />
                  <h3 className="text-xl font-semibold">Freight Shipping</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  For larger shipments, our freight service offers reliable and cost-effective solutions for palletized goods and bulk items.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    LTL and FTL options
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Pallet shipping
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible scheduling
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    High weight capacity
                  </li>
                </ul>
                <div className="text-center">
                  <Link to="/shipping">
                    <Button className="bg-brand-orange hover:bg-brand-dark-orange text-white">
                      Ship Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service 4 */}
          <Card className="overflow-hidden animate-hover">
            <CardContent className="p-0">
              <div className="bg-brand-orange text-white p-6">
                <div className="flex items-center">
                  <Globe className="h-7 w-7 mr-3" />
                  <h3 className="text-xl font-semibold">International Shipping</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Send packages worldwide with our comprehensive international shipping service, including customs clearance assistance.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Over 100 countries served
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Express and economy options
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Customs documentation assistance
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-brand-orange mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Door-to-door service
                  </li>
                </ul>
                <div className="text-center">
                  <Link to="/shipping">
                    <Button className="bg-brand-orange hover:bg-brand-dark-orange text-white">
                      Ship Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Specialized Services */}
      <Section className="bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SPECIALIZED SOLUTIONS</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Beyond our standard services, we offer specialized shipping solutions for specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Specialized Service 1 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-1"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Courier Service</h3>
              <p className="text-gray-600">
                Dedicated courier for important documents and packages requiring special handling.
              </p>
            </CardContent>
          </Card>

          {/* Specialized Service 2 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-1"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Solutions</h3>
              <p className="text-gray-600">
                Tailored shipping programs for businesses with regular shipping needs.
              </p>
            </CardContent>
          </Card>

          {/* Specialized Service 3 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-1"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Archive className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warehousing</h3>
              <p className="text-gray-600">
                Short-term storage solutions with easy integration into our delivery network.
              </p>
            </CardContent>
          </Card>

          {/* Specialized Service 4 */}
          <Card className="overflow-hidden animate-hover">
            <div className="bg-brand-orange h-1"></div>
            <CardContent className="p-6">
              <div className="bg-brand-orange/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shipping</h3>
              <p className="text-gray-600">
                Enhanced security measures for high-value or sensitive items.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link to="/contact">
            <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
              Inquire About Specialized Services
            </Button>
          </Link>
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Find answers to common questions about our shipping services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How are shipping rates calculated?</AccordionTrigger>
              <AccordionContent>
                Our shipping rates are calculated based on the package weight, dimensions, destination, and selected service level. For the most accurate quote, use the shipping calculator in our Ship Now page after creating an account.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What items are prohibited from shipping?</AccordionTrigger>
              <AccordionContent>
                Prohibited items include hazardous materials, illegal goods, perishables (without special arrangements), and certain valuables. Please contact our customer service for a complete list or to inquire about specific items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer insurance for shipments?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer shipping insurance for all our services. Basic coverage is included automatically, with options to purchase additional coverage for high-value items. The cost is based on the declared value of your shipment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I track my package?</AccordionTrigger>
              <AccordionContent>
                You can track your package using the tracking number provided in your confirmation email. Simply enter this number in the Track page on our website or mobile app for real-time updates on your shipment's status.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What should I do if my package is lost or damaged?</AccordionTrigger>
              <AccordionContent>
                If your package is lost or damaged, please contact our customer service immediately. Have your tracking number ready, and our team will assist with filing a claim and resolving the issue promptly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Do you offer weekend or holiday delivery?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer weekend and holiday delivery for select services and locations. These special delivery options may incur additional fees. Please select this option during checkout if required.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="bg-brand-orange py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">START SHIPPING TODAY</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the difference with OrderInstant's reliable delivery services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100">
                  CREATE ACCOUNT
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-brand-orange hover:bg-gray-100">
                  CONTACT SALES
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
