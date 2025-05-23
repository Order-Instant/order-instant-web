import { useState } from 'react';
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

const ForgotPassword = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${SERVER_IP}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    newPassword: formData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "OTP Sent",
                    description: "An OTP has been sent to your email address.",
                    variant: "default",
                    action: (
                        <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                        </div>
                    ),
                });

                // Navigate after success
                navigate("/otp-verification", {
                    state: {
                        type: "forgot-password",
                        payload: {
                            email: formData.email,
                            newPassword: formData.newPassword,
                        },
                    },
                });
            } else {
                toast({
                    title: "Error",
                    description: data.error || "Something went wrong.",
                    variant: "destructive",
                });
            }
        } catch (err) {
            toast({
                title: "Network Error",
                description: "Could not reach the server. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <HeroSection className="relative min-h-[8vh] py-16 bg-gray-100">
                <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        FORGOT <span className="text-brand-orange">PASSWORD</span>
                    </h1>
                    <p className="text-lg opacity-90 mb-8 animate-fade-in">
                        Enter your email and new password to reset your password.
                    </p>
                </div>
            </HeroSection>

            <Section className="bg-white">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="newPassword"
                                            name="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="New password"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="pl-10 pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-brand-orange hover:bg-brand-dark-orange text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'PROCESSING...' : 'RESET PASSWORD'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Section>
        </>
    );
};

export default ForgotPassword;
