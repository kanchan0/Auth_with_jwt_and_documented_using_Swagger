
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');


const swaggerOptions = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
    }
};

const manifest={
    server:{
        port:5000
    },
    register:{
        plugins:[
            Inert,
            Vision,
            {
                plugin:HapiSwagger,
                options:swaggerOptions
            },
            {
                plugin:require('./routes/Users')
            }
        ],
        options:{
            once:true
        }
    }
}
module.exports=manifest;