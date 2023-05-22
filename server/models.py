from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import bcrypt, db, app


# The following is just a basic example of how to build out the tables

# class User(db.Model, SerializerMixin):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String)

#     bank_name = db.Column(db.String)
#     account_name = db.Column(db.String)

#     serialize_rules = ('-stuff.user',)

#     stuff = db.relationship('Stuff', back_populates='user')


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    hashed_password = db.Column(db.String)
    initialized = db.Column(db.Boolean, default=False)

    average_weekly_income = db.Column(db.Integer)
    average_monthly_expenses = db.Column(db.Integer)

    income = db.relationship('Income', back_populates='user', uselist=False, cascade="all, delete-orphan")

    serialize_rules = ('-hashed_password', '-income.user', '-income.user_id')

class Income(db.Model, SerializerMixin):
    __tablename__ = 'incomes'

    id = db.Column(db.Integer, primary_key=True)
    week1 = db.Column(db.Integer, default=0)
    week2 = db.Column(db.Integer, default=0)
    week3 = db.Column(db.Integer, default=0)
    week4 = db.Column(db.Integer, default=0)
    total_balance = db.Column(db.Integer, default=0)

    user = db.relationship('User', back_populates='income')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

