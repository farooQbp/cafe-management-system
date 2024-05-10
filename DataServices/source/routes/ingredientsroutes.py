from flask import jsonify, request
from bson import ObjectId
from ..oracle.mongo import monodb_connection


def add_item_with_ingredient(connection, payload):
    """
    {
        "ingredients": [
            {
                "ingredient": "Milk",
                "ingredientId": 1,
                "quantity": 50
            },
            {
                "ingredient": "Water",
                "ingredientId": 2,
                "quantity": 200
            },
            {
                "ingredient": "Sugar",
                "ingredientId": 3,
                "quantity": 10
            }
        ],
        "itemName": "Salad"
    }
    """
    insert_result = connection.insert_one(payload)
    return jsonify(str(insert_result.inserted_id))

def find_ingredients(connection, object_id):
    query = {"_id": ObjectId(object_id)}
    # projection = {"_id": 0}
    # cursor = connection.find(query, projection) # to remove _id
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
