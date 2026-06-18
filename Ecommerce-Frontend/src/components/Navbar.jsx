// import React, { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import Home from "./Home"
// import axios from "axios";
// // import { json } from "react-router-dom";
// // import { BiSunFill, BiMoon } from "react-icons/bi";

// import AppContext from "../Context/Context";

// //<=================== cart ========================>
// const { cart } = useContext(AppContext);

// const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

// <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
//   <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem' }}></i>
  
//   {/* Cart Counter Badge */}
//   {totalCartItems > 0 && (
//     <span 
//       style={{
//         position: 'absolute',
//         top: '-10px',
//         right: '-10px',
//         backgroundColor: 'linear-gradient(135deg, #ff1744, #ff006e)',
//         color: 'white',
//         borderRadius: '50%',
//         width: '26px',
//         height: '26px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: '0.9rem',
//         fontWeight: 'bold',
//         animation: 'pulse 2s infinite',
//         boxShadow: '0 0 12px rgba(255, 23, 68, 0.6)',
//         border: '2px solid white'
//       }}
//     >
//       {totalCartItems}
//     </span>
//   )}
// </Link>


// const Navbar = ({ onSelectCategory, onSearch }) => {
//   const getInitialTheme = () => {
//     const storedTheme = localStorage.getItem("theme");
//     return storedTheme ? storedTheme : "light-theme";
//   };
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [theme, setTheme] = useState(getInitialTheme());
//   const [input, setInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [showSearchResults,setShowSearchResults] = useState(false)
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async (value) => {
//     try {
//       const response = await axios.get("http://localhost:8081/api/products");
//       setSearchResults(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = async (value) => {
//     setInput(value);
//     if (value.length >= 1) {
//       setShowSearchResults(true)
//     try {
//       const response = await axios.get(
//         `http://localhost:8081/api/products/search?keyword=${value}`
//       );
//       setSearchResults(response.data);
//       setNoResults(response.data.length === 0);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error searching:", error);
//     }
//     } else {
//       setShowSearchResults(false);
//       setSearchResults([]);
//       setNoResults(false);
//     }
//   };

  
//   // const handleChange = async (value) => {
//   //   setInput(value);
//   //   if (value.length >= 1) {
//   //     setShowSearchResults(true);
//   //     try {
//   //       let response;
//   //       if (!isNaN(value)) {
//   //         // Input is a number, search by ID
//   //         response = await axios.get(`http://localhost:8080/api/products/search?id=${value}`);
//   //       } else {
//   //         // Input is not a number, search by keyword
//   //         response = await axios.get(`http://localhost:8080/api/products/search?keyword=${value}`);
//   //       }

//   //       const results = response.data;
//   //       setSearchResults(results);
//   //       setNoResults(results.length === 0);
//   //       console.log(results);
//   //     } catch (error) {
//   //       console.error("Error searching:", error.response ? error.response.data : error.message);
//   //     }
//   //   } else {
//   //     setShowSearchResults(false);
//   //     setSearchResults([]);
//   //     setNoResults(false);
//   //   }
//   // };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     onSelectCategory(category);
//   };
//   const toggleTheme = () => {
//     const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const categories = [
//     "Laptop",
//     "Headphone",
//     "Mobile",
//     "Electronics",
//     "Toys",
//     "Fashion",
//   ];
//   return (
//     <>
//       <header>
//         <nav className="navbar navbar-expand-lg fixed-top">
//           <div className="container-fluid">
//             <a className="navbar-brand" href="https://www.linkedin.com/in/shreya-shruti-31a512373/">
//               TechKart
//             </a>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <a className="nav-link active" aria-current="page" href="/">
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="/add_product">
//                     Add Product
//                   </a>
//                 </li>

//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="/"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Categories
//                   </a>

//                   <ul className="dropdown-menu">
//                     {categories.map((category) => (
//                       <li key={category}>
//                         <button
//                           className="dropdown-item"
//                           onClick={() => handleCategorySelect(category)}
//                         >
//                           {category}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>

//                 <li className="nav-item"></li>
//               </ul>
//               <button className="theme-btn" onClick={() => toggleTheme()}>
//                 {theme === "dark-theme" ? (
//                   <i className="bi bi-moon-fill"></i>
//                 ) : (
//                   <i className="bi bi-sun-fill"></i>
//                 )}
//               </button>
//               <div className="d-flex align-items-center cart">
//                 <a href="/cart" className="nav-link text-dark">
//                   <i
//                     className="bi bi-cart me-2"
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     Cart
//                   </i>
//                 </a>
//                 {/* <form className="d-flex" role="search" onSubmit={handleSearch} id="searchForm"> */}
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                   value={input}
//                   onChange={(e) => handleChange(e.target.value)}
//                   onFocus={() => setSearchFocused(true)} // Set searchFocused to true when search bar is focused
//                   onBlur={() => setSearchFocused(false)} // Set searchFocused to false when search bar loses focus
//                 />
//                 {showSearchResults && (
//                   <ul className="list-group">
//                     {searchResults.length > 0 ? (  
//                         searchResults.map((result) => (
//                           <li key={result.id} className="list-group-item">
//                             <a href={`/product/${result.id}`} className="search-result-link">
//                             <span>{result.name}</span>
//                             </a>
//                           </li>
//                         ))
//                     ) : (
//                       noResults && (
//                         <p className="no-results-message">
//                           No Prouduct with such Name
//                         </p>
//                       )
//                     )}
//                   </ul>
//                 )}
//                 {/* <button
//                   className="btn btn-outline-success"
//                   onClick={handleSearch}
//                 >
//                   Search Products
//                 </button> */}
//                 {/* </form> */}
//                 <div />
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;


import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Navbar = ({ onSelectCategory, onSearch }) => {
  const { cart } = useContext(AppContext);

  const totalCartItems = cart?.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  ) || 0;

  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/products"
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);

    if (value.length >= 1) {
      setShowSearchResults(true);

      try {
        const response = await axios.get(
          `http://localhost:8081/api/products/search?keyword=${value}`
        );

        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "dark-theme"
        ? "light-theme"
        : "dark-theme";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              TechKart
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/add_product"
                  >
                    Add Product
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>

                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleCategorySelect(category)
                          }
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <button
                className="theme-btn"
                onClick={toggleTheme}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <div className="d-flex align-items-center cart">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={input}
                  onChange={(e) =>
                    handleChange(e.target.value)
                  }
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />

                {showSearchResults && (
                  <ul
                    className="list-group"
                    style={{
                      position: "absolute",
                      top: "60px",
                      zIndex: 1000,
                      width: "300px",
                    }}
                  >
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="list-group-item"
                        >
                          <Link
                            to={`/product/${result.id}`}
                            className="search-result-link"
                          >
                            {result.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <li className="list-group-item">
                          No Product Found
                        </li>
                      )
                    )}
                  </ul>
                )}

                <Link
                  to="/cart"
                  style={{
                    position: "relative",
                    display: "inline-block",
                    textDecoration: "none",
                    color: "inherit",
                    marginLeft: "15px",
                  }}
                >
                  <i
                    className="bi bi-cart-fill"
                    style={{
                      fontSize: "1.6rem",
                    }}
                  ></i>

                  {totalCartItems > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-12px",
                        background:
                          "linear-gradient(135deg,#ff1744,#ff006e)",
                        color: "white",
                        borderRadius: "50%",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow:
                          "0 0 10px rgba(255,23,68,0.5)",
                      }}
                    >
                      {totalCartItems > 99
                        ? "99+"
                        : totalCartItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

