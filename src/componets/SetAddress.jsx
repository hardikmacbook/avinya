import { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaCaretDown } from "react-icons/fa";

const AddressButton = () => {
  const [location, setLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const detectLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocation("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.address) {
            const { city, town, village, state } = data.address;
            const detectedCity = city || town || village || "Unknown";
            const detectedState = state || "Unknown";
            const detectedContry = data.address.country || "Unknown";
            setLocation(`${detectedCity}, ${detectedState}, ${detectedContry}`);
          } else {
            setLocation("Location not found");
          }
        } catch (error) {
          console.error("Error during reverse geocoding:", error);
          setLocation("Could not get address");
        } finally {
          setLoading(false);
          setShowDropdown(false); // hide dropdown after detection
        }
      },
      (error) => {
        console.error("Error detecting location:", error.message);
        setLocation("Could not detect location");
        setLoading(false);
        setShowDropdown(false);
      },
      {
        enableHighAccuracy: false, // faster
        timeout: 5000, // maximum 5 seconds
        maximumAge: 0,
      }
    );
  };

  const removeLocation = () => {
    setLocation(null);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center cursor-pointer text-2xl">
        <CiLocationArrow1 className="text-red-900" />
        <span className="font-semibold text-xl ml-2" onClick={handleDropdownToggle}>
          {location ? location : "Add address"}
        </span>
        <FaCaretDown
          className="ml-2"
          onClick={handleDropdownToggle}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-64 p-2 bg-white shadow-lg rounded border border-gray-200 z-11">
          {loading ? (
            <div className="text-center text-red-900 py-2">Detecting...</div>
          ) : !location ? (
            <button
              className="w-full py-2 px-4 bg-red-900 text-white rounded hover:bg-black transition cursor-pointer"
              onClick={detectLocation}
            >
              Detect My Location
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              {/* <button
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={detectLocation}
              >
                Change Location
              </button> */}
              <button
                className="w-full py-2 px-4 bg-red-900 text-white rounded hover:bg-black cursor-pointer transition"
                onClick={removeLocation}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressButton;
