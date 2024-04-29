import Image from "next/image";

const RestaurantItem = ({ restaurant }) => {
  const CalculateRating = () => {
    let total = 0;
    let count = 0;
    restaurant.reviews.forEach((item) => {
      total = total + item.star;
      count++;
    });
    const result = total / count;
    return result ? result.toFixed(1) : 5.0;
  };
  return (
    <>
      <Image
        src={restaurant.banner.url}
        width={500}
        height={200}
        alt={restaurant.name}
        className="h-[200px] object-cover border rounded-lg hover:object-center transition-all duration-1000"
      />
      <h3 className="text-md text-center font-extrabold">{restaurant.name}</h3>
      <div className="flex justify-center items-center ">
        <div className="flex gap-1 object-cover">
          <Image
            src="/star.png"
            width={15}
            height={15}
            alt="review"
            className="h-[13px] w-auto object-cover"
          />
          <h4 className="text-xs">{CalculateRating()}</h4>
          <label className="text-gray-500 text-xs">
            {restaurant.restaurantType[0]}
          </label>
        </div>
        {/* <h3 className="text-sm font-bold px-2">
          {restaurant.categories[0].name}
        </h3> */}
      </div>
    </>
  );
};

export default RestaurantItem;
