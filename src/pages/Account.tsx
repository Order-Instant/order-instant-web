import { useEffect, useState } from 'react';
import { Section } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Check, DownloadCloud, KeyRound, LogOut, Mail, Trash2, User, Package, ArrowRight, CheckCircle, Ban, Clock, Plane, ScanEyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from "../assets/images/dafault-avatar.png"

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  profilePictureUrl?: string;
}

interface Package {
  _id: string;
  status: string;
  createdAt: string;
}

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('order');
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${SERVER_IP}/user-data`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        } else {
          localStorage.removeItem('user_jwt');
          sessionStorage.removeItem('user_jwt');
          navigate('/auth');
          toast({
            title: "Session Expired",
            description: "Please log in again.",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Network Error",
          description: "Could not fetch user info.",
          variant: "destructive",
        });
      }
    };

    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${SERVER_IP}/user-packages`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setPackages(data || []);
          console.log(packages);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch packages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
    if (activeTab === 'order') {
      fetchPackages();
    }
  }, [navigate, toast, activeTab]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');
    if (!token) return;

    try {
      const res = await fetch(`${SERVER_IP}/update-user-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserInfo(updated.user);
        toast({
          title: "Profile Updated",
          description: "Your profile information has been saved.",
          action: (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Could not update profile.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Could not update profile.",
        variant: "destructive",
      });
    }
  };

  const getStatusDetails = (status: Package['status']) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {
          icon: <Clock className="h-4 w-4" />,
          color: 'text-red-500',
          bg: 'bg-red-50',
          border: 'border-red-100',
          text: 'Pending'
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

  const handleDeletePackage = async (packageId: string) => {
    const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');
    if (!token) return;

    try {
      const res = await fetch(`${SERVER_IP}/delete-package/${packageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setPackages(packages.filter(pkg => pkg._id !== packageId));
        toast({
          title: "Package Deleted",
          description: "The package has been removed from your account.",
          action: (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Delete Failed",
          description: "Could not delete the package.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Could not delete package.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Section className="bg-white pt-20 pb-5">
        <div className="w-full">
          <Card className="p-4 bg-gray-100 text-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Left: Photo + Name + Email */}
              <div className="flex items-center gap-4">
                <img
                  src={userInfo?.profilePictureUrl || defaultAvatar}
                  alt="User Profile"
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-gray-300"
                />
                <div className="flex flex-col">
                  <h2 className="text-base sm:text-xl font-semibold">
                    {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Loading...'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-700">{userInfo?.email}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-right sm:text-left">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white mt-2 sm:mt-0 w-full sm:w-auto"
                  onClick={() => {
                    localStorage.removeItem('user_jwt');
                    sessionStorage.removeItem('user_jwt');
                    setUserInfo(null);
                    navigate('/auth');
                    toast({
                      title: "Logged Out",
                      description: "You have been successfully logged out.",
                      action: (
                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      ),
                    });
                  }}
                >
                  LOGOUT
                  <LogOut className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-white pb-20 pt-0">
        <div className="w-full">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="order">ORDER</TabsTrigger>
                  <TabsTrigger value="setting">SETTING</TabsTrigger>
                </TabsList>

                <TabsContent value="order" className="mt-0">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
                    </div>
                  ) : packages.length === 0 ? (
                    <p className="text-sm text-gray-500">No packages found. Start by adding a new package.</p>
                  ) : (
                    <div className="space-y-4">
                      {packages.map((pkg) => {
                        const statusDetails = getStatusDetails(pkg.status);
                        return (
                          <Card key={pkg._id} className={`p-4 ${statusDetails.border} border-l-4`}>
                            <div className="flex justify-between items-start flex-wrap">
                              <div>
                                <h3 className="font-medium flex items-center gap-2">
                                  <Package className="h-5 w-5 text-brand-orange" />
                                  Package ID: {pkg._id}
                                </h3>
                                <div className="mt-4 mb-5 flex flex-wrap gap-4 items-center">
                                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusDetails.bg}`}>
                                    <span className={statusDetails.color}>
                                      {statusDetails.icon}
                                    </span>
                                    <span className={`text-xs font-medium ${statusDetails.color}`}>
                                      {statusDetails.text}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Created:</span> {formatDate(pkg.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-wrap">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/orders/${pkg._id}`)}
                                >
                                  <span className="mr-2">View</span>
                                  <ArrowRight className="h-4 w-4" />
                                </Button>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/track`)}
                                >
                                  Track
                                  <ScanEyeIcon className="h-4 w-4 mr-2" />
                                </Button>

                                {pkg.status !== 'delivered' && pkg.status !== 'cancelled' && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeletePackage(pkg._id)}
                                  >
                                    Delete
                                    <Trash2 className="h-4 w-4 mr-2" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="setting" className="mt-0">
                  <form onSubmit={handleUpdate}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            disabled
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-dark-orange text-white">
                        <DownloadCloud className='w-5 h-5' />
                        SAVE CHANGES
                      </Button>

                      <div className="flex flex-wrap gap-4 justify-between">
                        <Button onClick={() => navigate("/forgot-password")} className="flex-1 min-w-[150px] bg-yellow-500 hover:bg-yellow-600 text-white">
                          <KeyRound className="mr-2 h-4 w-4" />
                          CHANGE PASSWORD
                        </Button>

                        <Button
                          className="flex-1 min-w-[150px] bg-red-500 hover:bg-red-600 text-white"
                          onClick={async () => {
                            const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');
                            if (!token) {
                              toast({
                                title: "Not logged in",
                                description: "Please login first.",
                                variant: "destructive",
                              });
                              navigate('/auth');
                              return;
                            }

                            try {
                              const res = await fetch(`${SERVER_IP}/account-delete-request`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ token }),
                              });

                              if (res.ok) {
                                toast({
                                  title: "OTP Sent",
                                  description: "Check your email to verify account deletion.",
                                });
                                navigate('/otp-verification', {
                                  state: {
                                    type: 'account-delete',
                                    payload: { user_jwt: token },
                                  },
                                });
                              } else {
                                const error = await res.json();
                                toast({
                                  title: "Request Failed",
                                  description: error.message || "Could not send OTP.",
                                  variant: "destructive",
                                });
                              }
                            } catch (err) {
                              toast({
                                title: "Network Error",
                                description: "Could not contact server.",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          DELETE ACCOUNT
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Account;