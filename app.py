from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection config
db_config = {
    'user': 'SuhotraNeel,
    'password': 'Project@2003TRAPS',
    'host': 'groovy-sentry-429411-b8:us-central1:pgnewsletter',
    'database': 'pgnewsletter'
}

# Initialize MySQL connection
db = mysql.connector.connect(**db_config)

# Function to execute database queries
def execute_query(query, params=()):
    cursor = db.cursor()
    cursor.execute(query, params)
    db.commit()
    cursor.close()

# Create a table if not exists
def create_table():
    create_table_query = """
    CREATE TABLE IF NOT EXISTS your_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    """
    execute_query(create_table_query)

# Ensure table exists when app starts
create_table()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit-form', methods=['POST'])
def submit_form():
    email = request.form.get('email')

    # Insert data into database
    query = "INSERT INTO your_table (email) VALUES (%s)"
    params = (email,)
    
    try:
        execute_query(query, params)
        return jsonify({'message': 'Data saved successfully'})
    except Exception as e:
        print(e)
        return jsonify({'error': 'Error saving to database'}), 500

if __name__ == '__main__':
    app.run(debug=True)

app.run(debug=True)