/*
 * @Author       : 程哲林
 * @Date         : 2024-09-09 19:42:27
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-14 21:27:50
 * @FilePath     : /BiliMonitor/src/main.ts
 * @Description  : 未添加文件描述
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置跨域配置
  app.enableCors();

  // 设置全局前缀
  app.setGlobalPrefix('api');

  // 设置版本控制
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  await app.listen(3000);

  const serverUrl = await app.getUrl();
  console.log(`
  运行环境：${process.env.NODE_ENV}
  管理页面：${serverUrl}
  `);
}
bootstrap();
