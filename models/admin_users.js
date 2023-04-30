const cuid = require('cuid')
const db = require('../db')
const bcrypt = require('bcrypt')
const Product = db.model('admin_users', {
  _id: { type: String, default: cuid },
  password: { type: String, required: true },
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  designation: { type: String, required: true },



})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  user_validate,
  model: Product
}



async function list () {
 
  const products = await Product.find({})
  console.log(products);
  return products
}

async function user_validate (name,pass) {
  console.log(name,pass);

  data=await  Product.findOne({ user_id:name})
  console.log(data);
  if(data!=null){
    let compare= await bcrypt.compare(pass,data.password)
    console.log(compare);
    if(compare==true){
      return { success:true,data:data}
    }
    else{
      return { success:false}

    }
} 
}

async function get (_id) {
  const product = await Product.findById(_id)
  return product
}
async function get2 (id) {
  const user = await Product.findOne({  user_id:id })
  if(user==null)
  {
  return { success:false}
  }
  else
  {
    return { success:true,data:user}
  }
}



async function create (fields) {

    let temp = await get2(fields.user_id)

    if(temp.success == false)
    {
      let salt = await bcrypt.genSalt()
      fields.password= await bcrypt.hash(fields.password,salt)
    const product = await new Product(fields).save()

    return product            
    }
    else
      {
        return "username already exist"
      }         

}

async function edit (_id, change) {
  let salt = await bcrypt.genSalt()
  change.password= await bcrypt.hash(change.password,salt)

  const product = await get({ _id })
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })
  await product.save()
  return product
}


async function remove (_id) {
  await Product.deleteOne({ _id })
}




