/*
 * @Author       : 程哲林
 * @Date         : 2024-09-14 21:45:14
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-14 22:31:23
 * @FilePath     : /BiliMonitor/src/entitys/account.ts
 * @Description  : 未添加文件描述
 */
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'text',
    comment: 'sessdata',
    length: 500,
  })
  sessdata: string;

  @Column({
    type: 'text',
    comment: 'bili_jct',
    length: 50,
  })
  bili_jct: string;

  @Column({
    type: 'text',
    comment: 'buvid3',
    length: 60,
  })
  buvid3: string;

  @Index()
  @Column({
    type: 'text',
    comment: 'dedeuserid',
    length: 50,
  })
  dedeuserid: string;

  @Column({
    type: 'text',
    comment: 'ac_time_value',
    length: 50,
  })
  ac_time_value: string;
}
