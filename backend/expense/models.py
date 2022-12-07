from expense import db
import uuid
from werkzeug.security import generate_password_hash, check_password_hash


class UsersModel(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(128), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(128), unique=True)
    password_hash = db.Column(db.String(128))

    def __init__(self, email, name, password):
        self.public_id = str(uuid.uuid4())
        self.email = email
        self.name = name
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
