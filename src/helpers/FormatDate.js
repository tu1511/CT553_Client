export function formatDate(date) {
  if (!date) return "Chưa cập nhật"; // Trả về nếu không có ngày

  const dateObj = new Date(date); // Tạo đối tượng Date
  if (isNaN(dateObj.getTime())) return "Ngày không hợp lệ"; // Kiểm tra ngày hợp lệ

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}
