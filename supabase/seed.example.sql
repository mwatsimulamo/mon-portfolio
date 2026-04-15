-- Exemple : insérer les données initiales après avoir copié le contenu des fichiers JSON
-- (Table Editor → portfolio_content → Insert row est souvent plus simple.)

-- insert into public.portfolio_content (content_key, body) values
--   ('projects', '[...]'::jsonb),
--   ('articles', '[...]'::jsonb),
--   ('experiences', '[...]'::jsonb),
--   ('skills', '{...}'::jsonb);
