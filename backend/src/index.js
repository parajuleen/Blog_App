const {app}=require('./app')
require('dotenv').config(
    {
        path:'./.env'
    }
)

const {connectDb}=require('./database/connection')

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 6000 ,()=>{
        console.log(`Server running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('connection failed',err)
})