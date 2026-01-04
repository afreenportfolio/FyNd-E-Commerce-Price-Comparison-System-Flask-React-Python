# FyNd: Real-Time Price Comparison Platform
>Due to API rate limits, we were not able to access real-time data (like prices, ratings, reviews) from Amazon & eBay.

FyNd is a web-based platform designed to help users compare product prices in real-time from various online retailers. By integrating third-party APIs, it fetches up-to-date pricing data, allowing users to make informed purchasing decisions quickly. The application emphasizes modular architecture for scalability and reliability.

## Features
1. Product retrieval from multiple e-commerce APIs (**Rainforest API for Amazon & Sandbox API for eBay**).
2. User-friendly interface for searching and comparing products.
3. Modular backend for easy maintenance and expansion.
4. Structured test cases for debugging and system reliability.

## Technologies used
1. Backend: Flask, Python
2. Frontend: React
3. Database: Integrated via APIs
4. Tools: VS Code for development

## Installation
1. Clone the repository: `git clone https://github.com/afreenportfolio/FyNd-E-Commerce-Price-Comparison-System-Flask-React-Python.git`
2. Install npm & React:
    - Ubuntu:
       - `sudo apt update`
       - `sudo apt install nodejs npm -y`
    - macOS: `brew install node`
   Windows
     Download from: `https://nodejs.org` → LTS version
     Run the installer → Check "`Add to PATH`"
4. Verify installation:
   - `node --version`
   - `npm --version`
5. Navigate to the frontend directory: `cd ../frontend`
6. Install React and dependencies: `npm install`
7. Navigate to the backend directory: `cd backend`
8. Install dependencies: `pip install -r requirements.txt`

## File Directory
  ```  
    fynd/
    ├── backend/
    │   ├── app.py
    │   ├── logs/                   ← .gitignore
    │   └── requirements.txt
    │
    ├── frontend/  
    │   ├── public/
    |   │   │   ├── index.html    
    │   │   ├── manifest.json   
    │   │   └── robots.txt    
    │   │   
    │   ├── src/    
    │   │   ├── App.js   
    │   │   ├── App.css    
    │   │   ├── index.js    
    │   │   ├── index.css    
    │   │   ├── logo.svg    
    │   │   ├── reportWebVitals.js    
    │   │   ├── setupTests.js    
    │   │   ├── App.test.js    
    │   │   ├── About.js    
    │   │   ├── About.css 
    │   │   ├── Contact.js
    │   │   ├── Contact.css
    │   │   ├── EmptyState.js 
    │   │   ├── EmptyState.css
    │   │   ├── FilterPanel.js 
    │   │   ├── Footer.js
    │   │   ├── Footer.css 
    │   │   ├── HowItWorks.js
    │   │   ├── HowItWorks.css
    │   │   ├── Loading.js
    │   │   ├── Loading.css 
    │   │   ├── PlatformCard.js
    │   │   ├── PlatformCard.css
    │   │   ├── PriceHistory.js 
    │   │   ├── PriceHistory.css
    │   │   ├── ProductComparison.js
    │   │   ├── ProductComparison.css
    │   │   ├── ProductSpecifications.js 
    │   │   ├── ProductSpecifications.css
    │   │   ├── RecentSearches.js
    │   │   ├── RecentSearches.css
    │   │   ├── ReviewAnalysis.js
    │   │   ├── ReviewAnalysis.css
    │   │   ├── SearchBar.js
    │   │   └── SearchBar.css
    │   │
    │   ├── node_modules/                   ← .gitignore
    │   ├── package.json
    │   ├── package-lock.json
    │   └── README.md
    |
    ├── venv/                               ← .gitignore
    ├── .gitignore
```
 
## Usage
1. Navigate to the project directory: `cd fynd`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
    - On Windows: `venv\Scripts\activate`
    - On macOS/Linux: `source venv/bin/activate`
4. Set up `.env` file:
     - `FLASK_APP=app.py` >No output
     - `FLASK_ENV=development` >No output
5. Start the backend application: `python app.py`
6. Open another terminal
7. Navigate to the frontend directory: `cd frontend`
8. Start the React app: `npm start`
9. Access the app at **http://localhost:3000**
10. Search for products and view comparisons.

Contributing
- Contributions are welcome! Please fork the repo and submit a pull request.

License
- MIT License

- ![Type](https://img.shields.io/badge/Type-Academic_Project-purple)
- ![Status](https://img.shields.io/badge/Status-Completed_Milestone-grey)
