import Sequelize from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.tajs.sqlite3",
});

class Person extends Sequelize.Model {}
Person.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.NUMBER,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vehicle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Person",
  }
);

export { sequelize, Person };
