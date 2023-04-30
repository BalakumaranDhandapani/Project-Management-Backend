const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const admin_users_api = require('./api/admin_users_api')
const product_creation_api = require('./api/project_creation_api')


var cors = require('cors')
const middleware = require('./middleware')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
const port = process.env.PORT || 3005


app.get('/admin_users_api',admin_users_api.listUser)
app.post('/admin_users_api', admin_users_api.createUser)
app.post('/admin_users_api_validate', admin_users_api.user_validate)
app.put('/admin_users_api/:id',  admin_users_api.editUser)
app.delete('/admin_users_api/:id', admin_users_api.deleteUser)

app.get('/project_creation_api_list',product_creation_api.listProducts)
app.get('/project_creation_api/:id', product_creation_api.getuserbyid)
app.post('/project_creation_api',  product_creation_api.createProduct)
app.put('/project_creation_api/:id', product_creation_api.editProduct)
app.delete('/project_creation_api/:id',  product_creation_api.deleteProduct)






app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(3005, () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}

