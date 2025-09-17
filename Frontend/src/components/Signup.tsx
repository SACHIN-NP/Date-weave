import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.username.trim() || formData.username.length < 3) errors.username = 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) errors.username = 'Username can only contain letters, numbers, and underscores';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.password || formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!formData.address.trim()) errors.address = 'Address is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed. Please try again.");
      }

      toast({
        title: "Account created successfully!",
        description: data.message || "Welcome to DateWeave! You can now sign in.",
      });

      setFormData({ username: '', email: '', password: '', confirmPassword: '', address: '' });
      navigate('/login');

    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
       {/* Floating hearts animation -- CORRECTED */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-hearts absolute top-1/4 left-1/4 text-4xl opacity-20">💖</div>
        <div className="floating-hearts absolute top-1/3 right-1/4 text-2xl opacity-15 animation-delay-1000">💕</div>
        <div className="floating-hearts absolute bottom-1/4 left-1/3 text-3xl opacity-10 animation-delay-2000">💝</div>
        <div className="floating-hearts absolute bottom-1/3 right-1/3 text-2xl opacity-20 animation-delay-3000">💗</div>
      </div>

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-primary/20 shadow-glow">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-romantic-gradient rounded-full flex items-center justify-center shadow-romantic">
                <img src='logo.png' alt="DateWeave Logo" className='rounded-full w-30 h-30'/>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-romantic-gradient bg-clip-text text-transparent">
                DateWeave
              </h1>
              <p className="text-muted-foreground text-sm">
                Join us to start weaving your perfect dates
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`${validationErrors.username ? 'border-destructive' : ''}`}
                placeholder="Choose a username"
                required
              />
              {validationErrors.username && (
                <span className="text-destructive text-xs">{validationErrors.username}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${validationErrors.email ? 'border-destructive' : ''}`}
                placeholder="Enter your email"
                required
              />
              {validationErrors.email && (
                <span className="text-destructive text-xs">{validationErrors.email}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pr-10 ${validationErrors.password ? 'border-destructive' : ''}`}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.password && (
                <span className="text-destructive text-xs">{validationErrors.password}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`pr-10 ${validationErrors.confirmPassword ? 'border-destructive' : ''}`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <span className="text-destructive text-xs">{validationErrors.confirmPassword}</span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`${validationErrors.address ? 'border-destructive' : ''}`}
                placeholder="Enter your address"
                required
              />
              {validationErrors.address && (
                <span className="text-destructive text-xs">{validationErrors.address}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="romantic"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;