CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  duration VARCHAR(10) NOT NULL,
  plays VARCHAR(20) DEFAULT '0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS releases (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(4) NOT NULL,
  cover_url TEXT NOT NULL,
  tracks_count INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tracks (title, duration, plays) VALUES
  ('Neon Dreams', '3:45', '1.2M'),
  ('Emerald Flow', '4:12', '890K'),
  ('Digital Pulse', '3:28', '2.1M'),
  ('Green Machine', '5:03', '1.5M');

INSERT INTO releases (title, year, cover_url, tracks_count, type) VALUES
  ('Emerald Horizons', '2024', 'https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/9948f111-c6cc-4809-8001-179edf7a20ea.jpg', 8, 'Album'),
  ('Digital Dreams EP', '2023', 'https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/1a4cd4ed-17b8-4906-8885-a72f88cdab0f.jpg', 4, 'EP'),
  ('Green Machine', '2023', 'https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/d8bb3772-871a-430c-8ef5-f85109c4931c.jpg', 1, 'Single');
