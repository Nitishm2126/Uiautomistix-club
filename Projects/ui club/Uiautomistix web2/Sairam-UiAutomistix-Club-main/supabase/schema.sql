-- ============================================================
-- Sairam UiAutomistix Club — Supabase Database Schema
-- ============================================================
-- Phase 15: Backend Foundation
--
-- HOW TO USE:
--   1. Open your Supabase project dashboard.
--   2. Navigate to: SQL Editor → New Query.
--   3. Paste this entire file and click "Run".
--
-- CONTENTS:
--   1. Extensions
--   2. Table: announcements
--   3. Table: events
--   4. Table: gallery
--   5. Table: magic_members
--   6. Table: scope_members
--   7. Table: join_us
--   8. Table: contact
--   9. Row Level Security — enable on all tables
--  10. RLS Policies — public read-only (no anon writes)
--  11. Seed data
-- ============================================================


-- ============================================================
-- 1. EXTENSIONS
-- ============================================================

-- pgcrypto: provides gen_random_uuid() for UUID generation
create extension if not exists pgcrypto;


-- ============================================================
-- 2. TABLE: announcements
-- ============================================================
-- Stores the single current club announcement (if any).
-- The public website shows this only when is_active = true.
-- Starts empty — no fake upcoming events.
-- ============================================================

