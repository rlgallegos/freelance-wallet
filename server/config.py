import os
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

db = SQLAlchemy(metadata=metadata)

app = Flask(
    __name__,
    # static_url_path='',
    # static_folder='../client/build',
    # template_folder='../client/build'
)

app.config['SECRET_KEY'] = 'thesecretkey'
# app.config['SECRET_KEY'] = os.environ.get('FLASK_APP_SECRET_KEY')
# CORS(app, allow_headers=["Content-Type", "Authorization", "Cookie"])
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///freelance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True

Session(app)

bcrypt = Bcrypt(app)

migrate = Migrate(app, db)

db.init_app(app)