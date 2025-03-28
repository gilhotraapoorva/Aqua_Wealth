
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUser } from "@/Context/UserContext"; 

interface LoginFormProps {
  open: boolean;
  onClose: (open: boolean) => void;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({ open, onClose, setLoggedIn }: LoginFormProps) => {
  const { setUser } = useUser(); // Use context to store user details
  const [governmentId, setGovernmentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userExists, setUserExists] = useState(true);

  const checkUserExists = async () => {
    try {
      console.log("Checking user with governmentId:", governmentId); // Debugging log
      const response = await fetch(`http://localhost:8080/users/${governmentId}`);
      console.log("Backend response status:", response.status); // Debugging log
  
      if (response.ok) {
        const userData = await response.json();
        console.log("User found:", userData); // Debugging log
        setUserExists(true);
        setName(userData.name);
        setEmail(userData.email);
        return true; // User exists
      } else {
        console.log("User not found:", response.status); // Debugging log
        setUserExists(false);
        return false; // User does not exist
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setUserExists(false);
      return false; // Assume user does not exist on error
    }
  };
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const userExistsInDB = await checkUserExists();
    if (userExists) {
      // Login logic
      
  
      if (userExistsInDB) {
        // User exists, proceed with login
        setUser({ name, email, governmentId }); // Store user data globally
        setLoggedIn(true);
        onClose(false);
      } else {
        // User does not exist, prompt to register
        alert("User does not exist. Please register first.");
        setUserExists(false); // Switch to registration mode
      }
    } else {
      // Registration logic
      try {
        const registerResponse = await fetch(`http://localhost:8080/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, governmentId, password }),
        });
  
        if (registerResponse.ok) {
          alert("Registration successful! Please log in.");
          setUserExists(true); // Switch back to login mode
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("An error occurred. Please try again.");
      }
    }
  
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#0a2540] to-[#0c3b5e] text-white border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00C6FF]">
            {userExists ? "Login to AquaWealth" : "Register for AquaWealth"}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {userExists ? "Enter your credentials to access your account" : "Fill in your details to create an account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="governmentId" className="text-white">Government ID</Label>
              <Input
                id="governmentId"
                type="text"
                value={governmentId}
                onChange={(e) => setGovernmentId(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                placeholder="Enter your Government ID"
                required
              />
            </div>

            {!userExists && ( // Show Name field only during registration
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  placeholder="Your Full Name"
                  required
                />
              </div>
            )}

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
            {userExists && (
              <Button type="button" variant="link" className="text-[#00C6FF] px-0">
                Forgot password?
              </Button>
            )}
            <Button type="submit" className="bg-[#00C6FF] hover:bg-[#0072FF] transition-all shadow-lg shadow-cyan-500/50" disabled={isLoading}>
              {isLoading ? "Processing..." : userExists ? "Login" : "Register"}
            </Button>
          </div>

          {userExists ? (
            <div className="text-center mt-4">
              <p className="text-white/70">Don't have an account?</p>
              <Button onClick={() => setUserExists(false)} className="bg-[#00C6FF] hover:bg-[#0072FF]">
                Register
              </Button>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p className="text-white/70">Already have an account?</p>
              <Button onClick={() => setUserExists(true)} className="bg-[#00C6FF] hover:bg-[#0072FF]">
                Login
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;

