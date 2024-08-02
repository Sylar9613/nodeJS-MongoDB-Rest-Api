var express=require('express');
app=express(),
port=process.env.PORT||3000,
mongoose=require('mongoose'),
Product=require('./restapi/models/productModel'),
bodyParser=require('body-parser');
dbURI='mongodb://localhost/onlinestore';
mongoose.Promise=global.Promise;
mongoose.connect(dbURI,{useNewUrlParser:true});
//eventos
mongoose.connection.on('conected',function(){
    console.log('Mongoose conected to '+dbURI);
});
mongoose.connection.on('error',function(err){
    console.log('Mongoose conection error: '+err);
});
mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconected');
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var routes=require('./restapi/routes/productRoutes');
routes(app);
app.use(function(req,res){
    res.status(404).send({url:req.originUrl+' not found'})
});
app.listen(port,function(){console.log('Escuchando por el puerto:'+port);});
