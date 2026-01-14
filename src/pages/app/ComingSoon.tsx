import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-light text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
          {title}
        </h1>
        <p className="text-lg text-[#6B6560] font-light mb-8">
          {description}
        </p>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
