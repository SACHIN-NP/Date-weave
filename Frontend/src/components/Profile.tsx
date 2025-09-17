import React from 'react';
import { Heart, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import profileAvatar from "@/assets/profile.jpg";

const Profile = () => {
  const recommendations = [
    {
      id: 1,
      title: "Sunset Dinner at Marina Bay",
      description: "A romantic waterfront dining experience with stunning city views",
      category: "Romantic Dinner",
      rating: 4.8,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Wine Tasting in Napa Valley",
      description: "Explore world-class vineyards and enjoy intimate wine tastings",
      category: "Wine & Dine",
      rating: 4.9,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Couples Cooking Class",
      description: "Learn to cook together in a fun, interactive environment",
      category: "Activity",
      rating: 4.7,
      image: "/api/placeholder/300/200"
    }
  ];

  const history = [
    {
      id: 1,
      date: "Oct 15",
      title: "Rooftop Garden Dinner",
      partner: "with Sarah",
      rating: 5
    },
    {
      id: 2,
      date: "Oct 8",
      title: "Art Gallery & Coffee",
      partner: "with Emma",
      rating: 4
    },
    {
      id: 3,
      date: "Sep 28",
      title: "Beach Picnic Sunset",
      partner: "with Alex",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-accent fill-accent' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-romantic-gradient bg-clip-text text-transparent mb-2">
          My Profile
        </h1>
      </div>

      {/* Profile Card */}
      <Card className="mb-8 bg-card/80 backdrop-blur-xl border-primary/20 shadow-soft">
        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-romantic">
                <AvatarImage src={profileAvatar} alt="Profile Picture" />
                <AvatarFallback className="text-2xl font-bold bg-romantic-gradient text-white">S</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-3 border-card shadow-sm" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Shreya</h2>
              <p className="text-muted-foreground text-lg">+91-9124049407</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 hover:shadow-romantic transition-all duration-300">
              <div className="text-3xl font-bold bg-romantic-gradient bg-clip-text text-transparent mb-2">12</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Total Plans</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 hover:shadow-soft transition-all duration-300">
              <div className="text-3xl font-bold text-success mb-2">8</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Succeeded</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:shadow-soft transition-all duration-300">
              <div className="text-3xl font-bold text-accent mb-2">24</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Fans</div>
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
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-romantic-gradient opacity-20" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-success/90 text-white flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {rec.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {rec.category}
                    </Badge>
                  </div>
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