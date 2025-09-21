import mongoose from 'mongoose';

export default function initializeDatabase(cnf, log) {
  if (!cnf) throw new Error('App config is required to initialize database');
  if (!log) throw new Error('Logger is required to initialize database');

  const db = {
    connect: async () => {
      try {
        await mongoose.connect(cnf.dbConnection);
        log.info('MongoDB connected');
      } catch (err) {
        throw new Error(`Database connection error: ${err.message}`);
      }
    },
    disconnect: async () => {
      try {
        await mongoose.disconnect();
        log.info('MongoDB connection closed');
      } catch (err) {
        throw new Error(`Database disconnection error: ${err.message}`);
      }
    },
  }
  return db;
}

