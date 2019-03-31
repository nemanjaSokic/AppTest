import Task from '../models/task';

module.exports = function(router){

    router.route('/tasks').get((req,res) => {
        Task.find((err,tasks) => {
            if(err)
                console.log(err);
            else
                res.json(tasks);
        });
    });

    router.route('/tasks/:id').get((req,res) => {
        Task.findById(req.params.id,(err, task) => {
            if(err){
                console.log(err);
            }else{
                res.json(task);
            }
        });
    });

    router.route('/tasks/add').post((req,res) => {
        let task = new Task(req.body);
        task.save()
            .then(task => {
                res.status(200).json({'task':'Added successfully!'});
            })
            .catch(err => {
                res.status(400).send('Failed save.');
            });
    });

    router.route('/tasks/update/:id').put((req,res) => {
        Task.findById(req.params.id, (err,task) => {
            if(!task)
                return next(new Error('Could not load document.'));
            else{
                task.title = req.body.title;
                task.description = req.body.description;
                task.status = req.body.status;

                task.save().then(task => {
                    res.json('Update done!');

                }).catch(err => {
                    res.status(400).send('Update failed');
                });
            }
        });
    });

    router.route('/tasks/delete/:id').delete((req,res) => {
        Task.findOneAndDelete({_id: req.params.id}, (err, task) => {
            if (err)
                res.json(err);
            else
                res.json('Remove successfully.');
        });
    });
};