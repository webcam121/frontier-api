import { ApiProperty } from '@nestjs/swagger';

export class TokenRegisterDto {
  @ApiProperty({ description: "the token's title" })
  title: string;

  @ApiProperty({ description: "the token's description" })
  description: string;

  @ApiProperty({ description: "the token's Image URL" })
  image_url: string;
}
