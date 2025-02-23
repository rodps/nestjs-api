import { Migration } from '@mikro-orm/migrations';

export class Migration20250223212348 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "pedido_item" drop constraint "pedido_item_pedido_id_foreign";`,
    );

    this.addSql(
      `alter table "pedido_item" add constraint "pedido_item_pedido_id_foreign" foreign key ("pedido_id") references "pedido" ("id") on update cascade on delete cascade;`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "pedido_item" drop constraint "pedido_item_pedido_id_foreign";`,
    );

    this.addSql(
      `alter table "pedido_item" add constraint "pedido_item_pedido_id_foreign" foreign key ("pedido_id") references "pedido" ("id") on update cascade;`,
    );
  }
}
