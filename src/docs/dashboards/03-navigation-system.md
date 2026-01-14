# Navigation System Implementation Plan

**Component:** Global Sidebar Navigation  
**Status:** Planning  
**Priority:** P0 - Critical Infrastructure  
**Estimated Time:** 4-6 hours

---

## Current State Analysis

### ✅ What We Have
- Basic ThreePanelLayout component
- Dashboard with inline navigation links
- Projects page working
- React Router setup with basic routes
- Auth context (disabled for dev)

### ❌ What's Missing
- Unified sidebar navigation component
- Consistent 3-panel layout across all pages
- Navigation state management
- Active route highlighting
- 8 placeholder pages (Wizard, CompanyProfile, Documents, etc.)
- Proper route structure

---

## Implementation Plan

### Phase 1: Navigation Component (2 hours)

#### 1.1 Create Sidebar Component
**File:** `/components/navigation/Sidebar.tsx`

**Features:**
- Logo and branding
- Platform section (10 menu items)
- Workspace section (Settings)
- Active route highlighting
- Icon support (Lucide React)
- User profile footer

**Data Structure:**
```typescript
interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section: 'platform' | 'workspace';
}
```

#### 1.2 Navigation Items
```typescript
Platform:
1. Dashboard → /app/dashboard
2. Projects → /app/projects
3. Startup Profile → /app/wizard
4. Edit Company → /app/company-profile
5. User Profile → /app/profile
6. Pitch Decks → /app/documents
7. Lean Canvas → /app/lean-canvas
8. Discovery → /app/discovery
9. Deals → /app/crm
10. Execution → /app/tasks

Workspace:
11. Settings → /app/settings
```

---

### Phase 2: Update ThreePanelLayout (1 hour)

#### 2.1 Integrate Sidebar
**Changes:**
- Add Sidebar to left panel by default
- Make left panel content optional
- Support page-specific context below sidebar
- Maintain sticky positioning

**New API:**
```typescript
interface ThreePanelLayoutProps {
  leftPanelContent?: ReactNode; // Optional page-specific context
  mainPanel: ReactNode;
  rightPanel: ReactNode;
}
```

---

### Phase 3: Create Placeholder Pages (2 hours)

#### 3.1 Pages to Create

**Format: Consistent placeholder with:**
- Page title
- Brief description
- "Coming soon" message
- Link back to dashboard
- ThreePanelLayout structure

**Pages:**
1. `/pages/app/Wizard.tsx` - Startup Profile Wizard
2. `/pages/app/CompanyProfile.tsx` - Edit Company
3. `/pages/app/UserProfile.tsx` - User Profile
4. `/pages/app/Documents.tsx` - Pitch Decks
5. `/pages/app/LeanCanvas.tsx` - Lean Canvas
6. `/pages/app/Discovery.tsx` - Discovery
7. `/pages/app/CRM.tsx` - Deals
8. `/pages/app/Tasks.tsx` - Execution
9. `/pages/app/Settings.tsx` - Settings

---

### Phase 4: Update Routes (30 minutes)

#### 4.1 App.tsx Route Configuration
```typescript
<Route path="/app/*" element={<ProtectedRoute>...</ProtectedRoute>}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="projects" element={<Projects />} />
  <Route path="projects/:id" element={<ProjectDetail />} />
  <Route path="wizard" element={<Wizard />} />
  <Route path="company-profile" element={<CompanyProfile />} />
  <Route path="profile" element={<UserProfile />} />
  <Route path="documents" element={<Documents />} />
  <Route path="lean-canvas" element={<LeanCanvas />} />
  <Route path="discovery" element={<Discovery />} />
  <Route path="crm" element={<CRM />} />
  <Route path="tasks" element={<Tasks />} />
  <Route path="settings" element={<Settings />} />
  <Route index element={<Navigate to="dashboard" />} />
</Route>
```

---

### Phase 5: Update Existing Pages (30 minutes)

#### 5.1 Dashboard.tsx
**Changes:**
- Remove inline navigation
- Use updated ThreePanelLayout
- Focus only on dashboard content

#### 5.2 Projects.tsx
**Changes:**
- Remove inline navigation
- Use updated ThreePanelLayout
- Keep filters as leftPanelContent

---

## Component Architecture

### Navigation Component Tree
```
App
└── ProtectedRoute
    └── ThreePanelLayout
        ├── Sidebar (LEFT - always visible)
        │   ├── Logo
        │   ├── Platform Menu Items
        │   ├── Workspace Menu Items
        │   └── User Footer
        ├── LeftPanelContent (LEFT - optional, page-specific)
        ├── MainPanel (CENTER - page content)
        └── RightPanel (RIGHT - AI insights)
```

---

## Visual Design Specification

