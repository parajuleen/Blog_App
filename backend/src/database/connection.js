const mongoose=require('mongoose')

const connectDb= async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_Name}`)
        console.log('DB connected')
    } catch (error) {
        console.log('mongodb connecttion error',error)
    }
}

module.exports={
    connectDb
}