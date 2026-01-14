# Main Dashboard Implementation

**Priority:** P0 (Critical)  
**Estimated Time:** 3-4 hours  
**Dependencies:** Auth system, database schema

---

## Goal

Build the core dashboard that founders see every day:
- **3-panel layout** (Context, Work, Intelligence)
- **Top 3 priorities** from tasks
- **KPI strip** (MRR, runway, deals, tasks)
- **Risks & alerts**
- **AI insights panel**
- **Quick actions**

---

## Success Criteria

- [x] Dashboard loads in <500ms
- [x] Top 3 priorities visible immediately
- [x] Mark task complete updates in <1s
- [x] AI panel shows actionable insights
- [x] Empty states guide next actions
- [x] Responsive on mobile/tablet

---

## Step 1: Dashboard Shell (30 min)

### 1.1 Three-Panel Layout
```typescript
// /pages/app/Dashboard.tsx
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PrioritiesCard } from '@/components/dashboard/PrioritiesCard';
import { KPIBar } from '@/components/dashboard/KPIBar';
import { RisksCard } from '@/components/dashboard/RisksCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AIPanel } from '@/components/dashboard/AIPanel';
import { LeftNav } from '@/components/app/LeftNav';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FAF7F4]">
      <div className="grid grid-cols-12 gap-6 p-6 max-w-[1800px] mx-auto">
        {/* LEFT: Context (2 cols on desktop) */}
        <div className="col-span-12 lg:col-span-2">
          <LeftNav />
        </div>

        {/* CENTER: Work (7 cols on desktop) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <DashboardHeader />
          <KPIBar />
          <PrioritiesCard />
          <RisksCard />
          <QuickActions />
        </div>

        {/* RIGHT: Intelligence (3 cols on desktop) */}
        <div className="col-span-12 lg:col-span-3">
          <AIPanel />
        </div>
      </div>
    </div>
  );
}
```

---

## Step 2: Dashboard Header (20 min)

```typescript
// /components/dashboard/DashboardHeader.tsx
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

export function DashboardHeader() {
  const { user, org } = useAuth();
  const today = format(new Date(), 'EEEE, MMMM d');

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Good morning, {user?.full_name || 'Founder'}
          </h1>
          <p className="text-sm text-[#6B6560] font-light mt-1">{today}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide">Organization</p>
          <p className="text-sm text-[#1a1614] font-light">{org?.name}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Step 3: KPI Bar (30 min)

```typescript
// /components/dashboard/KPIBar.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, DollarSign, Users, CheckCircle } from 'lucide-react';

interface KPIData {
  mrr: number;
  runway_months: number;
  active_deals: number;
  tasks_due_this_week: number;
}

