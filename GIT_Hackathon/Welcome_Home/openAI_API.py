from openai import OpenAI
from Welcome_Home.models import nativeLanguage, ageDensity, visibleMinority  # Import models

client = OpenAI()

# Function to format queryset data into a readable string
def format_table_data(queryset):
    table_data = [
        "• " + ", ".join(f"{key}: {value}" for key, value in entry.items())
        for entry in queryset
    ]
    return "\n".join(table_data) if table_data else "No data found"

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
        {"role": "system", "content": "You are a helpful assistant that does not show any work and only provides results."},
        {"role": "user", "content": f"""
Here are some tables of information about the population in Toronto:

**🗣 Native Language Data:**
{table_string_language}

---

**👵 Age Demographics:**
{table_string_age}

---

**🌎 Visible Minority Groups:**
{table_string_minority}

Based on this data, what are the top 3 neighborhoods that have the most southeast asian population and have the **highest population between ages 50 and 60**?
"""},
    ],
)

# Print the response
print(completion.choices[0].message.content)
