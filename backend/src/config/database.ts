import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
    'backendtech5',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize