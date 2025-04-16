// Fungsi untuk mendapatkan tanggal kedaluwarsa dalam hitungan jam
export const getExpirationDate = (hours) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours);
    return expirationDate;
  };
  