import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Star, Users, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Perfect Matches",
      description: "AI-powered date suggestions tailored to your preferences"
    },
    {
      icon: Calendar,
      title: "Smart Planning",
      description: "Effortless date planning with real-time availability"
    },
    {
      icon: Star,
      title: "Premium Experiences",
      description: "Curated romantic experiences in your city"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded people and share experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-hearts absolute top-20 left-20 text-6xl opacity-10">💖</div>
        <div className="floating-hearts absolute top-40 right-32 text-4xl opacity-15 animation-delay-1000">💕</div>
        <div className="floating-hearts absolute bottom-32 left-40 text-5xl opacity-10 animation-delay-2000">💝</div>
        <div className="floating-hearts absolute bottom-20 right-20 text-3xl opacity-20 animation-delay-3000">💗</div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-romantic-gradient rounded-full shadow-glow mb-6">
                <img src='logo.png' className='rounded-full w-20 h-20'/>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-romantic-gradient bg-clip-text text-transparent">DateWeave</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Weaving perfect moments together. Experience dating redefined with AI-powered matches and unforgettable romantic adventures.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                variant="romantic" 
                size="xl" 
                onClick={() => navigate('/signup')}
                className="group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-romantic transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-xl border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Join thousands of happy couples
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to find your perfect match?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create meaningful connections and unforgettable experiences with DateWeave's intelligent matching system.
            </p>
            <Button 
              variant="romantic" 
              size="xl"
              onClick={() => navigate('/signup')}
              className="shimmer"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
