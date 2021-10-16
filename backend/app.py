from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager
import pymysql

conn = pymysql.connect(
    host='localhost',
    database='rentable',
    user='root',
    password='password@123',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

app = Flask(__name__)

# --- JWT Initialization ---
app.config["JWT_SECRET_KEY"] = "rentable"
jwt = JWTManager(app)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.json.get('email')
        user_type = request.json.get('user_type')
        login_type = request.json.get('login_type')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        password = request.json['password']

        # Generate password hash
        password = generate_password_hash(password, method='sha256')

        # Generate unique username
        username = first_name.lower() + last_name.lower()
        cur = conn.cursor()
        cur.execute("SELECT count(*) AS user_count FROM login")
        result = cur.fetchone()
        user_count = result.get('user_count')
        user_count += 1
        username += str(user_count)

        # Insert into login table
        cur = conn.cursor()
        query_insert_login = """INSERT INTO 
        login(email, password, login_type, user_type) 
        VALUES(%s, %s, %s, %s)"""
        cur.execute(query_insert_login,
                    (email, password, login_type, user_type))
        conn.commit()

        # Insert into user table
        cur = conn.cursor()
        query_insert_user = """INSERT INTO 
        user(username, user_type, first_name, last_name, email) 
        VALUES(%s, %s, %s, %s, %s)"""
        cur.execute(query_insert_user, (username, user_type,
                    first_name, last_name, email))
        conn.commit()

        access_token = create_access_token(identity=email)

        return jsonify(access_token=access_token), 201
    else:
        return jsonify(({'msg': 'HTTP method must be POST'})), 405


@app.route('/sign_in', methods=['GET', 'POST'])
def sign_in():
    if request.method == 'POST':
        email = request.json.get('email')
        password = request.json.get('password')
        login_type = request.json.get('login_type')
        user_type = request.json.get('user_type')
        token = request.json.get('token')

        # Search for user
        cur = conn.cursor()
        query_find_user = """SELECT * FROM login WHERE email = %s"""
        if cur.execute(query_find_user, email):
            result = cur.fetchone()
            fetched_password = result.get('password')
            fetched_user_type = result.get('user_type')
        else:
            return jsonify({'msg': 'User not found.'}), 404

        # Manual login
        if login_type == 'manual':
            if check_password_hash(fetched_password, password) and user_type == fetched_user_type:
                access_token = create_access_token(identity=email)
                return jsonify(access_token=access_token), 202
            else:
                return jsonify({'msg': 'Login failed'}), 401

        # Google OAuth login

        return jsonify({'msg': 'Unsupported login type'}), 400


if __name__ == '__main__':
    app.run(debug=True)
