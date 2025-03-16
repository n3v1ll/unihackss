from astrapy import DataAPIClient

# Replace "YOUR_TOKEN" with the token you generate from Astra
client = DataAPIClient("AstraCS:qUKdYdJuQLoiIZOPaisigpqo:0a8e681a4773a5068b185be4565993013069d4ae7c2e8fe30fa44550065b713f")

# Connect to the database using the API endpoint & keyspace
db = client.get_database_by_api_endpoint(
    "https://5e9b6ec4-db60-4766-9c55-93f675da62c3-us-east-2.apps.astra.datastax.com",
    keyspace="nevil"
)

print("Connected to Astra DB successfully!")
