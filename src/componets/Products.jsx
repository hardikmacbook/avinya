import React, { useEffect, useState } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => {
        setData(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="outer pt-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-[1200px] w-full px-4 py-6">
        <div className="product-inner">
          <div className="product-inner-content">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Products</h1>
            <div className="product-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((e) => (
                <div 
                  key={e.id} 
                  className="each-product-card bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-gray-300"
                >
                  
                  <div className="products-img w-full h-48 flex items-center justify-center mb-4 bg-gray-50 rounded-lg">
                    <img
                      className="max-w-full max-h-full object-contain"
                      src={e.images[0]}
                      alt={e.title}
                    />
                  </div>
                  
                  
                  <div className="product-content text-left">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                      {e.title.length > 20 ? e.title.slice(0, 20) + "..." : e.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {e.description.length > 60 ? e.description.slice(0, 60) + "..." : e.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-green-600">${e.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">{e.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {e.category}
                      </span>
                      <button className="bg-red-900 hover:bg-black text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer">
                        add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;