import { ApiProperty } from '@nestjs/swagger';

export class AppResponse {
  @ApiProperty({ example: 200, type: Number })
  status: number;
  @ApiProperty({ example: 'Clients found successfully', type: String })
  message: string;
  @ApiProperty({ example: [], type: Object })
  data?: any;
}
