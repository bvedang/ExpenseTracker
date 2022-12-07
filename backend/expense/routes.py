from expense import api
from expense.users.users import CreateNewUser, UserAuth,GetallUser

def init_routes():
    api.add_resource(CreateNewUser, "/user/create_user")
    api.add_resource(UserAuth,"/user/login")
    api.add_resource(GetallUser,"/user/allUsers")