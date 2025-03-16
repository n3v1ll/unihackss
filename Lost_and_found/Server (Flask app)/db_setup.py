import os
from astrapy import DataAPIClient

# ✅ Load Astra token securely from environment variable
ASTRA_DB_TOKEN = os.getenv("ASTRA_DB_TOKEN")

if not ASTRA_DB_TOKEN:
    raise ValueError("⚠️ Astra DB token not found! Set ASTRA_DB_TOKEN environment variable.")

# ✅ Initialize AstraPy client with the new DataAPIClient
client = DataAPIClient(ASTRA_DB_TOKEN)

# ✅ Connect to the database using API endpoint & keyspace
db = client.get_database_by_api_endpoint(
    "https://5e9b6ec4-db60-4766-9c55-93f675da62c3-us-east-2.apps.astra.datastax.com",
    keyspace="nevil"
)

# ✅ Define the table name
table_name = "Person"

# ✅ Check if the table (collection) exists before creating it
try:
    existing_tables = db.list_collections()
    if table_name not in existing_tables:
        db.create_collection(table_name)
        print("✅ Table 'Person' created successfully!")
    else:
        print("⚠️ Table 'Person' already exists, skipping creation.")
except Exception as e:
    print(f"⚠️ Error checking/creating table: {e}")

# ✅ Insert a test record using AstraDB's **Document API**
insert_data = {
    "id": "550e8400-e29b-41d4-a716-446655440000",  # Replace with a generated UUID
    "linkedin_url": "https://www.linkedin.com/in/example",
    "photo": "path/to/photo.jpg",
    "profile_data": "Raw scraped data",
    "summary": "AI-generated summary"
}

try:
    db[table_name].insert_one(insert_data)  # ✅ Corrected method
    print("✅ Test record inserted successfully!")
except Exception as e:
    print(f"⚠️ Error inserting test record: {e}")