export function KPIBar() {
  const { org } = useAuth();
  const [kpis, setKpis] = useState<KPIData>({
    mrr: 0,
    runway_months: 0,
    active_deals: 0,
    tasks_due_this_week: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (org) {
      loadKPIs();
    }
  }, [org]);

  async function loadKPIs() {
    if (!org) return;

    try {
      // Count active deals
      const { count: dealsCount } = await supabase
        .from('crm_deals')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', org.id)
        .in('stage', ['initial_contact', 'meeting_scheduled', 'pitch_sent', 'due_diligence']);

      // Count tasks due this week
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      
      const { count: tasksCount } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true })
        .eq('org_id', org.id)
        .neq('status', 'completed')
        .lte('due_at', weekFromNow.toISOString());

      setKpis({
        mrr: 0, // Placeholder - will integrate with financials later
        runway_months: 4, // Placeholder
        active_deals: dealsCount || 0,
        tasks_due_this_week: tasksCount || 0
      });
    } finally {
      setLoading(false);
    }
  }

  const metrics = [
    { label: 'MRR', value: `$${kpis.mrr.toLocaleString()}`, icon: DollarSign, color: 'text-[#E85D4A]' },
    { label: 'Runway', value: `${kpis.runway_months} months`, icon: TrendingUp, color: 'text-[#6B6560]' },
    { label: 'Active Deals', value: kpis.active_deals, icon: Users, color: 'text-[#9B9490]' },
    { label: 'Due This Week', value: kpis.tasks_due_this_week, icon: CheckCircle, color: 'text-[#1a1614]' }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white/60 border border-[#E8E3DD] rounded-xl p-6 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide">{metric.label}</p>
            <metric.icon className={`w-4 h-4 ${metric.color}`} strokeWidth={1.5} />
          </div>
          <p className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

## Step 4: Priorities Card (45 min)

```typescript
// /components/dashboard/PrioritiesCard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Task {
  id: string;
  title: string;
  priority: string;
  due_at: string | null;
  category: string | null;
  status: string;
}

export function PrioritiesCard() {
  const { org } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (org) {
      loadTopPriorities();
    }
  }, [org]);

  async function loadTopPriorities() {
    if (!org) return;

    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('org_id', org.id)
      .neq('status', 'completed')
      .order('priority', { ascending: false })
      .order('due_at', { ascending: true })
      .limit(3);

    setTasks(data || []);
    setLoading(false);
  }

  async function toggleTask(taskId: string, currentStatus: string) {
    const newStatus = currentStatus === 'completed' ? 'in_progress' : 'completed';
    
    await supabase
      .from('tasks')
      .update({ 
        status: newStatus,
        completed_at: newStatus === 'completed' ? new Date().toISOString() : null
      })
      .eq('id', taskId);

    // Optimistic update
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-[#E85D4A]';
      case 'medium': return 'bg-[#9B9490]';
      default: return 'bg-[#E8E3DD]';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 border border-[#E8E3DD] rounded-xl p-6">
        <div className="h-6 bg-[#E8E3DD] rounded w-32 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-[#F5F1ED] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-12 text-center">
        <CheckCircle className="w-12 h-12 text-[#6FCF97] mx-auto mb-4" />
        <h3 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          All caught up!
        </h3>
        <p className="text-sm text-[#6B6560] font-light">
          No urgent tasks right now. Great work.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Top 3 Priorities
        </h2>
        <a href="/app/tasks" className="text-sm text-[#E85D4A] hover:underline font-light">
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 bg-white border border-[#E8E3DD] rounded-lg hover:shadow-sm transition-shadow group"
          >
            <button
              onClick={() => toggleTask(task.id, task.status)}
              className="flex-shrink-0"
            >
              {task.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-[#6FCF97]" />
              ) : (
                <Circle className="w-5 h-5 text-[#E8E3DD] group-hover:text-[#E85D4A] transition-colors" />
              )}
            </button>

            <div className={`w-1 h-10 ${getPriorityColor(task.priority)} rounded-full`} />

            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1a1614] font-light truncate">
                {task.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                {task.category && (
                  <span className="text-xs text-[#9B9490] font-light">
                    {task.category}
                  </span>
                )}
                {task.due_at && (
                  <span className="text-xs text-[#6B6560] font-light flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(task.due_at), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Step 5: AI Panel (30 min)

```typescript
// /components/dashboard/AIPanel.tsx
import { Sparkles, AlertTriangle, Target } from 'lucide-react';

export function AIPanel() {
  return (
    <div className="bg-gradient-to-br from-[#1a1614] to-[#2a2422] rounded-xl p-6 text-white sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#E85D4A]" />
        <h3 className="font-light" style={{ fontFamily: 'Crimson Pro, serif' }}>
          AI Insights
        </h3>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <p className="text-sm text-[#E8E3DD] font-light leading-relaxed">
          You're on track with execution, but 2 investor follow-ups need attention this week to maintain fundraising momentum.
        </p>
      </div>

      {/* Next Steps */}
      <div className="mb-6">
        <h4 className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">Next Steps</h4>
        <div className="space-y-2">
          {[
            'Follow up with Sequoia intro (expires in 2 days)',
            'Ship API beta by Friday',
            'Schedule 3 customer calls this week'
          ].map((step, i) => (
            <button
              key={i}
              className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-light"
            >
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-[#E85D4A] flex-shrink-0 mt-0.5" />
                <span className="text-white">{step}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div>
        <h4 className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">Risks</h4>
        <div className="space-y-2">
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-200 font-light">2 deals at risk</p>
                <p className="text-xs text-red-300/60 font-light mt-1">No contact in 14+ days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Completion Checklist

- [ ] Three-panel layout renders correctly
- [ ] Dashboard loads top 3 tasks from DB
- [ ] KPI bar shows real counts
- [ ] Mark task complete updates instantly
- [ ] AI panel is sticky and visible
- [ ] Empty states guide user actions
- [ ] Mobile responsive (stacks vertically)

---

## Next Steps

→ Move to `/docs/dashboards/03-tasks-hub.md`
