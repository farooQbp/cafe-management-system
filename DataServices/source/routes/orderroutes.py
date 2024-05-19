from flask import jsonify, send_from_directory, request
import cx_Oracle
import json
from bson import ObjectId
from datetime import datetime
from ..oracle.oracle import connect_to_oracle, fetch_all_rows
from ..oracle.mongo import monodb_connection
from .ingredientsroutes import find_ingredients
from ..utils.utils import stock_updation
from source.utils.graphs import create_order_graphs
from source.utils.ingredient_consumption import calculate_and_plot_ingredient_consumption
from .categoryroutes import update_inventory

def find_order(connection, object_id):
    query = query = {"_id": ObjectId(object_id)} if object_id else {}
    # projection = {"_id": 0}
    # cursor = connection.find(query, projection) # to remove _id
    cursor = connection.find(query)
    documents = [{**doc, "_id": str(doc["_id"])} for doc in cursor]
    return jsonify(documents)
def find_order_list(connection, payload):
    query = {}

    start_date = payload.get('startDate', '')
    require_start = payload.get('requireStart', False)
    end_date = payload.get('endDate', '')

    # Construct the query
    if end_date:
        end_date_dt = datetime.strptime(end_date, '%Y-%m-%d')
        query['orderDateandTime'] = {'$lte': end_date_dt}

    if require_start and start_date:
        start_date_dt = datetime.strptime(start_date, '%Y-%m-%d')
        query['orderDateandTime']['$gte'] = start_date_dt
    cursor = connection.find(query)
    documents = [{**doc, "_id": str(doc["_id"])} for doc in cursor]
    return jsonify(documents)

def find_order_summary(connection, payload):
    query = {}
    # Parse the payload for startDate, requireStart, and endDate
    start_date = payload.get('startDate', '')
    require_start = payload.get('requireStart', False)
    end_date = payload.get('endDate', '')

    # Construct the query
    if end_date:
        end_date_dt = datetime.strptime(end_date, '%Y-%m-%d')
        query['orderDateandTime'] = {'$lte': end_date_dt}

    if require_start and start_date:
        start_date_dt = datetime.strptime(start_date, '%Y-%m-%d')
        query['orderDateandTime']['$gte'] = start_date_dt
    cursor = connection.find(query)
    documents = [{**doc, "_id": str(doc["_id"])} for doc in cursor]
    data = jsonify(documents)
    json_data = json.loads(data.data.decode('utf-8')) 
    graphs = create_order_graphs(json_data)
    return jsonify(graphs)

def order_item(connection, payload):
    #  connected to mongo db to place order
    mongo_connection = monodb_connection('orderManagement')
    custom_payload = {
            "customer": payload["customer"],
            "orderDateandTime": datetime.strptime(payload["orderDateandTime"], "%Y-%m-%dT%H:%M:%S.%fZ"),
            "orderDetails": payload["orderDetails"],
            "price": payload["price"]
        }
    insert_result = mongo_connection.insert_one(custom_payload)
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

def find_ingredient_usage(payload):
    query = {}
    # Parse the payload for startDate, requireStart, and endDate
    start_date = payload.get('startDate', '')
    require_start = payload.get('requireStart', False)
    end_date = payload.get('endDate', '')

    # Construct the query
    if end_date:
        end_date_dt = datetime.strptime(end_date, '%Y-%m-%d')
        query['orderDateandTime'] = {'$lte': end_date_dt}

    if require_start and start_date:
        start_date_dt = datetime.strptime(start_date, '%Y-%m-%d')
        query['orderDateandTime']['$gte'] = start_date_dt
    orders = monodb_connection('orderManagement')
    items = monodb_connection('items')
    ingredients = monodb_connection('itemIngredients')
    cursor_orders = orders.find(query)
    cursor_items = items.find()
    cursor_ingredients = ingredients.find()
    orders_list = list(cursor_orders)
    items_list = list(cursor_items)
    ingredients_list = list(cursor_ingredients)
    result = calculate_and_plot_ingredient_consumption(orders_list, items_list, ingredients_list)
    return jsonify(result)

def setup_order_routes(app):

    @app.route('/order', methods=['POST'])
    def items_order():
        connection = monodb_connection('itemIngredients')
        payload = request.json
        order_item(connection, payload)
        return jsonify('Order Placed successfully')
    
    @app.route('/order/<string:item_id>', methods=['GET'])
    def item_order(item_id):
        connection = monodb_connection('orderManagement')
        return find_order(connection, item_id)
    
    @app.route('/order', methods=['GET'])
    def all_order():
        connection = monodb_connection('orderManagement')
        return find_order(connection, False)
    
    @app.route('/order-summary', methods=['POST'])
    def order_summary():
        payload = request.json
        connection = monodb_connection('orderManagement')
        return find_order_summary(connection, payload)
    
    @app.route('/graphs/<path:filename>', methods=['GET'])
    def serve_graph(filename):
        print("Attempting to serve:", filename)
        return send_from_directory('graphs', filename)
    
    @app.route('/order-list', methods=['POST'])
    def all_order_list():
        payload = request.json
        connection = monodb_connection('orderManagement')
        return find_order_list(connection, payload)
    
    @app.route('/ingredient-consumption', methods=['POST'])
    def ingredient_usage_list():
        payload = request.json
        return find_ingredient_usage(payload)
