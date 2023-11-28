import  Sequelize  from "sequelize";

export const sequelize = new Sequelize(
    'Chico_db',
    'postgres',
    '0000',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);