import axios  from "axios";
import MaterialTable from 'material-table';
import  { useState, useEffect } from 'react';
import React from "react";
                
function Editable ()   {
  
    const [columns] = useState([
        
        { title: 'ProductName', field: 'productName' },
        { title: 'ProductCode', field: 'productCode' },
        { title: 'Desciption', field: 'desciption' },
        { title: 'Price', field: 'price' },
        { title: 'RrpPrice', field: 'priceRrp' },
        { title: 'ShopifyPrice', field: 'priceShopify' },
        { title: 'AgentPrice', field: 'priceAgent' },
        { title: '1212Price', field: 'price1212' },
        { title: 'SpecialPrice', field: 'priceSpecial' },
        { title: 'Height', field: 'height' },
        { title: 'Width', field: 'width' },
        { title: 'Length', field: 'length' },
        { title: 'Weight', field: 'weight' },
        { title: 'PackageQty', field: 'packageQty' },
      
    ]);
  
    const [prodList, setProdList] = useState([]);
    
    useEffect(() => {
        axios.get('http://206.189.39.185:5031/api/Product')
        .then(res => {
            setProdList(res.data.data)
            console.log(res.data.data)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    const changeType  =newdata => {
       newdata.price = parseInt(newdata.price)
       newdata.priceRrp = parseInt(newdata.priceRrp)
       newdata.priceShopify = parseInt(newdata.priceShopify)
       newdata.priceAgent = parseInt(newdata.priceAgent)
       newdata.price1212 = parseInt(newdata.price1212)
       newdata.priceSpecial = parseInt(newdata.priceSpecial)
       newdata.height = parseInt(newdata.height)
       newdata.width = parseInt(newdata.width)
       newdata.length = parseInt(newdata.length)
       newdata.weight = parseInt(newdata.weight)
       newdata.packageQty = parseInt(newdata.packageQty)
       
      return newdata
    }
    
    
    
    
    
    const handleAdd = (newdata) => {
        console.log(newdata)
        axios.post('http://206.189.39.185:5031/api/Product/ProductCreate',changeType(newdata))
        .then (response=>{
          
            setProdList([...prodList,newdata])
            alert('Add successfully');
            return response
        })
        .catch((error)=>{
            console.log(error)
            alert('Unsuccessfully');
            return error;
        })

    };
    
    const handleUpdate =(newdata)=> {
      console.log(newdata)
      axios.put('http://206.189.39.185:5031/api/Product/ProductUpdate',changeType(newdata))
      .then (response=>{
          alert('Add successfully');
          return response
      })
      .catch((error)=>{
          console.log(error)
          alert('Unsuccessfully');
          return error;
      })

  };
  
  const handleDelete =(oldData)=> {
    const filteredData = prodList.filter( (e) => e.productId !== oldData.productId);
    console.log(oldData)
    
    axios.delete('http://206.189.39.185:5031/api/Product/' +oldData.productId )
    .then (response=>{
        // this.setState({data:[...this.state.data,newdata]})
        setProdList(filteredData)
        alert('Add successfully');
        return response
    })
    .catch((error)=>{
        console.log(error)
        alert('Unsuccessfully');
        return error;
    })

};
   
  
    return (
        
        <><div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">HOME </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">LOGIN</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">REGISTER</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href='/product'>PRODUCT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="https://www.google.com/">CONTACT</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <MaterialTable
          title="Product Management"
          columns={columns}
          data={prodList}
          editable={{
            onRowAdd: newData => new Promise((resolve, reject) => {
              setTimeout(() => {
                setProdList([...prodList, newData]);
                handleAdd(newData);
                resolve();
              }, 1000);
            }),
            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...prodList];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setProdList([...dataUpdate]);
                handleUpdate(newData);

                resolve();
              }, 1000);
            }),
            onRowDelete: oldData => new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...prodList];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setProdList([...dataDelete]);
                handleDelete(oldData);
                resolve();
              }, 1000);
            }),
          }} /></>
    )
  }
export default Editable