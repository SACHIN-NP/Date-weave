from flask import Blueprint, request, jsonify
from .services import sign_up_user, sign_in_user, get_user_profile

main = Blueprint('main', __name__)

@main.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    address = data.get("address")
    # In the frontend, the 'username' field can double as 'full_name' for now
    full_name = data.get("username") 

    if not all([email, password, username, address]):
        return jsonify({"error": "Email, password, username, and address are required"}), 400

    # Pass the full_name to the service function
    result = sign_up_user(email, password, username, address, full_name)

    if hasattr(result, 'user') and result.user:
        if result.session:
             return jsonify(result.user.dict()), 201
        return jsonify({"message": "Signup successful, please check your email for confirmation."}), 200
    elif isinstance(result, dict) and "error" in result:
         return jsonify({"error": result["error"]}), 400
    else:
        return jsonify({"error": "An unexpected error occurred during signup."}), 500


@main.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    result = sign_in_user(email, password)
    
    if not hasattr(result, 'session') or not result.session:
        return jsonify({"error": "Login failed. Please check your credentials or confirm your email."}), 401

    return jsonify({
        "access_token": result.session.access_token,
        "user": result.user.dict()
    })

@main.route("/profile")
def profile():
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"error": "Authorization header missing or invalid"}), 401

    jwt_token = auth_header.split(" ")[1]
    user_data = get_user_profile(jwt_token)

    if "error" in user_data:
        return jsonify({"error": user_data["error"]}), 401

    return jsonify(user_data)