import { baseUrl } from "../src/store/baseUrl";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

// Fetch token from cookies
const fetchToken = () => {
  const userDataCookie = Cookies.get("userData");
  const activeUserIdCookie = Cookies.get("activeUserId");

  if (!userDataCookie || !activeUserIdCookie) {
    return null;
  }

  const parsedData = JSON.parse(userDataCookie);
  const user = parsedData?.find((user) => user.id === activeUserIdCookie);

  return user?.token;
};

export const downloadReceiptFromAPI = async (orderId, orderNumber) => {
  const filename = `${orderNumber}.pdf`;
  const url = `${baseUrl}/vendor/shareOrder`;
  const body = JSON.stringify({ orderId });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        token: fetchToken(),
        "Content-Type": "application/json",
        MyHeader: "MyValue",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const fileUrl = URL.createObjectURL(blob);

    // Create a temporary link to download the file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", filename); // Set the file name
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Receipt downloaded successfully");
  } catch (error) {
    console.error(error);
    toast.error("Unexpected Error");
  }
};
