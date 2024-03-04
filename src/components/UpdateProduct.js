import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct=()=>{
    const [name , setName] = useState("");
    const [price , setPrice] = useState("");
    const [category , setCategory] = useState("");
    const [company , setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails= async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"get",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        })
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct =async()=>{
        console.log(name,price,category,company);
         let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"Put",
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
         });
         result = await result.json();
         if (result) {
            navigate('/');
         }
         else{
            alert("data Not Update");
         }
    }
    return(
        <div className='product' >
            <h1>Update Product</h1>
            
            <input type="text" autoFocus value={name} onChange={(e)=>setName(e.target.value)} className='InputBox' placeholder='Enter Product Name'/>
            
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} className='InputBox' placeholder='Enter Product Price' />
            
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className='InputBox' placeholder='Enter Product Category' />
            
            <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} className='InputBox' placeholder='Enter Product Company' />
            
            <button type='button' onClick={updateProduct} className='InputBtn' >Add Product</button>
            
        </div>
    )
}

export default UpdateProduct;