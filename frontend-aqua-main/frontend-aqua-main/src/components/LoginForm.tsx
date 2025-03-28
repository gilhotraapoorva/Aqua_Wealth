import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

interface LoginFormProps {
  open: boolean;
  onClose: (open: boolean) => void;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ open, onClose, setLoggedIn }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoggedIn(true); // Hide login button after successful login
      onClose(false);  // Ensure modal closes on login success
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#0a2540] to-[#0c3b5e] text-white border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00C6FF]">Login to AquaWealth</DialogTitle>
          <DialogDescription className="text-white/70">
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="link" className="text-[#00C6FF] px-0">
              Forgot password?
            </Button>
            <Button type="submit" className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;