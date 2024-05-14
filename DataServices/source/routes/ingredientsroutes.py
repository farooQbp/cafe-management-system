from flask import jsonify, request
from bson import ObjectId
from ..oracle.mongo import monodb_connection


def add_item_with_ingredient(connection, payload):
    insert_result = connection.insert_one(payload)
    return jsonify(str(insert_result.inserted_id))

def find_ingredients(connection, object_id):
    query = {"_id": ObjectId(object_id)}
    cursor = connection.find(query)
    documents = [{**doc, "_id": str(doc["_id"])} for doc in cursor]
    return jsonify(documents)


def setup_ingredients_routes(app):
    @app.route('/item-ingredients/<string:item_id>', methods=['GET'])
    def item_ingredients(item_id):
        connection = monodb_connection('itemIngredients')
        return find_ingredients(connection, item_id)

    @app.route('/add-ingredients', methods=['POST'])
    def add_ingredients():
        payload = request.json
        connection = monodb_connection('itemIngredients')
        return add_item_with_ingredient(connection, payload)
