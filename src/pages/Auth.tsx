import { useEffect, useState } from 'react';
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock, User, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

const Auth = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');

  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);  // <---- New state

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLogin(true);

    try {
      const response = await fetch(`${SERVER_IP}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          if (rememberMe) {
            localStorage.setItem('user_jwt', data.token);
          } else {
            sessionStorage.setItem('user_jwt', data.token);
          }
          navigate("/account");
        }

        toast({
          title: "Login Successful",
          description: data.message || "Welcome back to OrderInstant!",
          action: (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ),
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to server.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingSignup(true);

    try {
      const response = await fetch(`${SERVER_IP}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: signupData.firstName,
          lastName: signupData.lastName,
          email: signupData.email,
          password: signupData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account Created",
          description: data.message || "Welcome to OrderInstant! Please verify OTP.",
          action: (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ),
        });

        // Redirect with type and payload to otp-verification
        navigate('/otp-verification', {
          state: {
            type: 'email-verification',
            payload: {
              email: signupData.email,
              firstName: signupData.firstName,
              lastName: signupData.lastName,
              password: signupData.password,
            }
          }
        });

      } else {
        toast({
          title: "Signup Failed",
          description: data.error || "Failed to create account.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to server.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSignup(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');
    if (token) {
      navigate('/account');
    }
  }, [navigate]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        className="py-16 bg-gray-100"
      >
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            GET <span className="text-brand-orange">STARTED</span>
          </h1>
          <p className="text-lg opacity-90 mb-8 animate-fade-in">
            Log in to your OrderInstant account or create a new one to effortlessly manage your shipments, track orders in real-time.
          </p>
        </div>
      </HeroSection>

      {/* Account Forms Section */}
      <Section className="bg-white">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">LOGIN</TabsTrigger>
                  <TabsTrigger value="signup">SIGNUP</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-0">
                  <form onSubmit={handleLoginSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            id="login-email" 
                            name="email" 
                            type="email" 
                            placeholder="your@email.com"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            className="pl-10" 
                            required 
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            id="login-password" 
                            name="password" 
                            type={showLoginPassword ? "text" : "password"} 
                            placeholder="Your password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className="pl-10 pr-10" 
                            required 
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                          >
                            {showLoginPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input 
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox" 
                            className="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                          </label>
                        </div>
                        <div className="text-sm">
                          <Link to={"/forgot-password"} className="text-brand-orange hover:text-brand-dark-orange">
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-brand-orange hover:bg-brand-dark-orange text-white"
                        disabled={isSubmittingLogin}
                      >
                        {isSubmittingLogin ? 'LOGGING IN...' : 'LOGIN'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-0">
                  <form onSubmit={handleSignupSubmit}>
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
                              name="firstName" 
                              placeholder="John"
                              value={signupData.firstName}
                              onChange={handleSignupChange}
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
                              name="lastName" 
                              placeholder="Doe"
                              value={signupData.lastName}
                              onChange={handleSignupChange}
                              className="pl-10"
                              required 
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            id="signup-email" 
                            name="email" 
                            type="email" 
                            placeholder="your@email.com"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            className="pl-10"
                            required 
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            id="signup-password" 
                            name="password" 
                            type={showSignupPassword ? "text" : "password"} 
                            placeholder="Your password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            className="pl-10 pr-10"
                            required 
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                          >
                            {showSignupPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            id="confirm-password" 
                            name="confirmPassword" 
                            type={showSignupConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm password"
                            value={signupData.confirmPassword}
                            onChange={handleSignupChange}
                            className="pl-10 pr-10"
                            required 
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                          >
                            {showSignupConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-brand-orange hover:bg-brand-dark-orange text-white"
                        disabled={isSubmittingSignup}
                      >
                        {isSubmittingSignup ? 'SIGNING UP...' : 'SIGNUP'}
                      </Button>
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

export default Auth;
