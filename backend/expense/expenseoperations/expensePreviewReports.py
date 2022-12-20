from expense import db
import json
import datetime
import calendar
from sqlalchemy import func
from flask_jwt_extended import jwt_required, get_jwt_identity
from expense.models import Expense, UsersModel
from flask import jsonify
from expense.expenseoperations.expenseHelper import serializeExpense, getTotalExpensesBetweenDates
from flask_restful import Resource, reqparse

# this class return 3 values (current month spending, todays spending, yesterdays spendings)


class MonthPreview(Resource):
    @jwt_required()
    def get(self):
        currentUserId = get_jwt_identity()
        current_user = UsersModel.query.filter_by(
            public_id=currentUserId).first()
        today = datetime.datetime.today().date()
        tommorow = today + datetime.timedelta(days=1)
        yesterday = today - datetime.timedelta(days=1)
        totalDays = calendar.monthrange(today.year, today.month)[1]
        firstDay = today.replace(day=1)
        lastDay = today.replace(day=totalDays)
        monthlyExpenses = getTotalExpensesBetweenDates(
            current_user.id, firstDay=firstDay, lastDay=lastDay)
        currentDayExpense = getTotalExpensesBetweenDates(
            current_user.id, today, tommorow)
        yesterDayExpense = getTotalExpensesBetweenDates(
            current_user.id, yesterday, today)
        return jsonify({"monthlyExpenses": monthlyExpenses, "currentDayExpense": currentDayExpense, "yesterDayExpense": yesterDayExpense})


class MonthwiseExpense(Resource):
    @jwt_required()
    def get(self):
        currentUserId = get_jwt_identity()
        current_user = UsersModel.query.filter_by(
            public_id=currentUserId).first()
        monthlyexpense = db.session.query(func.strftime('%Y-%m', Expense.incurred_on), func.sum(Expense.amount)).filter(
            Expense.userId == current_user.id).group_by(func.strftime('%Y-%m', Expense.incurred_on)).all()
        for t in monthlyexpense:
            print(t)


class CatergoryWiseExpense(Resource):
    @jwt_required()
    def get(self):
        currentUserId = get_jwt_identity()
        current_user = UsersModel.query.filter_by(
            public_id=currentUserId).first()
        currentDate = datetime.datetime.today().date()
        noofDaysInMonth = calendar.monthrange(
            currentDate.year, currentDate.month)[1]
        startDate = currentDate.replace(day=1)
        print(startDate)
        lastDate = currentDate.replace(day=noofDaysInMonth)
        print(lastDate)
        categoryExpense = db.session.query(Expense.category, func.sum(Expense.amount)).filter(Expense.userId == current_user.id).filter(
            Expense.incurred_on >= startDate).filter(Expense.incurred_on <= lastDate).group_by(Expense.category).all()
        res = []
        for tuple in categoryExpense:
            tempdict = {}
            tempdict[tuple[0]] = tuple[1]
            res.append(tempdict)
        return jsonify(res)


class CategoryAvg(Resource):
    @jwt_required()
    def get(self):
        currentUserId = get_jwt_identity()
        current_user = UsersModel.query.filter_by(
            public_id=currentUserId).first()
        currentDate = datetime.datetime.today().date()
        lastMonth = 0
        lastYear = currentDate.year
        if currentDate.month == 1:
            lastMonth = currentDate.month-1 if currentDate.month > 1 else 12
            lastYear = currentDate.year-1
        else:
            lastMonth = currentDate.month-1 if currentDate.month > 1 else 12
        noofDaysInMonth = calendar.monthrange(lastYear, lastMonth)[1]
        lastDate = datetime.datetime(
            lastYear, lastMonth, noofDaysInMonth).date()
        avgbyCategories = db.session.query(Expense.category, func.strftime('%Y-%m', Expense.incurred_on),func.sum(Expense.amount)).filter(Expense.userId == current_user.id).filter(Expense.incurred_on <=
                                                                                                                      lastDate).group_by(Expense.category, func.strftime('%Y-%m', Expense.incurred_on)).all()

        print(avgbyCategories)
