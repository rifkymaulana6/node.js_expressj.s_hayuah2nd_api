const db = require('../models')
const Cart = db.carts

exports.findAll = (req, res) => {
    Cart.find()
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while retrieving Cart."
        })
    });
}

exports.create = (req, res) => {
    const cart = new Cart({
        product_id: req.body.product_id,
        qty: req.body.qty
    })

    cart.save(cart)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while create cart."
        })
    });
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Cart.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while show Cart."
        })
    });
}

exports.update = (req, res) => {
    const id = req.params.id

    Cart.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Cart not found"
            })
        }

        res.send({
            message: "Cart was updated"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while update Cart."
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params.id

    Cart.findByIdAndRemove(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: "Cart not found"
            })
        }

        res.send({
            message: "Cart was deleted"
        })
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while delete Cart."
        })
    });
}