import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PanelModule } from './panel/panel.module';
import { INestApplication } from '@nestjs/common';
import { StoreModule } from './store/store.module';

export function setupSwagger(app: INestApplication) {
  const configPanel = new DocumentBuilder()
    .setTitle('Panel API')
    .setDescription('The Panel API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, configPanel, {
      include: [PanelModule],
      deepScanRoutes: true,
    });
  SwaggerModule.setup('docs/panel', app, documentFactory);

  const configStore = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('The Store API description')
    .setVersion('1.0')
    .build();
  const documentFactoryStore = () =>
    SwaggerModule.createDocument(app, configStore, {
      include: [StoreModule],
      deepScanRoutes: true,
    });
  SwaggerModule.setup('docs/store', app, documentFactoryStore);
}
