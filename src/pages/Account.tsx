import { useEffect, useState } from 'react';
import { Section } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Check, DownloadCloud, KeyRound, LogOut, Mail, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  profilePictureUrl?: string;
}

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('setting');

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

    fetchUserInfo();
  }, [navigate, toast]);

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

  return (
    <>
      <Section className="bg-white pt-20 pb-5">
        <div className="w-full">
          <Card className="p-6 bg-gray-100 text-black flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={userInfo?.profilePictureUrl || "https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg"}
                alt="User Profile"
                className="h-20 w-20 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h2 className="text-xl font-semibold">{userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Loading...'}</h2>
                <p className="text-sm">{userInfo?.email}</p>
                <p className="text-xs mt-1">
                  {userInfo && `Account since ${new Intl.DateTimeFormat('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  }).format(new Date(userInfo.createdAt))}`}
                </p>
              </div>
            </div>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                localStorage.removeItem('user_jwt');
                sessionStorage.removeItem('user_jwt');
                setUserInfo(null);
                navigate('/auth');
                toast({
                  title: "Logged Out", description: "You have been successfully logged out.", action: (
                    <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  ),
                });
              }}
            >
              LOGOUT
              <LogOut className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </Section>

      <Section className="bg-white pb-20 pt-0">
        <div className="w-full">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="setting">SETTING</TabsTrigger>
                  <TabsTrigger value="order">ORDER</TabsTrigger>
                </TabsList>

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

                <TabsContent value="order" className="mt-0">
                  <p className="text-sm text-gray-500">Order history will appear here.</p>
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
