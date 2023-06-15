import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { TokenDto } from './dtos/token.dto';
import { TokenService } from './token.service';
import { TokenRegisterDto } from './dtos/token-register.dto';
import { TokenUpdateDto } from './dtos/token-update.dto';
import { getFromDto } from '../common/utils/repository.util';
import { TokenEntity } from './entities/token.entity';
import { TokenDeleteDto } from './dtos/token-delete.dto';

@ApiTags('Token')
@Controller('api/v0/token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @ApiOperation({ summary: 'Return all tokens' })
  @ApiOkResponse({ type: Array<TokenDto> })
  @Get('')
  async getTokenList(@Request() req): Promise<TokenDto[]> {
    const tokenList = await this.tokenService.find();
    return tokenList.map(item => item.toDto());
  }

  @ApiParam({ name: 'tokenId', required: true })
  @ApiOkResponse({ type: TokenDto })
  @Get(':tokenId')
  async getTokenById(@Request() req, @Param('tokenId') tokenId: string): Promise<TokenDto> {
    const token = await this.tokenService.findById(tokenId);
    if (!token) {
      throw new NotFoundException('user not found');
    }
    return token.toDto();
  }

  @ApiOperation({ summary: 'Add new token' })
  @ApiOkResponse({ type: TokenDto })
  @Post('')
  async addToken(@Request() req, @Body() dto: TokenRegisterDto): Promise<TokenDto> {
    return this.tokenService.addToken(dto);
  }

  @ApiOperation({ summary: 'Update token' })
  @ApiOkResponse({ type: TokenDto })
  @Put('')
  async updateToken(@Request() req, @Body() dto: TokenUpdateDto): Promise<TokenDto> {
    const token = getFromDto<TokenEntity>(dto, new TokenEntity());
    return this.tokenService.updateToken(token);
  }

  @ApiOperation({ summary: 'Delete token' })
  @ApiOkResponse({ type: TokenDto })
  @Delete('')
  async deleteToken(@Request() req, @Body() dto: TokenDeleteDto): Promise<boolean> {
    return this.tokenService.removeById(dto.id);
  }
}
