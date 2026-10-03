const pool = require("../db");
const productquery = require("../query/productquery");


const getAllProducts = ()=>{
    return new Promise((resolve, reject)=>{
        pool.query(productquery.getAllProducts, (error,results)=>{
            if(error){
                reject(error)
            }
            else{
                resolve(results.rows)
            }
        })
    })
}


const getProductById = (id)=>{
    return new Promise(( resolve,reject)=>{
        pool.query(productquery.getProductById, [id],(error, results)=>{
           if(error){
            reject(error)
           } else{
            resolve(results.rows)
           }
        } )
    })
}


const createProduct = (title,image,price,offerprice)=>{
    return new Promise((resolve, reject)=>{
        pool.query(productquery.createProduct,[title,image,price,offerprice], (error, results)=>{
            if(error){
                reject(error)
            }
            else{
                resolve(results.rows)
            }
        })
    })
}

const updateProduct = (id, title, image, price, offerprice) => {

    return new Promise((resolve, reject) => { 
            pool.query(productquery.updateProduct, [title, image, price, offerprice, id],(error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.rows);
                }
            }
        );
    });
};

const deleteProduct = (id)=>{
    return new Promise((resolve, reject)=>{
        pool.query(productquery.deleteProduct,[id],(error, results)=>{
            if(error){
                reject(error)
            }
            else{
                resolve(results.rows)
            }
        })
    })
}





module.exports = {
     getAllProducts,
     getProductById,
     createProduct,
     updateProduct,
     deleteProduct
}