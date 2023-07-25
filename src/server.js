require("dotenv").config()
const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite/index")
const uploadConfig = require("./configs/uploadConfig")
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./docs/swagger.json")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(routes)

database()

<<<<<<< HEAD
const PORT = process.env.PORT || 4000
=======
const PORT = process.env.PORT
>>>>>>> 83522374837b205bbe03c2b79dc252bcc2e82148
app.listen(PORT, () => {
    console.log(`HTTP Server is running on PORT ${PORT}`)
})