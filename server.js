var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var todo = []

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index',{todo: todo, type: 'all'});
});

app.get('/active', function(req, res) {
  res.render('pages/index',{todo: todo, type: 'active'});
});

app.get('/completed', function(req, res) {
  res.render('pages/index',{todo: todo, type: 'completed'});
});

app.post('/add', function(req, res, next){
    const name = req.body.todoItem.trim();
    if(!!name){
        const id = Date.now().toString(36) + Math.random().toString(36).substring(2) 
        todo.push({name:name,completed:false,id:id})
    }
    res.redirect(req.headers.referer)
})

app.post('/changeComplete', function(req, res, next){
    const item = req.body
    const index = todo.findIndex(t => t.id === item.id)
    todo[index].completed=item.completed==='on'?true:false
    res.redirect(req.headers.referer)
})

app.post('/changeName', function(req, res, next){
    const newName = req.body.newName.trim();
    const index = todo.findIndex(t => t.id === req.body.id)
    if(!!newName){
        todo[index].name=newName
    } else {
        todo.splice(index,1)
    }
    res.redirect(req.headers.referer)
})

app.post('/deleteTodo', function(req, res, next){
    const index = todo.findIndex(t => t.id === req.body.id)
    todo.splice(index,1)
    res.redirect(req.headers.referer)
})

app.post('/toggleAll', function(req, res, next){
    const itemCompleted = req.body.isToggle === 'on' ? true : false
    todo.forEach(function(item){
        item.completed = itemCompleted
    })
    res.redirect(req.headers.referer)
})

app.post('/clearCompleted', function(req, res, next){
    const activeItems = todo.filter(function(item){
        return !item.completed
    })
    todo=activeItems
    res.redirect(req.headers.referer)
})

app.use(express.static(path.join(__dirname,'/')))

app.listen(8080);
console.log('Server is listening on port 8080');
console.log('Please open http://localhost:8080/')
