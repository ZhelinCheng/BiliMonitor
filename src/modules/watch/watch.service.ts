/*
 * @Author       : 程哲林
 * @Date         : 2024-09-15 15:01:34
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-16 23:15:03
 * @FilePath     : /BiliMonitor/src/modules/watch/watch.service.ts
 * @Description  : 未添加文件描述
 */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from 'src/entity';
import { rq } from 'src/utils/requset';
// import { ConfigService } from 'src/modules/config/config.service';

const cronStr = process.env.CRON_STR || '*/20 * * * * *';

@Injectable()
export class WatchService {
  private readonly logger = new Logger(WatchService.name);

  constructor(
    private dataSource: DataSource,

    @InjectRepository(ConfigEntity)
    private readonly cfgRep: Repository<ConfigEntity>,
  ) {}

  @Cron(cronStr)
  async handleCron() {
    /* const res = await this.cfgRep.find({
      where: [{ type: 'data' }],
      select: ['label', 'value'],
    });
    console.log(res);
    this.logger.debug('Called when the current second is 59'); */

    const res = await rq({
      method: 'get',
      url: 'https://api.bilibili.com/x/v3/fav/resource/ids?media_id=11212',
    });

    console.log(1111, res.data);
  }
}
