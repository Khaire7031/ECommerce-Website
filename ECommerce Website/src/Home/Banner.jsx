import React, { useState } from 'react';
import productData from '../products.json';
import { Link } from 'react-router-dom';
import SelectedCategory from '../components/SelectedCategory';

const title = (
    <h2>Search Your One from Thousand of Product</h2>
)
const desc = "We have the largest collection of products"

const bannerList = [
    {
        iconName: "icofont-users-alt-4",
        text: "1.5 Million Customers",
    },
    {
        iconName: "icofont-notification",
        text: "More then 2000 Marchent",
    },
    {
        iconName: "icofont-globe",
        text: "Buy Anything Online",
    },
];

export default function Banner() {

    const [searchInput, setsearchInput] = useState('');
    const [filterProduct, setfilterProduct] = useState(productData);

    // Filtering
    const handleSearch = (e) => {
        const value = e.target.value;
        setsearchInput(value);

        const filter = productData.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));

        setfilterProduct(filter);
    }

    return (
        <div className='banner-section style-4'>
            <div className="container">
                <div className="banner-content">
                    {title}

                    <form>
                        <SelectedCategory select={"all"}></SelectedCategory>
                        <input type="text" name="search" id="search" placeholder='Search Your Product' value={searchInput} onChange={handleSearch} />
                        <button type='submit'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>


                    <p>{desc}</p>
                    <ul className="lab-ul">
                        {
                            searchInput && filterProduct.map((product, i) => <li key={i}>
                                <Link to={`/shop/${product.id}`}>{product.name}</Link>
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
