class Product:
    def __init__(self, id, name, price, description, availability=True):
        self.id = id
        self.name = name
        self.price = price
        self.description = description
        self.availability = availability

    def __str__(self):
        return f"{self.name} - ${self.price:.2f}\nDescription: {self.description}\nAvailability: {'In stock' if self.availability else 'Out of stock'}"


class ShoppingCart:
    def __init__(self):
        self.products = []

    def add_product(self, product):
        self.products.append(product)

    def remove_product(self, product):
        self.products.remove(product)

    def calculate_total(self):
        total = 0
        for product in self.products:
            total += product.price
        return total

    def display_cart(self):
        if not self.products:
            print("Your cart is empty.")
        else:
            print("Your cart contains:")
            for product in self.products:
                print(product)

    def remove_from_cart(self, product):
        if product in self.products:
            confirmation = input(f"Are you sure you want to remove {product.name} from the cart? (yes/no): ").lower()
            if confirmation == "yes":
                self.remove_product(product)
                print(f"Removed {product.name} from the cart.")
        else:
            print(f"{product.name} is not in your cart.")

class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.shopping_cart = ShoppingCart()

    def add_to_cart(self, product):
        self.shopping_cart.add_product(product)

    def remove_from_cart(self, product):
        self.shopping_cart.remove_from_cart(product)

    def checkout(self):
        total = self.shopping_cart.calculate_total()
        print(f"Total amount to pay: ${total:.2f}")


# Sample usage
product1 = Product(1, "iPhone", 1000, "Latest smartphone from Apple with advanced features.")
product2 = Product(2, "Headphones", 100, "High-quality over-ear headphones with noise cancellation.")
product3 = Product(3, "Keyboard", 50, "Ergonomic keyboard with RGB backlighting.")
product4 = Product(4, "Laptop Mac Book", 2000, "Powerful laptop with macOS operating system.")
product5 = Product(5, "Dell Laptop", 1500, "Durable laptop with Windows operating system.")
product6 = Product(6, "Ipad", 1250, "Tablet device with Retina display.")
product6 = Product(7, "Ipad-154", 3052, "Tablet device with no Retina display.")


customer = Customer("John Doe", "john@example.com")

print("Welcome to the e-commerce store!")
print("Here are some available products:")

products = [product1, product2, product3, product4, product5, product6]

for product in products:
    print(product)

while True:
    print("\nSelect an option from below:")
    print("1. Add a product to the cart")
    print("2. Display cart")
    print("3. Remove a product from the cart")
    print("4. Checkout")
    user_input = input("Enter option number: ")

    if user_input == '1':
        print("\nSelect a product to add to the cart:")
        try:
            product_id = int(input("Product ID: "))
            selected_product = next((product for product in products if product.id == product_id), None)
            if selected_product:
                customer.add_to_cart(selected_product)
                print(f"Added {selected_product.name} to the cart.")
            else:
                print("Invalid product ID. Please try again.")
        except ValueError:
            print("Invalid input. Please enter a valid product ID.")

    elif user_input == '2':
        customer.shopping_cart.display_cart()

    elif user_input == '3':
        print("\nSelect a product to remove from the cart:")
        try:
            product_id = int(input("Product ID: "))
            selected_product = next((product for product in customer.shopping_cart.products if product.id == product_id), None)
            if selected_product:
                customer.remove_from_cart(selected_product)
            else:
                print("Invalid product ID. Please try again.")
        except ValueError:
            print("Invalid input. Please enter a valid product ID.")

    elif user_input == '4':
        customer.checkout()
        break

    else:
        print("Invalid option. Please try again.")
