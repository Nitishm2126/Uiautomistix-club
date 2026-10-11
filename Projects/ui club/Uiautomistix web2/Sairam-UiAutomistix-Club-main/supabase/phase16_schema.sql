-- ============================================================
-- Sairam UiAutomistix Club — Phase 16 Database Schema Updates
-- ============================================================
-- IMPORTANT: This script updates the database to support
-- authenticated admin operations. It does NOT recreate tables.
--
-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- ============================================================

-- ============================================================
-- 1. AUTHENTICATED ADMIN POLICIES (INSERT / UPDATE / DELETE)
-- ============================================================
-- These policies allow any logged-in user (authenticated) to
-- modify content. Since this is an admin-only app, any
-- authenticated user is considered an admin.
-- ============================================================

-- announcements
create policy "Admin can insert announcements"
  on announcements for insert to authenticated with check (true);

create policy "Admin can update announcements"
  on announcements for update to authenticated using (true) with check (true);

create policy "Admin can delete announcements"
  on announcements for delete to authenticated using (true);


-- events
create policy "Admin can insert events"
  on events for insert to authenticated with check (true);

create policy "Admin can update events"
  on events for update to authenticated using (true) with check (true);

create policy "Admin can delete events"
  on events for delete to authenticated using (true);


-- gallery
create policy "Admin can insert gallery"
  on gallery for insert to authenticated with check (true);

create policy "Admin can update gallery"
  on gallery for update to authenticated using (true) with check (true);

create policy "Admin can delete gallery"
  on gallery for delete to authenticated using (true);


-- magic_members
create policy "Admin can insert magic_members"
  on magic_members for insert to authenticated with check (true);

create policy "Admin can update magic_members"
  on magic_members for update to authenticated using (true) with check (true);

create policy "Admin can delete magic_members"
  on magic_members for delete to authenticated using (true);


-- scope_members
create policy "Admin can insert scope_members"
  on scope_members for insert to authenticated with check (true);

create policy "Admin can update scope_members"
  on scope_members for update to authenticated using (true) with check (true);

create policy "Admin can delete scope_members"
  on scope_members for delete to authenticated using (true);


-- join_us
create policy "Admin can insert join_us"
  on join_us for insert to authenticated with check (true);

create policy "Admin can update join_us"
  on join_us for update to authenticated using (true) with check (true);

create policy "Admin can delete join_us"
  on join_us for delete to authenticated using (true);


-- contact
create policy "Admin can insert contact"
  on contact for insert to authenticated with check (true);

create policy "Admin can update contact"
  on contact for update to authenticated using (true) with check (true);

create policy "Admin can delete contact"
  on contact for delete to authenticated using (true);


-- ============================================================
-- 2. STORAGE POLICIES
-- ============================================================
-- Ensure the buckets exist first (create them manually in the
-- Supabase dashboard: 'gallery', 'event-posters', 'team-photos')
--
-- We allow public to SELECT, and authenticated to all.
-- ============================================================

-- Note: We need to enable RLS on the storage.objects table if it isn't already.
-- (Usually it is enabled by default in Supabase).
-- alter table storage.objects enable row level security;

-- GALLERY BUCKET
create policy "Gallery images are publicly accessible."
  on storage.objects for select to public
  using (bucket_id = 'gallery');

create policy "Authenticated users can upload gallery images."
  on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery');

create policy "Authenticated users can update gallery images."
  on storage.objects for update to authenticated
  using (bucket_id = 'gallery');

create policy "Authenticated users can delete gallery images."
  on storage.objects for delete to authenticated
  using (bucket_id = 'gallery');


-- EVENT-POSTERS BUCKET
create policy "Event posters are publicly accessible."
  on storage.objects for select to public
  using (bucket_id = 'event-posters');

create policy "Authenticated users can upload event posters."
  on storage.objects for insert to authenticated
  with check (bucket_id = 'event-posters');

create policy "Authenticated users can update event posters."
  on storage.objects for update to authenticated
  using (bucket_id = 'event-posters');

create policy "Authenticated users can delete event posters."
  on storage.objects for delete to authenticated
  using (bucket_id = 'event-posters');


-- TEAM-PHOTOS BUCKET
create policy "Team photos are publicly accessible."
  on storage.objects for select to public
  using (bucket_id = 'team-photos');

create policy "Authenticated users can upload team photos."
  on storage.objects for insert to authenticated
  with check (bucket_id = 'team-photos');

create policy "Authenticated users can update team photos."
  on storage.objects for update to authenticated
  using (bucket_id = 'team-photos');

create policy "Authenticated users can delete team photos."
  on storage.objects for delete to authenticated
  using (bucket_id = 'team-photos');

-- ============================================================
-- END OF SCRIPT
-- ============================================================
