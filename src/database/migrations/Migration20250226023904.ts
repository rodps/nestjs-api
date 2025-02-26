import { Migration } from '@mikro-orm/migrations';

export class Migration20250226023904 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "pedido" alter column "valor_total" type numeric(10,2) using ("valor_total"::numeric(10,2));`,
    );

    this.addSql(
      `alter table "pedido_item" alter column "valor_unitario" type numeric(10,2) using ("valor_unitario"::numeric(10,2));`,
    );
    this.addSql(
      `alter table "pedido_item" alter column "valor_total" type numeric(10,2) using ("valor_total"::numeric(10,2));`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "pedido" alter column "valor_total" type double precision using ("valor_total"::double precision);`,
    );

    this.addSql(
      `alter table "pedido_item" alter column "valor_unitario" type int using ("valor_unitario"::int);`,
    );
    this.addSql(
      `alter table "pedido_item" alter column "valor_total" type int using ("valor_total"::int);`,
    );
  }
}
