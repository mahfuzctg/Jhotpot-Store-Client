"use server";

import { cookies } from "next/headers";

export const loginUser = async (userData: Record<string, any>) => {
  try {
    const response = await fetch("https://jhotpot-store-server.vercel.app/api/auth/login", {
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
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
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
        "https://jhotpot-store-server.vercel.app/api/users/create-customer",
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
        (await cookies()).set("accessToken", data?.token);
        // cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    } else {
      const response = await fetch(
        "https://jhotpot-store-server.vercel.app/api/users/create-customer",
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
        (await cookies()).set("accessToken", data?.token);
        // cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    }
  } catch (error: any) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const logoutService = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

export const getAccessToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  return accessToken;
};
