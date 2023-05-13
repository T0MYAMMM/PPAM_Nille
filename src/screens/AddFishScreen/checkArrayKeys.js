

function checkArrayKeys(jsonArray) {
    if (jsonArray.length === 0) {
      return []; // Mengembalikan array kosong jika tidak ada objek dalam array
    }
    
    const firstObjectKeys = Object.keys(jsonArray[0]); // Mendapatkan semua kunci dari objek array pertama
  
    const result = jsonArray.map((obj) => {
      // Mengecek setiap objek dalam array
      const missingKeys = firstObjectKeys.filter((key) => !(key in obj)); // Mengambil kunci yang hilang dari setiap objek
      return { ...obj, missingKeys }; // Menambahkan properti "missingKeys" ke setiap objek
    });
  
    return result;
  }


  const ikandata = require('./Ikan.json');
  const checkedArray = checkArrayKeys(ikandata);
  console.log(checkedArray);