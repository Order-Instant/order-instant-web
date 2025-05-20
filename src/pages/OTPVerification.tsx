import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Section, HeroSection } from "@/components/ui/containers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

type OTPVerificationState = {
  type: "create-user" | "login" | "password-reset";
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
      let bodyData: Record<string, any> = {};

      switch (type) {
        case "create-user":
          endpoint = `${SERVER_IP}/create-user`;
          bodyData = {
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            email: payload?.email,
            password: payload?.password,
            otp: otpCode,
          };
          break;
        case "login":
          endpoint = `${SERVER_IP}/login`;
          bodyData = {
            ...payload,
            otp: otpCode,
          };
          break;
        case "password-reset":
          endpoint = `${SERVER_IP}/reset-password`;
          bodyData = {
            ...payload,
            otp: otpCode,
          };
          break;
        default:
          throw new Error("Invalid operation type");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description:
            type === "create-user"
              ? "Account created successfully!"
              : type === "login"
              ? "Logged in successfully!"
              : "Password reset successful.",
        });
        setOtp(Array(6).fill(""));
        navigate("/auth")
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
        description: "Could not reach server.",
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
            OTP <span className="text-brand-orange">Verification</span>
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
                  {isVerifyingOtp ? "Processing..." : "Submit"}
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
