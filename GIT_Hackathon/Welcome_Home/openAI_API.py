from openai import OpenAI
from .models import *
import os
from dotenv import load_dotenv


# Function to format queryset data into a readable string
def format_table_data(queryset):
    table_data = [
        "• " + ", ".join(f"{key}: {value}" for key, value in entry.items())
        for entry in queryset
    ]
    return "\n".join(table_data) if table_data else "No data found"

def compute_neighbourhoods(user_prompt):
    load_dotenv()
    client = OpenAI(
        api_key=os.environ.get("OPEN_API_KEY"),
    )
    print(user_prompt)
    # Fetch all records from the database
    dataLanguage = nativeLanguage.objects.all().values()
    dataAge = ageDensity.objects.all().values()
    dataMinority = visibleMinority.objects.all().values()

    # Convert queryset data to readable table strings
    table_string_language = format_table_data(dataLanguage)
    table_string_age = format_table_data(dataAge)
    table_string_minority = format_table_data(dataMinority)
    # Generate response using ChatGPT
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that does not show any work and only provides results and a neighbourhood name by itself"},
            {"role": "user", "content": f"""
    Here are some tables of information about the population in Toronto:
    
    🗣 Native Language Data:
    {table_string_language}
    ---
    👵 Age Demographics:
    {table_string_age}
    ---
    🌎 Visible Minority Groups:
    {table_string_minority}
    
    Based on this data, only return the name of the top neighborhood that fits the following user: {user_prompt}?
    """},
        ],
    )

    # Print the response
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content