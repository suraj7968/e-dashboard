import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            method: 'get',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await result.json();
        setProducts(result);
        console.log(result);
    }

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:  'delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await  result.json();
        if (result) {
            getProducts();
        }
        else{
            alert("Record can't Deleted");
        }
    }

    const searchHandle=  async (event)=>{
        console.log(event.target.value);
        let key = event.target.value;
        if (!key) {
            getProducts();
        }
        let result = await fetch(`http://localhost:5000/search/${key}`,{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })
        result = await result.json();
        console.log(result);
        if (result) {
            setProducts(result);
        }
    }

    
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-product-box" onChange={searchHandle} type="text" placeholder='Search by name...' />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Action</li>
            </ul>
            {
               products.length>0 ? products.map((item,index) => 
                <ul key={item._id} >
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li><button onClick={()=>deleteProduct(item._id)} type="button" >Delete</button>
                 <Link to={`/update/${item._id}`} >Edit</Link>
                 </li>
            </ul>
            ):<p>No Products Found!</p>
        }
        </div>
    )
}

export default ProductList;