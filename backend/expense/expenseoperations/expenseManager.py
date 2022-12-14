from expense import db
import json
import datetime
from flask_jwt_extended import jwt_required,get_jwt_identity
from expense.models import Expense, UsersModel
from flask import jsonify
from expense.expenseoperations.expenseHelper import serializeExpense
from flask_restful import Resource, reqparse


userExpenseParser = reqparse.RequestParser()
userExpenseParser.add_argument("id")
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
        incurred_Date = datetime.datetime.strptime(args['incurred_on'], "%Y-%m-%dT%H:%M:%S.%fZ")
        newExpense = Expense(userId=int(args['userId']),title=args['title'], 
                     amount=float(args['amount']), category=args['category'],
                     incurred_on=incurred_Date, notes=args['notes'])
        db.session.add(newExpense)
        db.session.commit()
        return jsonify({"msg":"record added"})
        

    def put(self):
        args = userExpenseParser.parse_args()
        userExpense = Expense.query.filter_by(id=args["id"]).first()
        userExpense.title = args["title"]
        userExpense.amount = float(args["amount"])
        userExpense.category = args["category"]
        try:
            incurred_Date = datetime.datetime.strptime(args['incurred_on'], '%a, %d %b %Y %H:%M:%S %Z')
        except:
            incurred_Date = datetime.datetime.strptime(args['incurred_on'], "%Y-%m-%dT%H:%M:%S.%fZ")
        userExpense.incurred_on = incurred_Date
        userExpense.notes = args["notes"]
        userExpense.updated_at = datetime.datetime.now()
        db.session.commit()
        return jsonify({"msg":"Record Updated"})

    def delete(self):
        args = userExpenseParser.parse_args()
        userExpense = Expense.query.filter_by(id = args["id"]).first()
        if userExpense:
            db.session.delete(userExpense)
            db.session.commit()
            return jsonify({"msg":"Expenses Record deleted"})
        return jsonify({"error":"Record not found"})

filteredUserExpenseParser = reqparse.RequestParser()
filteredUserExpenseParser.add_argument("expenseId")
filteredUserExpenseParser.add_argument("firstDate")
filteredUserExpenseParser.add_argument("lastDate")


class FilterdUserExpenses(Resource):
    @jwt_required()
    def get(self):
        pass
    
    @jwt_required()
    def post(self):
        currentUserPublicID = get_jwt_identity()
        user = UsersModel.query.filter_by(public_id=currentUserPublicID).first()
        userId = user.id
        args = filteredUserExpenseParser.parse_args()
        fromDate = datetime.datetime.strptime(args["firstDate"], "%Y-%m-%dT%H:%M:%S.%fZ")
        toDate = datetime.datetime.strptime(args["lastDate"], "%Y-%m-%dT%H:%M:%S.%fZ")
        currExpenses = Expense.query.filter_by(userId=userId).filter(Expense.incurred_on >= fromDate).filter(Expense.incurred_on <= toDate).all()
        currExpensesList = []
        if currExpenses:
            for currExpense in currExpenses:
                currExpensesList.append(serializeExpense(currExpense))
        return jsonify(currExpensesList)