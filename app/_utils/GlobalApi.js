import { request, gql } from "graphql-request";

// const { gql, default: request } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const getCategories = async () => {
  const query = gql`
    query categories {
      categories(first: 50) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getRestaurant = async (category) => {
  const query =
    gql`
    query getRestaurant {
      restaurants(where: { categories_some: { slug: "` +
    category +
    `" } }) {
        address
        id
        name
        restaurantType
        slug
        banner {
          url
        }
        categories {
          name
        }
        aboutUs
        workingHours
    reviews {
      star
    }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getRestaurantDetail = async (restaurantSlug) => {
  const query =
    gql`
    query RestaurantDetail {
      restaurant(where: { slug: "` +
    restaurantSlug +
    `" }) {
        address
        banner {
          url
        }
        categories {
          id
          name
          slug
        }
        id
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
        name
        restaurantType
        slug
        workingHours
        aboutUs
            reviews {
      star
    }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const AddToCart = async (data) => {
  const query =
    gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "` +
    data.email +
    `", price: ` +
    data.price +
    `, productDescription: "` +
    data.productDescription +
    `", productImage: "` +
    data.productImage +
    `", productName: "` +
    data.productName +
    `",restaurant: {connect: {slug: "` +
    data.restaurantSlug +
    `"}}} 
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
    `;
  const result = await request(MASTER_URL, query);
  return result;
};
const GetUserCart = async (userEmail, slug) => {
  const query =
    gql`
    query GetUserCart {
      userCarts(where: { email: "` +
    userEmail +
    `" , restaurant: {slug: "` +
    slug +
    `"}}, first: 50) {
        email
        id
        price
        productDescription
        productImage
        productName
        restaurant {
        name
        slug
        banner {
          url
      }
    }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const RemoveRestaurant = async (id) => {
  const query =
    gql`
    mutation DisconnectRestaurant {
      updateUserCart(
        data: { restaurant: { disconnect: true } }
        where: { id: "` +
    id +
    `" }
      ){id}
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const deleteCartItem = async (id) => {
  const query =
    gql`
    mutation DeleteItemFromCart {
      deleteUserCart(where: { id: "` +
    id +
    `" }) {
        id
      }

    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const addReview = async (data) => {
  const query =
    gql`
    mutation AddNewReview {
      createReview(
        data: {
          userName: "` +
    data.userName +
    `"
          email: "` +
    data.email +
    `"
          reviewText: "` +
    data.reviewText +
    `"
          star: ` +
    data.star +
    `

          userImage: "` +
    data.userImage +
    `"

          restaurant: { connect: { slug: "` +
    data.restaurantSlug +
    `" } }
        }
      ) {
        id
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const getReviews = async (slug) => {
  const query =
    gql`
    query GetRestaurantReview {
      reviews(where: { restaurant: { slug: "` +
    slug +
    `" } }, orderBy: createdAt_DESC) {
        createdAt
        email
        star
        userImage
        userName
        reviewText
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const createOrder = async (data) => {
  const query =
    gql`
    mutation CreateOrder {
      createOrder(
        data: {
          email: "` +
    data.email +
    `"
          orderAmount: ` +
    data.orderAmount +
    `
          restaurantName: "` +
    data.restaurantName +
    `"
          userName: "` +
    data.userName +
    `"
          phoneNumber: "` +
    data.phoneNumber +
    `"
          address: "` +
    data.address +
    `"
          zipCode: "` +
    data.zipCode +
    `"
        }
      ) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const updateOrderDetail = async (price, productName, id, email) => {
  const query =
    gql`
    mutation UpdateOrder {
      updateOrder(
        data: {
          orderDetail: {
            create: { OrderItem: { data: { price: ` +
    price +
    `, productName: "` +
    productName +
    `" } } }
          }
        }
        where: { id: "` +
    id +
    `" }
      ) {
        id
      }
        publishManyOrders(to: PUBLISHED) {
    count
  }
    deleteManyUserCarts(where: {email: "` +
    email +
    `"}) {
    count
  }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getMyOrders = async (email) => {
  const query =
    gql`
    query MyOrders {
      orders(where: { email: "` +
    email +
    `" }, orderBy: createdAt_DESC first: 50) {
        createdAt
        email
        id
        orderAmount
        orderDetail {
          ... on OrderItem {
            id
            price
            productName
          }
        }
        publishedAt
        restaurantName
        userName
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
export default {
  getCategories,
  getRestaurant,
  getRestaurantDetail,
  AddToCart,
  GetUserCart,
  RemoveRestaurant,
  deleteCartItem,
  addReview,
  getReviews,
  createOrder,
  updateOrderDetail,
  getMyOrders,
};
