from flask import Flask
from flask_cors import CORS



from controller.ingredients_controller import user_bp
# from source.routes.userroutes import setup_user_routes
# from source.routes.categoryroutes import setup_category_routes
# from source.routes.ingredientsroutes import setup_ingredients_routes
# from source.routes.itemroutes import setup_items_routes
# from source.routes.orderroutes import setup_order_routes


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


app.register_blueprint(user_bp)
# setup_category_routes(app)
# setup_user_routes(app)
# # setup_ingredients_routes(app)
# setup_items_routes(app)
# setup_order_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
