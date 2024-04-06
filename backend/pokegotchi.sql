echo 'Delete and recreate pokegotchi db?'
prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pokegotchi;
CREATE DATABASE pokegotchi;
connect pokegotchi

i pokegotchi-schema.sql
i pokegotchi-seed.sql

\echo 'Delete and recreate pokegotchi_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pokegotchi_test;
CREATE DATABASE pokegotchi_test;
\connect pokegotchi_test

\i pokegotchi-schema.sql
