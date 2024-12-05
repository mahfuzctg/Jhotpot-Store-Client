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
  createdAt: Date;
  updatedAt: Date;
  orders: IOrder[];
  reviews: IReview[];
  follows: IFollow[];
  recentProductView: IRecentProductView[];
  user: IUser;
}
