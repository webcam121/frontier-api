import { ApiProperty } from '@nestjs/swagger';

export class TokenUpdateDto {
  @ApiProperty({ description: 'UUID of the object' })
  id: string;

  @ApiProperty({ description: "the token's title" })
  title: string;

  @ApiProperty({ description: "the token's description" })
  description: string;

  @ApiProperty({ description: "the token's Image URL" })
  image_url: string;
}
