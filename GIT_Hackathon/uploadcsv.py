import pandas as pd
import os
import django
from django.db import connection

# Load Django settings
os.environ["DJANGO_SETTINGS_MODULE"] = "GIT_Hackathon.settings"  # Update with your project name
django.setup()

def create_table_from_xlsx(file_path, table_name="census_table"):
    df = pd.read_excel(file_path, engine='openpyxl')

    # Generate column definitions dynamically
    columns = ', '.join([f'"{col}" TEXT' for col in df.columns])  # Use TEXT for simplicity

    # SQL to create the table
    create_table_sql = f'CREATE TABLE IF NOT EXISTS {table_name} (id SERIAL PRIMARY KEY, {columns});'

    with connection.cursor() as cursor:
        cursor.execute(create_table_sql)

    # Insert data
    for _, row in df.iterrows():
        values = tuple(row.fillna('').values)  # Fill NaN with empty string
        placeholders = ', '.join(['%s'] * len(values))
        insert_sql = f'INSERT INTO {table_name} ({', '.join([f'"{col}"' for col in df.columns])}) VALUES ({placeholders})'

        with connection.cursor() as cursor:
            cursor.execute(insert_sql, values)

    print(f"Table '{table_name}' created and data inserted successfully.")


# Example usage
if __name__ == '__main__':
    file_path = "Welcome_Home/dataCSVFiles/neighbourhood-profiles-2021-158-model (1).xlsx"  # Replace with your actual file path
    create_table_from_xlsx(file_path)
