const Glue = require('@hapi/glue');
const manifest=require('./manifest');

const options = {
    relativeTo: __dirname
    };
    
    (async()=>{
    try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log('server started');
    }
    catch (err) {
    console.error(err);
    process.exit(1);
    }
    })();