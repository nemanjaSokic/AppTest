import User from '../models/user';
import { builtinModules } from 'module';

module.exports = function(router,jwt,expressJwt){
    
    router.post('/api/auth', function(req, res) {
        const body = req.body;
        console.log(body.email);
        User.findOne({email:body.email},(err,user) =>{
            if(!user || body.password != user.password) return res.sendStatus(401);
        
            var token = jwt.sign({userID: user.id}, 'app-test', {expiresIn: '2h'});
            res.send({token});
        });
    });
};