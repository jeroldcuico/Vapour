const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use('/api' , require('./routes/apiRoutes'))

app.listen(8000, () => {
    console.log("Server started in 8000")
})