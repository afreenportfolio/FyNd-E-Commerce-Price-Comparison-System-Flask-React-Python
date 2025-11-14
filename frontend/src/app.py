# Importing libraries
from flask import Flask,request,jsonify
import requests
import logging
import os
from flask_cors import CORS

# Error logging
log_dir='logs'
os.makedirs(log_dir,exist_ok=True)
logging.basicConfig(
    filename=os.path.join(log_dir,'app.log'),
    level=logging.INFO,
    format='%(asctime)s-%(name)s-%(levelname)s %(message)s'
)
logger=logging.getLogger(__name__)
logger.info("log file test:Application started")

app=Flask(__name__)
CORS(app)

# Amazon API setup
AMAZON_API_KEY="5A18FD1BE1F54DBCADF3FEC16EFEEAA3"
AMAZON_API_KEY=os.getenv("AMAZON_API_KEY")

# Search product in Amazon
def search_amazon(product_name):
    search_url=f"https://api.rainforestapi.com/request?api_key={AMAZON_API_KEY}&type=search&amazon_domain=amazon.com&search_term={product_name}"
    try:
        response=requests.get(search_url)
        response.raise_for_status()
        data=response.json()
        if not data.get("search_results"):
            return None
        return data["search_results"][0]["asin"]
    except Exception as e:
        return{"error":f"Amazon search error:{e}"}

# Fetch product details from Amazon
def fetch_amazon_details(asin):
    product_url=f"https://api.rainforestapi.com/request?api_key={AMAZON_API_KEY}&type=product&amazon_domain=amazon.com&asin={asin}"
    try:
        response=requests.get(product_url)
        response.raise_for_status()
        data=response.json()
        if "product" not in data:
            return None
        product=data["product"]

        # Retrun product details in JSON format
        return{
            "productName":product.get("title","N/A"),
            "productImage":product.get("main_image","N/A"),
            "overallScore":product.get("rating","N/A"),
            "price":product.get("buybox_winner",{}).get("price",{}).get("value","N/A"),
            "rating":product.get("rating","N/A"),
            "raters":product.get("ratings_total","N/A"),
            "delivery":product.get("buybox_winner",{}).get("shipping",{}).get("price",{}).get("value","N/A"),
            "link":product.get("link","N/A")
        }
    except Exception as e:
        return{"error":f"Amazon product fetch error:{e}"}

# eBay API setup
EBAY_SANDBOX_API_ID="NithinM-Fynd-SBX-b0e9bf092-62ca2917"
EBAY_SANDBOX_API_ID=os.getenv("EBAY_SANDBOX_API_ID")
EBAY_ENDPOINT="https://svcs.sandbox.ebay.com/services/search/FindingService/v1"

# Search product in e-Bay & fetch product details from e-Bay
def get_ebay_details(product_name):
    try:
        #Search parameters
        params={
            "OPERATION-NAME":"findItemsByKeywords",
            "SERVICE-VERSION":"1.0.0",
            "SECURITY-APPNAME":EBAY_SANDBOX_API_ID,
            "RESPONSE-DATA-FORMAT":"JSON",
            "keywords":product_name,
            "paginationInput.entriesPerPage":5,
            "outputSelector(0)":"SellerInfo",
            "outputSelector(1)":"ItemSpecifics",
            "outputSelector(2)":"Description"
        }
        # Wait for response
        response=requests.get(EBAY_ENDPOINT,params=params)
        response.raise_for_status()
        data=response.json()

        # Search results
        search_result=data.get("findItemsByKeywordsResponse",[{}])[0].get("searchResult",[{}])[0]
        if search_result.get("@count","0")=="0":
            return{"error":"No eBay items found"}

        # Check Sandbox API database
        item=search_result.get("item",[])[0]
        item_id=item.get("itemId",[""])[0]
        link=f"https://www.sandbox.ebay.com/itm/{item_id}"

        # Get item specifications
        features=[]
        if "itemSpecifics" in item:
            for spec in item["itemSpecifics"][0].get("nameValueList",[]):
                features.append(f"{spec['name'][0]}:{spec['value'][0]}")

        # Return product details in JSON format
        return{
            "productName":item.get("title",["N/A"])[0],
            "productImage":item.get("galleryURL",[""])[0],
            "overallScore":item.get("sellerInfo",[{}])[0].get("positiveFeedbackPercent",["N/A"])[0],
            "price":item.get("sellingStatus",[{}])[0].get("currentPrice",[{}])[0].get("__value__","N/A"),
            "currency":item.get("sellingStatus",[{}])[0].get("currentPrice",[{}])[0].get("@currencyId","USD"),
            "delivery":item.get("shippingInfo",[{}])[0].get("shippingServiceCost",[{}])[0].get("__value__","N/A"),
            "features":features or ["No features available"],
            "seller_rating":item.get("sellerInfo",[{}])[0].get("feedbackScore",["N/A"])[0],
            "link":link
        }

    # Error handling
    except Exception as e:
        return{"error":f"eBay API error:{e}"}

# Define two route endpoints that both map to this search function
@app.route('/compare',methods=['GET'])
@app.route('/api/search',methods=['GET'])
def search():
    try:
        # Extract the search query from the request parameters
        query=request.args.get('q')
        logger.info(f"Searching for:{query}")
         # If no query is provided, return a 400 Bad Request response
        if not query:
            return jsonify({"error":"Missing search query"}),400
        try:
            # Retrieve Data from Platforms
            # Amazon
            asin=search_amazon(query)
            amazon_data=fetch_amazon_details(asin) if isinstance(asin,str) else None

            # eBay
            ebay_data=get_ebay_details(query)

            # Transform data to match frontend expectations
            result={
                "productName":query,
                "productImage":amazon_data.get("image","https://via.placeholder.com/250") if amazon_data else "https://via.placeholder.com/250",
                "platforms":[
                   {
                        "name":"Amazon",
                        "logo":"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                        "price":amazon_data.get("price","N/A") if amazon_data else "N/A",
                        "delivery":"2-3 days", # Hardcoded
                        "rating":float(amazon_data.get("rating",0)) if amazon_data else 0,
                        "reviews":{
                            "positive":70, # Hardcoded
                            "neutral":20, # Hardcoded
                            "negative":10, # Hardcoded
                            "summary":"Mostly positive reviews" # Hardcoded
                        },
                        "overallScore":8.5, # Hardcoded
                        "url":amazon_data.get("link","#") if amazon_data else "#"
                    },
                   {
                        "name":"eBay",
                        "logo":"https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
                        "price":ebay_data.get("price","N/A") if ebay_data else "N/A",
                        "delivery":"3-5 days", # Hardcoded
                        "rating":4.0, # Hardcoded
                        "reviews":{
                            "positive":65, # Hardcoded
                            "neutral":25, # Hardcoded
                            "negative":10, # Hardcoded
                            "summary":"Generally positive feedback" # Hardcoded
                        },
                        "overallScore":7.8, # Hardcoded
                        "url":ebay_data.get("link","#") if ebay_data else "#"
                    }
                ]
            }

            # Return the compiled JSON response
            return jsonify(result)
        # Handle platform-specific or data processing errors
        except Exception as e:
            return jsonify({"error":f"Server error:{str(e)}"}),400
    # Handle errors at the route/controller level
    except Exception as e:
        logger.error(f"Error in search:{str(e)}")
        return jsonify({"error":"Internal server error"}),500

# Entry point of the application
if __name__=='__main__':
    # Starts the Flask development server with debug mode enabled.
    app.run(debug=True)
