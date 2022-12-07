from expense import db
from expense.models import UsersModel
from flask_jwt_extended import create_access_token,jwt_required
from flask_jwt_extended import set_access_cookies
from flask import jsonify, make_response
from flask_restful import Resource, reqparse

#Create/SignUp new user
createUserParser = reqparse.RequestParser()
createUserParser.add_argument("name")
createUserParser.add_argument("email")
createUserParser.add_argument("password")

class CreateNewUser(Resource):
    def post(self):
        args = createUserParser.parse_args()
        print(args)
        new_User = UsersModel(email=args["email"], name=args["name"], password=args["password"])
        db.session.add(new_User)
        db.session.commit()
        return jsonify({"msg":"New User created!"})
#User Auth Section 
userAuthInfo = reqparse.RequestParser()
userAuthInfo.add_argument("email")
userAuthInfo.add_argument("password")

class UserAuth(Resource):
    def post(self):
        args = userAuthInfo.parse_args()
        email = args["email"]
        password = args["password"]
        user = UsersModel.query.filter_by(email=email).first()
        if user and user.check_password(password):
            response = jsonify({"msg": "login successful"})
            token = create_access_token(identity=user.public_id)
            set_access_cookies(response, token)
            return response
        return make_response(jsonify({"msg":"Invalid Credentials"}),500)

class GetallUser(Resource):
    @jwt_required()         
    def get(self):
        users = UsersModel.query.all()
        resp =[]
        for user in users:
            
            usersdict ={}
            usersdict["name"]= user.name
            usersdict["public_id"]= user.public_id
            usersdict["email"]= user.email
            usersdict["password"]= user.password_hash
            resp.append(usersdict)
        return jsonify({"data":resp})

# @users.route('/create_user', methods=["POST"])
# def create_user():
#     userdata = request.get_json()
#     print(userdata)
#     new_User = Users(email=userdata["email"], name=userdata["name"], password=userdata["password"])
#     db.session.add(new_User)
#     db.session.commit()
#     return jsonify({"message":"User created"}),200

# @users.route('/login',methods=["POST"])
# def login():
#     loginData = request.get_json()
#     print(loginData)
#     email = loginData["email"]
#     password = loginData["password"]
#     user = Users.query.filter_by(email=email).first()
#     response = jsonify({"msg": "login successful"})
#     if user and user.check_password(password):
#         token = create_access_token(identity=user.public_id)
#         set_access_cookies(response, token)
#         return response,200
#     return jsonify({"msg":"Invalid reques"}),500

# @users.route('/get_users', methods=["GET"])
# @jwt_required()
# def getAllUsers():
#     usersInfo = Users.query.all()
#     resp =[]
#     for userinfo in usersInfo:
#         usersdict ={}
#         usersdict["name"]= userinfo.name
#         usersdict["public_id"]= userinfo.public_id
#         usersdict["name"]= userinfo.email
#         usersdict["name"]= userinfo.password_hash
#         resp.append(usersdict)
#     return jsonify({"data":resp})