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
