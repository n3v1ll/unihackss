from flask import Flask, request, jsonify, session
from flask_cors import CORS
from astrapy import DataAPIClient
import os
import uuid
import bcrypt

app = Flask(__name__)
app.secret_key = "AUx2jPXlOlqHLrEfdgvy2DiGJ_km-Btqo7Uks8B84X50yLrCLkpqa3FwjRZ3e.W5QC,h,zPi9FO3WZ5+BxR8FbjxcOk6g+t22rrA2speroCKpLfvqzfkub,XQub6gptT"

# ✅ Enable CORS for frontend with credentials
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# ✅ Ensure Astra DB Token is Set
ASTRA_DB_TOKEN = "AstraCS:SfFtPvXoNACyrtfJMGhnuoQR:75cdc4cf7e0d1fd899431d9194bdcf3b002b4c9474e5c74146f988814d4407af"
if not ASTRA_DB_TOKEN:
    raise ValueError("⚠️ Astra DB token not found! Set ASTRA_DB_TOKEN environment variable.")

# ✅ Connect to AstraDB
client = DataAPIClient(ASTRA_DB_TOKEN)
db = client.get_database_by_api_endpoint(
    "https://5e9b6ec4-db60-4766-9c55-93f675da62c3-us-east-2.apps.astra.datastax.com",
    keyspace="nevil"
)

# ✅ Ensure Collections Exist (Fix for Already Exists Error)
try:
    existing_collections = db.list_collections()
    
    if "Users" not in existing_collections:
        db.create_collection("Users")

    if "Profiles" not in existing_collections:
        db.create_collection("Profiles")

except Exception as e:
    print(f"⚠️ Warning: Failed to check/create collections - {e}")

### 🚀 **1. User Registration API**
@app.route('/api/registerUser', methods=['POST'])
def register_user():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # ✅ Check if user already exists
        existing_user = db["Users"].find_one({"email": email})
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # ✅ Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # ✅ Store user in DB
        user = {
            "_id": str(uuid.uuid4()),
            "email": email,
            "password": hashed_password.decode('utf-8')
        }
        db["Users"].insert_one(user)
        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": "Failed to register user", "details": str(e)}), 500


### 🚀 **2. User Login API**
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # ✅ Find user in DB
        user = db["Users"].find_one({"email": email})
        if not user:
            return jsonify({"error": "User not found"}), 401

        # ✅ Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return jsonify({"error": "Incorrect password"}), 401

        # ✅ Set session
        session["user_id"] = user["_id"]
        session["email"] = user["email"]
        return jsonify({"message": "Login successful", "email": user["email"]}), 200

    except Exception as e:
        return jsonify({"error": "Failed to login", "details": str(e)}), 500


### 🚀 **3. Check if User is Logged In**
@app.route('/api/checkAuth', methods=['GET'])
def check_auth():
    if "user_id" in session:
        return jsonify({"logged_in": True, "email": session["email"]}), 200
    return jsonify({"logged_in": False}), 401


### 🚀 **4. User Logout API**
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully!"}), 200


### 🚀 **5. Add Profile API (Only for Logged-in Users)**
@app.route('/api/add-profile', methods=['POST'])
def add_profile():
    try:
        if "user_id" not in session:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.json
        profile = {
            "_id": str(uuid.uuid4()),
            "user_id": session["user_id"],
            "name": data.get("name"),
            "education": data.get("education"),
            "skills": data.get("skills"),
            "interests": data.get("interests"),
            "hobbies": data.get("hobbies")
        }
        db["Profiles"].insert_one(profile)
        return jsonify({"message": "Profile added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": "Failed to insert data", "details": str(e)}), 500


### 🚀 **6. Fetch Logged-in User's Profile**
@app.route('/api/profile', methods=['GET'])
def get_profile():
    try:
        if "user_id" not in session:
            return jsonify({"error": "Unauthorized"}), 401

        profile = db["Profiles"].find_one({"user_id": session["user_id"]})
        if not profile:
            return jsonify({"message": "No profile found"}), 404

        return jsonify(profile), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch profile", "details": str(e)}), 500


### 🚀 **7. Fetch All Profiles (For Admins)**
@app.route('/api/profiles', methods=['GET'])
def get_profiles():
    try:
        profiles = db["Profiles"].find({})
        profiles_list = [dict(profile) for profile in profiles]

        if not profiles_list:
            return jsonify({"message": "No profiles found"}), 404

        return jsonify(profiles_list), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch profiles", "details": str(e)}), 500


### ✅ **Run Flask App**
if __name__ == '__main__':
    app.run(debug=True, port=5001)
