import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokenEntity } from './entities/token.entity';
import { TokenRegisterDto } from './dtos/token-register.dto';
import { getFromDto } from '../common/utils/repository.util';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async addToken(
    dto: TokenRegisterDto,
    throwErrors = true,
  ): Promise<TokenEntity> {
    const found = await this.findByTitle(dto.title);
    if (found) {
      if (throwErrors) {
        throw new BadRequestException('The Same title is already used.');
      }
      return found;
    }
    const token = getFromDto<TokenEntity>(dto, new TokenEntity());
    return this.tokenRepository.save(token);
  }

  async updateToken(token: TokenEntity): Promise<TokenEntity> {
    return this.tokenRepository.save(token);
  }

  async count(): Promise<number> {
    return this.tokenRepository.count();
  }

  async find(): Promise<TokenEntity[]> {
    return this.tokenRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<TokenEntity> {
    return this.tokenRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByTitle(title: string): Promise<TokenEntity> {
    return this.tokenRepository.findOne({
      where: {
        title,
      },
    });
  }

  async removeById(id: string): Promise<boolean> {
    const token = await this.findById(id);
    await this.tokenRepository.remove(token);
    return true;
  }
}
