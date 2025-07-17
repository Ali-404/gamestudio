
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    skills: string[];
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <Card className="group bg-dark/50 border-gray-700 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
      <CardHeader className="text-center">
        <div className="relative mx-auto w-24 h-24 mb-4">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors"
          />
        </div>
        <CardTitle className="text-white group-hover:text-primary transition-colors">
          {member.name}
        </CardTitle>
        <CardDescription className="text-primary font-medium">
          {member.role}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-400 text-sm text-center">
          {member.bio}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2">
          {member.skills.map((skill) => (
            <span 
              key={skill} 
              className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <div className="flex justify-center space-x-2">
          {member.social.github && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-400 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </Button>
          )}
          {member.social.linkedin && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-400 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          )}
          {member.social.twitter && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-400 hover:text-primary"
            >
              <Twitter className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
