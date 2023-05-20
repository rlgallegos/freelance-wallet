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
