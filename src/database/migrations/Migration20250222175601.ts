import { Migration } from '@mikro-orm/migrations';

export class Migration20250222175601 extends Migration {
  override up(): void {
    this.addSql(`alter table "produto" drop column "categoria";`);
  }

  override down(): void {
    this.addSql(
      `alter table "produto" add column "categoria" varchar(255) not null;`,
    );
  }
}
