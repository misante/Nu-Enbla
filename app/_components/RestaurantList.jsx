"use client";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import RestaurantItem from "./RestaurantItem";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
import { CartContext } from "../_context/CartContext";

const RestaurantList = () => {
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateCart, setUpdateCart } = useContext(CartContext);

  useEffect(() => {
    getRestaurantList("all");
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.get("category"));
    params && getRestaurantList(params.get("category"));
  }, [params]);

  const getRestaurantList = (category_) => {
    setLoading(true);
    GlobalApi.getRestaurant(category_).then((resp) => {
      setRestaurants(resp.restaurants);
      setLoading(false);
    });
  };

  return (
    <>
      <h1 className="text-center font-extrabold text-amber-600 capitalize">
        popular {selectedCategory} restaurants
      </h1>
      <h3 className="capitalize text-center">
        {restaurants.length} restaurants found
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {restaurants &&
          restaurants.map((restaurant, index) => {
            return (
              <>
                <div
                  key={index}
                  className="border hover:border-red-500 rounded-lg hover:bg-yellow-100 hover:shadow-black-700 transition-all duration-700 cursor-pointer"
                >
                  {!loading ? (
                    <Link href={"/restaurant/" + restaurant?.slug}>
                      <RestaurantItem restaurant={restaurant} />
                    </Link>
                  ) : (
                    <LoadingSkeleton />
                  )}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default RestaurantList;
