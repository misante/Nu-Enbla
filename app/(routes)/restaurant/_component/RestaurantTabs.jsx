import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from "./MenuSection";
import Reviews from "./Reviews";

const RestaurantTabs = ({ restaurant }) => {
  return (
    <div>
      <Tabs defaultValue="category" className="w-full">
        <TabsList>
          <TabsTrigger value="category">category</TabsTrigger>
          <TabsTrigger value="aboutUs">about Us</TabsTrigger>
          <TabsTrigger value="reviews">reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="flex w-full ml-3">
          <MenuSection restaurant={restaurant} />;
        </TabsContent>
        <TabsContent value="aboutUs" className="px-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt
          maxime unde eveniet. Nisi dolorem et facilis, iste pariatur,
          aspernatur perspiciatis excepturi ipsum culpa atque suscipit
          veritatis. Sint, deserunt voluptatem velit non recusandae soluta
          voluptas enim aliquid veniam officia, quo temporibus culpa beatae
          earum. Impedit iste laudantium neque fugit quas nisi. Dolore,
          laudantium minima optio tenetur aut veritatis officiis nulla ipsa
          facere sit consectetur, alias libero nostrum recusandae maxime vero
          inventore doloribus modi aliquid? Tenetur sed repudiandae placeat
          accusamus laudantium deleniti quod labore odio delectus illum! Impedit
          ex voluptate quaerat consectetur perferendis. Commodi ipsa rerum
          voluptatum nulla magnam hic dicta.
        </TabsContent>
        <TabsContent value="reviews">
          <Reviews restaurant={restaurant} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RestaurantTabs;
