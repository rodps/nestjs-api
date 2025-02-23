import { Migration } from '@mikro-orm/migrations';

export class Migration20250223010957 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "pedido" alter column "status" type smallint using ("status"::smallint);`,
    );
    this.addSql(`alter table "pedido" alter column "status" set default 1;`);
  }

  override down(): void {
    this.addSql(
      `alter table "pedido" alter column "status" type smallint using ("status"::smallint);`,
    );
    this.addSql(
      `alter table "pedido" alter column "status" set default 'EM_COMPOSICAO';`,
    );
  }
}
