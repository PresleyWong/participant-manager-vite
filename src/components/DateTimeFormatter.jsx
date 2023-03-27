const DateTimeFormatter = ({ timeStamp, type }) => {
  const days = ["LD", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dateObj = new Date(timeStamp);

  switch (type) {
    case "date":
      const dayName = days[dateObj.getDay()];
      const monthName = months[dateObj.getMonth()];
      const yearName = dateObj.getFullYear();
      const dateName = dateObj.getDate();
      return `${monthName} ${dateName}, ${yearName} (${dayName})`;
    case "time":
      return dateObj.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    default:
      return dateObj.toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
  }
};

export default DateTimeFormatter;
