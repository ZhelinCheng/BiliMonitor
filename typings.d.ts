/*
 * @Author       : 程哲林
 * @Date         : 2024-09-16 23:19:34
 * @LastEditors  : 程哲林
 * @LastEditTime : 2024-09-16 23:22:49
 * @FilePath     : /BiliMonitor/typings.d.ts
 * @Description  : 未添加文件描述
 */
type RqResponseType<T = any> = {
  code: number;
  message: string;
  data: T;
};
