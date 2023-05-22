from app import app
from models import db, User, Income

with app.app_context():
    # print('Deleting all records...')
    # User.query.delete()

    # print('Deleting user initialization')
    # user = User.query.filter(User.id == 1).first()
    # user.initialized = False
    # print(user.to_dict())
    # db.session.add(user)

    # user = User.query.filter(User.id == 1).first()
    # income = Income.query.filter(Income.id == 1).first()

    # user = User.query.filter(User.id == 1).first()
    # income = Income.query.filter(Income.id == 1).first()

    # user.income = income
    # db.session.add(user)
    # db.session.add(income)
    # db.session.commit()

    income = Income.query.filter(Income.id == 1).first()

    income.week1 = 785
    income.week2 = 713
    income.week3 = 821
    income.week4 = 932
    income.total_balance = 1032
    db.session.add(income)
    db.session.commit()

    user = User.query.filter(User.id == 1).first()

    user.average_weekly_income = 900
    user.average_monthly_expenses = 1200

    db.session.add(user)
    db.session.commit()