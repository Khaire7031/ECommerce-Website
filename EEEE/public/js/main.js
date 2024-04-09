const images = [
    {
        src: 'https://source.unsplash.com/1200x300/?computer',
        alt: 'Computer',
        caption: 'Powerful Computing',
        description: 'Experience the power of modern computing with our latest collection of computers.'
    },
    {
        src: 'https://source.unsplash.com/1200x300/?laptop',
        alt: 'Laptop',
        caption: 'Portable Performance',
        description: 'Take your work and entertainment on the go with our sleek and powerful laptops.'
    },
    {
        src: 'https://source.unsplash.com/1200x300/?watch',
        alt: 'Watch',
        caption: 'Elegant Timepieces',
        description: 'Discover timeless elegance with our collection of stylish and sophisticated watches.'
    },
    {
        src: 'https://source.unsplash.com/1200x300/?phone',
        alt: 'Phone',
        caption: 'Stay Connected',
        description: 'Stay connected with friends and family wherever you go with our latest smartphones.'
    },
    {
        src: 'https://source.unsplash.com/1200x300/?tablet',
        alt: 'Tablet',
        caption: 'Versatile Tablets',
        description: 'Experience versatility and productivity with our range of cutting-edge tablets.'
    },
    {
        src: 'https://source.unsplash.com/1200x300/?headphones',
        alt: 'Headphones',
        caption: 'Immersive Audio',
        description: 'Dive into immersive audio experiences with our premium range of headphones and earbuds.'
    }
];

const carouselIndicators = document.getElementById('carouselIndicators');
const carouselInner = document.getElementById('carouselInner');

let currentIndex = 0;

function showNextImage() {
    // Remove active class from current indicator and item
    const currentIndicator = carouselIndicators.querySelector('.active');
    currentIndicator.classList.remove('active');
    const currentItem = carouselInner.querySelector('.carousel-item.active');
    currentItem.classList.remove('active');

    // Increment current index and reset to 0 if it exceeds the last index
    currentIndex = (currentIndex + 1) % images.length;

    // Set active class to next indicator and item
    const nextIndicator = carouselIndicators.children[currentIndex];
    nextIndicator.classList.add('active');
    const nextItem = carouselInner.children[currentIndex];
    nextItem.classList.add('active');
}

// Create carousel indicators and items
images.forEach((image, index) => {
    // Create carousel indicators
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
    indicator.setAttribute('data-bs-slide-to', index);
    if (index === 0) {
        indicator.classList.add('active');
    }
    carouselIndicators.appendChild(indicator);

    // Create carousel items
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    if (index === 0) {
        item.classList.add('active');
    }
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.classList.add('d-block', 'w-100');
    const caption = document.createElement('div');
    caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
    const captionTitle = document.createElement('h5');
    captionTitle.textContent = image.caption;
    const captionText = document.createElement('p');
    captionText.textContent = image.description;
    caption.appendChild(captionTitle);
    caption.appendChild(captionText);
    item.appendChild(img);
    item.appendChild(caption);
    carouselInner.appendChild(item);
});

// Automatically transition to the next image every 2 seconds
setInterval(showNextImage, 2000);



//   Search Functionality
document.addEventListener('DOMContentLoaded', function () {

    const searchInput = document.querySelector('#searchInput');
    const searchProductDiv = document.getElementById('searchProduct');
    const DefaultProductDiv = document.getElementById('defaultProducts');

    searchInput.addEventListener('input', function (event) {
        const inputValue = event.target.value;
        if (inputValue.length < 3) {
            searchProductDiv.classList.add("d-none");
            DefaultProductDiv.classList.remove("display-none");
        } else if (inputValue.length >= 3) {
            fetch('/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ProductName: inputValue })
            })
                .then(response => {
                    if (!response.ok) {
                        alert("Product Not Found");
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Clear previous search results
                    searchProductDiv.innerHTML = '';
                    DefaultProductDiv.classList.add("display-none");
                    searchProductDiv.classList.remove("d-none");
                    searchProductDiv.classList.add("product-card");
                    // Create and append cards for each product
                    data.products.forEach(product => {
                        const cardDiv = document.createElement('div');
                        cardDiv.classList.add('card');
                        cardDiv.style.width = '18rem';

                        const img = document.createElement('img');
                        img.src = product.thumbnail;
                        img.classList.add('card-img-top');
                        img.alt = product.title;

                        const cardBodyDiv = document.createElement('div');
                        cardBodyDiv.classList.add('card-body');

                        const title = document.createElement('h5');
                        title.classList.add('card-title');
                        title.textContent = product.title;

                        const description = document.createElement('p');
                        description.classList.add('card-text');
                        description.textContent = product.description;

                        const btn = document.createElement('a');
                        btn.href = '#';
                        btn.classList.add('btn', 'btn-primary');
                        btn.textContent = 'Add to Cart';

                        cardBodyDiv.appendChild(title);
                        cardBodyDiv.appendChild(description);
                        cardBodyDiv.appendChild(btn);

                        cardDiv.appendChild(img);
                        cardDiv.appendChild(cardBodyDiv);

                        searchProductDiv.appendChild(cardDiv);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    });
});


//             --------- Add To Cart ------------
const cart = [];

document.getElementById("defaultProducts").addEventListener("click", function (event) {
    if (event.target && event.target.matches(".btn-primary")) {
        const productId = event.target.dataset.productId;
        const card = event.target.closest(".card");
        const thumbnail = card.querySelector(".card-img-top").getAttribute("src");
        const title = card.querySelector(".card-title").textContent.trim();
        const description = card.querySelector(".card-text").textContent.trim();
        const price = parseFloat(card.querySelector(".card-price").textContent.split("$")[1]);

        // console.log("Product ID:", productId);
        // console.log("Thumbnail:", thumbnail);
        // console.log("Title:", title);
        // console.log("Description:", description);
        // console.log("Price:", price);

        let customerId = localStorage.getItem("userIdForUse");
        const existingProduct = cart.find(product => product.title === title);
        if (existingProduct) {
            existingProduct.quantity++;
            addToCart(customerId, existingProduct);

        } else {
            const product = {
                id: productId,
                title: title,
                thumbnail: thumbnail,
                description: description,
                price: price,
                quantity: 1
            };
            cart.push(product);
            addToCart(customerId, product);
        }
        console.log(cart)
    }
});


async function addToCart(customerId, product) {
    try {
        const response = await fetch('/add_to_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId, product })
        });
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add product to Cart',
                confirmButtonText: 'OK'
            });
            throw new Error('Failed to add product to cart');
        }
        const data = await response.json();
        if (data && data.message) {
            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product added to Cart Successfully',
                    confirmButtonText: 'OK'
                });
            }, 100);
        }

        console.log(data.message);
    } catch (error) {
        console.error('Error adding product to cart:', error.message);
    }
}


//    --------- Delete From Cart ----------
function deleteCartItem(productId) {
    console.log("Delete button clicked for product ID:", productId);

    fetch('/delete_from_cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete product from cart');
        }
        return response.json();
    }).then(data => {
        console.log(data.message);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Product deleted from Cart Successfully',
            confirmButtonText: 'OK'
        });
        // Reload the page after deleting the product
        window.location.reload();
    }).catch(error => {
        console.error('Error deleting product from cart:', error.message);
    });
}
