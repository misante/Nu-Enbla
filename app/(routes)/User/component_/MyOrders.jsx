"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MyOrders = () => {
  const { user } = useUser();
  const [myOrderList, setMyOrderList] = useState([]);
  useEffect(() => {
    user && my_orders();
  }, [user]);

  const my_orders = () => {
    GlobalApi.getMyOrders(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        setMyOrderList(resp.orders);
      }
    );
  };
  return (
    <>
      <div className="flex justify-between items-center px-3">
        <h1 className="font-bold text-2xl capitalize text-green-500">
          my orders
        </h1>
        <p className="text-sm text-red-300">{myOrderList.length} Orders</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
        {myOrderList.map((orderList) => {
          return (
            <>
              <div
                key={orderList.id}
                className="flex flex-col border my-2 rounded-lg px-2 shadow-lg"
              >
                <div>
                  <h2 className="font-bold mb-1">
                    {moment(orderList.createdAt).format("DD - MMM - YYYY")}
                  </h2>
                </div>
                <h2 className="text-sm flex justify-between my-0.5">
                  Order Amount <span>AED {orderList.orderAmount}</span>
                </h2>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="pt-1">
                      <h2 className="text-red-600 text-sm underline">
                        Order Detail
                      </h2>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col">
                        {orderList.orderDetail.map((singleOrder) => {
                          return (
                            <>
                              <h2 className="flex justify-between text-sm my-0.5">
                                {singleOrder.productName}
                                <span className="text-xs">
                                  AED {singleOrder.price}
                                </span>
                              </h2>
                            </>
                          );
                        })}
                        <h2 className="text-xs font-bold flex justify-between my-0.5">
                          Total (incl. tax and delivery)
                          <span className="text-xs">
                            AED {orderList.orderAmount}
                          </span>
                        </h2>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyOrders;
