import { ApiProperty } from '@nestjs/swagger';

import { CommonDto } from '../../common/dtos/common.dto';

export class TokenDto extends CommonDto {
  @ApiProperty({ description: "the token's title" })
  title: string;

  @ApiProperty({ description: "the token's description" })
  description: string;

  @ApiProperty({ description: "the token's Image URL" })
  image_url: string;
}
