import { Migration } from '@mikro-orm/migrations';

export class Migration20250222175724 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "produto" alter column "preco" type double precision using ("preco"::double precision);`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "produto" alter column "preco" type int using ("preco"::int);`,
    );
  }
}