### Sidebar Styles
```typescript
Background: bg-white border-r border-[#E8E3DD]
Width: 240px (w-60)
Padding: p-6
Height: min-h-screen
Position: sticky top-0

Logo Section:
- Text: "StartupAI"
- Font: Crimson Pro, serif
- Size: text-lg
- Color: text-[#1a1614]
- Margin bottom: mb-6

Menu Sections:
- Section title: text-xs uppercase tracking-wide text-[#9B9490]
- Section spacing: mb-4

Menu Items:
- Default: text-[#6B6560] hover:text-[#1a1614]
- Active: bg-[#E85D4A]/10 text-[#E85D4A]
- Padding: px-3 py-2
- Border radius: rounded-lg
- Font: text-sm font-light
- Icon size: w-4 h-4
- Gap: gap-3

User Footer:
- Border top: border-t border-[#E8E3DD]
- Padding top: pt-6
- User name: text-sm font-light
- Plan badge: text-xs text-[#9B9490]
```

---

## Icons Mapping

```typescript
import {
  LayoutDashboard,  // Dashboard
  FolderKanban,     // Projects
  Sparkles,         // Startup Profile
  Building2,        // Edit Company
  User,             // User Profile
  FileText,         // Pitch Decks
  Grid3x3,          // Lean Canvas
  Search,           // Discovery
  Briefcase,        // Deals
  CheckSquare,      // Execution
  Settings,         // Settings
  LogOut            // Sign Out
} from 'lucide-react';
```

---

## Testing Checklist

### Navigation Tests
- [ ] All menu items clickable
- [ ] Active route highlighted correctly
- [ ] Navigation persists across routes
- [ ] Icons display correctly
- [ ] Hover states work
- [ ] Mobile responsive (future)

### Route Tests
- [ ] All routes accessible
- [ ] Deep linking works
- [ ] 404 redirects to dashboard
- [ ] Protected routes redirect to login (when auth enabled)
- [ ] URL updates on navigation

### Layout Tests
- [ ] Sidebar always visible
- [ ] Main content scrollable
- [ ] Right panel sticky
- [ ] Page-specific left content displays correctly
- [ ] No layout shifts

---

## Migration Strategy

### Step 1: Create New Components
- Build Sidebar component
- Update ThreePanelLayout
- Create placeholder pages
- Don't break existing pages

### Step 2: Update Routes
- Add all new routes to App.tsx
- Test each route individually
- Verify navigation works

### Step 3: Update Existing Pages
- Dashboard: Remove inline nav
- Projects: Remove inline nav
- Test both pages work with new sidebar

### Step 4: Polish
- Add animations
- Test keyboard navigation
- Accessibility audit
- Mobile responsiveness (future)

---

## File Structure

```
/components/
  └── navigation/
      ├── Sidebar.tsx          (NEW)
      └── MenuItem.tsx         (NEW - optional)

/pages/app/
  ├── Dashboard.tsx            (UPDATE)
  ├── Projects.tsx             (UPDATE)
  ├── Wizard.tsx              (NEW)
  ├── CompanyProfile.tsx      (NEW)
  ├── UserProfile.tsx         (NEW)
  ├── Documents.tsx           (NEW)
  ├── LeanCanvas.tsx          (NEW)
  ├── Discovery.tsx           (NEW)
  ├── CRM.tsx                 (NEW)
  ├── Tasks.tsx               (NEW)
  └── Settings.tsx            (NEW)

/components/dashboard/
  └── ThreePanelLayout.tsx    (UPDATE)

/App.tsx                       (UPDATE - add routes)
```

---

## Success Criteria

### Must Have
- [ ] All 11 menu items working
- [ ] Navigation highlights active route
- [ ] All routes accessible
- [ ] Consistent layout across pages
- [ ] No broken links

### Should Have
- [ ] Smooth transitions
- [ ] Keyboard navigation
- [ ] User footer with profile info
- [ ] Sign out working

### Nice to Have
- [ ] Collapsible sidebar (mobile)
- [ ] Keyboard shortcuts (Cmd+K)
- [ ] Recent pages history
- [ ] Favorites/pinning

---

## Time Breakdown

| Task | Estimated Time |
|------|----------------|
| Create Sidebar component | 1.5 hours |
| Update ThreePanelLayout | 1 hour |
| Create 9 placeholder pages | 2 hours |
| Update routes | 30 minutes |
| Update existing pages | 30 minutes |
| Testing & polish | 30 minutes |
| **TOTAL** | **6 hours** |

---

## Implementation Order

1. ✅ Create planning doc (this file)
2. ⏳ Create Sidebar component
3. ⏳ Update ThreePanelLayout
4. ⏳ Create placeholder pages
5. ⏳ Update App.tsx routes
6. ⏳ Update Dashboard.tsx
7. ⏳ Update Projects.tsx
8. ⏳ Test all navigation
9. ⏳ Polish and document

---

## Next Steps

**Immediate:**
1. Review this plan
2. Create Sidebar component
3. Test navigation works
4. Create placeholder pages

**This Week:**
1. Complete navigation system
2. Build out priority pages (Tasks, CRM)
3. Add keyboard shortcuts

**Future:**
1. Mobile navigation drawer
2. Command palette (Cmd+K)
3. Navigation analytics

---

**Status:** Ready to implement  
**Owner:** Development Team  
**Target Completion:** January 14, 2025
