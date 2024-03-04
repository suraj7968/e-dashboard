import React, { useState } from 'react';

const AddProduct =()=>{
    const [name , setName] = useState("");
    const [price , setPrice] = useState("");
    const [category , setCategory] = useState("");
    const [company , setCompany] = useState("");
    const [error , setError] = useState(false);

    const addProduct =async()=>{
        console.log(!name);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log(name,price,category,company,userData._id);
        var result = await fetch("http://localhost:5000/add-product",{
            method: 'post',
            body: JSON.stringify({name,price,category,company,userId: userData._id}),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await result.json();
        console.log(result);
    }
    return(
        <div className='product' >
            <h1>Add Product</h1>
            <input type="text" autoFocus value={name} onChange={(e)=>setName(e.target.value)} className='InputBox' placeholder='Enter Product Name'/>
            { error && !name && <span className='invalid-input' >Enter Valid Name</span>}
            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} className='InputBox' placeholder='Enter Product Price' />
            { error && !price && <span className='invalid-input' >Enter Valid Price</span>}
            <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className='InputBox' placeholder='Enter Product Category' />
            { error && !category && <span className='invalid-input' >Enter Valid Category</span>}
            <input type="text" value={company} onChange={(e)=>setCompany(e.target.value)} className='InputBox' placeholder='Enter Product Company' />
            { error && !company && <span className='invalid-input' >Enter Valid Company</span>}
            <button type='button' onClick={addProduct} className='InputBtn' >Add Product</button>
        </div>
    )   
}

export default AddProduct;