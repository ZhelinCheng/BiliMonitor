/*
 * @Author       : 程哲林
 * @Date         : 2024-09-16 21:33:05
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-16 22:40:59
 * @FilePath     : /BiliMonitor/src/utils/database.manager.ts
 * @Description  : 未添加文件描述
 */
// user.service.ts
// database.manager.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseManager {
  private static dataSource: DataSource;

  static setDataSource(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  static getDataSource(): DataSource {
    if (!this.dataSource) {
      throw new Error('DataSource not initialized');
    }
    return this.dataSource;
  }
}
