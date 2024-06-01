type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [string];
  tags: [string];
  price: number;
  cost: number;
  sizes: [string];
  colours: [string];
  createdAt: string;
  updatedAt: string;
  availableStartDate: Date;
  availableEndDate: Date;
  bookings: any[];
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  orders: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  forEach: any;
  map: any;
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType]
  shippingRate: string;
  totalAmount: number
}

type OrderItemType = {
  product: ProductType;
  colour: string;
  size: string;
  quantity: number;
  _id: string;
  startDate: Date;
  endDate: Date;
}