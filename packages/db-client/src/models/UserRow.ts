import type { RowDataPacket } from 'mysql2';

export interface UserRow extends RowDataPacket {
  id: string;
  username: string;
  email: string;
  status: string;
}
