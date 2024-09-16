/*
 * @Author       : 程哲林
 * @Date         : 2024-09-15 15:00:30
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-15 15:52:12
 * @FilePath     : /BiliMonitor/src/modules/watch/watch.module.ts
 * @Description  : 未添加文件描述
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchService } from './watch.service';
// import { ConfigService } from 'src/modules/config/config.service';
import { ConfigEntity, TaskEntity } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ConfigEntity])],
  providers: [WatchService],
})
export class WatchModule {}
