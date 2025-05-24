import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Package, Truck, Plane, Home, Ban, Check, HelpCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

interface Package {
  _id: string;
  senderFullName: string;
  receiverFullName: string;
  senderStreetAddress: string;
  senderCity: string;
  senderCountry: string;
  receiverStreetAddress: string;
  receiverCity: string;
  receiverCountry: string;
  packageDescription: string;
  estimatedDeliveryTime: string;
  lastKnownLocation: string;
  processingDateTime: string;
  pickedUpDataTime: string;
  departedDateTime: string;
  deliveredDateTime: string;
  cancelledDateTime: string;
  createdAt: string;
}

interface StatusEvent {
  status: string;
  datetime: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const Track = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackageData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${SERVER_IP}/get-package/${packageId}`);
        if (res.ok) {
          const data = await res.json();
          setPackageData(data);
        } else {
          toast({
            title: "Error",
            description: "Package not found",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        toast({
          title: "Network Error",
          description: "Could not fetch package data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackageData();
  }, [packageId, navigate, toast]);

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return {
          icon: <Clock className="h-4 w-4" />,
          color: 'text-blue-500',
          bg: 'bg-blue-50',
          border: 'border-blue-100',
          text: 'Processing'
        };
      case 'picked-up':
        return {
          icon: <Package className="h-4 w-4" />,
          color: 'text-purple-500',
          bg: 'bg-purple-50',
          border: 'border-purple-100',
          text: 'Picked Up'
        };
      case 'departed':
        return {
          icon: <Plane className="h-4 w-4" />,
          color: 'text-yellow-500',
          bg: 'bg-yellow-50',
          border: 'border-yellow-100',
          text: 'Departed'
        };
      case 'delivered':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'text-green-500',
          bg: 'bg-green-50',
          border: 'border-green-100',
          text: 'Delivered'
        };
      case 'cancelled':
        return {
          icon: <Ban className="h-4 w-4" />,
          color: 'text-red-500',
          bg: 'bg-red-50',
          border: 'border-red-100',
          text: 'Cancelled'
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          border: 'border-gray-100',
          text: 'Unknown'
        };
    }
  };

  const getStatusEvents = (pkg: Package): StatusEvent[] => {
    const events: StatusEvent[] = [];

    if (pkg.processingDateTime) {
      events.push({
        status: 'Processing',
        datetime: pkg.processingDateTime,
        description: 'Package received and being processed',
        icon: <Package className="h-5 w-5 text-blue-500" />,
        color: 'text-blue-500'
      });
    }

    if (pkg.pickedUpDataTime) {
      events.push({
        status: 'Picked Up',
        datetime: pkg.pickedUpDataTime,
        description: 'Package picked up by courier',
        icon: <Truck className="h-5 w-5 text-purple-500" />,
        color: 'text-purple-500'
      });
    }

    if (pkg.departedDateTime) {
      events.push({
        status: 'Departed',
        datetime: pkg.departedDateTime,
        description: 'Package departed from facility',
        icon: <Plane className="h-5 w-5 text-yellow-500" />,
        color: 'text-yellow-500'
      });
    }

    if (pkg.deliveredDateTime) {
      events.push({
        status: 'Delivered',
        datetime: pkg.deliveredDateTime,
        description: 'Package delivered to recipient',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        color: 'text-green-500'
      });
    }

    if (pkg.cancelledDateTime) {
      events.push({
        status: 'Cancelled',
        datetime: pkg.cancelledDateTime,
        description: 'Shipment was cancelled',
        icon: <Ban className="h-5 w-5 text-red-500" />,
        color: 'text-red-500'
      });
    }

    // Sort events by datetime
    return events.sort((a, b) =>
      new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
  };

  const getLatestStatus = (pkg: Package): string => {
    if (pkg.cancelledDateTime) return 'Cancelled';
    if (pkg.deliveredDateTime) return 'Delivered';
    if (pkg.departedDateTime) return 'Departed';
    if (pkg.pickedUpDataTime) return 'Picked Up';
    if (pkg.processingDateTime) return 'Processing';
    return 'Not Processed';
  };

  const getProgressValue = (pkg: Package): number => {
    if (pkg.cancelledDateTime) return 0;
    if (pkg.deliveredDateTime) return 100;
    if (pkg.departedDateTime) return 75;
    if (pkg.pickedUpDataTime) return 50;
    if (pkg.processingDateTime) return 25;
    return 0;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Package not found</p>
      </div>
    );
  }

  const statusEvents = getStatusEvents(packageData);
  const progressValue = getProgressValue(packageData);
  const latestStatus = getLatestStatus(packageData);
  const statusDetails = getStatusDetails(latestStatus.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main tracking card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main tracking information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <Package className="hidden sm:inline h-6 w-6 text-brand-orange" />
                Tracking Package: {packageData._id}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="font-medium">Current Status:</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusDetails.bg} ${statusDetails.border} border`}>
                  <span className={statusDetails.color}>
                    {statusDetails.icon}
                  </span>
                  <span className={`text-xs font-medium ${statusDetails.color}`}>
                    {statusDetails.text}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Shipment Progress</span>
                    <span className="text-sm font-medium">{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>

                {/* Status timeline */}
                <div className="space-y-4">
                  {statusEvents.length > 0 ? (
                    statusEvents.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className={`flex flex-col items-center`}>
                          <div className={`p-2 rounded-full ${event.color} bg-opacity-20`}>
                            {event.icon}
                          </div>
                          {index < statusEvents.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1 gap-2 flex-wrap">
                          <div className="flex justify-between gap-2 flex-wrap items-center">
                            <h3 className="font-medium">{event.status}</h3>
                            <span className="text-sm text-gray-500">
                              {formatDate(event.datetime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{event.description}</p>
                          {event.status === 'Departed' && packageData.lastKnownLocation && (
                            <p className="text-sm mt-1">
                              <span className="font-medium">Last Known Location:</span> {packageData.lastKnownLocation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No tracking updates available yet</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details at bottom of tracking card */}
          <Card>
            <CardHeader>
              <CardTitle>SHIPMENT DETAILS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sender</h3>
                <p>{packageData.senderFullName}</p>
                <p className="text-sm text-gray-600">
                  {packageData.senderStreetAddress}, {packageData.senderCity}, {packageData.senderCountry}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Receiver</h3>
                <p>{packageData.receiverFullName}</p>
                <p className="text-sm text-gray-600">
                  {packageData.receiverStreetAddress}, {packageData.receiverCity}, {packageData.receiverCountry}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Package Description</h3>
                <p className="text-sm text-gray-600">
                  {packageData.packageDescription}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/package/${packageData._id}`)}
              >
                View Package Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Package details sidebar */}
        <div className="space-y-6">
          {/* Estimated Delivery Time */}
          <Card>
            <CardHeader>
              <CardTitle>ESTIMATED DELIVERY TIME</CardTitle>
            </CardHeader>
            <CardContent>
              {packageData.estimatedDeliveryTime ? (
                <p>{formatDate(packageData.estimatedDeliveryTime)}</p>
              ) : (
                <p className="text-gray-500">Not available</p>
              )}
            </CardContent>
          </Card>

          {/* Last Known Location */}
          <Card>
            <CardHeader>
              <CardTitle>LAST KNOWN LOCATION</CardTitle>
            </CardHeader>
            <CardContent>
              {packageData.lastKnownLocation ? (
                <p>{packageData.lastKnownLocation}</p>
              ) : (
                <p className="text-gray-500">Not available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQs at bottom of page */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-brand-orange" />
              TRACKING FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does it take to update tracking?</AccordionTrigger>
                <AccordionContent>
                  Tracking updates typically appear in our system within 1-2 hours of a scanning event.
                  During periods of high volume, updates may take slightly longer to appear.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What if my tracking isn't showing any information?</AccordionTrigger>
                <AccordionContent>
                  If you've just created your shipment, please allow 2-4 hours for the tracking information to appear in our system.
                  If it's been longer than that, please contact our customer support team for assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What do the different tracking statuses mean?</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p><strong>Processing:</strong> Your shipment has been entered into our system but hasn't been picked up yet.</p>
                    <p><strong>Picked Up:</strong> Your package has been collected from the origin location.</p>
                    <p><strong>Departed:</strong> Your shipment has left the processing facility.</p>
                    <p><strong>Delivered:</strong> Your package has been delivered to the recipient.</p>
                    <p><strong>Cancelled:</strong> The shipment was cancelled and will not be delivered.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Track;