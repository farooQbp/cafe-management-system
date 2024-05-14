class UserService:
    def __init__(self):
        # This could be replaced with actual database operations
        self.users = [
            {'id': 1, 'name': 'Alice'},
            {'id': 2, 'name': 'Bob'},
            {'id': 3, 'name': 'Charlie'}
        ]

    def get_all_users(self):
        return self.users

    def get_user_by_id(self, user_id):
        for user in self.users:
            if user['id'] == user_id:
                return user
        return None
