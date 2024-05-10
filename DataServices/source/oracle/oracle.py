from flask import Flask
import cx_Oracle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

username = "system"
password = "admin"
host = "FAROOQ"
port = "1521"
service_name = "XE"

# Flag
oracle_client_initialized = False

def initialize_oracle_client():
    global oracle_client_initialized
    if not oracle_client_initialized:
        cx_Oracle.init_oracle_client(lib_dir=r"C:\oracle\instantclient_21_13")
        oracle_client_initialized = True

def connect_to_oracle():
    initialize_oracle_client()
    dsn = cx_Oracle.makedsn(host, port, service_name)
    return cx_Oracle.connect(username, password, dsn)

def fetch_all_rows(query, cursor):
    cursor.execute(query)
    columns = [desc[0] for desc in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
