from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql

conn = pymysql.connect(
    host = 'localhost',
    database = 'rentable',
    user = 'root',
    password = 'password@123',
    charset = 'utf8mb4',
    cursorclass = pymysql.cursors.DictCursor
)

app = Flask(__name__)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.json['email']
        user_type = request.json['user_type']
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        password = request.json['password']

        # Generate password hash
        password = generate_password_hash(password, method='sha256')

        # Generate unique username
        username = first_name.lower() + last_name.lower()
        cur = conn.cursor()
        cur.execute("SELECT count(*) as user_count FROM login")
        result = cur.fetchone()
        user_count = result.get('user_count')
        user_count += 1
        username += str(user_count)  
     
        # Insert into login table
        cur = conn.cursor()
        query_insert_login = """INSERT INTO 
        login(email, password) 
        VALUES(%s, %s)"""
        cur.execute(query_insert_login, (email, password))
        conn.commit()
        
        # Insert into user table
        cur = conn.cursor()
        query_insert_user = """INSERT INTO 
        user(username, user_type, first_name, last_name, email) 
        VALUES(%s, %s, %s, %s, %s)"""
        cur.execute(query_insert_user, (username, user_type, first_name, last_name, email))
        conn.commit()
        return jsonify({'msg': 'user registered'}), 201
    else:
        return jsonify(({'msg': 'HTTP method must be POST'})), 405

@app.route('/sign_in', methods=['GET', 'POST'])
def sign_in():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')
        login_type = request.json.get('login_type')
        token = request.json.get('token')

        # Search for user
        cur = conn.cursor()
        query_find_user = """SELECT * FROM login WHERE email = %s"""
        if cur.execute(query_find_user, email):
            result = cur.fetchone()
            fetched_password = result.get('password')
        else:
            return jsonify({'msg': 'User not found.'}), 404

        # Manual login
        if login_type == 'manual':
            if check_password_hash(fetched_password, password):
                return jsonify({'msg': 'Login success'}), 202
            else:
                return jsonify({'msg': 'Login failed'}), 401

        # Google OAuth login
        
        return jsonify({'msg': 'Unsupported login type'}), 400






if __name__ == '__main__':
    app.run(debug=True)