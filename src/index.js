const express = require('express')
const bodyParser = require('body-parser')

const app =express()

const {PORT} = require('./config/serverConfig.js')
const apiRoutes = require('./routes/index.js')


const prepareAndStartServer = ()=>{
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api',apiRoutes)
     app.listen(PORT,async ()=>{
        console.log(`server started at ${PORT}`)
     })
}

prepareAndStartServer()