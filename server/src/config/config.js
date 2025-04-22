export default {
    port: 8081,
    /*  db: {
        database: process.env.BD_NAME ||'tabtracker',
        user: process.env.DB_USER || 'tabtracker',
        passord: process.env.BD_PASS || 'tabtracker',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './tabtracker.sqlite'
        }
    } */
    db: {
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: 'password',
        database: 'reservia'
    },
    authentication: {
        jwtSecret: 'secret'
    }
}