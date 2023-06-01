from dotenv import load_dotenv
import os
from config import bcrypt, app, db
from flask import Flask, request, make_response, jsonify, redirect, url_for, render_template, send_from_directory, session
from flask_restful import Api, Resource
from flask_cors import cross_origin

# Here import all of the different models you'll need along with the database
from models import User, Income

api = Api(app)
# load_dotenv()

# Be sure to actually add your secret key in the .env folder in the server directory
# app.secret_key = os.environ.get('FLASK_APP_SECRET_KEY')


# FE Routes to render index.html before FE routing
# @app.route('/')
# @app.route('/welcome')
# @app.route('/dashboard')
# @app.route('/dashboard/')
# @app.route('/dashboard/setup')
# @app.route('/dashboard/profile')
# @app.route('/<int:id>')
# def index(id=0):
#     return render_template("index.html")

# app.secret_key = os.environ.get('FLASK_APP_SECRET_KEY')
# app.secret_key = 'thesecretkey'

# Signup / Login Routes

class Signup(Resource):
    @cross_origin(supports_credentials=True)
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
            hashed_password = data['password'],
            income = new_income
        )
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return make_response({"error": "Failed to Save New User"}, 422)
        session['user_id'] = new_user.id
        return make_response(new_user.to_dict(), 201)

api.add_resource(Signup, '/signup')

class Login(Resource):
    # @cross_origin(supports_credentials=True)
    def post(self):
        # Find user and validate them
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        if not user:
            return make_response({'error': 'Please enter valid credentials'}, 422)
        # TODO: Validation Logic
        # TODO: Try/Except Logic
        print(user.id)
        session['user_id'] = user.id
        # print("The Session variable has this: " + str(session['user_id']))
        print(session)
        print(dict(session))
        return make_response(user.to_dict(), 200)

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
        try:
            print(session['user_id'])
        except:
            print(session)
            print(dict(session))
        if 'user_id' not in session or not session['user_id']:
            print('not logged in')
            return make_response({'error': "Not Logged In"}, 401)

        user = User.query.filter(User.id == session['user_id']).first()
        print(user)

        response = make_response(user.to_dict(), 200)
        response.headers.add('Access-Control-Allow-Origin', 'https://freelance-wallet.vercel.app')
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




# Show server route

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def serve(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5555, debug=True)