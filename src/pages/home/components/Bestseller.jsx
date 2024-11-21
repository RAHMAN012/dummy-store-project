import { ProductCard } from "../../../components";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import useScroll from "../../../hooks/useScroll";

export default function Bestseller({products}) {
  const {scroll,scrollRef} = useScroll()
    const filterHighPrices = products?.filter((product) => 
     product.price > 50   )    
  return (
    <div className="mt-10 max-w-[1024px] mx-auto relative" >
      <h1 className="font-semibold text-xl">Best Sellers</h1>
      <div className="mt-6 flex gap-6  overflow-scroll scrollbar" ref={scrollRef}>
         { filterHighPrices?.map((item) => (
          <div key={item.id}>
            <ProductCard  item={item}/>
          </div>
         ))}         
      </div>
      <div className="w-full flex justify-between absolute top-[50%]">
          <MdKeyboardArrowLeft onClick={() => scroll("left")} size="35px" className="cursor-pointer z-30 hover:bg-white" />
          <MdKeyboardArrowRight onClick={() => scroll("right")} size="35px" className="cursor-pointer z-30 hover:bg-white"/>
         </div>
    </div>
  )
}
