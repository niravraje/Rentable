from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS
import pymysql

# conn = pymysql.connect(
#     host='localhost',
#     database='rentable',
#     user='root',
#     password='password@123',
#     charset='utf8mb4',
#     cursorclass=pymysql.cursors.DictCursor
# )

app = Flask(__name__)
CORS(app)

# --- JWT Initialization ---
app.config["JWT_SECRET_KEY"] = "rentable"
jwt = JWTManager(app)


@app.route('/', methods=['GET', 'POST'])
def serve():
    return "Rentable API Server"

# def get_unique_id(table_name):
#     cur = conn.cursor()
#     query = """SELECT count(*) AS row_count FROM %s"""
#     if cur.execute(query, table_name):
#         result = cur.fetchone()
#         row_count = result.get('row_count')
#         row_count += 1
#         return row_count
#     else:
#         return 1


# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if request.method == 'POST':
#         email = request.json.get('email')
#         user_type = request.json.get('user_type')
#         login_type = request.json.get('login_type')
#         first_name = request.json.get('first_name')
#         last_name = request.json.get('last_name')
#         password = request.json['password']

#         # Generate password hash
#         password = generate_password_hash(password, method='sha256')

#         # Generate unique username
#         username = first_name.lower() + last_name.lower()
#         cur = conn.cursor()
#         cur.execute("SELECT count(*) AS user_count FROM login")
#         result = cur.fetchone()
#         user_count = result.get('user_count')
#         user_count += 1
#         username += str(user_count)

#         # Insert into login table
#         cur = conn.cursor()
#         query_insert_login = """INSERT INTO
#         login(email, password, login_type, user_type)
#         VALUES(%s, %s, %s, %s)"""
#         cur.execute(query_insert_login,
#                     (email, password, login_type, user_type))

#         # query_insert_login = "INSERT INTO login(email, password, login_type, user_type) VALUES({},{},{},{})".format(
#         #     email, password, login_type, user_type)
#         # cur.execute(query_insert_login)
#         conn.commit()

#         # Insert into user table
#         cur = conn.cursor()
#         query_insert_user = """INSERT INTO
#         user(username, user_type, first_name, last_name, email)
#         VALUES(%s, %s, %s, %s, %s)"""
#         cur.execute(query_insert_user, (username, user_type,
#                     first_name, last_name, email))
#         conn.commit()

#         access_token = create_access_token(identity=email)

#         return jsonify(access_token=access_token), 201
#     else:
#         return jsonify(({'msg': 'HTTP method must be POST'})), 405


# @app.route('/sign_in', methods=['GET', 'POST'])
# def sign_in():
#     if request.method == 'POST':
#         email = request.json.get('email')
#         password = request.json.get('password')
#         login_type = request.json.get('login_type')
#         user_type = request.json.get('user_type')
#         token = request.json.get('token')

#         # Search for user
#         cur = conn.cursor()
#         query_find_user = """SELECT * FROM login WHERE email = %s"""
#         if cur.execute(query_find_user, email):
#             result = cur.fetchone()
#             fetched_password = result.get('password')
#             fetched_user_type = result.get('user_type')
#         else:
#             return jsonify({'msg': 'User not found.'}), 404

#         # Manual login
#         if login_type == 'manual':
#             if check_password_hash(fetched_password, password) and user_type == fetched_user_type:
#                 access_token = create_access_token(identity=email)
#                 return jsonify(access_token=access_token), 202
#             else:
#                 return jsonify({'msg': 'Login failed'}), 401

#         # Google OAuth login

#         return jsonify({'msg': 'Unsupported login type'}), 400


@app.route('/get_products', methods=['GET', 'POST'])
def get_products():
    if request.method == 'GET':
        return jsonify({'msg': 'products api'})
#         cur = conn.cursor()

#         query_get_all_products = """SELECT * FROM product"""
#         if cur.execute(query_get_all_products):
#             result = cur.fetchall()
#             print('result: ', result)
#             return jsonify(result)
#         else:
#             return jsonify({'msg': 'No products found in the database.'}), 404


# @app.route('/add_new_listing', methods=['GET', 'POST'])
# def add_new_listing():
#     if request.method == 'POST':
#         category = request.json.get('category')
#         title = request.json.get('title')
#         rent_price = request.json.get('rent_price')
#         rent_frequency = request.json.get('rent_frequency')
#         description = request.json.get('description')
#         owner_username = request.json.get('owner_username')
#         approval_status = 0

#         # new_product_id = get_unique_id('product')
#         cur = conn.cursor()
#         query = """SELECT count(*) AS row_count FROM product"""
#         new_product_id = 0
#         if cur.execute(query):
#             result = cur.fetchone()
#             row_count = result.get('row_count')
#             new_product_id = row_count + 1

#         query_insert_listing = """INSERT INTO product(id, approval_status, category, title, rent_price, rent_frequency, description, owner_username) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"""

#         cur = conn.cursor()
#         cur.execute(query_insert_listing, (new_product_id, approval_status, category, title,
#                     rent_price, rent_frequency, description, owner_username))
#         conn.commit()
#         return jsonify({'msg': 'Listing added successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True)
