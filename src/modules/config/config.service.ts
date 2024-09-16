import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigEntity } from 'src/entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configRepository: Repository<ConfigEntity>,
  ) {}

  private config: any;

  async loadConfig() {
    // 从数据库获取配置
    this.config = await this.configRepository.find({
      where: { type: 'system' },
      select: ['label', 'value'],
    });
  }

  getConfig() {
    return this.config;
  }
}
