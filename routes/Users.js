const mainController = require('../controller/maincontroller')
const Joi = require('joi');

exports.plugin={
    register:(server,options,next)=>{
        //Routes
        server.route({
            method:'GET',
            path:"/",
            handler:function(reqest,h){
            const query = reqest.query
            return query;
            }

        })
        server.route({
            method:'get',
            path:"/private",
            options:{
                description:"authorized route",
                notes:"to access this you must provide token in headers",
                tags:['api'],              
                handler:mainController.Private_route,
                validate: {
                    headers: Joi.object({
                        token: Joi.string().required()
                    }).options({ allowUnknown: true })
                }
            }
           
 
       })

        server.route({
            method:'POST',
            path:"/signup",
            options:{
                description:"Signup for new users",
                notes:"Return success message",
                tags:['api'],
                handler:mainController.signup,
                validate:{
                    payload:
                    Joi.object({
                        name:Joi.string().min(5).max(18).required(),
                        email: Joi.string().min(5).max(22).email().required(),
                        password: Joi.string().min(5).max(20).required(),
                        mobile_no:Joi.string()
                    }).label('signup')
                    },
             }
        })

        server.route({
            method:"POST",
            path:"/login",
            options:{
                description:"login for existing users",
                notes:"logs in the valid user",
                tags:['api'],
                handler:mainController.login,
                validate:{
                    payload:
                    Joi.object({
                        email: Joi.string().min(5).max(22).email().required(),
                        password: Joi.string().min(5).max(20).required()
                    }).label('login')
                    }
                }
            })
        },
    name:'api'
}