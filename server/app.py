from dotenv import load_dotenv
import os
from config import bcrypt, app, db
from flask import Flask, request, make_response, jsonify, redirect, url_for, render_template, send_from_directory, session
from flask_restful import Api, Resource
from flask_cors import cross_origin

from models import User, Income

api = Api(app)

# Signup / Login Routes

class Signup(Resource):
    def post(self):
        data = request.get_json()
        # Verify unique username
        if User.query.filter(User.username == data['username']).first():
            return make_response({'error': 'Username already taken'}, 422)

        # Create new User instance and set to new Income instance
        new_income = Income()
        try:
            db.session.add(new_income)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to create blank income instance'}, 422)

        new_user = User(
            username = data['username'],
            password_hash = data['password'],
            income = new_income
        )
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return make_response({"error": "Failed to Save New User"}, 422)
        session['user_id'] = new_user.id
        response = make_response(new_user.to_dict(), 201)
        return response

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        print('entering post request')
        # Find user and validate them
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        if not user:
            print('failed to find user')
            return make_response({'error': 'Please enter valid credentials'}, 422)
        if not user.authenticate(data['password']):
            print('failed to authenticate user')
            return make_response({'error': 'Unauthorized'}, 401)
        try:
            session['user_id'] = user.id
            print('successfully set session variable', session['user_id'])
        except Exception as e:
            print('failed to set session variable:', str(e))
            return make_response({'error': 'Failed to login'}, 422)
        response = make_response(user.to_dict(), 200)
        print('session variable inside of the POST login', dict(session))
        return response

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

# Main Dashboard Route -> Provides User Data

class Dashboard(Resource):
    @cross_origin(supports_credentials=True)
    def get(self):
        print(dict(session))
        if 'user_id' not in session or not session['user_id']:
            return make_response({'error': "Not Logged In"}, 401)

        user = User.query.filter(User.id == session['user_id']).first()
        # print(user)

        response = make_response(user.to_dict(), 200)
        
        return response

api.add_resource(Dashboard, '/serve-dashboard')

class UserById(Resource):
    def patch(self, id):
        data = request.get_json()

        user = User.query.filter(User.id == id).first()
        for attr in data:
            setattr(user, attr, data[attr])
        user.initialized = True
        try:
            db.session.add(user)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to update resource'}, 422)
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        try:
            session['user_id'] = None
            db.session.delete(user)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to delete user'}, 422)
        return make_response({}, 401)

api.add_resource(UserById, '/users/<int:id>')

class IncomeById(Resource):
    def patch(self, id):
        data = request.get_json()
        print(data)
        user = User.query.filter(User.id == session['user_id']).first()
        income = Income.query.filter(Income.id == id).first()

        income_to_add = int(data['income'])
        print(income_to_add)

        if data['week'] == 1:
            income.week1 += income_to_add
        elif data['week'] == 2:
            income.week2 += income_to_add
        elif data['week'] == 3:
            income.week3 += income_to_add
        else:
            income.week4 += income_to_add

        try:
            db.session.add(income)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to update Income'}, 422)
        return make_response(user.to_dict(), 200)

api.add_resource(IncomeById, '/incomes/<int:id>')





if __name__ == '__main__':
    app.run(port=5555, debug=True)