"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { SquarePlus } from "lucide-react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "@/app/_context/CartContext";

const MenuSection = ({ restaurant }) => {
  const { user } = useUser();
  const [menuItemList, setMenuItemList] = useState([]);
  const { updateCart, setUpdateCart } = useContext(CartContext);

  useEffect(() => {
    restaurant?.menu && filterMenu(restaurant?.menu[0].category);
  }, [restaurant]);

  const addToCartHandler = (menuitem) => {
    toast("Adding to cart...");
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      price: menuitem?.price,
      productDescription: menuitem?.description,
      productImage: menuitem?.productImage?.url,
      productName: menuitem?.name,
      restaurantSlug: restaurant.slug,
    };

    GlobalApi.AddToCart(data).then((resp) => {
      console.log(resp);
      resp && setUpdateCart(!updateCart);
      toast.success("Added to cart");
    });
  };
  const filterMenu = (cat) => {
    const result = restaurant.menu?.filter((item) => item.category === cat);
    setMenuItemList(result[0]);
  };
  return (
    <>
      <div className="grid grid-cols-4 mt-2">
        <div className="hidden md:flex flex-col">
          {restaurant.menu?.map((menuCat) => {
            return (
              <Button
                key={menuCat.id}
                variant="ghost"
                className="flex justify-start w-60 my-1"
                onClick={() => filterMenu(menuCat.category)}
              >
                {menuCat.category}
              </Button>
            );
          })}
        </div>
        <div className="col-span-4 md:col-span-3">
          <div>
            <h1 className="text-3xl font-bold mb-1">{menuItemList.category}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {menuItemList.menuItem?.map((menuitem) => {
                return (
                  <div
                    key={menuitem.id}
                    className="flex gap-3 p-2 items-center border rounded-xl hover:border-red-500 cursor-pointer"
                  >
                    <Image
                      src={menuitem?.productImage?.url}
                      width={150}
                      height={150}
                      alt={menuitem?.name}
                      className="h-[130px] w-[120px] object-cover rounded-lg"
                    />

                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold">{menuitem.name}</h2>
                      <h2>AED {menuitem.price}</h2>
                      <h2 className="text-gray-400 text-sm line-clamp-2">
                        {menuitem.description}
                      </h2>
                      <SquarePlus
                        onClick={() => addToCartHandler(menuitem)}
                        className="hover:scale-105 hover:text-green-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSection;
