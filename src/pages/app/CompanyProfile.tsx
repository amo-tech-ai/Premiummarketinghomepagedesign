import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { Building2 } from 'lucide-react';

export function CompanyProfile() {
  const mainPanel = (
    <PagePlaceholder
      icon={Building2}
      title="Company Profile"
      description="Manage your company information, branding, business details, and team structure. Keep your profile up-to-date for accurate AI insights and investor materials."
      features={[
        'Company information and branding',
        'Business model and market details',
        'Team structure and roles',
        'Funding history and cap table',
        'AI profile validation'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          About This Feature
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed">
          Your company profile powers AI recommendations across the platform. Keep it updated for the best experience.
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
