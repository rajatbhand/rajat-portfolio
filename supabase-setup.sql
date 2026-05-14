-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor → New Query)

-- Projects / Case Studies table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  slug text unique not null,
  display_order integer default 0,
  tags text[] default '{}',
  is_new boolean default false,
  is_published boolean default true,
  year text,
  role text,
  duration text,
  team text,
  visual text default 'rely',
  hero_color text default '#0f0f1a',
  summary text,
  outcome text,
  content text,
  cover_image text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Site settings table
create table if not exists site_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value jsonb,
  updated_at timestamp with time zone default now()
);

-- Enable public read access (portfolio is public)
alter table projects enable row level security;
alter table site_settings enable row level security;

create policy "Public can read published projects"
  on projects for select
  using (is_published = true);

create policy "Public can read site settings"
  on site_settings for select
  using (true);

-- Allow all operations with service key (used by admin panel via API route)
create policy "Service role full access to projects"
  on projects for all
  using (true)
  with check (true);

create policy "Service role full access to settings"
  on site_settings for all
  using (true)
  with check (true);

-- Seed the Rely project
insert into projects (title, subtitle, slug, display_order, tags, is_new, year, role, duration, team, visual, hero_color, summary, outcome, content)
values (
  'Rely',
  'A rental platform that makes finding home feel like home',
  'rely',
  1,
  ARRAY['UX Research', 'Product Design', 'Real Estate', 'Multi-sided Platform'],
  true,
  '2023',
  'Lead UX Designer',
  '6 months',
  '2 Designers, 3 Engineers, 1 PM',
  'rely',
  '#0f0f1a',
  'A Bay Area rental platform unifying renters, landlords and housing advocates. Multi-sided product addressing the fragmented $50B rental market.',
  'Designed end-to-end experience across 5 user types — from initial research and personas through to information architecture, user journeys and design principles.',
  '## The Brief

Rely — Real Estate Logistics for You — is a Bay Area startup founded in 2014, aiming to be the ultimate one-stop solution for renting and letting properties.

## The Problem

Four core problems were identified:

**Prolonged Procedure** — The renting process is time-consuming and burdensome for both renters and landlords.

**Obscure Information** — Lack of clarity around lease terms, additional costs and property details creates confusion on both sides.

**Overwhelming Property Management** — Managing properties across disconnected tools creates stress for landlords.

**Engaging Across Multiple Platforms** — Renters spend hours across 5+ platforms to find the same listings.

## The 5 Personas

Michelle (Renter, 28), Brian (Small Landlord, 35), Lizie (Big Landlord, 55), Jake (Housing Developer), Elisa (Housing Advocate).

## Outcome

Complete UX foundation: 5 personas, competitive analysis across 5 platforms, 9-category insight synthesis, stakeholder interview synthesis, 5 design principles, 3 IA maps, 8 user journey maps.'
);

-- Seed Partner Portal
insert into projects (title, subtitle, slug, display_order, tags, is_new, year, role, duration, team, visual, hero_color, summary, outcome, content)
values (
  'Partner Portal',
  'A unified platform for insurance agents and bank branches',
  'partner-portal',
  2,
  ARRAY['Enterprise UX', 'Insurance', 'Dashboard', 'Web App'],
  false,
  '2018',
  'UI/UX Designer',
  '2 years',
  '1 Designer (solo), Dev team, Client stakeholders',
  'portal',
  '#0f1a0f',
  'A unified web platform for insurance agents and bank branches — consolidating proposals, renewals, claims and commission tracking into one dashboard.',
  'Eliminated the need for agents to navigate 3+ disconnected systems. Consolidated 4 partner profile types into one flexible template system.',
  '## The Brief

Insurance distribution is a mess of disconnected systems. I was the sole designer responsible for the entire experience.

## The Problem

No unified digital platform for insurance distribution partners across agents, bank branches, sub-brokers and main brokers.

## The Solution

Dashboard, Profiles (4 types), Policy Module, Commissions Module, Claims Module, Knowledge Bank, Rewards & Recognition.

## Outcome

7 core modules designed and shipped. Zero training required on Knowledge Bank. Commission transparency eliminated paper statements.'
);

-- Seed site settings
insert into site_settings (key, value) values
('profile', '{"name": "Rajat Bhandari", "role": "Senior UX Designer", "location": "Bangalore, India", "availability": "Open to opportunities", "email": "rajat.rajat.bhandari.1@gmail.com", "bio": ["Senior UX Designer with over a decade of experience building digital products across fintech, insurance, media, edtech and real estate.", "What drives me is the intersection of clarity and craft — making complex systems feel simple without losing depth.", "I work fluently across the research-to-delivery pipeline: user interviews, personas, journey mapping, IA, wireframing, prototyping and visual design."], "social": {"linkedin": "https://www.linkedin.com/in/rajatbhand/", "behance": "https://www.behance.net/bhandrajat", "dribbble": "https://dribbble.com/BhandRajat", "instagram": "https://www.instagram.com/bhandrajat/"}, "stats": [{"num": "11+", "label": "Years exp."}, {"num": "20+", "label": "Projects"}, {"num": "8+", "label": "Industries"}], "skills": ["Figma", "User Research", "Design Systems", "Prototyping", "Webflow", "Journey Mapping", "IA & Flows", "Usability Testing"]}')
on conflict (key) do nothing;
