import mysql, { Pool, PoolOptions, RowDataPacket } from 'mysql2/promise';

export interface DbClientConfig {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
}

export class DbClient {
  private pool: Pool;

  constructor(config: DbClientConfig) {
    const options: PoolOptions = {
      host: config.host,
      port: config.port ?? 3306,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
    };
    this.pool = mysql.createPool(options);
  }

  async query<T extends RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    const [rows] = await this.pool.query<T>(sql, params);
    return rows;
  }

  async findOne<T extends RowDataPacket[]>(sql: string, params: any[] = []): Promise<T[0] | null> {
    const rows = await this.query<T>(sql, params);
    return rows[0] ?? null;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
