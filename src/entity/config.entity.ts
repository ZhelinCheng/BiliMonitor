import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class ConfigEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
    type: 'int',
    comment: '配置ID',
  })
  id: number;

  // system 系统配置参数，data 存储及管理后台展示数据
  @Index()
  @Column({
    type: 'text',
    comment: '配置类型',
    length: 10,
  })
  type: string;

  @Column({
    type: 'text',
    comment: '配置名称',
  })
  label: string;

  @Column({
    type: 'text',
    comment: '配置值',
  })
  value: string;
}
