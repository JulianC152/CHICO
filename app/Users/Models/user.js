import { DataTypes } from "sequelize";
import { sequelize } from "./database/database.js";

export const user = sequelize.define('user',{
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    nombre:{
        type: DataTypes.STRING
    },
    Apellido:{
        type: DataTypes.STRING
    }
})
