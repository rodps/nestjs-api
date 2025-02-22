import { Migration } from '@mikro-orm/migrations';

export class Migration20250222205500 extends Migration {
  override up(): void {
    this.addSql(
      `create table "cliente" ("id" serial primary key, "nome" varchar(255) not null, "email" varchar(255) not null, "telefone" varchar(255) not null, "endereco" varchar(255) not null);`,
    );
  }

  override down(): void {
    this.addSql(`drop table if exists "cliente" cascade;`);
  }
}
