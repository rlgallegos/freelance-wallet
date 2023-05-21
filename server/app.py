from dotenv import load_dotenv
import os

from flask import Flask, request, make_response, session, jsonify, redirect, url_for
from flask_restful import Api, Resource
from config import bcrypt, app, db

# Here import all of the different models you'll need along with the database
from models import User

api = Api(app)
load_dotenv()

# Be sure to actually add your secret key in the .env folder in the server directory
app.secret_key = os.environ.get('FLASK_APP_SECRET_KEY')


# Signup / Login Routes

class Signup(Resource):
    def post(self):
        data = request.get_json()
        # Verify unique username
        if User.query.filter(User.username == data['username']).first():
            return make_response({'error': 'Username already taken'}, 422)

        new_user = User(
            username = data['username'],
            hashed_password = data['password']
        )
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return make_response({"error": "Failed to Save New User"}, 422)
        return make_response(new_user.to_dict(), 201)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        # Find user and validate them
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        # TODO: Validation Logic
        # TODO: Try/Except Logic
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')


# Main Dashboard Route -> Provides User Data

class Dashboard(Resource):
    def get(self):
        if not session['user_id']:
            return make_response({'error': "Not Logged In"}, 401)

        user = User.query.filter(User.id == session['user_id']).first()
        return make_response(user.to_dict(), 200)

api.add_resource(Dashboard, '/dashboard')

if __name__ == '__main__':
    app.run(port=5555, debug=True)