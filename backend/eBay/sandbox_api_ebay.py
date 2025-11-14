import requests
import json
import csv
import time
from bs4 import BeautifulSoup
#Sandbox API Credentials
SANDBOX_APP_ID="NithinM-Fynd-SBX-b0e9bf092-62ca2917"
SANDBOX_ENDPOINT="https://svcs.sandbox.ebay.com/services/search/FindingService/v1"
#USD to INR conversion rate
USD_TO_INR=83
#Prompt user
product_name=input("Enter the product to search:").strip()
#Set up API params
params={
    "OPERATION-NAME":"findItemsByKeywords",
    "SERVICE-VERSION":"1.0.0",
    "SECURITY-APPNAME":SANDBOX_APP_ID,
    "RESPONSE-DATA-FORMAT":"JSON",
    "keywords":product_name,
    "paginationInput.entriesPerPage":10,
    "outputSelector(0)":"SellerInfo",
    "outputSelector(1)":"ItemSpecifics"
}
start_time=time.time()
response=requests.get(SANDBOX_ENDPOINT,params=params)
response_time=round(time.time()-start_time,2)
print(f"API call took {response_time} seconds.")
if response.status_code!=200:
    print(f"API error:{response.status_code}")
    exit()
try:
    data=response.json()
    search_result=data.get("findItemsByKeywordsResponse",[{}])[0].get("searchResult",[{}])[0]
    items=search_result.get("item",[])
    if not items:
        print("No items found in API response.")
        exit()
    filename=f"{product_name.replace(' ','_')}_results_ebay.csv"
    with open(filename,'w',newline='',encoding='utf-8') as csvfile:
        fieldnames=['Title','Price INR','Currency','Features','Shipping','Location','Quantity Sold','Product URL']
        writer=csv.DictWriter(csvfile,fieldnames=fieldnames)
        writer.writeheader()
        headers={
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language":"en-US,en;q=0.9",
        }
        for index,item in enumerate(items):
            item_id=item.get("itemId",[""])[0]
            title=item.get("title",["N/A"])[0]
            url=item.get("viewItemURL",[f"https://www.ebay.com/itm/{item_id}"])[0]
            currency=item.get("sellingStatus",[{}])[0].get("currentPrice",[{}])[0].get("@currencyId","USD")
            price_val=item.get("sellingStatus",[{}])[0].get("currentPrice",[{}])[0].get("_value_","0")
            try:
                price_inr=round(float(price_val)*USD_TO_INR,2) if currency=="USD" else float(price_val)
            except:
                price_inr="N/A"
            #Collect features from API
            features=[]
            if "itemSpecifics" in item:
                for spec in item["itemSpecifics"][0].get("nameValueList",[]):
                    features.append(f"{spec['name'][0]}:{spec['value'][0]}")
            features_str="; ".join(features) if features else "No features"
            try:
                time.sleep(1)#Avoid hammering the site
                product_resp=requests.get(url,headers=headers,timeout=10)
                if product_resp.status_code == 200:
                    soup=BeautifulSoup(product_resp.text,'html.parser')
                    shipping=soup.find("span",class_="ux-labels-values__values-content")
                    location=soup.find("span",class_="ux-textspans ux-textspans--BOLD")
                    quantity_sold=soup.find("a",{"href":lambda x:x and "rt=nc" in x})

                    shipping_text=shipping.text.strip() if shipping else "N/A"
                    location_text=location.text.strip() if location else "N/A"
                    quantity_sold_text=quantity_sold.text.strip() if quantity_sold else "N/A"
                else:
                    shipping_text=location_text=quantity_sold_text="N/A"
            except Exception as e:
                print(f"Failed to scrape individual product page:{e}")
                shipping_text=location_text=quantity_sold_text="N/A"
            writer.writerow({
                'Title':title,
                'Price INR':price_inr,
                'Currency':"INR",
                'Features':features_str,
                'Shipping':shipping_text,
                'Location':location_text,
                'Quantity Sold':quantity_sold_text,
                'Product URL':url
            })

    print(f"CSV file saved as '{filename}'.")

except Exception as e:
    print(f"Unexpected error:{str(e)}")
