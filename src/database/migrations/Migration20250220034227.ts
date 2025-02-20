import { Migration } from '@mikro-orm/migrations';

export class Migration20250220034227 extends Migration {
  override up(): void {
    this.addSql(
      `create table "admin" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null);`,
    );
  }

  override down(): void {
    this.addSql(`drop table if exists "admin" cascade;`);
  }
}
