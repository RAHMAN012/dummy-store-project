import { Link } from "react-router-dom";
export default function Banner() {
  return (
    <div className=" relative banner    mt-[7rem]">
      <div className=" absolute top-[5%] left-[27%]  z-30 text-center">
        <h1 className="text-[5rem] mb-[2rem]">Summer Hiking</h1>
        <p className="text-[1.25rem] font-semibold mb-10">
          the designed for lightness, functionality and maximal versatility.
        </p>
        <Link className="border-[#fff] border-[1px] px-8 py-3 hover:text-[#333] hover:bg-[#fff] transition">
          Explore
        </Link>
      </div>
      <div className="relative  h-[300px]">
        <div className="h-[100%] w-[100%] overlay absolute "></div>
        <img
          src="https://api.houdinisportswear.com/_images/261a0ee7-f6e2-4c86-8789-173795568eb3/S24_Summer-Hiking-banner-horizontal.jpg?width=1920&quality=90"
          alt="banner"
          className="w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
}