create table if not exists announcements (
  id               uuid        primary key default gen_random_uuid(),
  title            text        not null,
  description      text        not null,
  poster_url       text,
  event_date       date,
  registration_url text,
  is_active        boolean     not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table  announcements                is 'Current club announcement. Public website shows only is_active = true records.';
comment on column announcements.poster_url     is 'Supabase Storage URL for the event poster image (nullable).';
comment on column announcements.registration_url is 'Google Form or external registration link (nullable).';
comment on column announcements.is_active      is 'Only one announcement should be active at a time.';


-- ============================================================
-- 3. TABLE: events
-- ============================================================
-- Stores confirmed past and upcoming club events.
-- ============================================================

create table if not exists events (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  year        integer     not null check (year >= 1900 and year <= 2100),
  description text,
  image_url   text,
  event_date  date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  events           is 'Club events — past and upcoming.';
comment on column events.year      is 'Event year (must be between 1900 and 2100).';
comment on column events.image_url is 'Supabase Storage URL for event poster/image (nullable).';

-- Index for common ordering by year descending
create index if not exists events_year_idx on events (year desc);


-- ============================================================
-- 4. TABLE: gallery
-- ============================================================
-- Stores gallery images for the public website gallery section.
-- ============================================================

create table if not exists gallery (
  id            uuid        primary key default gen_random_uuid(),
  title         text,
  image_url     text        not null,
  caption       text,
  display_order integer     not null default 0 check (display_order >= 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table  gallery               is 'Gallery images displayed on the public website.';
comment on column gallery.image_url     is 'Supabase Storage URL for the gallery image (required).';
comment on column gallery.display_order is 'Controls render order (ascending). Must be >= 0.';

-- Index for display order
create index if not exists gallery_display_order_idx on gallery (display_order asc);


-- ============================================================
-- 5. TABLE: magic_members
-- ============================================================
-- Stores MAGIC team members (Mastermind, Advocate, Guide,
-- Influencer, Communicator). Supports both existing and
-- prospective member types.
-- ============================================================

create table if not exists magic_members (
  id            uuid        primary key default gen_random_uuid(),
  role          text        not null,
  name          text        not null,
  department    text        not null,
  member_type   text        not null check (member_type in ('existing', 'prospective')),
  photo_url     text,
  display_order integer     not null default 0 check (display_order >= 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table  magic_members             is 'MAGIC team members — existing (3rd year) and prospective (2nd year).';
comment on column magic_members.role        is 'MAGIC role: Mastermind, Advocate, Guide, Influencer, Communicator.';
comment on column magic_members.member_type is 'Must be "existing" or "prospective".';
comment on column magic_members.photo_url   is 'Supabase Storage URL for the member photo (nullable).';

-- Index for filtering by member type
create index if not exists magic_members_type_idx     on magic_members (member_type);
create index if not exists magic_members_order_idx    on magic_members (display_order asc);


-- ============================================================
-- 6. TABLE: scope_members
-- ============================================================
-- Stores SCOPE team role placeholders (Strategist, Caption,
-- Organiser, Propagator, Executer). Names and departments
-- are null until official information is provided.
-- ============================================================

create table if not exists scope_members (
  id            uuid        primary key default gen_random_uuid(),
  role          text        not null unique,
  name          text,
  department    text,
  photo_url     text,
  display_order integer     not null default 0 check (display_order >= 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table  scope_members             is 'SCOPE team members — Strategist, Caption, Organiser, Propagator, Executer.';
comment on column scope_members.role        is 'SCOPE role (unique): Strategist, Caption, Organiser, Propagator, Executer.';
comment on column scope_members.name        is 'Member name — nullable until official info is provided.';
comment on column scope_members.department  is 'Department — nullable until official info is provided.';
comment on column scope_members.photo_url   is 'Supabase Storage URL — nullable until photo is available.';

-- Index for display order
create index if not exists scope_members_order_idx on scope_members (display_order asc);


-- ============================================================
-- 7. TABLE: join_us
-- ============================================================
-- Single-record table storing the Join Us section content.
-- ============================================================

create table if not exists join_us (
  id               uuid        primary key default gen_random_uuid(),
  eligibility      text        not null,
  benefits         text        not null,
  how_to_join      text        not null,
  registration_url text,
  updated_at       timestamptz not null default now()
);

comment on table  join_us                    is 'Join Us section content — single record expected.';
comment on column join_us.eligibility        is 'Eligibility criteria text for club membership.';
comment on column join_us.benefits           is 'Membership benefits description text.';
comment on column join_us.how_to_join        is 'Step-by-step joining process description.';
comment on column join_us.registration_url   is 'Google Form or registration link — nullable until form is ready.';


-- ============================================================
-- 8. TABLE: contact
-- ============================================================
-- Single-record table storing confirmed club contact details.
-- ============================================================

create table if not exists contact (
  id            uuid        primary key default gen_random_uuid(),
  club_email    text        not null,
  instagram_url text        not null,
  linkedin_url  text        not null,
  college_name  text        not null,
  address       text        not null,
  updated_at    timestamptz not null default now()
);

comment on table contact is 'Club contact information — single record expected.';


-- ============================================================
-- 9. ROW LEVEL SECURITY — Enable on all content tables
-- ============================================================
-- RLS is enabled on every table. Without an explicit policy,
-- all operations are denied by default (secure by default).
-- ============================================================

alter table announcements  enable row level security;
alter table events         enable row level security;
alter table gallery        enable row level security;
alter table magic_members  enable row level security;
alter table scope_members  enable row level security;
alter table join_us        enable row level security;
alter table contact        enable row level security;


-- ============================================================
-- 10. RLS POLICIES — Public read-only
-- ============================================================
-- Public website uses the anon role and may only SELECT.
-- NO anon INSERT / UPDATE / DELETE policies are created.
-- Admin write policies will be added in Phase 16 (authentication).
-- ============================================================

-- announcements: public can only read ACTIVE announcements
create policy "Public can view active announcements"
  on announcements for select
  to anon
  using (is_active = true);

-- events: public can read all events
create policy "Public can view all events"
  on events for select
  to anon
  using (true);

-- gallery: public can read all gallery records
create policy "Public can view all gallery images"
  on gallery for select
  to anon
  using (true);

-- magic_members: public can read all MAGIC members
create policy "Public can view all MAGIC members"
  on magic_members for select
  to anon
  using (true);

-- scope_members: public can read all SCOPE members
create policy "Public can view all SCOPE members"
  on scope_members for select
  to anon
  using (true);

-- join_us: public can read join us content
create policy "Public can view join us content"
  on join_us for select
  to anon
  using (true);

-- contact: public can read contact information
create policy "Public can view contact information"
  on contact for select
  to anon
  using (true);


-- ============================================================
-- 11. SEED DATA
-- ============================================================
-- Only confirmed, real data is inserted here.
-- No invented names, dates, or URLs.
-- announcements: intentionally empty (no active event).
-- gallery: intentionally empty (local SVGs cannot be migrated
--          via SQL — actual uploads come in the Gallery CRUD phase).
-- ============================================================


-- ----------------------------------------------------------
-- SEED: events (5 confirmed real events)
-- ----------------------------------------------------------
-- Nullable fields (description, image_url, event_date) are
-- intentionally left NULL — no data was provided for them.
-- ----------------------------------------------------------

insert into events (title, year) values
  ('RPA SKILL-A-THON 2021',      2021),
  ('UiVerse',                    2024),
  ('INTRODUCTION TO UIPATH',     2025),
  ('AUTOMATION4SDG PITCHFEST',   2025),
  ('AGENT HACK''25',             2025);


-- ----------------------------------------------------------
-- SEED: magic_members (10 confirmed members)
-- ----------------------------------------------------------
-- 5 existing (3rd Year) + 5 prospective (2nd Year).
-- photo_url left NULL — photos to be uploaded in a later phase.
-- display_order mirrors the canonical MAGIC acronym order.
-- ----------------------------------------------------------

insert into magic_members (role, name, department, member_type, display_order) values
  -- Existing members (3rd Year)
  ('Mastermind',   'Lokesh S S',          'AIDS', 'existing', 1),
  ('Advocate',     'Prerna',              'CSE',  'existing', 2),
  ('Guide',        'Ezhil',               'ECE',  'existing', 3),
  ('Influencer',   'Prathisha Narayanan', 'IT',   'existing', 4),
  ('Communicator', 'Sharmila',            'AIML', 'existing', 5),
  -- Prospective members (2nd Year)
  ('Mastermind',   'Thanishka Yogesh',    'CSE',  'prospective', 1),
  ('Advocate',     'Shanjeev',            'IoT',  'prospective', 2),
  ('Guide',        'Jayashree',           'ECE',  'prospective', 3),
  ('Influencer',   'Jeevitha',            'CSE',  'prospective', 4),
  ('Communicator', 'Harini',              'IT',   'prospective', 5);


-- ----------------------------------------------------------
-- SEED: scope_members (5 role placeholders)
-- ----------------------------------------------------------
-- Names and departments are intentionally NULL.
-- Official information has not been provided.
-- display_order mirrors the canonical SCOPE acronym order.
-- ----------------------------------------------------------

insert into scope_members (role, display_order) values
  ('Strategist', 1),
  ('Caption',    2),
  ('Organiser',  3),
  ('Propagator', 4),
  ('Executer',   5);


-- ----------------------------------------------------------
-- SEED: join_us (1 record — existing frontend content)
-- ----------------------------------------------------------
-- registration_url is NULL — no official Google Form yet.
-- ----------------------------------------------------------

insert into join_us (eligibility, benefits, how_to_join, registration_url) values
  (
    'Open to all students of Sri Sairam Engineering College who are passionate about automation, RPA, UiPath, robotics, technology, innovation, and problem-solving. No prior experience is required — just curiosity and a drive to learn.',

    'Hands-On Automation: Get practical exposure to automation technologies including RPA, UiPath, and intelligent process automation. | Workshops & Training: Attend skill-building workshops, bootcamps, and training sessions conducted by experienced members and industry professionals. | Project Experience: Collaborate on real-world automation projects, build your portfolio, and apply your knowledge in meaningful ways. | Team & Community: Work alongside like-minded peers, build lasting connections, and grow as part of a vibrant technology community. | Leadership Growth: Develop leadership, communication, and organizational skills through active roles within MAGIC and SCOPE frameworks. | Events & Competitions: Represent the club in inter-college competitions, hackathons, idea pitches, and technical events.',

    '1. Explore the Club — Learn about Sairam UiAutomistix Club, our activities, events, and what we do through this website. | 2. Fill the Registration Form — Complete the official membership registration form with your name, department, year, and contact details. | 3. Submit Your Details — Review and submit the registration form. Ensure all information is accurate before submitting. | 4. Await Club Communication — The club will reach out with further instructions, orientation details, and onboarding information.',

    null
  );


-- ----------------------------------------------------------
-- SEED: contact (1 record — confirmed club contact details)
-- ----------------------------------------------------------

insert into contact (club_email, instagram_url, linkedin_url, college_name, address) values
  (
    'UiAutomistixsairam@gmail.com',
    'https://www.instagram.com/sairam_uiautomistix_club?igsi=eGNpZTMwNXBvZGRy',
    'https://www.linkedin.com/company/uiautomistix-sec/',
    'Sri Sairam Engineering College',
    'Sai Leo Nagar, West Tambaram Poonthandalam Village, Chennai, Tamil Nadu 600044'
  );


-- ============================================================
-- END OF SCHEMA
-- ============================================================
-- Phase 15 complete.
--
-- Expected record counts after running this file:
--   announcements : 0   (intentionally empty)
--   events        : 5
--   gallery       : 0   (images to be uploaded in later phase)
--   magic_members : 10
--   scope_members : 5
--   join_us       : 1
--   contact       : 1
--
-- Phase 16 will add:
--   - Admin authentication policies
--   - Authenticated INSERT / UPDATE / DELETE policies
-- ============================================================
