from expense import app,db
from flask import request, jsonify
from expense.models import Users


@app.route('/create_user')
def create_user():
    usersql = Users.query.all()
    users = []
    for user in usersql:
        userdict = {}
        userdict['name'] = user.name
        userdict['email'] = user.email
        userdict['publicId'] = user.public_id
        userdict['password'] = user.password_hash
        users.append(userdict)
    return jsonify({'users':users})

if __name__ == "__main__":
    app.run(debug=True)