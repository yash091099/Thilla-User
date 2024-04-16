import React, { useContext, useEffect, useState } from "react";
import P1 from "../assets/products/P1.png";
import P2 from "../assets/products/P2.png";
import P3 from "../assets/products/P3.png";
import P4 from "../assets/products/P4.png";
import P5 from "../assets/products/P5.png";
import store from "../assets/stores/S2.png";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { getProductsByStores } from "../context/services/stores";
import CustomLoader from "../components/loader";
import Context from "../context/AppContext";
export default function Store() {


  const { showProductModal,storeId, setShowProductModal, searchInputProductNavbar } =
    useContext(Context);

    console.log(storeId,'-------------------------------store id ')
  const [displayType, setDisplayType] = useState(storeId||1);
  const [storeData, setStoreData] = useState({});
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
      return () => {
        localStorage.setItem('storeId', storeId);
      }
  },[])
  useEffect(() => {
    const fetchData = async () => {
      if(!storeId) return;
      setLoading(true);
      try {
        const response = await getProductsByStores(storeId||1);
        if (response?.data?.success) {
          setStoreData(response?.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const storeCategories = storeData?.categories?.map(
    (category) => category?.name
  );
  const [productCategory, setProductCategory] = useState();

  useEffect(() => {
    setProductCategory(storeCategories?.[0]);
  }, [storeData]);

  function catButton(category) {
    return (
      <button
        className={`text-left text-text text-[16px] font-[500] px-[16px] py-[4px] rounded-[6px] ${
          productCategory === category ? "bg-primary-brand" : ""
        }`}
        onClick={() => {
          setProductCategory(category);
        }}
      >
        {category}
      </button>
    );
  }
  useEffect(() => {
    console.log(searchInputProductNavbar, "pr-----------------------------------------oductCategory");
    if (productCategory && storeData.categories) {
      const category = storeData.categories.find(
        (cat) => cat.name === productCategory
      );
      let products = category ? category.products : [];
      console.log(products, "products");
      // If there's search input, filter the products by matching names
      if (searchInputProductNavbar) {
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(searchInputProductNavbar.toLowerCase())
        );
      }

      setFilteredProducts(products);
    }
  }, [productCategory, storeData.categories, searchInputProductNavbar]);

  return (
    <div className="max-w-[1433px] mx-auto mb-[79px] px-[24px]">
      {loading && <CustomLoader />}
      <div className="hidden md:flex justify-start w-full mt-[32px] mb-[24px] px-[32px]">
        <p className="text-[#A5A5A5] text-[14px] font-[400]">
          Showing {filteredProducts?.length} of {filteredProducts?.length} item(s)
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:gap-[64px]">
        <div className="md:w-1/4">
          <div className="flex flex-col gap-[8px] p-[24px] border-2 border-light-background rounded-md shadow-md">
            <div className="flex flex-col justify-center items-center gap-[8px]">
              <img
                className="w-[40px]"
                src={
                  storeData?.store?.front_photo
                    ? storeData?.store?.front_photo?.startsWith("http")
                      ? storeData.store.front_photo
                      : `https://thilaa.jethitech.com/storage/${storeData.store.front_photo}`
                    : P1
                }
                alt="store image"
              />

              <div className="flex flex-col items-center gap-[4px]">
                <h1 className="text-text text-[16px] font-[500]">
                  {storeData?.store?.name}
                </h1>
                <p className="text-center text-text text-[12px] font-[400]">
                  {storeData?.store?.address_line_1},
                  {storeData?.store?.address_line_2}
                </p>
                {storeData?.store?.pincode ? (
                  <p className="text-center text-text text-[12px] font-[400]">
                    {storeData?.store?.coutry} {storeData?.store?.state},
                    {storeData?.store?.city},({storeData?.store?.pincode})
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-[8px]">
              {storeCategories?.map((item) => catButton(item))}
            </div>
            <div className="md:hidden px-[24px]">
              <select
                className="w-full"
                onChange={(e) => {
                  setProductCategory(e.target.value);
                }}
              >
                {storeCategories?.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="">
          <div className="md:hidden py-[16px] px-[32px]">
            <p className="text-[#A5A5A5] text-[14px] font-[400]">
              Showing 1-12 of 50 item(s)
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[12px] justify-content-center w-full">
            {filteredProducts.map((product) => (
              <ProductCard
              product={product}
                key={product?.id}
                p_id={product?.id}
                name={product?.name}
                price={product?.price}
                image={`${product?.image}`}
                stock_available={product?.stock_available}
                openProduct={setShowProductModal}
              />
            ))}
            {!filteredProducts.length && (
              <div className="flex justify-center mt-[24px] w-full">
                <p className="text-[#A5A5A5] text-center text-[14px] font-[400]">
                  No products found
                </p>
              </div>
            )}
          </div>
          {filteredProducts.length > 20 && (
            <div className="flex justify-center mt-[24px]">
              <button
                className="bg-text text-white text-[16px] font-500 px-[32px] py-[16px] rounded-[6px]"
                onClick={() => {}}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
      {showProductModal && <ProductModal onClose={setShowProductModal} />}
    </div>
  );
}
