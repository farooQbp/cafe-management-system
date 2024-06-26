from flask import jsonify, request
import cx_Oracle
import math
from bson import ObjectId
from ..oracle.oracle import connect_to_oracle
from ..oracle.mongo import monodb_connection


def update_item(connection, payload, id):
    name = payload["name"]
    image = payload["image"]
    availability = payload["availability"]
    price = payload["price"] 
    new_values = {
        "AVAILABILITY": availability,
        "IMG_URL": image,
        "NAME": name.upper(),
        "PRICE": price
    }
    connection.update_one(
        {"_id": ObjectId(id)},
        {"$set": new_values}
    )

def create_filter_criteria(filters):
    filter_criteria = {}
    for f in filters:
        if 'field' in f and 'value' in f:
            filter_criteria[f['field']] = f['value']
    return filter_criteria
    
def get_all_items(connection, payload):
    filter_criteria = create_filter_criteria(payload['filter'])
    sort_field = payload['sort']['value']
    sort_order = payload['sort']['sort']
    cursor = connection.find(filter_criteria).sort(sort_field, sort_order)
    documents = [{**doc, "_id": str(doc["_id"]), "INGREDIENTS": str(doc["INGREDIENTS"])} for doc in cursor]
    return jsonify(documents)

def calculate_item_price(ingredients, inventory, percentage):
    total_price = 0
    ingredient_array = []
    for ingredient in ingredients:
        for item in inventory:
            if item['NAME'].upper() == ingredient['ingredient'].upper():
                if (ingredient['ingredientId'] == item['ID']) or (ingredient['ingredient'], item['NAME']):
                    ingredient_array.insert(item['NAME'])
                    # Convert grams to kilograms
                    quantity_kg = ingredient['quantity'] / 1000
                    # Calculate the price based on price per kilogram
                    total_price += quantity_kg * item['PRICE_PER_UNIT']
                    break
    total_price += total_price * percentage
    # Round to the next multiple of 5 if not already a multiple of 5
    total_price = math.ceil(total_price / 5) * 5
    return { "price": total_price, "ingredients": ingredient_array}

def add_item(connection, payload):
    item_ingredients_collection = monodb_connection('itemIngredients')
    items_collection = monodb_connection("items")
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM inventory")
        inventory_data = cursor.fetchall()
        inventory = [{ "ID": row[0], "NAME": row[1], "PRICE_PER_UNIT": row[3], "STOCK_AVAILABLE": row[2] } for row in inventory_data]
        item_ingredients = item_ingredients_collection.find()
        
        for item in item_ingredients:
            if payload['name'].upper() == item["itemName"].upper():
                # Calculate the price of the item based on ingredients
                price_ingredients = calculate_item_price(item['ingredients'], inventory, 0.1)
                new_item = {
                    "AVAILABILITY": True,
                    "CATEGORY": payload['category'],
                    "DIETARY_PREFERENCE": payload['dietary'],
                    "IMG_URL": payload['imgUrl'],
                    "INGREDIENTS": item["_id"],
                    "NAME": item["itemName"].upper(),
                    "PRICE": price_ingredients["price"],
                    "INGREDIENT_DETAILS": price_ingredients["ingredients"]
                }
                items_collection.insert_one(new_item)
        

def setup_items_routes(app):

    @app.route('/add-item', methods=['POST'])
    def items_add():
        try:
            connection = connect_to_oracle()
            payload = request.json
            add_item(connection, payload)
            return jsonify('New Item added successfully')
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()
                
    @app.route('/items', methods=['POST'])
    def get_available_items():
        payload = request.json
        connection = monodb_connection('items')
        return get_all_items(connection, payload)

    @app.route('/update-item/<string:item_id>', methods=['PUT'])
    def items_update(item_id):
        connection = monodb_connection('items')
        payload = request.json
        update_item(connection, payload, item_id)
        return jsonify('Item updated successfully')

