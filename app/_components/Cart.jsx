"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalApi from "../_utils/GlobalApi";
import { CartContext } from "../_context/CartContext";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Cart = ({ userCart }) => {
  const { user } = useUser;
  const { updateCart, setUpdateCart } = useContext(CartContext);

  const CalculateTotal = () => {
    let total = 0;
    userCart.forEach((item) => {
      total += item.price;
    });
    return total;
  };
  const removeCartRecord = (id) => {
    GlobalApi.RemoveRestaurant(id).then((resp) => {
      if (resp) {
        GlobalApi.deleteCartItem(id).then((resp) => {
          if (resp) {
            toast("Item Removed");
            setUpdateCart(!updateCart);
          }
        });
      }
    });
  };
  return (
    <div>
      {userCart.length === 0 ? (
        <div>
          <h1 className="font-bold text-2xl">Your Cart Is Empty</h1>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-center text-lg font-bold">
              {userCart[0]?.restaurant?.name}
            </h1>
            <h2 className="text-center underline">My Order</h2>
          </div>

          {userCart?.map((singleCart) => {
            return (
              <>
                <div className="flex mx-3 items-center justify-between px-3">
                  <div key={singleCart.id} className="flex items-center gap-2">
                    <Image
                      src={singleCart.productImage}
                      width={60}
                      height={60}
                      alt={singleCart.productName}
                      className="my-2 w-[60px] h-[60px]"
                    />
                    <h3 className="mx-3">{singleCart.productName}</h3>
                  </div>
                  <div className="flex gap-3">
                    <h3 className="font-bold">AED{singleCart.price}</h3>
                    <X
                      className="text-red-600 cursor-pointer hover:scale-75"
                      onClick={() => removeCartRecord(singleCart.id)}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <Link href={"/checkout?restaurant=" + userCart[0].restaurant.slug}>
            <Button className="bg-yellow-600 flex justify-center w-full">
              Checkout AED {CalculateTotal()}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
