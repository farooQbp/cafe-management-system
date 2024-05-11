from flask import jsonify, request
import cx_Oracle
from ..oracle.oracle import connect_to_oracle, fetch_all_rows

def get_user_types(connection):
    with connection.cursor() as cursor:
        rows = fetch_all_rows("SELECT * FROM User_Type", cursor)
        return jsonify(rows)

def get_users(connection):
    with connection.cursor() as cursor:
        rows = fetch_all_rows("SELECT User_ID, User_Name, User_Email, User_Type FROM Users", cursor)
        return jsonify(rows)

def add_user(connection, payload):
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO Users (User_ID, User_Name, User_Email, User_Password, User_Type) 
            VALUES (:id, :name, :email, :password, :type)""",
            (payload['id'], payload['name'], payload['email'], payload['password'], payload['type']))
        connection.commit()

def update_user(connection, payload, id):
    with connection.cursor() as cursor:
        name = payload["name"]
        email = payload["email"]
        print(email, name, id)
        update_query = "UPDATE Users SET User_Name = :name, User_Email = :email WHERE USER_ID = :id"
        cursor.execute(update_query, (name, email, id))
        connection.commit()


def setup_user_routes(app):
    @app.route('/user-types', methods=['GET'])
    def user_types():
        try:
            connection = connect_to_oracle()
            return get_user_types(connection)
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()

    @app.route('/users', methods=['GET', 'POST'])
    def users():
        if request.method == 'GET':
            try:
                connection = connect_to_oracle()
                return get_users(connection)
            except cx_Oracle.DatabaseError as e:
                return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
            finally:
                if connection:
                    connection.close()
        else:
            try:
                payload = request.json
                connection = connect_to_oracle()
                add_user(connection, payload)
                return jsonify('User added successfully')
            except cx_Oracle.DatabaseError as e:
                return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
            finally:
                if connection:
                    connection.close()       

    @app.route('/users/<int:item_id>', methods=['PUT'])
    def update_user_route(item_id):
        try:
            payload = request.json
            connection = connect_to_oracle()
            update_user(connection, payload, item_id)
            return jsonify('User updated successfully')
        except cx_Oracle.DatabaseError as e:
            return jsonify({'error': 'Database connection error', 'message': str(e)}), 500
        finally:
            if connection:
                connection.close()