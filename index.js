const express = require('express')
const fs = require('fs')
const app = express()
var path = require('path');
const port = 1234
const database =  require('./public/js/db.json')
// Static 
// app.engine('html', require('ejs').renderFile);
app.use(express.static('public'))
app.use('/css',express.static('./public/css'))
app.use('/js',express.static('./public/js'))
app.use('/assets',express.static('./public/assets'))
app.use(express.json())

// Views
app.set('views','./views')
app.set('view engine','ejs')

app.get('/', function(req,res) {
    res.render('index');
})
app.get('/game', function(req,res) {
    res.render('game');
})

app.get('/login', function(req,res) {
    res.render('login');
})

app.post('/login',(req,res,next) => {
    try {
        const userInput  = req.body.username
        const passInput =  req.body.password
        console.log(userInput,passInput)
        const isExist = database.find(data => {
            return data.username === userInput
        })

        if (!isExist) {
            return res.status(401).json({
                error:true,
                message: 'user tidak ditemukan'
            })
        } else{
            if (isExist.password !== passInput) {
                return res.status(401).json({
                    error:true,
                    message: 'wrong password'
                })
            } else{
                return res.status(200).json({
                    error:false,
                    message: 'success',
                    data:{
                        "username":userInput,
                        "role":isExist.role,
                        "email":isExist.email
                    }
                })
            }

        }
    } catch (error) {
        return res.status(500).json({
            error:true,
            message: error.message
        })
    }  
})

app.listen(port)