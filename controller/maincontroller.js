const con  =require('../model/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

function signup(request,h){

    const {name,email,password,mobile_no} = request.payload;
    return new Promise((resolve,reject)=>{

        var check = "select * from userdata;";
        con.queryAsync(check).then((result)=>{
            for(let i=0;i<result.length;i++){
                if(result[i].email===email|| result[i].mobile_no===mobile_no){
                return resolve(h.response({status:false,message:"user already registered"}))
                }   
            }
            let hashedPassword = bcrypt.hashSync(password,12);
            var sql = "INSERT into userdata (name,email,password,mobile_no)values (?,?,?,?)"
             con.queryAsync(sql,[name,email,hashedPassword,mobile_no])
             .then(()=>{
                console.log("data inserted successfully")
                 return resolve(h.response({status:true,message:"user sucessfully registered"}));                    
            })
            .catch(err=>{
                return reject(err)
            })
      })
   })  
}


function login(request,h){
    const{email,password}=request.payload;
    return new Promise((resolve,reject)=>{
      let sql = `select email,password from userdata;`
      con.queryAsync(sql).then(result=>{
          result.forEach(user => {
              if(user.email===email){
                  let check=bcrypt.compareSync(password,user.password)
                  if(check){
                      const token = jwt.sign({
                          email
                      },'mysecretkey001',{
                          algorithm:'HS256',
                          expiresIn:'1h'
                      })

                      return resolve(h.response({status:true,message:"sucessfully logged in",auth_token:token}));
                  }else{
                    return resolve(h.response({status:false,message:"incorrect password"}));
                  }
              }
          });
          return resolve(h.response({status:false,message:"email not registered ,please signup"}));

      })
      .catch(err=>{
          return reject(err)
      })
        
    })
}


function Private_route(request,h){
    return new Promise((resolve,reject)=>{

        let token = request.headers.token;
        jwt.verify(token,'mysecretkey001',(err,authorizeData)=>{
        if(!err){
            return resolve(h.response({status:true,message:"you are authorized to acccess this private route",data:authorizeData}))
            
        }else{
            return resolve(h.response({status:false,message:"This is protected route,youare not authorized"}))
        }
    })
})
}

module.exports={
    signup,
    login,
    Private_route
}