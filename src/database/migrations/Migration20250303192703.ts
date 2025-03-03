import { Migration } from '@mikro-orm/migrations';

export class Migration20250303192703 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "customer" add column "password" varchar(255) not null;`,
    );
  }

  override down(): void {
    this.addSql(`alter table "customer" drop column "password";`);
  }
}
