
import TeamMemberCard from '@/components/TeamMemberCard';

const Team = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'Alexandre Martin',
      role: 'Directeur Créatif',
      bio: 'Visionnaire passionné avec 10 ans d\'expérience dans l\'industrie du jeu vidéo.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      skills: ['Game Design', 'Leadership', 'Unity'],
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      id: '2',
      name: 'Sophie Dubois',
      role: 'Lead Developer',
      bio: 'Développeuse senior spécialisée dans les moteurs de jeu et l\'optimisation.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150',
      skills: ['C#', 'Unity', 'Unreal Engine'],
      social: {
        github: '#',
        linkedin: '#',
      },
    },
    {
      id: '3',
      name: 'Pierre Laurent',
      role: 'Game Designer',
      bio: 'Créateur d\'expériences gaming mémorables et innovantes.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      skills: ['Game Design', 'Prototyping', 'UX/UI'],
      social: {
        github: '#',
        twitter: '#',
      },
    },
    {
      id: '4',
      name: 'Marie Chen',
      role: 'Artiste 3D',
      bio: 'Spécialiste en modélisation 3D et animation pour jeux vidéo.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      skills: ['Blender', 'Maya', 'Substance Painter'],
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      id: '5',
      name: 'Lucas Bernard',
      role: 'Sound Designer',
      bio: 'Créateur d\'ambiances sonores immersives et de musiques originales.',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150',
      skills: ['Audio', 'Music', 'Wwise'],
      social: {
        github: '#',
        linkedin: '#',
      },
    },
    {
      id: '6',
      name: 'Emma Wilson',
      role: 'QA Lead',
      bio: 'Garantit la qualité et la performance de tous nos projets.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      skills: ['Testing', 'Bug Tracking', 'Automation'],
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notre <span className="text-primary">Équipe</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Rencontrez les talents créatifs et passionnés qui donnent vie à nos jeux
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12</div>
            <div className="text-gray-400">Membres</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8</div>
            <div className="text-gray-400">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-gray-400">Projets réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">6</div>
            <div className="text-gray-400">Spécialités</div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-dark/50 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Rejoignez notre équipe !
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Vous êtes passionné par le développement de jeux vidéo ? 
              Nous sommes toujours à la recherche de nouveaux talents pour enrichir notre équipe.
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Voir les offres d'emploi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
