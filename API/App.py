from flask import Flask, render_template,jsonify
from datetime import datetime
import requests
from Products import products


app = Flask(__name__)





@app.route('/')
def Home():
    return render_template('index.html')

@app.route('/about')
def About():
    return render_template('index.html')

@app.route('/contact')
def Contact():
    return render_template('index.html')

# Display All Product 
@app.route('/display_products', methods=['GET'])
def get_products():
    return jsonify(products)

# Display Single Product With Id
@app.route('/display_product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    else:
        return jsonify({'message': 'Product not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)