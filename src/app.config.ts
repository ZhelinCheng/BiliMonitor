import { ConfigEntity } from './entity/config.entity';

const defaultConfig: Omit<ConfigEntity, 'id'>[] = [
  {
    type: 'system',
    // 登录状态
    label: 'login',
    value: 'false',
  },
  {
    type: 'system',
    // 启动状态
    label: 'startup',
    value: 'false',
  },
  {
    type: 'system',
    // nfo文件时间类型
    label: 'nfo_time_type',
    value: 'pub_time',
  },
  {
    type: 'system',
    // 视频目录命名
    label: 'video_dir',
    value: '{{bvid}}',
  },
  {
    type: 'system',
    // 分页/合集目录命名
    label: 'page_video_dir',
    value: '{{pid}}',
  },
  {
    type: 'system',
    // nfo文件命名
    label: 'nfo_file_name',
    value: '{{pic}}',
  },
  {
    type: 'system',
    // nfo文件命名
    label: 'video_quality',
    value: 'max',
  },
  {
    type: 'system',
    // 通知信息
    label: 'notify',
    value: '',
  },
];

export default defaultConfig;
