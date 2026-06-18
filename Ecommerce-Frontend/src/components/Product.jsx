// import { useNavigate, useParams } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { useState } from "react";
// import AppContext from "../Context/Context";
// import axios from "../axios";
// import UpdateProduct from "./UpdateProduct";
// const Product = () => {
//   const { id } = useParams();
//   const { data, addToCart, removeFromCart, cart, refreshData } =
//     useContext(AppContext);
//   const [product, setProduct] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8081/api/product/${id}`
//         );
//         setProduct(response.data);
//         if (response.data.imageName) {
//           fetchImage();
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     const fetchImage = async () => {
//       const response = await axios.get(
//         `http://localhost:8081/api/product/${id}/image`,
//         { responseType: "blob" }
//       );
//       setImageUrl(URL.createObjectURL(response.data));
//     };

//     fetchProduct();
//   }, [id]);

//   const deleteProduct = async () => {
//     try {
//       await axios.delete(`http://localhost:8081/api/product/${id}`);
//       removeFromCart(id);
//       console.log("Product deleted successfully");
//       alert("Product deleted successfully");
//       refreshData();
//       navigate("/");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleEditClick = () => {
//     navigate(`/product/update/${id}`);
//   };

//   const handlAddToCart = () => {
//     addToCart(product);
//     alert("Product added to cart");
//   };
//   if (!product) {
//     return (
//       <h2 className="text-center" style={{ padding: "10rem" }}>
//         Loading...
//       </h2>
//     );
//   }
//   return (
//     <>
//       <div className="containers" style={{ display: "flex" }}>
//         <img
//           className="left-column-img"
//           src={imageUrl}
//           alt={product.imageName}
//           style={{ width: "50%", height: "auto" }}
//         />

//         <div className="right-column" style={{ width: "50%" }}>
//           <div className="product-description">
//             <div style={{display:'flex',justifyContent:'space-between' }}>
//             <span style={{ fontSize: "1.2rem", fontWeight: 'lighter' }}>
//               {product.category}
//             </span>
//             <p className="release-date" style={{ marginBottom: "2rem" }}>
              
//               <h6>Listed : <span> <i> {new Date(product.releaseDate).toLocaleDateString()}</i></span></h6>
//               {/* <i> {new Date(product.releaseDate).toLocaleDateString()}</i> */}
//             </p>
//             </div>
            
           
//             <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
//               {product.name}
//             </h1>
//             <i style={{ marginBottom: "3rem" }}>{product.brand}</i>
//             <p style={{fontWeight:'bold',fontSize:'1rem',margin:'10px 0px 0px'}}>PRODUCT DESCRIPTION :</p>
//             <p style={{ marginBottom: "1rem" }}>{product.description}</p>
//           </div>

//           <div className="product-price">
//             <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
//               {"$" + product.price}
//             </span>
//             <button
//               className={`cart-btn ${
//                 !product.productAvailable ? "disabled-btn" : ""
//               }`}
//               onClick={handlAddToCart}
//               disabled={!product.productAvailable}
//               style={{
//                 padding: "1rem 2rem",
//                 fontSize: "1rem",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 marginBottom: "1rem",
//               }}
//             >
//               {product.productAvailable ? "Add to cart" : "Out of Stock"}
//             </button>
//             <h6 style={{ marginBottom: "1rem" }}>
//               Stock Available :{" "}
//               <i style={{ color: "green", fontWeight: "bold" }}>
//                 {product.stockQuantity}
//               </i>
//             </h6>
          
//           </div>
//           <div className="update-button" style={{ display: "flex", gap: "1rem" }}>
//             <button
//               className="btn btn-primary"
//               type="button"
//               onClick={handleEditClick}
//               style={{
//                 padding: "1rem 2rem",
//                 fontSize: "1rem",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Update
//             </button>
//             {/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
//             <button
//               className="btn btn-primary"
//               type="button"
//               onClick={deleteProduct}
//               style={{
//                 padding: "1rem 2rem",
//                 fontSize: "1rem",
//                 backgroundColor: "#dc3545",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Product;

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/product/${id}`
        );
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/product/${id}/image`,
          { responseType: "blob" }
        );
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl("https://via.placeholder.com/400x400?text=No+Image");
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    if (window.confirm('क्या आप यह product delete करना चाहते हो?')) {
      try {
        await axios.delete(`http://localhost:8081/api/product/${id}`);
        removeFromCart(id);
        console.log("Product deleted successfully");
        alert("Product deleted successfully");
        refreshData();
        navigate("/");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product");
      }
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  const isOutOfStock = !product?.productAvailable || product?.stockQuantity === 0;

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <>
      <div className="containers" style={{ display: "flex" }}>
        <div style={{ position: 'relative' }}>
          <img
            className="left-column-img"
            src={imageUrl}
            alt={product.name}
            style={{ width: "50%", height: "auto" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
          {isOutOfStock && (
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              backgroundColor: 'rgba(220, 53, 69, 0.9)',
              color: 'white',
              padding: '20px 30px',
              borderRadius: '10px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              zIndex: 10
            }}>
              ❌ OUT OF STOCK
            </div>
          )}
        </div>

        <div className="right-column" style={{ width: "50%" }}>
          <div className="product-description">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 'lighter' }}>
                {product.category}
              </span>
              <p className="release-date" style={{ marginBottom: "2rem" }}>
                <h6>
                  Listed: <span><i>{new Date(product.releaseDate).toLocaleDateString()}</i></span>
                </h6>
              </p>
            </div>

            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", textTransform: 'capitalize', letterSpacing: '1px' }}>
              {product.name}
            </h1>
            <i style={{ marginBottom: "3rem" }}>{product.brand}</i>

            <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '10px 0px 0px' }}>
              PRODUCT DESCRIPTION:
            </p>
            <p style={{ marginBottom: "1rem" }}>{product.description}</p>
          </div>

          <div className="product-price">
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              ₹{product.price}
            </span>

            {/* Stock Status */}
            <div style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              color: isOutOfStock ? '#dc3545' : '#28a745',
              margin: '15px 0'
            }}>
              {isOutOfStock ? (
                <span>❌ OUT OF STOCK</span>
              ) : (
                <span>✅ IN STOCK - {product.stockQuantity} units available</span>
              )}
            </div>

            <button
              className={`cart-btn ${isOutOfStock ? "disabled-btn" : ""}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: isOutOfStock ? "#ccc" : "#007bff",
                color: isOutOfStock ? "#666" : "white",
                border: "none",
                borderRadius: "5px",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                marginBottom: "1rem",
                marginTop: "10px"
              }}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <h6 style={{ marginBottom: "1rem" }}>
              Stock Quantity: 
              <i style={{ color: isOutOfStock ? '#dc3545' : 'green', fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
          </div>
        <div className="update-button-container">
  <button
    className="btn-update"
    onClick={handleEditClick}
    title="Update Product"
  >
    <span className="btn-icon">✏️</span>
    <span className="btn-text">Update</span>
  </button>

  <button
    className="btn-delete"
    onClick={deleteProduct}
    title="Delete Product"
  >
    <span className="btn-icon">🗑️</span>
    <span className="btn-text">Delete</span>
  </button>
</div>
        </div>
      </div>
    </>
  );
};

export default Product;