from expense import db
from expense.models import Users
from flask_jwt_extended import create_access_token,jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import set_access_cookies
from flask import Blueprint, request, jsonify

users = Blueprint('users',__name__)

@users.route('/create_user', methods=["GET"])
def create_user():
    userdata = request.get_json()
    new_User = Users(email=userdata["email"], name=userdata["name"], password=userdata["password"])
    db.session.add(new_User)
    db.session.commit()
    return jsonify({"message":"User created"}),200

@users.route('/login', methods=["GET"])
def login():
    loginData = request.get_json()
    email = loginData["email"]
    password = loginData["password"]
    user = Users.query.filter_by(email=email).first()
    response = jsonify({"msg": "login successful"})
    if user and user.check_password(password):
        token = create_access_token(identity=user.public_id)
        set_access_cookies(response, token)
        return response,200
    return jsonify({"msg":"Invalid reques"}),500

@users.route('/get_users', methods=["GET"])
@jwt_required()
def getAllUsers():
    usersInfo = Users.query.all()
    resp =[]
    for userinfo in usersInfo:
        usersdict ={}
        usersdict["name"]= userinfo.name
        usersdict["public_id"]= userinfo.public_id
        usersdict["name"]= userinfo.email
        usersdict["name"]= userinfo.password_hash
        resp.append(usersdict)
    return jsonify({"data":resp})