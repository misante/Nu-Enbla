"use client";
import Image from "next/image";
import MapPin from "./MapPin";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/_context/CartContext";

const RestroDetail = ({ restaurant }) => {
  const [totalReview, setTotalReview] = useState();
  const [averageReview, setAverageReview] = useState();
  const { updateCart, setUpdateCart } = useContext(CartContext);

  useEffect(() => {
    setUpdateCart(!updateCart);
  }, []);
  useEffect(() => {
    restaurant && CalculateRating();
  }, [restaurant]);

  const CalculateRating = () => {
    let total = 0;
    let count = 0;
    restaurant?.reviews?.forEach((item) => {
      total = total + item.star;
      count++;
    });
    const result = total / count;
    setAverageReview(result ? result.toFixed(1) : 5.0);
    setTotalReview(count);
  };

  return (
    <>
      {restaurant?.banner?.url ? (
        <Image
          src={restaurant?.banner?.url}
          width={1000}
          height={400}
          className="w-full h-[220px] object-cover rounded-lg"
          alt={restaurant.name}
        />
      ) : (
        <div className="w-full h-[220px] object-cover rounded-lg bg-slate-600 animate-pulse"></div>
      )}
      <div className=" ml-3 my-2">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        <div className="flex items-center text-sm text-gray-400 my-1.5">
          <Image
            src="/star.png"
            width={15}
            height={15}
            alt="review"
            className="pr-1"
          />
          <label>
            {averageReview}
            <span className="ml-2">({totalReview})</span>
          </label>
        </div>
        <div className="flex items-center">
          <MapPin />
          <p>{restaurant.address}</p>
        </div>
      </div>
    </>
  );
};

export default RestroDetail;
