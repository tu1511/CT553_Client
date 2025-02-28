export const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  // Lấy giờ, phút, giây
  const time = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Lấy ngày, tháng, năm
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();

  return `${time} ngày ${day}/${month}/${year}`;
};
