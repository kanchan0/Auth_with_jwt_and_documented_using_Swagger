const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const server = new Hapi.Server({
    host:'localhost',
    port:5000
})


const swaggerOptions = {
    info: {
        title: 'API Documentation',
        version: '1.0.0',
    }
};


const init=async ()=>{
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }

    ])
    await server.register(
        { 
            plugin:require('./routes/Users')
        },
        {
            routes:{ prefix:'/users' }
        },

        (err)=>{
            if(err){throw err }
        })

    await server.start()
    console.log(`server started at :${server.info.uri}`)
}

init()




// serverStart();

// async function serverStart(){
//     await server.start();
//     console.log(`server is running at: ${server.info.uri}`)

//     process.on('unhandledRejection',(err)=>{
//         console.log(err)
//         process.exit(1);
//     })
// }

