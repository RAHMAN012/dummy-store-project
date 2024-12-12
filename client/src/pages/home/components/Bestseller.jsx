import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
export default function Bestseller({ products }) {
  const getPrices = products.map((product) => product.price);
  const maxPrice = Math.max(...getPrices);
  const minPrice = Math.min(...getPrices);
  const filterHighPrices = products?.filter(
    (product) => product.price == minPrice
  );
  const filterLowPrices = products?.filter(
    (product) => product.price == maxPrice
  );
  return (
    <div className="mt-16 max-w-[1024px] mx-auto ">
      <h1 className="font-semibold text-xl">Best Seller</h1>
      <div className="md:flex mt-6 items-center gap-10">
        {filterHighPrices.map((product) => (
          <div key={product._id} className="md:w-[50%] relative">
            <Link>
              <LazyLoadImage
                src={product.images[0]}
                alt={product.title}
                className="h-full  w-full"
                loading="lazy"
                effect="blur"
              />
            </Link>

            <p className="absolute top-1/2  text-xl font-bold px-4">
              {product.title}
            </p>
          </div>
        ))}
        {filterLowPrices.map((product) => (
          <div key={product._id} className="md:w-[50%] relative">
            <Link to={`/product/${product.title}`}>
              <LazyLoadImage
                src={product.images[0]}
                alt={product.title}
                className="h-full  w-full"
                loading="lazy"
                effect="blur"
              />
            </Link>

            <p className="absolute top-1/2  text-xl font-bold px-4">
              {product.title}
            </p>
          </div>
        ))}
      </div>
      {/* <div className="w-full flex justify-between absolute top-[50%]">
        <MdKeyboardArrowLeft
          onClick={() => scroll("left")}
          size="35px"
          className="cursor-pointer z-30 hover:bg-white"
        />
        <MdKeyboardArrowRight
          onClick={() => scroll("right")}
          size="35px"
          className="cursor-pointer z-30 hover:bg-white"
        />
      </div> */}
    </div>
  );
}
