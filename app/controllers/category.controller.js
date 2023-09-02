const db = require('../models')
const Category = db.categories

exports.findAll = (req, res) => {
    Category.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while retrieving category."
        })
    });
}

exports.create = (req, res) => {
    const category = new Category({
        name: req.body.name
    })

    category.save(category)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create category."
        })
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Category.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show category."
        })
    });
}

exports.update = (req, res) => {
    const id = req.params.id

    Category.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Category not found"
            })
        }

        res.send({
            message: "Category was updated"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while update category."
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params.id

    Category.findByIdAndRemove(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Category not found"
            })
        }

        res.send({
            message: "Category was deleted"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while deleting category."
        })
    });
}