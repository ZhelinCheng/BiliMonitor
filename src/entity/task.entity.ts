import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryColumn({
    unsigned: true,
    type: 'int',
    comment: '内容ID',
  })
  id: number;

  @Column({
    type: 'int',
    comment: '收藏夹ID',
    unsigned: true,
  })
  media_id: number;

  @Column({
    type: 'text',
    comment: 'BVID',
    length: 13,
  })
  bvid: string;

  @Column({
    type: 'int',
    comment: '任务创建时间',
    unsigned: true,
  })
  create_at: number;

  // 0等待，1下载中，2失败，3成功
  @Index()
  @Column({
    type: 'int',
    comment: '状态',
    unsigned: true,
    default: 0,
  })
  status: number;

  @Column({
    type: 'int',
    comment: '投稿时间',
    unsigned: true,
  })
  ctime: number;

  @Column({
    type: 'int',
    comment: '投稿时间',
    unsigned: true,
  })
  pub_time: number;

  @Column({
    type: 'int',
    comment: '视频收藏时间',
    unsigned: true,
  })
  fav_time: number;

  @Column({
    type: 'int',
    comment: '视频时长',
    unsigned: true,
  })
  duration: number;

  @Column({
    type: 'int',
    comment: '视频分P数',
    unsigned: true,
  })
  page: number;

  @Column({
    type: 'int',
    comment: '已完成的P',
    unsigned: true,
    default: 0,
  })
  finish_page: number;

  @Column({
    type: 'text',
    comment: 'UP主名称',
    length: 30,
  })
  upper_name: string;

  @Column({
    type: 'int',
    comment: 'UP主UID',
  })
  upper_mid: number;

  @Column({
    type: 'text',
    comment: 'UP主头像',
    length: 150,
  })
  upper_face: string;

  @Column({
    type: 'text',
    comment: '视频简介',
  })
  intro: string;

  @Column({
    type: 'text',
    comment: '封面',
    length: 150,
  })
  cover: string;

  @Column({
    type: 'int',
    comment: '下载花费的时间',
    unsigned: true,
  })
  time_consuming: number;
}
