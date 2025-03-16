from astrapy import DataAPIClient
import os
import uuid

# ✅ Load AstraDB Token from Environment Variable
ASTRA_DB_TOKEN = "AstraCS:SfFtPvXoNACyrtfJMGhnuoQR:75cdc4cf7e0d1fd899431d9194bdcf3b002b4c9474e5c74146f988814d4407af"
if not ASTRA_DB_TOKEN:
    raise ValueError("⚠️ Astra DB token not found! Set ASTRA_DB_TOKEN environment variable.")

# ✅ Connect to AstraDB
client = DataAPIClient(ASTRA_DB_TOKEN)
db = client.get_database_by_api_endpoint(
    "https://5e9b6ec4-db60-4766-9c55-93f675da62c3-us-east-2.apps.astra.datastax.com",
    keyspace="nevil"
)

# ✅ Insert a test profile
test_profile = {
    "_id": str(uuid.uuid4()),
    "name": "John Doe",
    "education": "B.Sc. Computer Science",
    "skills": "Python, JavaScript, Data Science",
    "interests": "Machine Learning, Web Development",
    "hobbies": "Reading, Hiking"
}

try:
    db["Profiles"].insert_one(test_profile)  # ✅ Store in AstraDB
    print("✅ Test profile inserted successfully!")
except Exception as e:
    print(f"❌ Error inserting test profile: {e}")
