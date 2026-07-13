-- The initial leads table migration enabled RLS and added an insert policy,
-- but never granted table-level privileges to service_role. Postgres checks
-- GRANT before RLS, so every insert failed with "permission denied for table
-- leads" (42501) regardless of the RLS policy.
grant insert on public.leads to service_role;
grant select on public.leads to service_role;
