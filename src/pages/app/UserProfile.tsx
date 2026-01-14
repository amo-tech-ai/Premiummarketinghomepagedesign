import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { User } from 'lucide-react';

export function UserProfile() {
  const mainPanel = (
    <PagePlaceholder
      icon={User}
      title="User Profile"
      description="Manage your personal account settings, notification preferences, and security options."
      features={[
        'Personal information',
        'Email and notification settings',
        'Security and password',
        'Connected accounts',
        'Timezone and locale preferences'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Account Status
        </h2>
        <p className="text-sm text-[#6B6560] font-light">
          Demo account active
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
