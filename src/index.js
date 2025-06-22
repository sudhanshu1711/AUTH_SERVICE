const express = require('express')
const bodyParser = require('body-parser')

const app =express()

const {PORT} = require('./config/serverConfig.js')
const apiRoutes = require('./routes/index.js')
const db = require('./models/index.js')
const {User,Roles} = require('./models/index.js')

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api',apiRoutes)
     app.listen(PORT,async ()=>{
      if(process.env.DB_SYNC){
         db.sequelize.sync({alter:true})
      }
       /* const u1 = await User.findByPk(4)
        const r1 = await Roles.findByPk(1)
        const response = await u1.addRole(r1)
        console.log(response) */
        console.log(`server started at ${PORT}`)
     })
}

prepareAndStartServer()