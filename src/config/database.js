module.exports = {
  username: 'docker',
  password: 'docker',
  port: 5432,
  database: 'ourtboard',
  host: '127.0.0.1',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
