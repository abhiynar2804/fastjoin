function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  DATABASE_URL: getEnv("DATABASE_URL"),
  AUTH_SECRET: getEnv("AUTH_SECRET"),
  BLOB_READ_WRITE_TOKEN: getEnv("BLOB_READ_WRITE_TOKEN"),
};