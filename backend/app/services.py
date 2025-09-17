import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = "https://cbogitiyojsskwyzgvoj.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib2dpdGl5b2pzc2t3eXpndm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDQxNDIsImV4cCI6MjA3MTQyMDE0Mn0.UfwWzmXN9kYMlpCR8Gh5mAk3O_cwUaOr_LXAZVb3w8s"
supabase: Client = create_client(url, key)

def sign_up_user(email, password, username, address, full_name):
    """Signs up a new user in Supabase Auth."""
    try:
        # We no longer insert into profiles here. The database trigger will do it.
        # We pass the username and full_name in the 'data' option so the trigger can access it.
        res = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "username": username,
                    "full_name": full_name,
                    # Note: The address is not in the default user metadata,
                    # it will be updated by the user later in their profile.
                }
            }
        })
        return res
    except Exception as e:
        return {"error": str(e)}

def sign_in_user(email, password):
    """Signs in an existing user."""
    try:
        res = supabase.auth.sign_in_with_password({"email": email, "password": password})
        return res
    except Exception as e:
        return {"error": str(e)}

def get_user_profile(jwt):
    """Gets user profile from a JWT."""
    try:
        auth_user_response = supabase.auth.get_user(jwt)
        if not auth_user_response.user:
            return {"error": "User not found or token invalid"}
        
        auth_user = auth_user_response.user

        profile_response = supabase.table("profiles").select("*").eq("id", auth_user.id).single().execute()
        
        full_user_profile = {
            "id": auth_user.id,
            "email": auth_user.email,
            "created_at": auth_user.created_at,
            **profile_response.data
        }

        return {"user": full_user_profile}
    except Exception as e:
        return {"error": str(e)}