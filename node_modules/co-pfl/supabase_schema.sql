-- Supabase SQL schema for Day 4
-- Run this in Supabase SQL Editor

-- Ensure UUID functions are available (pgcrypto provides gen_random_uuid)
create extension if not exists "pgcrypto";

-- 1) slideshow
create table if not exists public.slideshow (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  image_url text,
  order_index int default 0,
  created_at timestamptz default now()
);

-- 2) mitra
create table if not exists public.mitra (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text,
  created_at timestamptz default now()
);

-- 3) biaya_kuliah
create table if not exists public.biaya_kuliah (
  id uuid default gen_random_uuid() primary key,
  prodi_name text not null,
  gelombang text,
  nominal numeric,
  keterangan text,
  created_at timestamptz default now()
);

-- 4) testimoni
create table if not exists public.testimoni (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  content text,
  avatar_url text,
  rating int,
  created_at timestamptz default now()
);

-- Enable RLS and add a public read policy for each table
alter table public.slideshow enable row level security;
create policy "public_select" on public.slideshow for select using (true);

alter table public.mitra enable row level security;
create policy "public_select" on public.mitra for select using (true);

alter table public.biaya_kuliah enable row level security;
create policy "public_select" on public.biaya_kuliah for select using (true);

alter table public.testimoni enable row level security;
create policy "public_select" on public.testimoni for select using (true);

-- Dummy data
-- replace slideshow data: remove existing slides then insert updated slides with relevant images
delete from public.slideshow;
insert into public.slideshow (title, subtitle, image_url, order_index)
values
('Selamat Datang di Politeknik', 'Mulai perjalanan kariermu di dunia terapan', 'https://picsum.photos/seed/pcr1/1200/500', 1),
('Kurikulum & Industri', 'Belajar langsung dari praktisi', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80', 2),
('Fasilitas Modern', 'Laboratorium & workshop lengkap', 'https://picsum.photos/seed/pcr3/1200/500', 3),
('Beasiswa & Karier', 'Dukungan beasiswa dan penempatan kerja', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80', 4);

-- replace mitra data: remove existing rows then insert updated partners
delete from public.mitra;
insert into public.mitra (name, logo_url)
values
('PT Chevron Pacific Indonesia', 'https://via.placeholder.com/200x80?text=Chevron'),
('PT Pertamina Hulu Rokan', 'https://via.placeholder.com/200x80?text=Pertamina'),
('PT Ivo Mas Tunggal', 'https://via.placeholder.com/200x80?text=Ivo+Mas+Tunggal'),
('PT PCR Solusi Teknologi', 'https://via.placeholder.com/200x80?text=PCR+Solusi+Teknologi');

-- replace biaya_kuliah data: remove existing rows then insert updated program list
delete from public.biaya_kuliah;
insert into public.biaya_kuliah (prodi_name, gelombang, nominal, keterangan)
values
('Teknik Informatika', 'Reguler', 4500000, 'Per semester, termasuk praktikum TI'),
('Sistem Informasi', 'Reguler', 4300000, 'Per semester, fokus pada aplikasi bisnis'),
('Teknik Mesin', 'Gelombang 1', 4200000, 'Per semester, biaya material praktikum terpisah'),
('Teknik Rekayasa Komputer', 'Reguler', 4600000, 'Per semester, gabungan software & hardware');

insert into public.testimoni (name, role, content, avatar_url, rating)
values
('Ayu', 'Alumni - TI', 'Pengajaran sangat aplikatif dan berguna.', 'https://i.pravatar.cc/100?img=10', 5),
('Budi', 'Mahasiswa - TM', 'Fasilitas lengkap dan dosen ramah.', 'https://i.pravatar.cc/100?img=12', 4),
('Citra', 'Alumni - Multimedia', 'Kerjasama industri membantu karier saya.', 'https://i.pravatar.cc/100?img=20', 5),
('Dedi', 'Mahasiswa - Elektro', 'Kelas praktikum menantang tapi berguna.', 'https://i.pravatar.cc/100?img=30', 4);
