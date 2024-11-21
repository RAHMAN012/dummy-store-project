import { ProductCard } from "../../../components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useScroll from "../../../hooks/useScroll";

export default function Recommended({ recommendedProducts }) {
  const { scroll, scrollRef } = useScroll();
  return (
    <div className="mt-10 max-w-[1024px] mx-auto relative">
      <h1 className="font-semibold text-xl">Recommended Products</h1>
      <div
        className="mt-6 flex gap-6  overflow-scroll scrollbar"
        ref={scrollRef}
      >
        {recommendedProducts?.map((item) => (
          <div key={item.id}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between absolute top-[50%]">
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
      </div>
    </div>
  );
}