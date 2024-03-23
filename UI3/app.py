from flask import Flask, render_template, request, jsonify
from Products import products 

app = Flask(__name__)

cart = {}

@app.route('/')
def index():
    return render_template('index.html', products=products)

@app.route('/all_products')
def all_products():
    return jsonify({"products": products})

@app.route('/add_product', methods=['GET','POST'])
def add_product():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data'}), 400

    new_product = {
        'id': len(products) + 1,
        'name': data.get('name'),
        'price': data.get('price'),
        'description': data.get('description')
    }
    products.append(new_product)
    return jsonify(new_product), 201

@app.route('/addProduct', methods=['GET','POST'])
def addProduct():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        new_product = {
            'id': len(products) + 1,
            'name': data.get('name'),
            'price': data.get('price'),
            'description': data.get('description')
        }
        products.append(new_product)
        return jsonify(new_product), 201
    else:
        return render_template('add_product_form.html')

@app.route('/cart', methods=['GET'])
def view_cart():
    user_id = request.args.get('user_id')
    user_cart = cart.get(user_id, {})
    cart_items = []

    for product_id, quantity in user_cart.items():
        product = next((p for p in products if p['id'] == product_id), None)
        if product:
            item_total = product['price'] * quantity
            cart_items.append({
                'product_id': product_id,
                'name': product['name'],
                'price': product['price'],
                'quantity': quantity,
                'item_total': item_total
            })

    total_amount = sum(item['item_total'] for item in cart_items)
    return jsonify({
        'cart_items': cart_items,
        'total_amount': total_amount
    })

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    user_cart = cart.get(user_id, {})
    user_cart[product_id] = user_cart.get(product_id, 0) + quantity
    cart[user_id] = user_cart

    return jsonify(cart[user_id])

@app.route('/delete_from_cart', methods=['POST'])
def delete_from_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    product_id = data.get('product_id')

    user_cart = cart.get(user_id, {})
    if product_id in user_cart:
        del user_cart[product_id]
        cart[user_id] = user_cart

    return jsonify(cart[user_id])


@app.route('/search/<item>', methods=['GET'])
def search(item):
    print('Item : ', item)

    search_results = []
    for product in products:
        if item in product['name'].lower():
            search_results.append(product)

    return jsonify({' results': search_results})

if __name__ == '__main__':
    app.run(debug=True)
