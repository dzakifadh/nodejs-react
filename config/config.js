module.exports = {
    BASE_URL: 'http://localhost:3000/',
    HOST: '127.0.0.1',
    USER: 'admin',
    PASSWORD: '=@!#254tecmintT',
    DBNAME: 'mymarket',
    dialect: 'mysql',
    DBPORT: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}