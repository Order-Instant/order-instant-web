import { useState } from 'react';
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Package, CheckCircle, Clock, Truck, Check, AlertCircle, MapPin } from 'lucide-react';

interface TrackingStep {
  id: number;
  date: string;
  location: string;
  status: string;
  description: string;
}

interface TrackingResult {
  trackingNumber: string;
  status: 'delivered' | 'in-transit' | 'processing' | 'exception';
  estimatedDelivery: string;
  origin: string;
  destination: string;
  service: string;
  steps: TrackingStep[];
}

const sampleResults: Record<string, TrackingResult> = {
  'OI123456789': {
    trackingNumber: 'OI123456789',
    status: 'in-transit',
    estimatedDelivery: 'July 21, 2025',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    service: 'Next Day Delivery',
    steps: [
      {
        id: 1,
        date: 'July 18, 2025 - 10:30 AM',
        location: 'New York, NY',
        status: 'Picked up',
        description: 'Package has been picked up by courier'
      },
      {
        id: 2,
        date: 'July 18, 2025 - 2:45 PM',
        location: 'New York, NY',
        status: 'In transit',
        description: 'Package has departed from origin facility'
      },
      {
        id: 3,
        date: 'July 19, 2025 - 8:15 AM',
        location: 'Chicago, IL',
        status: 'In transit',
        description: 'Package arrived at intermediate facility'
      },
      {
        id: 4,
        date: 'July 19, 2025 - 11:30 AM',
        location: 'Chicago, IL',
        status: 'In transit',
        description: 'Package has departed from intermediate facility'
      }
    ]
  },
  'OI987654321': {
    trackingNumber: 'OI987654321',
    status: 'delivered',
    estimatedDelivery: 'July 15, 2025',
    origin: 'Boston, MA',
    destination: 'Seattle, WA',
    service: 'International Shipping',
    steps: [
      {
        id: 1,
        date: 'July 10, 2025 - 9:00 AM',
        location: 'Boston, MA',
        status: 'Picked up',
        description: 'Package has been picked up by courier'
      },
      {
        id: 2,
        date: 'July 10, 2025 - 4:30 PM',
        location: 'Boston, MA',
        status: 'In transit',
        description: 'Package has departed from origin facility'
      },
      {
        id: 3,
        date: 'July 12, 2025 - 10:15 AM',
        location: 'Denver, CO',
        status: 'In transit',
        description: 'Package arrived at intermediate facility'
      },
      {
        id: 4,
        date: 'July 12, 2025 - 2:45 PM',
        location: 'Denver, CO',
        status: 'In transit',
        description: 'Package has departed from intermediate facility'
      },
      {
        id: 5,
        date: 'July 14, 2025 - 9:30 AM',
        location: 'Seattle, WA',
        status: 'Out for delivery',
        description: 'Package is out for delivery'
      },
      {
        id: 6,
        date: 'July 15, 2025 - 2:15 PM',
        location: 'Seattle, WA',
        status: 'Delivered',
        description: 'Package has been delivered'
      }
    ]
  },
  'OI555555555': {
    trackingNumber: 'OI555555555',
    status: 'processing',
    estimatedDelivery: 'July 25, 2025',
    origin: 'Miami, FL',
    destination: 'Houston, TX',
    service: 'Same Day Delivery',
    steps: [
      {
        id: 1,
        date: 'July 19, 2025 - 11:00 AM',
        location: 'Miami, FL',
        status: 'Processing',
        description: 'Order has been processed and is awaiting pickup'
      }
    ]
  },
  'OI999999999': {
    trackingNumber: 'OI999999999',
    status: 'exception',
    estimatedDelivery: 'July 22, 2025',
    origin: 'San Francisco, CA',
    destination: 'Austin, TX',
    service: 'Next Day Delivery',
    steps: [
      {
        id: 1,
        date: 'July 17, 2025 - 10:30 AM',
        location: 'San Francisco, CA',
        status: 'Picked up',
        description: 'Package has been picked up by courier'
      },
      {
        id: 2,
        date: 'July 17, 2025 - 2:45 PM',
        location: 'San Francisco, CA',
        status: 'In transit',
        description: 'Package has departed from origin facility'
      },
      {
        id: 3,
        date: 'July 18, 2025 - 9:15 AM',
        location: 'Los Angeles, CA',
        status: 'Exception',
        description: 'Delivery exception: address information needed'
      }
    ]
  }
};

