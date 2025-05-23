import { useState } from 'react';
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Package, User, MapPin, Truck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AddressFormProps {
  title: string;
  formData: {
    fullName: string;
    companyName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddressForm = ({ title, formData, onChange }: AddressFormProps) => {
  const prefix = title.toLowerCase();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor={`${prefix}FullName`} className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <Input
            id={`${prefix}FullName`}
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${prefix}CompanyName`} className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
          <Input
            id={`${prefix}CompanyName`}
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            placeholder="Company Name"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${prefix}StreetAddress`} className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <Input
            id={`${prefix}StreetAddress`}
            name="streetAddress"
            value={formData.streetAddress}
            onChange={onChange}
            placeholder="Street Address"
            required
          />
        </div>
        <div>
          <label htmlFor={`${prefix}City`} className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <Input
            id={`${prefix}City`}
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="City"
            required
          />
        </div>
        <div>
          <label htmlFor={`${prefix}PostalCode`} className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <Input
            id={`${prefix}PostalCode`}
            name="postalCode"
            value={formData.postalCode}
            onChange={onChange}
            placeholder="Postal Code"
            required
          />
        </div>
        <div>
          <label htmlFor={`${prefix}Country`} className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <Select
            value={formData.country}
            onValueChange={(value) => onChange({ target: { name: 'country', value } } as any)}
          >
            <SelectTrigger id={`${prefix}Country`}>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="NP">Nepal</SelectItem>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="CN">China</SelectItem>
              {/* Add other countries as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor={`${prefix}Phone`} className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <Input
            id={`${prefix}Phone`}
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div>
          <label htmlFor={`${prefix}Email`} className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input
            id={`${prefix}Email`}
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email Address"
            required
          />
        </div>
      </div>
    </div>
  );
};

const Shipping = () => {
  let navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address forms state
  const emptyAddress = {
    fullName: '',
    companyName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    country: 'NP',
    phone: '',
    email: ''
  };

  const [senderInfo, setSenderInfo] = useState({ ...emptyAddress });
  const [receiverInfo, setReceiverInfo] = useState({ ...emptyAddress });

  // Package details state
  const [packageDetails, setPackageDetails] = useState({
    packageType: 'box',
    weight: '',
    length: '',
    width: '',
    height: '',
    packageDescription: '',
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSenderInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReceiverInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPackageDetails(prev => ({ ...prev, [name]: value }));
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Shipping Addresses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <AddressForm
                    title="Sender"
                    formData={senderInfo}
                    onChange={handleSenderChange}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <AddressForm
                    title="Receiver"
                    formData={receiverInfo}
                    onChange={handleReceiverChange}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Package Details</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                    <RadioGroup
                      value={packageDetails.packageType}
                      onValueChange={(value) => setPackageDetails(prev => ({ ...prev, packageType: value }))}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="box" id="box" />
                        <Label htmlFor="box">Box</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="envelope" id="envelope" />
                        <Label htmlFor="envelope">Envelope</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tube" id="tube" />
                        <Label htmlFor="tube">Tube</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pallet" id="pallet" />
                        <Label htmlFor="pallet">Pallet</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={packageDetails.weight}
                        onChange={handlePackageChange}
                        placeholder="Package weight in kilograms"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length (cm)</label>
                        <Input
                          id="length"
                          name="length"
                          type="number"
                          value={packageDetails.length}
                          onChange={handlePackageChange}
                          placeholder="Length"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
                        <Input
                          id="width"
                          name="width"
                          type="number"
                          value={packageDetails.width}
                          onChange={handlePackageChange}
                          placeholder="Width"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          value={packageDetails.height}
                          onChange={handlePackageChange}
                          placeholder="Height"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="packageDescription" className="block text-sm font-medium text-gray-700 mb-1">Package Description</label>
                    <Textarea
                      id="packageDescription"
                      name="packageDescription"
                      value={packageDetails.packageDescription}
                      onChange={handlePackageChange}
                      placeholder="Brief description of package contents"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Review & Payment</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-brand-orange/10 p-2 rounded mr-4 mt-1">
                        <Truck className="h-5 w-5 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-medium">Shipping Details</h4>
                        <p className="text-gray-600">
                          {packageDetails.packageType.charAt(0).toUpperCase() + packageDetails.packageType.slice(1)} package
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-brand-orange/10 p-2 rounded mr-4 mt-1">
                        <Package className="h-5 w-5 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-medium">Package Dimensions</h4>
                        <p className="text-gray-600">
                          {packageDetails.weight ? `${packageDetails.weight} kg, ` : ''}
                          {packageDetails.length && packageDetails.width && packageDetails.height ?
                            `${packageDetails.length}cm × ${packageDetails.width}cm × ${packageDetails.height}cm` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-brand-orange/10 p-2 rounded mr-4 mt-1">
                        <User className="h-5 w-5 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-medium">From</h4>
                        <p className="text-gray-600">
                          {senderInfo.fullName}<br />
                          {senderInfo.streetAddress}<br />
                          {senderInfo.city}, {senderInfo.postalCode}, {senderInfo.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-brand-orange/10 p-2 rounded mr-4 mt-1">
                        <MapPin className="h-5 w-5 text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-medium">To</h4>
                        <p className="text-gray-600">
                          {receiverInfo.fullName}<br />
                          {receiverInfo.streetAddress}<br />
                          {receiverInfo.city}, {receiverInfo.postalCode}, {receiverInfo.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='h-fit'>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 border p-4 rounded-md">
                      <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                      <Label htmlFor="cash-on-delivery" className="flex items-center">
                        <Truck className="h-5 w-5 mr-2" />
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');

    if (!token) {
      toast({
        title: "Create an Account or Log In",
        description: "You need to log in or sign up to start shipping and track your packages.",
        variant: "destructive", // Optional: use a red-style toast if you want to highlight it's an important action
      });
      navigate("/auth");
      return;
    }


    try {
      const packageData = {
        user_jwt: token,
        // Sender Info
        senderFullName: senderInfo.fullName,
        senderCompanyName: senderInfo.companyName,
        senderStreetAddress: senderInfo.streetAddress,
        senderCity: senderInfo.city,
        senderPostalCode: senderInfo.postalCode,
        senderCountry: senderInfo.country,
        senderPhone: senderInfo.phone,
        senderEmail: senderInfo.email,

        // Receiver Info
        receiverFullName: receiverInfo.fullName,
        receiverCompanyName: receiverInfo.companyName,
        receiverStreetAddress: receiverInfo.streetAddress,
        receiverCity: receiverInfo.city,
        receiverPostalCode: receiverInfo.postalCode,
        receiverCountry: receiverInfo.country,
        receiverPhone: receiverInfo.phone,
        receiverEmail: receiverInfo.email,

        // Package Info
        packageType: packageDetails.packageType,
        weight: parseFloat(packageDetails.weight),
        length: parseFloat(packageDetails.length),
        width: parseFloat(packageDetails.width),
        height: parseFloat(packageDetails.height),
        packageDescription: packageDetails.packageDescription,

        // Payment Info
        paymentMethod: paymentMethod
      };

      const response = await fetch(`${import.meta.env.VITE_SERVER_IP}/add-package`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit package');
      }

      const result = await response.json();

      toast({
        title: "Order Placed Successfully!",
        description: `Your shipment has been created. Tracking number: ${result.trackingNumber || 'OI' + Math.floor(Math.random() * 1000000000)}`,
        action: (
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-white" />
          </div>
        ),
      });

      // Reset form after successful submission
      setCurrentStep(1);
      setSenderInfo({ ...emptyAddress });
      setReceiverInfo({ ...emptyAddress });
      setPackageDetails({
        packageType: 'box',
        weight: '',
        length: '',
        width: '',
        height: '',
        packageDescription: '',
      });
      setPaymentMethod('cash-on-delivery');

    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your package. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <HeroSection className="py-12 bg-gray-100">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Create a <span className="text-brand-orange">Shipment</span>
          </h1>
          <p className="text-lg opacity-90 animate-fade-in">
            Fill out the information below to create a new shipment.
          </p>
        </div>
      </HeroSection>

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="flex justify-between items-center">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center relative"
                  style={{ width: '33.33%' }}
                >
                  <div className="flex-none">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep > index + 1 ? 'bg-brand-orange text-white' :
                      currentStep === index + 1 ? 'bg-white border-2 border-brand-orange text-brand-orange' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                      {currentStep > index + 1 ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                  </div>

                  <div className={`text-xs font-medium mt-2 text-center ${currentStep >= index + 1 ? 'text-brand-orange' : 'text-gray-500'
                    }`}>
                    {index === 0 ? 'Addresses' :
                      index === 1 ? 'Package' :
                        index === 2 ? 'Payment' : ''}
                  </div>

                  {index < totalSteps - 1 && (
                    <div
                      className={`absolute h-0.5 top-5 left-[55%] right-0 -translate-y-1/2 ${currentStep > index + 1 ? 'bg-brand-orange' : 'bg-gray-200'
                        }`}
                      style={{ width: '90%' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            {getStepContent()}

            <div className="mt-10 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous

              </Button>

              {currentStep === totalSteps ? (
                <Button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-dark-orange text-white"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Place Order'}
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-brand-orange hover:bg-brand-dark-orange text-white"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Shipping;