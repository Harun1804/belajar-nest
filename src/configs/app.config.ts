export const AppConfig = () => ({
  port: process.env.APP_PORT || 3000,
  nodeEnv: process.env.APP_ENV || 'LOCAL',
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRES_DATABASE || 'nest_tutorial',
    schema: process.env.POSTGRES_SCHEMA || 'public',
  },
});
