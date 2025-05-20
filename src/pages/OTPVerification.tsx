import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

type OTPVerificationState = {
  type: "email-verification" | "forgot-password";
  payload?: Record<string, any>;
};

const OTPVerification = () => {
  let navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { type, payload } = (location.state || {}) as OTPVerificationState;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  if (!type) {
    return (
      <Section className="py-16 text-center">
        <p className="text-red-600 font-semibold">
          Error: Missing OTP verification type. Please go back and try again.
        </p>
      </Section>
    );
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingOtp(true);

    try {
      let endpoint = "";
      let method;
      let bodyData: Record<string, any> = {};
      let successMessage = "";
      let redirectPath = "/auth"; // default redirect

      switch (type) {
        case "email-verification":
          endpoint = `${SERVER_IP}/create-user`;
          method = "POST";
          bodyData = {
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            email: payload?.email,
            password: payload?.password,
            otp: otpCode,
          };
          successMessage = "Account created successfully! You can now log in.";
          redirectPath = "/auth"; // login page
          break;

        case "forgot-password":
          endpoint = `${SERVER_IP}/change-password`;
          method = "PUT";
          bodyData = {
            email: payload?.email,
            newPassword: payload?.newPassword,
            otp: otpCode,
          };
          successMessage = "Password reset successfully! Please log in with your new password.";
          redirectPath = "/auth"; // login page
          break;

        default:
          throw new Error("Invalid operation type");
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: successMessage,
          action: (
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
          ),
        });

        setOtp(Array(6).fill(""));

        setTimeout(() => {
          navigate(redirectPath);
        }, 1500);

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
        description: "Could not reach the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };


  return (
    <>
      <HeroSection className="py-16 bg-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            OTP <span className="text-brand-orange">VERIFICATION</span>
          </h1>
          <p className="text-lg opacity-90 mb-8 animate-fade-in">
            Enter the 6-digit OTP sent to your email.
          </p>
        </div>
      </HeroSection>

      <Section className="bg-white">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
                <div className="flex space-x-3">
                  {otp.map((digit, idx) => (
                    <Input
                      key={idx}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center text-xl font-mono"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      autoFocus={idx === 0}
                      required
                    />
                  ))}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand-orange text-white"
                  disabled={isVerifyingOtp}
                >
                  {isVerifyingOtp ? "PROCESSING..." : "SUBMIT"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default OTPVerification;
