// TeamManagement.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [members, setMembers] = useState<TeamMember[]>([ /* ...initial data... */ ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Omit<TeamMember, 'id'>>({
    name: '', role: '', bio: '', email: '', location: '', experience: '', skills: []
  });
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast({ title: t('teamManagement.error'), description: t('teamManagement.fillAllFields'), variant: 'destructive' });
      return;
    }
    const member: TeamMember = { ...newMember, id: Date.now().toString(), skills: newMember.skills || [] };
    setMembers(prev => [...prev, member]);
    setNewMember({ name: '', role: '', bio: '', email: '', location: '', experience: '', skills: [] });
    setIsAdding(false);
    toast({ title: t('teamManagement.memberAdded.title'), description: t('teamManagement.memberAdded.description') });
  };

  const handleDeleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    toast({ title: t('teamManagement.memberDeleted.title'), description: t('teamManagement.memberDeleted.description') });
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('teamManagement.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {readonly ? t('teamManagement.subtitleRead') : t('teamManagement.subtitleEdit')}
          </p>
        </div>
        {!readonly && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus /> {t('teamManagement.actions.new')}
          </Button>
        )}
      </div>

      {/* Add Form */}
      {isAdding && !readonly && (
        <Card>
          <CardHeader>
            <CardTitle><Plus /> {t('teamManagement.actions.new')}</CardTitle>
            <CardDescription>{t('teamManagement.newDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* fields with t('teamManagement.fields.*') placeholders */}
            <Button onClick={handleAddMember}>{t('teamManagement.actions.add')}</Button>
            <Button onClick={() => setIsAdding(false)} variant="outline">{t('teamManagement.actions.cancel')}</Button>
          </CardContent>
        </Card>
      )}

      {/* Members Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {members.map((member, i) => (
          <Card key={member.id} style={{ animationDelay: `${i*100}ms` }}>
            <CardContent>
              <h3>{member.name}</h3>
              <div>{getRoleIcon(member.role)} {member.role}</div>
              <p>{member.bio}</p>
              <div>{member.email}</div>
              {member.location && <div>{member.location}</div>}
              {member.experience && <div>{member.experience}</div>}
              {/* skills */}
              {!readonly && <Button onClick={() => handleDeleteMember(member.id)}>{t('teamManagement.actions.delete')}</Button>}
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <div>
          <h3>{t('teamManagement.empty.title')}</h3>
          <p>{t('teamManagement.empty.description')}</p>
          {!readonly && <Button onClick={() => setIsAdding(true)}>{t('teamManagement.actions.new')}</Button>}
        </div>
      )}
    </div>
  );
};
