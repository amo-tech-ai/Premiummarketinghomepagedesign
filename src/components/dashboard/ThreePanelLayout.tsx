import { ReactNode } from 'react';
import { Sidebar } from '../navigation/Sidebar';

interface ThreePanelLayoutProps {
  leftPanelContent?: ReactNode; // Optional page-specific content below sidebar
  mainPanel: ReactNode;
  rightPanel: ReactNode;
}

export function ThreePanelLayout({ leftPanelContent, mainPanel, rightPanel }: ThreePanelLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F4] flex">
      {/* LEFT: Sidebar Navigation */}
      <Sidebar />

      {/* LEFT: Optional Page-Specific Content */}
      {leftPanelContent && (
        <aside className="w-60 min-h-screen border-r border-[#E8E3DD] bg-white/40 backdrop-blur-sm p-6 sticky top-0 overflow-y-auto">
          {leftPanelContent}
        </aside>
      )}

      {/* MAIN: Primary Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {mainPanel}
        </div>
      </main>

      {/* RIGHT: AI Intelligence Panel */}
      <aside className="w-80 min-h-screen border-l border-[#E8E3DD] bg-white/40 backdrop-blur-sm p-6 sticky top-0 overflow-y-auto">
        {rightPanel}
      </aside>
    </div>
  );
}