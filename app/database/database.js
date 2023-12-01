import  Sequelize  from "sequelize";

export const sequelize = new Sequelize(
    'Bd_Chico',
    'postgres',
    '0000',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);