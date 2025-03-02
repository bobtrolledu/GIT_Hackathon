import requests

def get_wikipedia_image(neighborhood):
    base_url = "https://en.wikipedia.org/w/api.php"

    # Step 1: Search for the Wikipedia page
    search_params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": neighborhood + " Toronto"
    }
    search_response = requests.get(base_url, params=search_params).json()

    if "query" not in search_response or not search_response["query"]["search"]:
        print(f"No Wikipedia page found for {neighborhood}.")
        return None

    page_title = search_response["query"]["search"][0]["title"]

    # Step 2: Get the main image of the page
    image_params = {
        "action": "query",
        "format": "json",
        "prop": "pageimages",
        "pithumbsize": 500,
        "titles": page_title
    }
    image_response = requests.get(base_url, params=image_params).json()

    pages = image_response.get("query", {}).get("pages", {})
    for page in pages.values():
        if "thumbnail" in page:
            return page["thumbnail"]["source"]

    print(f"No image found for {neighborhood}.")
    return None

def returnImage(neighbourhood):
    image_url = get_wikipedia_image(neighbourhood)
    return image_url



