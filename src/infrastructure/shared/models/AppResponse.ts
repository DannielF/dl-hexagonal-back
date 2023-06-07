import { ApiProperty } from '@nestjs/swagger';

/**
 * @description AppResponse model class
 * @author dannielf
 * @export
 * @class AppResponse
 */
export class AppResponse {
  @ApiProperty({ example: 200, type: Number })
  status: number;
  @ApiProperty({ example: 'Clients found successfully', type: String })
  message: string;
  @ApiProperty({ example: [], type: Object })
  data?: any;

  static create(status: number, message: string, data?: any): AppResponse {
    const response = new AppResponse();
    response.status = status;
    response.message = message;
    response.data = data;
    return response;
  }
}
