export const toVietnamCurrencyFormat = (value) =>
  new Intl.NumberFormat("vi-VN").format(value) + "đ";
