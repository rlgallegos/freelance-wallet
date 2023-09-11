import os
from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_session import Session

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
try:
    load_dotenv()

    db = SQLAlchemy(metadata=metadata)

    app = Flask(__name__)

    app.secret_key = os.environ.get('FLASK_APP_SECRET_KEY')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///freelance.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Session configuration
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_INTERFACE'] = 'filesystem'
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_SECURE'] = True
    app.config['CORS_HEADERS'] = 'Content-Type'
    Session(app)
    
    # Production CORS
    CORS(app, supports_credentials=True, origin='https://freelance-wallet.vercel.app')
    
    # Development CORS
    # CORS(app, supports_credentials=True, origin='*')

    bcrypt = Bcrypt(app)

    migrate = Migrate(app, db)

    db.init_app(app)

except Exception as e:
    print(f"An error occurred: {e}")