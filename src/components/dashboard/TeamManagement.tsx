
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, User, Mail, Briefcase, MapPin, Star, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  location?: string;
  experience?: string;
  skills?: string[];
  avatar?: string;
}

interface TeamManagementProps {
  readonly?: boolean;
}

export const TeamManagement = ({ readonly = false }: TeamManagementProps) => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Alex Martin',
      role: 'Lead Developer',
      bio: 'Développeur passionné avec 8 ans d\'expérience dans le développement de jeux vidéo. Spécialisé en Unity et Unreal Engine.',
      email: 'alex@gamestudio.com',
      location: 'Paris, France',
      experience: '8 ans',
      skills: ['Unity', 'C#', 'Unreal Engine', 'C++']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Game Designer',
      bio: 'Créatrice d\'expériences ludiques innovantes avec un focus sur l\'UX et le gameplay. Expert en conception de niveaux.',
      email: 'sarah@gamestudio.com',
      location: 'Lyon, France',
      experience: '6 ans',
      skills: ['Game Design', 'Level Design', 'UX/UI', 'Prototyping']
    },
    {
      id: '3',
      name: 'David Chen',
      role: 'Technical Artist',
      bio: 'Artiste technique spécialisé dans l\'optimisation graphique et les shaders. Pont entre l\'art et la technique.',
      email: 'david@gamestudio.com',
      location: 'Toulouse, France',
      experience: '5 ans',
      skills: ['Blender', 'Maya', 'Shaders', 'Optimization']
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      role: 'Marketing Manager',
      bio: 'Responsable marketing digital avec une expertise en community management et stratégie de contenu gaming.',
      email: 'emma@gamestudio.com',
      location: 'Marseille, France',
      experience: '4 ans',
      skills: ['Marketing Digital', 'Community Management', 'Analytics', 'Content Strategy']
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    bio: '',
    email: '',
    location: '',
    experience: '',
    skills: []
  });

  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    const member: TeamMember = {
      ...newMember,
      id: Date.now().toString(),
      skills: newMember.skills || []
    };

    setMembers([...members, member]);
    setNewMember({ name: '', role: '', bio: '', email: '', location: '', experience: '', skills: [] });
    setIsAdding(false);
    
    toast({
      title: "Membre ajouté",
      description: "Le membre a été ajouté à l'équipe",
    });
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast({
      title: "Membre supprimé",
      description: "Le membre a été retiré de l'équipe",
    });
  };

  const getRoleColor = (role: string) => {
    if (role.toLowerCase().includes('lead') || role.toLowerCase().includes('manager')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    } else if (role.toLowerCase().includes('developer')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else if (role.toLowerCase().includes('designer')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else if (role.toLowerCase().includes('artist')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('lead') || role.toLowerCase().includes('manager')) {
      return <Award className="h-3 w-3" />;
    } else if (role.toLowerCase().includes('developer')) {
      return <Briefcase className="h-3 w-3" />;
    } else if (role.toLowerCase().includes('designer')) {
      return <Star className="h-3 w-3" />;
    }
    return <User className="h-3 w-3" />;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Gestion de l'Équipe</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {readonly ? 'Consultez les informations de votre équipe' : 'Gérez les membres de votre équipe de développement'}
          </p>
        </div>
        {!readonly && (
          <Button 
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau membre
          </Button>
        )}
      </div>

      {/* Add Member Form */}
      {isAdding && !readonly && (
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-t-lg">
            <CardTitle className="text-slate-900 dark:text-white flex items-center">
              <Plus className="mr-2 h-5 w-5 text-primary" />
              Nouveau Membre
            </CardTitle>
            <CardDescription>Ajoutez un nouveau membre à votre équipe</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-medium">
                  Nom complet
                </Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="h-11 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary"
                  placeholder="Ex: Alex Martin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-700 dark:text-slate-300 font-medium">
                  Rôle / Poste
                </Label>
                <Input
                  id="role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="h-11 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary"
                  placeholder="Ex: Lead Developer"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                  Email professionnel
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="h-11 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary"
                  placeholder="alex@gamestudio.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-700 dark:text-slate-300 font-medium">
                  Localisation
                </Label>
                <Input
                  id="location"
                  value={newMember.location}
                  onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
                  className="h-11 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-primary"
                  placeholder="Ex: Paris, France"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-slate-700 dark:text-slate-300 font-medium">
                Biographie professionnelle
              </Label>
              <textarea
                id="bio"
                value={newMember.bio}
                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Décrivez l'expérience et les compétences du membre..."
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleAddMember} 
                className="bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter le membre
              </Button>
              <Button 
                onClick={() => setIsAdding(false)} 
                variant="outline"
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Members Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {members.map((member, index) => (
          <Card 
            key={member.id} 
            className="group border-0 shadow-lg hover:shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-red-600/20 flex items-center justify-center shadow-lg">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-red-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors duration-200">
                        {member.name}
                      </h3>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                        {getRoleIcon(member.role)}
                        {member.role}
                      </div>
                    </div>
                    
                    {!readonly && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteMember(member.id)}
                          className="h-8 w-8 p-0 border-red-300 dark:border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Contact & Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Mail className="h-3 w-3" />
                      <span>{member.email}</span>
                    </div>
                    {member.location && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="h-3 w-3" />
                        <span>{member.location}</span>
                      </div>
                    )}
                    {member.experience && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Award className="h-3 w-3" />
                        <span>{member.experience} d'expérience</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Aucun membre pour le moment</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Commencez par ajouter votre premier membre d'équipe</p>
          {!readonly && (
            <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un membre
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
