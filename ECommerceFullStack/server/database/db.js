
import mongoose from "mongoose";


export const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.nzky1fp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        // await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        await mongoose.connect(URL);
        console.log("Database connect Successfully")
    } catch (error) {
        console.log(`Error to connect : ${error.message}.`)
    }

}

export default Connection;
// D9uhEzozeEuF5pLt  user