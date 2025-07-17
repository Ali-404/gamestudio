
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
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
      bio: 'Développeur passionné avec 8 ans d\'expérience',
      email: 'alex@gamestudio.com'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Game Designer',
      bio: 'Créatrice d\'expériences ludiques innovantes',
      email: 'sarah@gamestudio.com'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: '',
    bio: '',
    email: ''
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
      id: Date.now().toString()
    };

    setMembers([...members, member]);
    setNewMember({ name: '', role: '', bio: '', email: '' });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion de l'Équipe</h2>
        {!readonly && (
          <Button 
            onClick={() => setIsAdding(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un membre
          </Button>
        )}
      </div>

      {isAdding && !readonly && (
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-white">Nouveau Membre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-white">Nom</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="bg-dark border-primary/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-white">Rôle</Label>
                <Input
                  id="role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="bg-dark border-primary/30 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="bg-dark border-primary/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bio" className="text-white">Biographie</Label>
              <textarea
                id="bio"
                value={newMember.bio}
                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                className="w-full min-h-[80px] px-3 py-2 rounded-md border border-primary/30 bg-dark text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Description du membre..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddMember} className="bg-primary hover:bg-primary/90">
                Ajouter
              </Button>
              <Button 
                onClick={() => setIsAdding(false)} 
                variant="outline"
                className="border-primary/30 text-white hover:bg-primary/10"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id} className="bg-card border-primary/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-1">{member.bio}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                {!readonly && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteMember(member.id)}
                      className="border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
