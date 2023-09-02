module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      email: String,
      address: String,
      phone: String,
      password: String,
      refresh_token: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Customer = mongoose.model('customers', schema);
  return Customer;
};
