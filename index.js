const express = require('express')
const app = express()

app.get('/',function(req , res){
    return res.send('Selam')
})

app.listen(3000,function(){
    console.log("Sistem 3000 de çalışıyor.");
})