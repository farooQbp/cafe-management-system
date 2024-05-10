from flask import jsonify, request
import cx_Oracle
from ..oracle.oracle import connect_to_oracle, fetch_all_rows

# Category Management
def get_category_types(connection):
    with connection.cursor() as cursor:
        rows = fetch_all_rows("SELECT * FROM CATEGORY_TYPE", cursor)
        return jsonify(rows)

def add_category(connection, payload):
    """
    {
        "id": 4,
        "name": "SWEETS"
    }
    """
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO CATEGORY_TYPE (ID, NAME) 
            VALUES (:id, :name)""",
            (payload['id'], payload['name']))
        connection.commit()

# Dietary Management
def get_dietary_preference(connection):
    with connection.cursor() as cursor:
        rows = fetch_all_rows("SELECT * FROM DIETARY_PREFERENCES", cursor)
        return jsonify(rows)

# Inventory Management
def get_available_inventory(connection):
    with connection.cursor() as cursor:
        rows = fetch_all_rows("SELECT * FROM INVENTORY", cursor)
        return jsonify(rows)

def add_new_inventory(connection, payload):
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO INVENTORY (ID, NAME, STOCK_AVAILABLE, PRICE_PER_UNIT) 
            VALUES (:id, :name, :availability, :price)""",
            (payload['id'], payload['name'], payload['availability'], payload['price']))
        connection.commit()

def update_inventory(connection, id, payload):
    with connection.cursor() as cursor:
        availability = payload["availability"]
        price = payload["price"]
        update_query = "UPDATE INVENTORY SET STOCK_AVAILABLE = :availability, PRICE_PER_UNIT = :price WHERE ID = :id"
        cursor.execute(update_query, (availability, price, id))
        connection.commit()


def setup_category_routes(app):
    @app.route('/category-types', methods=['GET', 'POST'])
    def category_types():
        if request.method == 'GET':
            try:
                connection = connect_to_oracle()
                return get_category_types(connection)
            except cx_Oracle.DatabaseError as e:
                return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
            finally:
                if connection:
                    connection.close()
        else:
            try:
                payload = request.json
                connection = connect_to_oracle()
                add_category(connection, payload)
                return jsonify({'message': 'New Category added successfully'})
            except cx_Oracle.DatabaseError as e:
                return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
            finally:
                if connection:
                    connection.close()
    
    # veg or non veg
    @app.route('/dietary-preference', methods=['GET'])
    def dietary_types():
        try:
            connection = connect_to_oracle()
            return get_dietary_preference(connection)
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()
    
    @app.route('/inventory', methods=['GET'])
    def stocks_available():
        try:
            connection = connect_to_oracle()
            return get_available_inventory(connection)
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()
    
    @app.route('/update-inventory/<int:item_id>', methods=['PUT'])
    def stocks_update(item_id):
        try:
            payload = request.json
            connection = connect_to_oracle()
            update_inventory(connection, item_id, payload)
            return jsonify({'message': 'Inventory updated successfully'})
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()
    
    @app.route('/add-inventory', methods=['POST'])
    def add_inventory():
        try:
            payload = request.json
            connection = connect_to_oracle()
            add_new_inventory(connection, payload)
            return jsonify({'message': 'Inventory Added successfully'})
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()
    
