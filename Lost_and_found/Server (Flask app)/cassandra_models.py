from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

class Person(Model):
    __keyspace__ = 'nevil'
    id = columns.UUID(primary_key=True)
    linkedin_url = columns.Text(required=True)
    photo = columns.Text()  # Store the path or URL to the photo
    profile_data = columns.Text()
    summary = columns.Text()