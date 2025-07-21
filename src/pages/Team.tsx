
import TeamMemberCard from '@/components/TeamMemberCard';
import { cap } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

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
   
  ];

  const {t} = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/5 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {cap(t("our"))} <span className="text-primary">{cap(t("team"))}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t("landingTeamExpert")}
          </p>
        </div>

        {/* Team Stats */}
        <div className="flex items-center justify-around gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12</div>
            <div className="text-gray-400">{t("teamMembers")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8</div>
            <div className="text-gray-400">{t("yearsofexperience")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-gray-400">{cap(t("game"))}</div>
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
              {t("joinOurTeam")}
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              {t("Are you passionate about the development of video games? We are always looking for new talents to enrich our team.")}
            </p>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              {t("jobOffers")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
