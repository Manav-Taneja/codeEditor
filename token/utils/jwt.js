const jwt=require('jsonwebtoken');

const jwtoperations={
    secret:"this is a secret key",
    generatetoken: function(email){
        var token= jwt.sign({email},this.secret);
        return token;
    }
}

module.exports=jwtoperations;