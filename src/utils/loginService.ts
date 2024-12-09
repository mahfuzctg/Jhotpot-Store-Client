"use server";

import { cookies } from "next/headers";

export const loginUser = async (userData: Record<string, any>) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const registerUser = async (userInfo: Record<string, any>) => {
  const { role, ...remaining } = userInfo;

  try {
    if (role === "User") {
      const response = await fetch(
        "http://localhost:5000/api/users/create-customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(remaining),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();

      if (data.success) {
        cookies().set("accessToken", data?.token);
        // cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    } else {
      const response = await fetch(
        "http://localhost:5000/api/users/create-customer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(remaining),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();

      if (data.success) {
        cookies().set("accessToken", data?.token);
        // cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    }
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const logoutService = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  return accessToken;
};