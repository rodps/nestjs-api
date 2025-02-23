import { Migration } from '@mikro-orm/migrations';

export class Migration20250223211813 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "pedido" alter column "valor_total" type double precision using ("valor_total"::double precision);`,
    );
    this.addSql(
      `alter table "pedido" alter column "valor_total" set default 0;`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "pedido" alter column "valor_total" drop default;`,
    );
    this.addSql(
      `alter table "pedido" alter column "valor_total" type double precision using ("valor_total"::double precision);`,
    );
  }
}
