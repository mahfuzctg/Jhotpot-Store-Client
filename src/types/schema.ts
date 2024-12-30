export interface IUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  admin?: IAdmin;
  vendor?: IVendor;
  customer?: ICustomer;
}

export interface IAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface IVendor {
  id: string;
  name: string;
  email: string;
  shopName?: string;
  logo?: string;
  description?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: IProduct[];
  orders: IOrder[];
  followers: IFollow[];
  user: IUser;
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  isDeleted: boolean;
  address?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  orders: IOrder[];
  reviews: IReview[];
  follows: IFollow[];
  recentProductView: IRecentProductView[];
  user: IUser;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  inventory: number;
  description?: string;
  image: string[];
  flashSale?: boolean;
  discount?: number;
  categoryId: string;
  isDeleted: boolean;
  vendorId: string;
  orderDetails: IOrderDetail[];
  reviews: IReview[];
  recentProductView: IRecentProductView[];
  category: ICategory;
  vendor: IVendor;
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
  isDeleted: boolean;
  products: IProduct[];
}

export interface IOrder {
  id: string;
  customerId: string;
  vendorId: string;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  transactionId: string;
  orderDetails: IOrderDetail[];
  customer: ICustomer;
  vendor: IVendor;
}

export interface IOrderDetail {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  pricePerUnit: number;
  order: IOrder;
  product: IProduct;
}

export interface IReview {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  comment?: string;
  product: IProduct;
  customer: ICustomer;
}

export interface IFollow {
  id: string;
  customerId: string;
  vendorId: string;
  customer: ICustomer;
  vendor: IVendor;
}

export interface IRecentProductView {
  id: string;
  customerId: string;
  productId: string;
  viewedAt: Date;
  customer: ICustomer;
  product: IProduct;
}

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CUSTOMER = "CUSTOMER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export interface ICoupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  usedCount: number;
  isActive: boolean;
}

type DiscountType = "PERCENTAGE" | "FIXED";