from expense import api
from expense.users.users import CreateNewUser, UserAuth,GetallUser,CurrentUser
from expense.expenseoperations.expenseManager import UserExpense, FilterdUserExpenses

def init_routes():
    api.add_resource(CreateNewUser, "/user/create_user")
    api.add_resource(UserAuth,"/user/login")
    api.add_resource(GetallUser,"/user/allUsers")
    api.add_resource(CurrentUser,"/user/get_current_user")
    api.add_resource(UserExpense, "/user/expenses")
    api.add_resource(FilterdUserExpenses,"/user/filteredExpenses")

    