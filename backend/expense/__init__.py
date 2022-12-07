import os
from datetime import datetime,timedelta,timezone
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager,get_jwt,get_jwt_identity,JWTManager,set_access_cookies,create_access_token



app = Flask(__name__)
app.config['SECRET_KEY'] = "mysecret"
# Secret key to genere jwt token
app.config["JWT_SECRET_KEY"] = "super-secret"
# reqired to for cors
app.config["JWT_COOKIE_SECURE"] = True
# reqired to for cors
app.config["JWT_COOKIE_SAMESITE"] = "None"
# basic jwt token refresh code
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
api = Api(app)

cors = CORS(app, supports_credentials=True,resources={r"/*": {"origins": "http://localhost:5173"}})
jwt = JWTManager(app)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
            # response.header.add("Access-Control-Allow-Origin","*")
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response
