module.exports = (app) => {
    const categories = require('../controllers/category.controller')
    const router = require('express').Router()

    router.get('/', categories.findAll)
    router.post('/', categories.create)
    router.get('/:id', categories.findOne)
    router.put('/:id', categories.update)
    router.delete('/:id', categories.delete)

    app.use('/api/categories', router)
}