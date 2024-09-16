/*
 * @Author       : 程哲林
 * @Date         : 2024-09-15 15:30:46
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-15 15:37:46
 * @FilePath     : /BiliMonitor/src/modules/config/config.module.ts
 * @Description  : 未添加文件描述
 */
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from 'src/entity';

export function initializeApp(configService: ConfigService) {
  return async () => {
    await configService.loadConfig();
  };
}

@Module({
  imports: [TypeOrmModule.forFeature([ConfigEntity])],
  providers: [
    ConfigService,
    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeApp,
      // deps: [ConfigService],
      // multi: true,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
