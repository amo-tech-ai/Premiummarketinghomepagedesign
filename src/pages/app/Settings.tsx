import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  const mainPanel = (
    <PagePlaceholder
      icon={SettingsIcon}
      title="Settings"
      description="System configuration and preferences. Manage integrations, billing, team permissions, and application settings."
      features={[
        'Integration management (Slack, email, etc.)',
        'Billing and subscription',
        'Team permissions and roles',
        'Notification preferences',
        'API keys and webhooks'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          System Status
        </h2>
        <p className="text-sm text-[#6B6560] font-light">
          All systems operational
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
