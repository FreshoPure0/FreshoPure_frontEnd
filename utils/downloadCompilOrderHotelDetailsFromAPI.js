import { toast } from "react-toastify"; // Import Toast for notifications
import { baseUrl } from "../src/store/baseUrl";

// Function to fetch the token from localStorage (similar to AsyncStorage in mobile apps)
const fetchToken = async () => {
//   const userData = localStorage.getItem("userData");
//   const activeId = localStorage.getItem("activeUserId");
//   const parsedData = JSON.parse(userData);
  const user = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmFjY2YzMzUzYTg2ZDU0M2I0ZTc2ZCIsImlhdCI6MTcyNzA4Mjc0MCwiZXhwIjoxNzI5Njc0NzQwfQ.RaAfyudWgHFePipY0IfQVu3EFlZ_9TOgVdxUMKbLAC8";
  return user;
};

const getFormattedDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 to get the correct month
    const dd = String(today.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yyyy}`;
  };

export const downloadCompilOrderHotelDetailsFromAPI = async () => {
    const filename = `${getFormattedDate()}_CompiledOrderDetails.pdf`;
    const url = `${baseUrl}/vendor/compiledorderhoteldetailspdf`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: await fetchToken(), // Get the token from storage
        "Content-Type": "application/json",
        MyHeader: "MyValue",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob(); // Get the file data as a blob

    // Create a download link and trigger the download
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove(); // Remove the link after triggering the download
    window.URL.revokeObjectURL(downloadUrl); // Clean up the object URL

    toast.success("Details downloaded successfully");
  } catch (error) {
    console.error(error);
    toast.error("Unexpected Error");
  }
};
