import { Migration } from '@mikro-orm/migrations';

export class Migration20250222174345 extends Migration {
  override up(): void {
    this.addSql(
      `create table "produto" ("id" serial primary key, "nome" varchar(255) not null, "preco" int not null, "estoque" int not null, "categoria" varchar(255) not null);`,
    );
  }

  override down(): void {
    this.addSql(`drop table if exists "produto" cascade;`);
  }
}
