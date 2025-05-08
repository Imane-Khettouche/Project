import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    connectTimeout: 10000, // زيادة المهلة إلى 10 ثواني
  },
});

export default sequelize;
