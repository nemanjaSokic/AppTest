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
        Task.findByIdAndUpdate(req.params.id,req.body, (err,task) => {
            if(!task)
                return next(new Error('Could not load document.'));
            else{
                res.json('Update done!');
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