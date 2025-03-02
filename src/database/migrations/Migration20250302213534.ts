import { Migration } from '@mikro-orm/migrations';

export class Migration20250302213534 extends Migration {
  override up(): void {
    this.addSql(
      `create table "admin" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null);`,
    );

    this.addSql(
      `create table "customer" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null);`,
    );
    this.addSql(
      `alter table "customer" add constraint "customer_email_unique" unique ("email");`,
    );

    this.addSql(
      `create table "order" ("id" serial primary key, "customer_id" int not null, "address" varchar(255) not null, "total_value" numeric(10,2) not null default 0, "status" smallint not null default 1, "order_date" timestamptz not null, "delivery_date" timestamptz null);`,
    );

    this.addSql(
      `create table "product" ("id" serial primary key, "name" varchar(255) not null, "price" double precision not null, "stock" int not null);`,
    );

    this.addSql(
      `create table "order_item" ("id" serial primary key, "order_id" int not null, "product_id" int not null, "quantity" int not null, "unit_price" numeric(10,2) not null, "total_price" numeric(10,2) not null);`,
    );

    this.addSql(
      `alter table "order" add constraint "order_customer_id_foreign" foreign key ("customer_id") references "customer" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;`,
    );
    this.addSql(
      `alter table "order_item" add constraint "order_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "order" drop constraint "order_customer_id_foreign";`,
    );

    this.addSql(
      `alter table "order_item" drop constraint "order_item_order_id_foreign";`,
    );

    this.addSql(
      `alter table "order_item" drop constraint "order_item_product_id_foreign";`,
    );

    this.addSql(`drop table if exists "admin" cascade;`);

    this.addSql(`drop table if exists "customer" cascade;`);

    this.addSql(`drop table if exists "order" cascade;`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "order_item" cascade;`);
  }
}