const Track = () => {
  const { toast } = useToast();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  
  const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = sampleResults[trackingNumber] || null;
      
      if (result) {
        setTrackingResult(result);
      } else {
        toast({
          title: "Not Found",
          description: "No shipment found with the provided tracking number.",
          variant: "destructive",
        });
        setTrackingResult(null);
      }
      
      setIsSearching(false);
    }, 1500);
  };
  
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in transit':
      case 'out for delivery':
        return <Truck className="h-6 w-6 text-brand-orange" />;
      case 'picked up':
        return <Package className="h-6 w-6 text-blue-500" />;
      case 'processing':
        return <Clock className="h-6 w-6 text-gray-500" />;
      case 'exception':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getStatusStyle = (status: string) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'text-green-500';
      case 'in transit':
      case 'out for delivery':
        return 'text-brand-orange';
      case 'picked up':
        return 'text-blue-500';
      case 'processing':
        return 'text-gray-500';
      case 'exception':
        return 'text-red-500';
      default:
        return 'text-gray-700';
    }
  };
  
  const getStatusBadge = (status: 'delivered' | 'in-transit' | 'processing' | 'exception') => {
    switch(status) {
      case 'delivered':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Delivered
          </span>
        );
      case 'in-transit':
        return (
          <span className="px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-sm font-medium flex items-center">
            <Truck className="h-4 w-4 mr-1" />
            In Transit
          </span>
        );
      case 'processing':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Processing
          </span>
        );
      case 'exception':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Exception
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        className="py-16 bg-gradient-to-r from-brand-orange to-brand-dark-orange text-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            TRACK YOUR SHIPMENT
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in">
            Enter your tracking number to get real-time updates on your package location and status.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 mb-2">
              <Input 
                value={trackingNumber}
                onChange={handleTrackingChange}
                className="flex-1 bg-white/10 text-white placeholder:text-white/70 border-white/20 focus-visible:ring-white"
                placeholder="Enter tracking number (e.g., OI123456789)"
                autoComplete="off"
              />
              <Button 
                type="submit" 
                className="bg-white hover:bg-gray-100 text-brand-orange" 
                disabled={isSearching}
              >
                {isSearching ? 'SEARCHING...' : 'TRACK PACKAGE'}
              </Button>
            </div>
            <div className="text-white/70 text-sm mt-2 text-center md:text-left">
              Try sample tracking numbers: OI123456789, OI987654321, OI555555555, OI999999999
            </div>
          </form>
        </div>
      </HeroSection>

      {/* Tracking Result Section */}
      <Section className="bg-gray-50">
        {trackingResult ? (
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Tracking Result Header */}
                <div className="bg-white p-6 border-b">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Package className="h-5 w-5 text-brand-orange mr-2" />
                        <h2 className="text-xl font-semibold">Tracking Number: {trackingResult.trackingNumber}</h2>
                      </div>
                      <div className="flex items-center">
                        {getStatusBadge(trackingResult.status)}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-sm border-gray-300"
                      onClick={() => setTrackingResult(null)}
                    >
                      TRACK ANOTHER PACKAGE
                    </Button>
                  </div>
                </div>
                
                {/* Shipment Summary */}
                <div className="bg-gray-50 p-6 border-b">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Origin</h3>
                      <p className="font-medium">{trackingResult.origin}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Destination</h3>
                      <p className="font-medium">{trackingResult.destination}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Service</h3>
                      <p className="font-medium">{trackingResult.service}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Estimated Delivery</h3>
                      <p className="font-medium">{trackingResult.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                {/* Tracking Timeline */}
                <div className="bg-white p-6">
                  <h3 className="text-lg font-semibold mb-4">Shipment Progress</h3>
                  
                  <div className="space-y-6">
                    {trackingResult.steps.map((step, index) => (
                      <div key={step.id} className="flex">
                        <div className="mr-4">
                          <div className="flex flex-col items-center">
                            <div className="rounded-full p-2 bg-gray-100">
                              {getStatusIcon(step.status)}
                            </div>
                            {index < trackingResult.steps.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200 flex-grow mt-2"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            <span className={`font-semibold ${getStatusStyle(step.status)}`}>{step.status}</span>
                          </div>
                          <p className="text-gray-600 mb-1">{step.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" /> 
                            <span>{step.date}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4 mr-1" /> 
                            <span>{step.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center">
            <Package className="h-16 w-16 text-gray-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">NO TRACKING INFORMATION</h2>
            <p className="text-gray-600 mb-6">
              Enter your tracking number above to see the status and location of your shipment.
            </p>
          </div>
        )}
      </Section>

      {/* FAQ Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">TRACKING FAQs</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How long does it take to update tracking?</h3>
              <p className="text-gray-600">
                Tracking updates typically appear in our system within 1-2 hours of a scanning event. 
                During periods of high volume, updates may take slightly longer to appear.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">What if my tracking isn't showing any information?</h3>
              <p className="text-gray-600">
                If you've just created your shipment, please allow 2-4 hours for the tracking information to appear in our system. 
                If it's been longer than that, please contact our customer support team for assistance.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">What do the different tracking statuses mean?</h3>
              <p className="text-gray-600">
                <span className="font-medium">Processing</span>: Your shipment has been entered into our system but hasn't been picked up yet.<br />
                <span className="font-medium">Picked Up</span>: Your package has been collected from the origin location.<br />
                <span className="font-medium">In Transit</span>: Your shipment is on the way to its destination.<br />
                <span className="font-medium">Out for Delivery</span>: Your package is on a delivery vehicle heading to its final destination.<br />
                <span className="font-medium">Delivered</span>: Your package has been delivered.<br />
                <span className="font-medium">Exception</span>: There's an issue with your shipment that needs attention.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Track;
