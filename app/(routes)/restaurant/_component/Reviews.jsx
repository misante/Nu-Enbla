"use client";
import { useEffect, useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ReviewList from "./ReviewList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

const Reviews = ({ restaurant }) => {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState();
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getReviewList();
  }, [restaurant]);
  const submitReview = () => {
    const data = {
      userName: user?.fullName,
      email: user.primaryEmailAddress.emailAddress,
      userImage: user?.imageUrl,
      star: rating,
      reviewText: reviewText,
      restaurantSlug: restaurant.slug,
    };
    GlobalApi.addReview(data).then((resp) => {
      console.log(resp);
      toast("New Review Added");
      getReviewList();
    });
  };
  const getReviewList = () => {
    GlobalApi.getReviews(restaurant.slug).then((resp) => {
      setReviewList(resp.reviews);
    });
  };
  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-3 mx-5">
        <div className="col-span-1 mr-5 ">
          <div className="border shadow-lg">
            <ReactRating
              className="mb-3"
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <Button
            className="bg-green-500 w-full hover:bg-green-400 hover:text-uppercase my-3 text-lg font-bold"
            onClick={submitReview}
          >
            Submit
          </Button>
        </div>
        {reviewList.length === 0 ? (
          <div className="flex justify-center py-10 mx-5 w-full col-span-2 pr-5 border rounded-lg">
            <h1 className="text-2xl">No Review yet</h1>
          </div>
        ) : (
          <div className="w-full col-span-2 pr-5 rounded-lg">
            <ReviewList reviewList={reviewList} />
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
