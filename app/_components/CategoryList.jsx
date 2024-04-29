"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CartContext } from "../_context/CartContext";

const CategoryList = () => {
  const listRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const params = useSearchParams();
  const { updateCart, setUpdateCart } = useContext(CartContext);

  useEffect(() => {
    setSelectedCategory(params.get("category"));
  }, [params]);

  useEffect(() => {
    getCategoryList();
    setUpdateCart(!updateCart);
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategories().then((resp) => {
      setCategory(resp.categories);
    });
  };
  const scrollHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  const scrollHandlerLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="relative mb-10">
        <h1 className="my-6 flex justify-center font-extrabold text-red-500">
          Choose from the Categories
        </h1>
        <div
          className="flex gap-3 overflow-auto scrollbar-hide px-15 sm:px-10"
          ref={listRef}
        >
          {category &&
            category.map((cat) => {
              return (
                <Link
                  href={"?category=" + cat.slug}
                  key={cat.id}
                  className={`flex flex-col min-w-36 items-center border rounded-xl border-red-300 cursor-pointer hover:shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-400 ${
                    selectedCategory == cat.slug &&
                    "bg-orange-100 border-red-400"
                  }`}
                >
                  <Image
                    src={cat.icon?.url}
                    width={40}
                    height={30}
                    alt={cat.name}
                    className="h-[40px] w-[60px] object-cover"
                  />

                  <h2 className="capitalize text-xs font-bold">{cat.name}</h2>
                </Link>
              );
            })}
        </div>
        <Image
          src="/arrow_small.png"
          alt="scroll"
          width={40}
          height={40}
          className="cursor-pointer right-0 top-16 absolute"
          onClick={() => scrollHandler()}
        />
        <Image
          src="/arrow_small.png"
          alt="scroll"
          width={40}
          height={40}
          className="cursor-pointer left-0 top-16 absolute rotate-180 text-gray-400"
          onClick={() => scrollHandlerLeft()}
        />
      </div>
    </>
  );
};
export default CategoryList;
