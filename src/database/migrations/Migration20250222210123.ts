import { Migration } from '@mikro-orm/migrations';

export class Migration20250222210123 extends Migration {
  override up(): void {
    this.addSql(
      `alter table "cliente" add constraint "cliente_email_unique" unique ("email");`,
    );
  }

  override down(): void {
    this.addSql(
      `alter table "cliente" drop constraint "cliente_email_unique";`,
    );
  }
}
