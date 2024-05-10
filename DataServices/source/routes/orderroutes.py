from flask import jsonify, request
import cx_Oracle
import json
from bson import ObjectId
from ..oracle.oracle import connect_to_oracle, fetch_all_rows
from ..oracle.mongo import monodb_connection
from .ingredientsroutes import find_ingredients
from ..utils.utils import stock_updation
from .categoryroutes import update_inventory

def find_order(connection, object_id):
    query = {"_id": ObjectId(object_id)}
    # projection = {"_id": 0}
    # cursor = connection.find(query, projection) # to remove _id
    cursor = connection.find(query)
    documents = [{**doc, "_id": str(doc["_id"])} for doc in cursor]
    return jsonify(documents)

def order_item(connection, payload):
    #  connected to mongo db to place order
    mongo_connection = monodb_connection('orderManagement')
    insert_result = mongo_connection.insert_one(payload)
    order_items = payload["orderDetails"]
    try:
        oracle_connection = connect_to_oracle()
        with oracle_connection.cursor() as cursor:
            rows = fetch_all_rows("SELECT * FROM INVENTORY", cursor)
            inventories = jsonify(rows)
            json_inventories = json.loads(inventories.data.decode('utf-8')) 
            for each_item in order_items:
                item_objectid = each_item["ingredientId"]
                item_quantity = each_item["quantity"]
                item_ingredients_data = find_ingredients(connection, item_objectid)
                json_data = json.loads(item_ingredients_data.data.decode('utf-8'))[0]
                ingredients = json_data["ingredients"]
                inventory_data = stock_updation(ingredients, json_inventories, item_quantity)
                for item in inventory_data:
                    item_id = item['ID']
                    payload_item = {
                        "price": item['PRICE_PER_UNIT'],
                        "availability": item['STOCK_AVAILABLE']
                    }
                    update_inventory(oracle_connection, item_id, payload_item)
    except cx_Oracle.DatabaseError as e:
        return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
    finally:
        if oracle_connection:
            oracle_connection.close()  
    return jsonify(str(insert_result.inserted_id))
        

def setup_order_routes(app):

    @app.route('/order', methods=['POST'])
    def items_order():
        connection = monodb_connection('itemIngredients')
        payload = request.json
        order_item(connection, payload)
        return jsonify({'message': 'Order Placed successfully'})
    
    @app.route('/order/<string:item_id>', methods=['GET'])
    def item_order(item_id):
        connection = monodb_connection('orderManagement')
        return find_order(connection, item_id)
