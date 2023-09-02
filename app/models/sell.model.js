module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      brand: String,
      price: Number,
      phone: String,
      flaws: String,
      image: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Sell = mongoose.model('sells', schema);
  return Sell;
};
