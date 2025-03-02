from openai import OpenAI
from django.db import connection
from .models import nativeLanguage, ageDensity, visibleMinority, civics_equity, environment
import os
from dotenv import load_dotenv

# Function to execute raw SQL query for census_data
def fetch_census_data():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM census_table")
        columns = [col[0] for col in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return data

# Function to format dataset into a readable string
def format_table_data(dataset):
    table_data = [
        "• " + ", ".join(f"{key}: {value}" for key, value in entry.items())
        for entry in dataset
    ]
    return "\n".join(table_data) if dataset else "No data found"

def compute_neighbourhoods(user_prompt):
    load_dotenv()
    client = OpenAI(api_key=os.environ.get("OPEN_API_KEY"))

    print(user_prompt)

    # Fetch data using raw SQL for census_data
    #census_data = fetch_census_data()

    # Fetch data using Django ORM for other tables
    dataLanguage = nativeLanguage.objects.all().values()
    dataAge = ageDensity.objects.all().values()
    dataMinority = visibleMinority.objects.all().values()
    civics = civics_equity.objects.all().values()
    enviroment = environment.objects.all().values()

    # Format data for display
    #table_string_census = format_table_data(census_data)
    table_string_language = format_table_data(dataLanguage)
    table_string_age = format_table_data(dataAge)
    table_string_minority = format_table_data(dataMinority)
    table_string_civics = format_table_data(civics)
    table_string_enviroment = format_table_data(enviroment)

    # Generate response using ChatGPT
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that does not show any work and only provides results and a neighbourhood name by itself"},
            {"role": "user", "content": f"""
Here are some tables of information about the population in Toronto:

enviroment data:
{table_string_enviroment}
---
Civics and equity data:
{table_string_civics}
---
🗣 Native Language Data:
{table_string_language}
---
👵 Age Demographics:
{table_string_age}
---
🌎 Visible Minority Groups:
{table_string_minority}

Based on this data, only return the name of the top 3 neighborhoods within the tables that fit the following user with a comma between them: {user_prompt}?
"""}
        ],
    )

    # Print the response
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content

def compute_description(user_prompt, neighbourhoods):
    load_dotenv()
    client = OpenAI(api_key=os.environ.get("OPEN_API_KEY"))

    print(user_prompt)

    # Generate response using ChatGPT
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that provides informative insights"},
            {"role": "user", "content": f""" Give small 40 word descriptions for each of these neighbourhoods: {neighbourhoods} seperated by the symbol "^ " and base the descriptions on this persons needs and interests: {user_prompt}?"""}
        ],
    )

    # Print the response
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content
