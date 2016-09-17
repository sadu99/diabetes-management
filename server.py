from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy.orm
from cockroachdb.sqlalchemy import run_transaction

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='<%',
        block_end_string='%>',
        variable_start_string='%%',
        variable_end_string='%%',
        comment_start_string='<#',
        comment_end_string='#>',
    ))

app = CustomFlask(__name__)
app.config.from_pyfile('server.cfg')
db = SQLAlchemy(app)
sessionmaker = sqlalchemy.orm.sessionmaker(db.engine)

class Log(db.Model):
    __tablename__ = 'user_logs'
    email = db.Column('email', db.String, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    phone_number = db.Column(db.String)
    mass = db.Column(db.Float)
    height = db.Column(db.Float)
    date_of_birth = db.Column(db.DateTime)
    blood_pressure = db.Column(db.Float)
    glucose = db.Column(db.Float)
    insulin = db.Column(db.Float)
    timestamp = db.Column(db.DateTime)

    def __init__(self, email, first_name, last_name, phone_number, mass, height, date_of_birth, blood_pressure, glucose, insulin, timestamp):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number
        self.mass = mass
        self.height = height
        self.date_of_birth = date_of_birth
        self.blood_pressure = blood_pressure
        self.glucose = glucose
        self.insulin = insulin
        self.timestamp = timestamp

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/history/<userid>')
def api_history(userid):
    def callback(session):
        return session.query(Log).order_by(Log.timestamp.desc()).all()
    return run_transaction(sessionmaker, callback)

@app.route('/go', methods = ['POST'])
def api_go():
    # assume json data is sanity-checked and clean
    return "Data: " + json.dumps(request.json)


if __name__ == '__main__':
    app.run(debug=True)