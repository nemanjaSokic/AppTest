import User from '../models/user';

module.exports = function(router){

    router.route('/users').get((req,res) => {
        User.find((err,users) => {
            if(err)
                console.log(err);
            else
                res.json(users);``
        });
    });

    router.route('/users/:id').get((req,res) => {
        User.findById(req.params.id,(err, user) => {
            if(err){
                console.log(err);
            }else{
                res.json(user);
            }
        });
    });

    router.route('/users/add').post((req,res) => {
        let user = new User(req.body);
        user.save()
            .then(user => {
                res.status(200).json({'user':'Added successfully!'});
            })
            .catch(err => {
                res.status(400).send('Failed save.');
            });
    });

    router.route('/users/update/:id').put((req,res) => {
        User.findByIdAndUpdate(req.params.id, req.body, (err,user) => {
            if(!user)
                return next(new Error('Could not load document.'));
            else{
                res.json('Update done!');
            }
        });
    });

    router.route('/users/delete/:id').delete((req,res) => {
        User.findOneAndDelete({_id: req.params.id}, (err, user) => {
            if (err)
                res.json(err);
            else
                res.json('Remove successfully.');
        });
    });
};