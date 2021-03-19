const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const { id } = req.params;
    const product = req.body;
    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collections('products');
    const res = await Products.findOneAndDelete(
        {_id: ObjectID(id)},
        { $set: product}
    );

    closeConnectionFn();

    context.res = {
        status: 200,
        body: res
    }

}