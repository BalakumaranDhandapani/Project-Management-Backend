const admin_users = require('../models/admin_users')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  createUser,
  getUser,
  editUser,
  deleteUser,
  listUser,
  user_validate,

})


async function createUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  const driver_users = await admin_users.create(req.body)
  res.json(driver_users)
}

async function user_validate (req, res, next) {
  const user = await admin_users.user_validate(req.body.user_id,req.body.password)
  res.json(user)
}
async function listUser (req, res, next) {
  const driver_users = await admin_users.list()
  res.json(driver_users)
}


async function getUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  const { id } = req.params
  const driver_users = await admin_users.get(id)
  if (!driver_users) return next()
  res.json(driver_users)
}



async function editUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  const change = req.body
  const driver_users = await admin_users.edit(req.params.id, change)
  res.json(driver_users)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  await admin_users.remove(req.params.id)
  res.json({ success: true })
}

