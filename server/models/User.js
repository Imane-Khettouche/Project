import {DataTypes} from "sequelize";
import sequelize from "../db.js"; // Import UUID v4 for generating IDs

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID, // Use UUID for automatic ID generation
      defaultValue: DataTypes.UUIDV4, // ✅ Sequelize will handle UUID generation correctly
      primaryKey: true, // Ensure this is marked as the primary key
      allowNull: false,
      unique: true,
    },
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {
      type: DataTypes.ENUM("Admin", "Student", "Professor"),
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING, // URL to the photo (optional)
      allowNull: true, // This field is optional
    },
  },
  {
    timestamps: false,
  }
);

export default User;
