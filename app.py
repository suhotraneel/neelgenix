from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from Vercel

# Database connection details
db_user = 'SuhotraNeel'
db_password = 'Project@2003TRAPS'
db_name = 'pgnewsletter'
db_connection_name = 'groovy-sentry-429411-b8:us-central1:pgnewsletter'

# Create a connection to the Cloud SQL database
def connect_to_database():
    return pymysql.connect(
        user=db_user,
        password=db_password,
        database=db_name,
        unix_socket='/cloudsql/{}'.format(db_connection_name)
    )

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data['name']
    email = data['email']
    
    # Connect to the database
    connection = connect_to_database()
    
    try:
        with connection.cursor() as cursor:
            # Insert data into the table
            sql = "INSERT INTO your_table_name (name, email) VALUES (%s, %s)"
            cursor.execute(sql, (name, email))
            connection.commit()
        response = {'message': 'Data submitted successfully!'}
    except Exception as e:
        response = {'message': str(e)}
    finally:
        connection.close()
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
