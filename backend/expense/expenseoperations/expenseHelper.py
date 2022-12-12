from expense.models import Expense

def serializeExpense(expense:Expense):
    expenseDict = {
        'id':expense.id,'userId':expense.userId,
        'title':expense.title,'amount':expense.amount,
        'category':expense.category,
        'incurred_on':expense.incurred_on,'notes':expense.notes,
        'updated_at':expense.updated_at,}
    return expenseDict
