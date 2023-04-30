const cuid = require('cuid')

const db = require('../db')

const User = db.model('Products_Creation', {
  _id: { type: String, default: cuid },
  project_name: { type: String, required: true },
  assigned_to: { type: String, required: true },
  qty: { type: String, required: true },
  price: { type: String, required: true },
  expiry_date: { type: String, required: true },
  start_date: { type: String, required: true },
  project_id: { type: String, required: true },
  status: { type: String, required: true },
  comments: { type: Array,  },


 


})



module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  model: User
}

async function list (client_id) {
  const user = await User.find()
  return user
}  


async function get (_id) {
  const product = await User.findById(_id)
  return product
}


async function create (fields) {

  
    const product = await new User(fields).save()
   // console.log(product)
    return product            
  
}

async function edit (_id, change) {
  const product = await get({ _id })
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })
  await product.save()
  return product
}


async function remove (_id) {
  await User.deleteOne({ _id })
}

