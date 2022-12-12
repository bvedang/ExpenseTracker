from expense import db
import json
from flask_jwt_extended import jwt_required,get_jwt_identity
from expense.models import Expense, UsersModel
from flask import jsonify
from expense.expenseoperations.expenseHelper import serializeExpense
from flask_restful import Resource, reqparse


userExpenseParser = reqparse.RequestParser()
userExpenseParser.add_argument("userId")
userExpenseParser.add_argument("title")
userExpenseParser.add_argument("category")
userExpenseParser.add_argument("amount")
userExpenseParser.add_argument("incurred_on")
userExpenseParser.add_argument("notes")

class UserExpense(Resource):
    @jwt_required()
    def get(self):
        currentUserPublicID = get_jwt_identity()
        user = UsersModel.query.filter_by(public_id=currentUserPublicID).first()
        userExpenses = Expense.filter_by(userId=user.id).all()
        expenseses = []
        if userExpenses:
            for userExpense in userExpenses:
                expenseses.append(serializeExpense(userExpense))
        return jsonify({"expenseList":expenseses})

    @ jwt_required()
    def post(self):
        args = userExpenseParser.parse_args()
        currentUserPublicID = get_jwt_identity()
        user = UsersModel.query.filter_by(public_id=currentUserPublicID).first()
        print(args)
        return jsonify({"msg":"record added"})
        

    def put(self):
        pass

    def delete(self):
        pass