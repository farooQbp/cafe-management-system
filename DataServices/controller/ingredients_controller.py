from flask import Blueprint, jsonify
from services.user_service import UserService

user_bp = Blueprint('user', __name__, url_prefix='/users')
user_service = UserService()

@user_bp.route('/a')
def get_users():
    users = user_service.get_all_users()
    return jsonify(users)

@user_bp.route('/<int:user_id>')
def get_user(user_id):
    user = user_service.get_user_by_id(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({'message': 'User not found'}), 404
