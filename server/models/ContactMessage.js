import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ContactMessage = sequelize.define("ContactMessage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  messageContent: {
    type: DataTypes.TEXT,
  },
  receivedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default ContactMessage;
