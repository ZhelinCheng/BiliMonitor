/*
 * @Author       : 程哲林
 * @Date         : 2024-09-16 21:33:05
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-17 00:04:32
 * @FilePath     : /BiliMonitor/src/utils/database.manager.ts
 * @Description  : 未添加文件描述
 */
// user.service.ts
// database.manager.ts
import { Injectable } from '@nestjs/common';
import { ConfigEntity } from 'src/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

const kv = {
  sessdata: 'SESSDATA',
  dedeuserid: 'DedeUserID',
};

@Injectable()
export class DatabaseManager {
  private static configRepository: Repository<ConfigEntity>;
  private static dataSource: DataSource;
  private static memoCookies = {
    value: '',
    expired: 0,
  };

  constructor(
    @InjectRepository(ConfigEntity)
    private readonly injectedConfigRepository: Repository<ConfigEntity>,
  ) {
    // 在实例构造时，将注入的 configRepository 赋值给静态属性
    DatabaseManager.configRepository = this.injectedConfigRepository;
  }

  static setDataSource(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  static getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error('DataSource not initialized');
    }
    return this.dataSource;
  }

  static getConfigRepository() {
    if (!this.configRepository) {
      throw new Error('ConfigRepository not initialized');
    }
    return this.configRepository;
  }

  /**
   * 获取用户账户信息
   *
   * @returns 返回包含账户信息的字符串
   */
  static async getUserAccount() {
    const nowTime = Date.now();

    if (this.memoCookies.expired > nowTime) {
      return this.memoCookies.value;
    }

    const account = await this.configRepository.find({
      where: {
        type: 'account',
      },
      select: ['value', 'label'],
    });

    let ck = '';
    account.forEach((item) => {
      if (item.label !== 'ac_time_value') {
        const key = kv[item.label] || item.label;
        ck += `${key}=${item.value};`;
      }
    });

    this.memoCookies = {
      value: ck,
      expired: nowTime + 10 * 60 * 1000,
    };

    return ck;
  }

  static async updateSystemNotify(
    type: 'error' | 'info',
    content: string = '',
  ) {
    this.configRepository.update(
      {
        type: 'system',
      },
      {
        value: `${type}|${content}`,
        type: 'notify',
      },
    );
  }
}
