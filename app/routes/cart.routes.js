module.exports = (app) => {
    const carts = require('../controllers/cart.controller')
    const router = require('express').Router()

    router.get('/', carts.findAll)
    router.post('/', carts.create)
    router.get('/:id', carts.findOne)
    router.put('/:id', carts.update)
    router.delete('/:id', carts.delete)

    app.use('/api/carts', router)
}