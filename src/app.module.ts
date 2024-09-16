/*
 * @Author       : 程哲林
 * @Date         : 2024-09-09 19:42:27
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-17 00:06:07
 * @FilePath     : /BiliMonitor/src/app.module.ts
 * @Description  : 未添加文件描述
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
// import { Config, Task, Days, Account } from './entity';
import { WatchModule } from './modules/watch/watch.module';
import * as nestCfg from '@nestjs/config';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { ConfigEntity } from './entity';
import { DatabaseManager } from './utils/database.manager';
import defaultConfig from './app.config';

console.log(path.resolve(__dirname, './entity/**.{.ts,.js}'));

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [path.resolve(__dirname, './**/*.entity{.ts,.js}')],
      database: path.join(__dirname, '../config', 'bili.db'),
      synchronize: true,
      logging: true,
      entityPrefix: 'bili_',
    }),
    nestCfg.ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([ConfigEntity]),
    ScheduleModule.forRoot(),
    WatchModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseManager],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    // 初始化全局数据库连接
    DatabaseManager.setDataSource(this.dataSource);

    // 初始化数据基础配置数据
    const config = this.dataSource.getRepository(ConfigEntity);
    const systemCfgCount = await config.count({
      where: {
        type: 'system',
      },
    });

    // 没有基础配置数据时初始化
    if (systemCfgCount === 0) {
      config.insert(defaultConfig);
    }
  }
}
