async function AddToCart(productId, productName, productPrice) {

    console.log(productId)
    console.log(productPrice)

    try {
        const response = await fetch('/AddToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 'user1', product_id: parseInt(productId), quantity: 1 })
        });

        if (!response.ok) {
            throw new Error('Failed to add the product to the cart.');
        }

        const cartData = await response.json();

        if (cartData) {
            Swal.fire({
                icon: 'success',
                title: 'Product added to cart',
                html: 'Product <b>' + productName + '</b> added to Cart.'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Product failed to add to cart',
                html: 'Product <b>' + productName + '</b> is not added'
            });
        }

    } catch (error) {
        console.log("Error AddToCart : ", error.message)
    }

}




// alert("Product added to cart: ID - " + productId + ", Name - " + productName + ", Price - " + productPrice);