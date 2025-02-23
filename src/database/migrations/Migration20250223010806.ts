import { Migration } from '@mikro-orm/migrations';

export class Migration20250223010806 extends Migration {
  override up(): void {
    this.addSql(
      `create table "pedido" ("id" serial primary key, "cliente_id" int not null, "endereco" varchar(255) not null, "valor_total" double precision not null, "status" smallint not null default 1, "data_pedido" timestamptz not null, "data_entrega" timestamptz null);`,
    );

    this.addSql(
      `create table "pedido_item" ("id" serial primary key, "pedido_id" int not null, "produto_id" int not null, "quantidade" int not null, "valor_unitario" int not null, "valor_total" int not null);`,
    );

    this.addSql(
      `alter table "pedido" add constraint "pedido_cliente_id_foreign" foreign key ("cliente_id") references "cliente" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "pedido_item" add constraint "pedido_item_pedido_id_foreign" foreign key ("pedido_id") references "pedido" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "pedido_item" add constraint "pedido_item_produto_id_foreign" foreign key ("produto_id") references "produto" ("id") on update cascade;`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "pedido_item" drop constraint "pedido_item_pedido_id_foreign";`,
    );

    this.addSql(`drop table if exists "pedido" cascade;`);

    this.addSql(`drop table if exists "pedido_item" cascade;`);
  }
}
