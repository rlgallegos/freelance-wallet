from dotenv import load_dotenv
import os

from flask import Flask, request, make_response, session, jsonify
from flask_restful import Api, Resource
from config import bcrypt, app

# Here import all of the different models you'll need along with the database
from models import db


api = Api(app)
load_dotenv()

# Be sure to actually add your secret key in the .env folder in the server directory
app.secret_key = os.environ.get('FLASK_APP_SECRET_KEY')

if __name__ == '__main__':
    app.run(port=5555, debug=True)