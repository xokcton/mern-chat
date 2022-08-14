import mongoose from "mongoose"

const connect = async (uri) => {
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`Successfully connected to the MongoDb: ${connection.connection.host}:${connection.connection.port}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default connect