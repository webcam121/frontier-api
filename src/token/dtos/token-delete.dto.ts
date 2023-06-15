import { ApiProperty } from '@nestjs/swagger';

export class TokenDeleteDto {
  @ApiProperty({ description: 'UUID of the object' })
  id: string;
}
