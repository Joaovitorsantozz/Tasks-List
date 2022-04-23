const express=require('express');
const path= require('path');
var bp=require('body-parser'); 
const app=express();
 
app.use(bp.json());
app.use(bp.urlencoded({
    extended:true
}));

app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/public',express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname,'/views'));

var tasks=['Wake Up','Go to the market'];

app.post('/',(req,res)=>{
    //console.log(req.body.task); input name task require

    tasks.push(req.body.task);
    res.render('index',{tasksList:tasks});
})

app.get('/',(req,res)=>{
    res.render('index',{tasksList:tasks});
});

app.get('/delete/:id',(req,res)=>{
    tasks=tasks.filter(function(val, index){
        if(index!=req.params.id){
            return val;
        }
    })
    res.render('index',{tasksList:tasks});
});

app.listen(5000,()=>{
    console.log('Server running');
})