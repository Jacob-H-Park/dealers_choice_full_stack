const { Sequelize, STRING, BOOLEAN } = require("sequelize");
const faker = require("faker");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers_choice_full_stack"
);

const GoodieBag = db.define("goodiebag", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  appropriate: {
    type: BOOLEAN,
    defaultValue: true,
  },
});

GoodieBag.randomProduct = function () {
  return this.create({ name: faker.commerce.productName() });
};

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Promise.all([
    GoodieBag.randomProduct(),
    GoodieBag.randomProduct(),
    GoodieBag.randomProduct(),
    GoodieBag.randomProduct(),
    GoodieBag.randomProduct(),
  ]);
  console.log("Seeding successful");
};

module.exports = {
  db,
  syncAndSeed,
  GoodieBag,
};
