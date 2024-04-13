import unittest
import requests

class TestDeleteFromCartAPI(unittest.TestCase):

    # Product SuccessFully Deleted from Cart
    def test_delete_product_success(self):
        # url = 'https://green-4.onrender.com/delete_from_cart'
        url = 'http://localhost:3000/delete_from_cart'
        data = {'userId': '660906daf8903aae91b99771', 'productId': 3}
        response = requests.post(url, json=data) 

        print(" 1 : ",response.json())  
        self.assertEqual(response.status_code,201) 
        self.assertIn('Product quantity decremented or deleted from the cart.', response.json().get('message', ''))

    # Product Not Found in Cart
    def test_delete_product_not_found(self):
        # url = 'https://green-4.onrender.com/delete_from_cart'
        url = 'http://localhost:3000/delete_from_cart'
        data = {'userId': '660906daf8903aae91b99771', 'productId': 100}
        response = requests.post(url, json=data)

        print("100 : ",response.json())  
        self.assertEqual(response.status_code, 404) 
        self.assertIn('Product not found in the cart.', response.json().get('message', ''))

    # Internal Server Error 
    # def test_internal_server_error(self):
    #     # url = 'https://green-4.onrender.com/delete_from_cart'
    #     url = 'http://localhost:3000/delete_from_cart'
    #     data = {'userId': '', 'productId': 1} 
    #     response = requests.post(url, json=data)

    #     print("Internal Server Error:", response.json())  
    #     self.assertEqual(response.status_code, 500) 
    #     self.assertIn('Internal server error.', response.json().get('message', ''))

if __name__ == '__main__':
    unittest.main()
