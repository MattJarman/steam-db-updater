export interface DatabaseConfig {
  username: string | undefined
  password: string | undefined
}

export const databaseConfig: DatabaseConfig = {
  username:
    process.env.NODE_ENV === 'test' ? 'root' : process.env.MONGODB_USERNAME,
  password:
    process.env.NODE_ENV === 'test' ? 'admin' : process.env.MONGODB_PASSWORD
}
