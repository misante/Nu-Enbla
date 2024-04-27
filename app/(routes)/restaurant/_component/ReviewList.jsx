import Image from "next/image";
import React from "react";
import moment from "moment";
import { Rating as ReactRating } from "@smastrom/react-rating";

const ReviewList = ({ reviewList }) => {
  return (
    <>
      {reviewList.map((review) => {
        return (
          <>
            <div
              key={review.id}
              className="p-3 border shadow-lg rounded-lg bg-white mb-2 hover:scale-105 transition-all duration-1000"
            >
              <div className="flex gap-2 items-center">
                <Image
                  className="rounded-full"
                  src={review.userImage}
                  width={30}
                  height={30}
                  alt="user Image"
                />
                <div className="flex flex-col">
                  <p className="capitalize">{review.reviewText}</p>
                  <div className="flex gap-3 text-gray-400 text-sm">
                    <h3> {review.userName}</h3>
                    <p>{moment(review.createdAt).format("DD-MMM-YYYY")}</p>
                  </div>
                  <ReactRating
                    style={{ maxWidth: 100 }}
                    value={review.star}
                    isDisabled={true}
                  />
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ReviewList;
