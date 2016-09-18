# Import the driver.
import psycopg2
import time 

# Connect to the "bank" database.
conn = psycopg2.connect(database='user_logs', user='root', host='45.79.179.152', port=26257)

# Make each statement commit immediately.
conn.set_session(autocommit=True)

# Open a cursor to perform database operations.
cur = conn.cursor()

# Insert two rows into the "user_logs" table.
sqlcmd = ("INSERT INTO logs (email, first_name, last_name, phone_number, mass, height, date_of_birth, blood_pressure, glucose, insulin, timestamp) VALUES ('shashmani@uwaterloo.ca', 'Sadruddin', 'Hashmani', '647-871-7540', 60, 166, '1994-11-22', 190, 90, 400, '2016-03-19')")
print sqlcmd
cur.execute(sqlcmd)

# Print out the data.
cur.execute("SELECT * FROM logs")
rows = cur.fetchall()
print('Initial data:')
for row in rows:
    print([str(cell) for cell in row])

# Close the database connection.
cur.close()
conn.close()