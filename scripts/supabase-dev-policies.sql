-- Temporary dev policies to allow anon inserts for seeding
-- Products: allow anon INSERT (dev only)
create policy if not exists "Allow anon insert products (dev only)"
on public.products
for insert
to anon
with check (true);

-- Orders: allow anon INSERT when user_id is NULL (dev only)
create policy if not exists "Allow anon insert orders (dev only)"
on public.orders
for insert
to anon
with check (user_id is null);
