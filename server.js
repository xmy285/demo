var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var renderData = {todo:[]}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index',renderData);
});

app.get('/active', function(req, res) {
  res.render('pages/active',renderData);
});

app.get('/completed', function(req, res) {
  res.render('pages/completed',renderData);
});

app.post('/add', function(req, res, next){
    renderData.todo.push({name:req.body.todoItem,completed:false})
    res.redirect(req.headers.referer)
})

app.post('/changeComplete', function(req, res, next){
    const item = req.body
    renderData.todo[parseInt(item.index)].completed=item.completed==='on'?true:false
    res.redirect(req.headers.referer)
})

app.post('/changeName', function(req, res, next){
    renderData.todo[parseInt(req.body.index)].name=req.body.newName
    res.redirect(req.headers.referer)
})

app.post('/deleteTodo', function(req, res, next){
    renderData.todo.splice(parseInt(req.body.index),1)
    res.redirect(req.headers.referer)
})

app.post('/toggleAll', function(req, res, next){
    const itemCompleted = req.body.isToggle === 'on' ? true : false
    renderData.todo.forEach(function(item){
        item.completed = itemCompleted
    })
    res.redirect(req.headers.referer)
})

app.post('/clearCompleted', function(req, res, next){
    const activeItems = renderData.todo.filter(function(item){
        return !item.completed
    })
    renderData.todo=activeItems
    res.redirect(req.headers.referer)
})

app.use(express.static(path.join(__dirname,'/')))

app.listen(8080);
console.log('Server is listening on port 8080');
