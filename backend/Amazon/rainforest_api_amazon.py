import requests
import json
import csv
import time
#API Key
API_KEY='ADE62E93BB10452686CF37DB3B0AC662'
#Take search term input from the user
search_term=input("Enter the product to search on Amazon:").strip().lower()
#Set up the request parameters
params={
    'api_key':API_KEY,
    'amazon_domain':'amazon.in',
    'search_term':search_term,
    'type':'search'
}
#Make the HTTP GET request
api_url='https://api.rainforestapi.com/request'
start_time=time.time()
response=requests.get(api_url,params=params)
end_time=time.time()
response_time=round(end_time-start_time,2)
print(f"API call to Amazon took {response_time} seconds.")
response=requests.get(api_url,params=params)
#Check for errors
if response.status_code==200:
    try:
        data=response.json()#Parse JSON response
        if "search_results" in data and data["search_results"]:
            #Define CSV filename
            filename=f"{search_term.replace(' ','_')}_results_amazon.csv"
            #Open CSV file for writing
            with open(filename,'w',newline='',encoding='utf-8') as csvfile:
                fieldnames=['ASIN','Title','Price','Rating','Number of Raters','Product URL']
                writer=csv.DictWriter(csvfile,fieldnames=fieldnames)
                writer.writeheader()
                for item in data["search_results"]:
                    title=item.get("title","N/A")
                    if search_term in title.lower():
                        price_info=item.get("price",{})
                        if isinstance(price_info,dict) and "value" in price_info:
                            usd_price=price_info["value"]
                            inr_price=round(usd_price*85.5269,2)
                        else:
                            continue
                        #Extract fields
                        asin=item.get("asin","N/A")
                        rating=item.get("rating","N/A")
                        ratings_total=item.get("ratings_total","N/A")
                        product_url=item.get("link","N/A")
                        writer.writerow({
                            'ASIN':asin,
                            'Title':title,
                            'Price':inr_price,
                            'Rating':rating,
                            'Number of Raters':ratings_total,
                            'Product URL':product_url
                        })
                print(f"CSV file saved as '{filename}'.") 
        else:
            print("No results found for the given search term.")

    except json.JSONDecodeError:
        print("Failed to decode JSON response.")
else:
    print(f"Error:{response.status_code},{response.text}")
