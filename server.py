from flask import Flask, render_template, request
import psycopg2
import simplejson

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

def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/history/<userid>')
def api_history(userid):
    conn = psycopg2.connect(database='user_logs', user='root', host='45.79.179.152', port=26257)
    conn.set_session(autocommit=True)
    cur = conn.cursor()

    cur.execute("SELECT email, first_name, last_name, phone_number, mass, height, date_of_birth, blood_pressure, glucose, insulin, timestamp FROM history WHERE email=%s ORDER BY timestamp asc", (userid,))
    rows = cur.fetchall()

    columns = ('email', 'first_name', 'last_name', 'phone_number', 'mass', 'height', 'date_of_birth', 'blood_pressure', 'glucose', 'insulin', 'timestamp')

    output = []
    for row in rows:
        output.append(dict(zip(columns, row)))

    # Close the database connection.
    cur.close()
    conn.close()

    return simplejson.dumps(output, default=date_handler)

@app.route('/go', methods = ['POST'])
def api_go():
    conn = psycopg2.connect(database='user_logs', user='root', host='45.79.179.152', port=26257)
    conn.set_session(autocommit=True)
    cur = conn.cursor()

    data = request.json
    email = data["email"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    phone_number = data["phone_number"]
    mass = float(data["mass"])
    height = float(data["height"])
    date_of_birth = data["date_of_birth"]
    blood_pressure = float(data["blood_pressure"])
    glucose = float(data["glucose"])
    insulin = float(data["insulin"])
    timestamp = data["timestamp"]

    cur.execute("INSERT INTO history (email, first_name, last_name, phone_number, mass, height, date_of_birth, blood_pressure, glucose, insulin, timestamp) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
     (email, first_name, last_name, phone_number, mass, height, date_of_birth, blood_pressure, glucose, insulin, timestamp,))

    # Close the database connection.
    cur.close()
    conn.close()

    # TODO get api result here

    return "Result: "

if __name__ == '__main__':
    app.run(debug=True)