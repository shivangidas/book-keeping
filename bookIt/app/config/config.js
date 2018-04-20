const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'test'

const dev = {
    server:{
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 4040
    },
    db:{
        host: process.env.DB_HOST || '192.168.10.244',
        database: process.env.DB_NAME || 'localdb',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root'
    },
    secret: {
        //TODO: change secret key to some long random string
        password: process.env.SECRET_KEY || 'secret_key',
        session: process.env.SESSION_KEY || 'secret_key'
    }
}
const test ={
    //TODO
    server:{
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 4040
    },
    db:{
        host: process.env.DB_HOST || '192.168.10.244',
        database: process.env.DB_NAME || 'test',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root'
    },
    secret: {
        //TODO: change secret key to some long random string
        password: process.env.SECRET_KEY || 'secret_key',
        session: process.env.SESSION_KEY || 'secret_key'
    }
}

const config = {dev,test};

module.exports = config[env];