import { baseUrl } from "../src/store/baseUrl";
import { toast } from "react-toastify";

// Fetch token from localStorage
// const fetchToken = async () => {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const activeId = localStorage.getItem("activeUserId");
//   const user = userData?.find((user) => user.id === activeId);
//   return user?.token;
// };

export const downloadFromAPI = async (orderId, orderNumber) => {
  const filename = `${orderNumber}.pdf`;
  const url = `${baseUrl}/vendor/generatePdf`;
  const body = JSON.stringify({ orderId });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmFjY2YzMzUzYTg2ZDU0M2I0ZTc2ZCIsImlhdCI6MTcyNzA4Mjc0MCwiZXhwIjoxNzI5Njc0NzQwfQ.RaAfyudWgHFePipY0IfQVu3EFlZ_9TOgVdxUMKbLAC8",
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
