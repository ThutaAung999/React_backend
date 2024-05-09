var express = require('express');
var router = express.Router();

let todos= require('./../controllers/TodoController')

router.get('/',todos.getAllTodos);
router.get('/:todoId',todos.getTodoById);
router.post('/',todos.createTodo);
router.patch('/:todoId',todos.updateTodo)
router.delete('/:todoId',todos.deleteTodo)
/*
router.get('/', (req, res) => {
    res.json(todos);
});


handler1 = (req, res, next) => {
    console.log('Use time', req.requestTime);
    console.log("Preprocess");
    next();
};

handler2 = (req, res) => {
    let todoId = req.params['todoId'];
    console.log("todo Id :", todoId);
    res.json(todos.find(todo => todo.id == todoId));
}
router.get('/:todoId', handler1, handler2);


router.get('/download', (req, res) => {
    console.log('Download');
    res.download('./public/download/data.txt', 'data.txt', (err) => {
        console.log(err);
    });
});

router.get('/end', (req, res) => {
    res.write('<h1>Hello</h1>');
    res.write('<h1>World</h1>');
    res.end();
});


router.get('/home', (req, res) => {
    console.log('Redirect');
    res.redirect('/');
});


router.post('/', (req, res) => {
    res.json(
        {
            "userId": 1,
            "id": 8,
            "title": "this is post method testing",
            "completed": false
        }
    );
})

*/

module.exports = router;
