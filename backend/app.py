from expense import app
from expense.routes import init_routes
from flask import request, jsonify

init_routes()



if __name__ == "__main__":
    app.run(debug=True)