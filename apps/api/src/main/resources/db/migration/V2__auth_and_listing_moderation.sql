alter table app_user
    alter column email drop not null;

alter table app_user
    add column password_hash varchar(255);

alter table app_user
    add column role varchar(40) not null default 'USER';

alter table app_user
    add column status varchar(40) not null default 'ACTIVE';

alter table app_user
    add constraint chk_app_user_contact check (email is not null or phone is not null);

alter table app_user
    add constraint uq_app_user_phone unique (phone);

create table auth_token (
    id uuid primary key,
    user_id uuid not null references app_user(id) on delete cascade,
    token varchar(128) not null unique,
    created_at timestamp with time zone not null default now(),
    expires_at timestamp with time zone not null
);

alter table listing
    alter column category_id drop not null;

alter table listing
    add column category_key varchar(80);

alter table listing
    add column parameters_json text;

alter table listing
    add column image_url varchar(1000);

alter table listing
    add column contact_name varchar(160);

alter table listing
    add column contact_phone varchar(64);

alter table listing
    add column moderation_message text;

alter table listing
    add column moderated_by uuid references app_user(id);

alter table listing
    add column moderated_at timestamp with time zone;

create index idx_auth_token_token on auth_token(token);
create index idx_listing_seller_status on listing(seller_id, status);
