const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //required: false, dlatego, że przy wartości true postman wywalał
    //name is required nawet gdy podałem nazwę produktu
    name: { type: String, required: true},
    price: { type: Number, required: true},
    productImage: { type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);