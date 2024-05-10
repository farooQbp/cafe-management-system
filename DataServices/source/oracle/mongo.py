import pymongo

def monodb_connection(mycollection):
    # Establish a connection to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")  # Change the connection string accordingly
    # Access a specific database
    db = client["cafeInventoryManagement"]  # Replace 'mydatabase' with your database name
    # Access a specific collection within the database
    collection = db[mycollection]  # Replace 'mycollection' with your collection name
    return collection
