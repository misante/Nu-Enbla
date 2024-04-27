"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import RestroDetail from "../_component/RestroDetail";
import RestaurantTabs from "../_component/RestaurantTabs";

const RestaurantDetail = () => {
  const params = usePathname();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    getRestaurantDetails(params.split("/")[2]);
  }, [params]);

  const getRestaurantDetails = (restSlug) => {
    GlobalApi.getRestaurantDetail(restSlug).then((resp) => {
      setRestaurant(resp.restaurant);
    });
  };
  return (
    <>
      <RestroDetail restaurant={restaurant} />
      <RestaurantTabs restaurant={restaurant} />
    </>
  );
};
export default RestaurantDetail;
