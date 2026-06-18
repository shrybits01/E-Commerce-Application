// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import AppContext from "../Context/Context";
// import unplugged from "../assets/unplugged.png"

// const Home = ({ selectedCategory }) => {
//   const { data, isError, addToCart, refreshData } = useContext(AppContext);
//   const [products, setProducts] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     if (!isDataFetched) {
//       refreshData();
//       setIsDataFetched(true);
//     }
//   }, [refreshData, isDataFetched]);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const fetchImagesAndUpdateProducts = async () => {
//         const updatedProducts = await Promise.all(
//           data.map(async (product) => {
//             try {
//               const response = await axios.get(
//                 `http://localhost:8081/api/product/${product.id}/image`,
//                 { responseType: "blob" }
//               );
//               const imageUrl = URL.createObjectURL(response.data);
//               return { ...product, imageUrl };
//             } catch (error) {
//               console.error(
//                 "Error fetching image for product ID:",
//                 product.id,
//                 error
//               );
//               return { ...product, imageUrl: "placeholder-image-url" };
//             }
//           })
//         );
//         setProducts(updatedProducts);
//       };

//       fetchImagesAndUpdateProducts();
//     }
//   }, [data]);

//   const filteredProducts = selectedCategory
//     ? products.filter((product) => product.category === selectedCategory)
//     : products;

//   if (isError) {
//     return (
//       <h2 className="text-center" style={{ padding: "18rem" }}>
//       <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }}/>
//       </h2>
//     );
//   }
//   return (
//     <>
//       <div
//         className="grid"
//         style={{
//           marginTop: "64px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
//         {filteredProducts.length === 0 ? (
//           <h2
//             className="text-center"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             No Products Available
//           </h2>
//         ) : (
//           filteredProducts.map((product) => {
//             const { id, brand, name, price, productAvailable, imageUrl } =
//               product;
//             const cardStyle = {
//               width: "18rem",
//               height: "12rem",
//               boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
//               backgroundColor: productAvailable ? "#fff" : "#ccc",
//             };
//             return (
//               <div
//                 className="card mb-3"
//                 style={{
//                   width: "250px",
//                   height: "360px",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                   borderRadius: "10px",
//                   overflow: "hidden", 
//                   backgroundColor: productAvailable ? "#fff" : "#ccc",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent:'flex-start',
//                   alignItems:'stretch'
//                 }}
//                 key={id}
//               >
//                 <Link
//                   to={`/product/${id}`}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <img
//                     src={imageUrl}
//                     alt={name}
//                     style={{
//                       width: "100%",
//                       height: "150px", 
//                       objectFit: "cover",  
//                       padding: "5px",
//                       margin: "0",
//                       borderRadius: "10px 10px 10px 10px", 
//                     }}
//                   />
//                   <div
//                     className="card-body"
//                     style={{
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <h5
//                         className="card-title"
//                         style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
//                       >
//                         {name.toUpperCase()}
//                       </h5>
//                       <i
//                         className="card-brand"
//                         style={{ fontStyle: "italic", fontSize: "0.8rem" }}
//                       >
//                         {"~ " + brand}
//                       </i>
//                     </div>
//                     <hr className="hr-line" style={{ margin: "10px 0" }} />
//                     <div className="home-cart-price">
//                       <h5
//                         className="card-text"
//                         style={{ fontWeight: "600", fontSize: "1.1rem",marginBottom:'5px' }}
//                       >
//                         <i class="bi bi-currency-rupee"></i>
//                         {price}
//                       </h5>
//                     </div>
//                     <button
//                       className="btn-hover color-9"
//                       style={{margin:'10px 25px 0px '  }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         addToCart(product);
//                       }}
//                       disabled={!productAvailable}
//                     >
//                       {productAvailable ? "Add to Cart" : "Out of Stock"}
//                     </button> 
//                   </div>
//                 </Link>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png"

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8081/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { 
                ...product, 
                imageUrl: "https://via.placeholder.com/250x150?text=No+Image" 
              };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Delete Product Function
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?'))  {
      try {
        await axios.delete(`http://localhost:8081/api/product/${productId}`);
        setProducts(products.filter(p => p.id !== productId));
        alert('Product successfully deleted');
        refreshData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
        <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }}/>
      </h2>
    );
  }

  return (
    <>
      <div
        className="grid"
        style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl, stockQuantity } =
              product;
            
            const isOutOfStock = !productAvailable || stockQuantity === 0;

            return (
              <div
                className={`product-card-wrapper ${isOutOfStock ? 'out-of-stock' : ''}`}
                key={id}
              >
                <div
                  className="card mb-3"
                  style={{
                    width: "250px",
                    height: "360px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    backgroundColor: productAvailable ? "#fff" : "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    opacity: isOutOfStock ? 0.7 : 1,
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* Image Container with Badge */}
                  <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                    <Link
                      to={`/product/${id}`}
                      style={{ textDecoration: "none", color: "inherit", display: 'block', height: '100%' }}
                    >
                      <img
                        src={imageUrl}
                        alt={name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",  
                          padding: "5px",
                          margin: "0",
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/250x150?text=No+Image";
                        }}
                      />
                    </Link>

                    {/* Out of Stock Badge */}
                    {isOutOfStock && (
                      <div className="out-of-stock-badge">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <Link
                      to={`/product/${id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div>
                        <h5
                          className="card-title"
                          style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                        >
                          {name.toUpperCase()}
                        </h5>
                        <i
                          className="card-brand"
                          style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                        >
                          {"~ " + brand}
                        </i>
                      </div>
                    </Link>

                    <hr className="hr-line" style={{ margin: "10px 0" }} />

                    {/* Stock Info */}
                    <div style={{ fontSize: '0.85rem', color: isOutOfStock ? '#dc3545' : '#28a745', marginBottom: '5px' }}>
                      {isOutOfStock ? (
                        <strong>❌ Out of Stock</strong>
                      ) : (
                        <strong>✅ In Stock ({stockQuantity})</strong>
                      )}
                    </div>

                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: '5px' }}
                      >
                        <i className="bi bi-currency-rupee"></i>
                        {price}
                      </h5>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button
                        className="btn-hover color-9"
                        style={{
                          margin: '0',
                          flex: 1,
                          opacity: isOutOfStock ? 0.5 : 1,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={isOutOfStock}
                      >
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteProduct(id)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '1.1rem',
                          transition: 'background-color 0.3s',
                          height: '45px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                        title="Delete Product"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;