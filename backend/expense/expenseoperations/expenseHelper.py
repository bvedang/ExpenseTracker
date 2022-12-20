from expense.models import Expense
from datetime import datetime

expenseCategories = ["Entertainment", "Food & Drink", "Home",
                     "Life", "Transportation", "Uncategorized", "Utilities"]


def serializeExpense(expense: Expense) -> dict:
    expenseDict = {
        'id': expense.id, 'userId': expense.userId,
        'title': expense.title, 'amount': expense.amount,
        'category': expense.category,
        'incurred_on': expense.incurred_on.strftime("%Y/%m/%d"), 'notes': expense.notes,
        'updated_at': expense.updated_at, }
    return expenseDict


def getTotalExpensesBetweenDates(userId: int, firstDay: datetime, lastDay: datetime) -> int:
    """This function take 3 paramter 
    1) currentUserId
    2) fromDate or firstDay
    3) toDate or lastDay

    Calculates the total expenditure between fromDate and toDate """
    expenseSum = 0
    result = Expense.query.filter_by(userId=userId).filter(Expense.incurred_on >= firstDay).filter(
        Expense.incurred_on < lastDay).all()
    for expense in result:
        expenseSum += expense.amount
    return expenseSum
