import { baseUrl } from "../src/store/baseUrl";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

// Fetch token from localStorage
const fetchToken = () => {
  // Get the cookies using js-cookie
  const userDataCookie = Cookies.get("userData");
  const activeUserIdCookie = Cookies.get("activeUserId");

  // If userData or activeUserId doesn't exist, return null
  if (!userDataCookie || !activeUserIdCookie) {
    return null;
  }

  // Parse the JSON data
  const parsedData = JSON.parse(userDataCookie);

  // Find the user with the active ID
  const user = parsedData?.filter((user) => user.id === activeUserIdCookie);

  // Return the token if found
  return user[0]?.token;
  // console.log(user[0]?.token)
};

export const downloadFromAPI = async (orderId, orderNumber) => {
  const filename = `${orderNumber}.pdf`;
  const url = `${baseUrl}/vendor/generatePdf`;
  const body = JSON.stringify({ orderId });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        token: await fetchToken(),
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

    toast.success("Invoice downloaded successfully");
  } catch (error) {
    console.log(error);
    toast.error("Unexpected Error");
  }
};
