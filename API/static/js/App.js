function AddToCart(productId, productName, productPrice) {
    Swal.fire({
        icon: 'success',
        title: 'Product added to cart!',
        html: 'Product <b>' + productName + '</b> added to Cart.'
    });
}

// alert("Product added to cart: ID - " + productId + ", Name - " + productName + ", Price - " + productPrice);