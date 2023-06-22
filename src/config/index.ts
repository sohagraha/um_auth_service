import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  env: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DEFAULT_STUDENT_PASSWORD: process.env.DEFAULT_STUDENT_PASSWORD,
  DEFAULT_FACULTY_PASSWORD: process.env.DEFAULT_FACULTY_PASSWORD,
  DEFAULT_ADMIN_PASSWORD: process.env.DEFAULT_ADMIN_PASSWORD,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};
