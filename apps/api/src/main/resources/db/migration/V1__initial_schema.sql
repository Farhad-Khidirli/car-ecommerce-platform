create table app_user (
    id uuid primary key,
    email varchar(255) not null unique,
    phone varchar(64),
    display_name varchar(160) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table category (
    id uuid primary key,
    parent_id uuid references category(id),
    code varchar(120) not null unique,
    name varchar(160) not null,
    sort_order integer not null default 0
);

create table location (
    id uuid primary key,
    parent_id uuid references location(id),
    name varchar(160) not null,
    slug varchar(160) not null unique
);

create table listing (
    id uuid primary key,
    seller_id uuid not null references app_user(id),
    category_id uuid not null references category(id),
    location_id uuid references location(id),
    title varchar(220) not null,
    description text,
    price_amount numeric(14, 2),
    price_currency char(3) not null default 'AZN',
    status varchar(40) not null,
    listing_type varchar(40) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz
);

create index idx_listing_category on listing(category_id);
create index idx_listing_location on listing(location_id);
create index idx_listing_status_created on listing(status, created_at desc);
