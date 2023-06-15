import { Column, Entity } from 'typeorm';

import { SoftDelete } from '../../common/core/soft-delete';
import { TokenDto } from '../dtos/token.dto';

@Entity('token')
export class TokenEntity extends SoftDelete {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  toDto(): TokenDto {
    return {
      ...super.toDto(),
      title: this.title,
      description: this.description,
      image_url: this.image_url,
    };
  }
}
