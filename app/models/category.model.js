module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            name: String
        },
        { timestamps: true }
    )

    schema.method("toJSON", function(){
        const {_v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Category = mongoose.model("categories", schema)
    return Category
}