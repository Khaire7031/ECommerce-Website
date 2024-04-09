import unittest
import requests

class TestAddToCartAPI(unittest.TestCase):
    def test_add_product_to_cart_success(self):
        url = 'http://localhost:3000/add_to_cart'
        data = {
            'customerId': '123456', 
            'product': {
                'id': 5,
                'title': 'Huawei P30',
                'description': 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
                'price': 499,
                'discountPercentage': 10.58,
                'rating': 4.09,
                'stock': 32,
                'brand': 'Huawei',
                'category': 'smartphones',
                'thumbnail': 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
                'images': []
            }
        }
        response = requests.post(url, json=data)
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('Product added to cart successfully', response.json().get('message', ''))

    def test_add_product_to_existing_cart_success(self):
        # Test adding a product to an existing cart
        # Prepare the test data (existing cart with a product)
        existing_cart_data = {
            'user': '123456',
            'products': [{
                'id': '5',
                'title': 'Huawei P30',
                'thumbnail': 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
                'description': 'Huawei’s re-badged P30 Pro New Edition was officially unveil...',
                'price': 499,
                'quantity': 2
            }]
        }
        
        # Save the existing cart data to the database

        # Make a request to add another product to the cart
        url = 'http://localhost:3000/add_to_cart'
        data = {
            'customerId': '123456', 
            'product': {
                'id': '5',
                'title': 'Huawei P30',
                'thumbnail': 'https://cdn.dummyjson.com/product-images/5/thumbnail.jpg',
                'description': 'Huawei’s re-badged P30 Pro New Edition was officially unveil...',
                'price': 499,
                'quantity': 2
            }
        }
        response = requests.post(url, json=data)
        
        # Assert that the response is successful and the product is added to the cart
        self.assertEqual(response.status_code, 200)
        self.assertIn('Product added to cart successfully', response.json().get('message', ''))

    # Add more test cases to cover edge cases and error scenarios

if __name__ == '__main__':
    unittest.main()
