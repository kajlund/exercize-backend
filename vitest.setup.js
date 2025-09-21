import path from 'node:path';
import { loadEnvFile } from 'node:process';

// Load environment variables from .env files
loadEnvFile(path.join(process.cwd(),'.env.test'));
