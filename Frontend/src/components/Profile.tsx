import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import profileAvatar from "@/assets/profile.jpg";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  full_name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/profile", {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch profile.");
        }

        const profileData = await response.json();
        setUser(profileData.user);
      } catch (err: any) {
        setError(err.message);
        // If token is invalid, it's good practice to clear it and redirect
        localStorage.removeItem("authToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Static data for now, this can be fetched from your other tables later
  const recommendations = [
    { id: 1, title: "Sunset Dinner at Marina Bay", description: "A romantic waterfront dining experience...", category: "Romantic Dinner", rating: 4.8 },
    { id: 2, title: "Wine Tasting in Napa Valley", description: "Explore world-class vineyards...", category: "Wine & Dine", rating: 4.9 },
    { id: 3, title: "Couples Cooking Class", description: "Learn to cook together...", category: "Activity", rating: 4.7 }
  ];

  const history = [
    { id: 1, date: "Oct 15", title: "Rooftop Garden Dinner", partner: "with Sarah", rating: 5 },
    { id: 2, date: "Oct 8", title: "Art Gallery & Coffee", partner: "with Emma", rating: 4 },
    { id: 3, date: "Sep 28", title: "Beach Picnic Sunset", partner: "with Alex", rating: 5 }
  ];

  const renderStars = (rating: number) => [...Array(5)].map((_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
  ));

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-8">
        <Skeleton className="h-10 w-1/4 mb-8" />
        <Card className="mb-8"><CardContent className="p-8"><Skeleton className="h-48 w-full" /></CardContent></Card>
        <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
      </div>
    );
  }

  if (error) {
    return <div className="flex-1 p-8 text-destructive text-center">Error: {error}</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-background to-primary/5">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-romantic-gradient bg-clip-text text-transparent mb-2">
          My Profile
        </h1>
      </div>

      <Card className="mb-8 bg-card/80 backdrop-blur-xl border-primary/20 shadow-soft">
        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-romantic">
                <AvatarImage src={profileAvatar} alt={user?.username || 'User'} />
                <AvatarFallback className="text-2xl font-bold bg-romantic-gradient text-white">
                  {user?.username?.[0]?.toUpperCase() || <User />}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-3 border-card shadow-sm" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{user?.full_name || user?.username}</h2>
              <p className="text-muted-foreground text-lg">{user?.email}</p>
              <p className="text-muted-foreground text-sm">{user?.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recommendations Section */}
      <Card className="mb-8 bg-card/80 backdrop-blur-xl border-primary/20 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Heart className="w-6 h-6 text-primary" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="group cursor-pointer hover:shadow-romantic transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {rec.category}
                    </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History Section */}
      <Card className="bg-card/80 backdrop-blur-xl border-primary/20 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Clock className="w-6 h-6 text-primary" />
            Your Date History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id} className="group cursor-pointer hover:shadow-soft transition-all duration-300 hover:translate-x-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-accent/20 text-accent hover:bg-accent/30 min-w-[80px] justify-center">
                        {item.date}
                      </Badge>
                      <div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.partner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;