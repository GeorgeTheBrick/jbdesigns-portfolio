export const displayDate = function () {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const naviDate = `${
    months[new Date().getMonth()]
  } ${new Date().getDate()}, ${new Date().getFullYear()}`;

  return naviDate;
};

export const getPosition = async function () {
  try {
    if (navigator.geolocation) {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return [pos.coords.latitude, pos.coords.longitude];
    }
  } catch (err) {
    alert(`${err} => Loading default map position`);
    return [51.505, -0.09];
  }
};
