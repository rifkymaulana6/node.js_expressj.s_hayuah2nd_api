module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            product_id: String,
            qty: Number
        },
        { timestamps: true }
    )

    schema.method("toJSON", function(){
        const {_v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Cart = mongoose.model("carts", schema)
    return Cart
}