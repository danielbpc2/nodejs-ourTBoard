import database from '../../src/app/models/index';

export default function truncate() {
  delete database['sequelize'];
  delete database['Sequelize'];

  return Promise.all(
    Object.keys(database).map(key => {
      return database[key].destroy({
        truncate,
        force: true,
      });
    })
  );
}
