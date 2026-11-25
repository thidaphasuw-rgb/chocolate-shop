const SHEET_NAME = "Orders";

// รับข้อมูลคำสั่งซื้อใหม่จากหน้า Landing Page (POST)
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);
  
  // อัปเดตสถานะ (กรณีหน้า Admin กดเปลี่ยนสถานะ)
  if (data.action === "updateStatus") {
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.orderId) {
        sheet.getRange(i + 1, 8).setValue(data.status); // คอลัมน์ H คือ Status
        return ContentService.createTextOutput(JSON.stringify({ result: "updated" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  }

  // สร้าง Order ID อัตโนมัติ (เช่น ORD-171234)
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

  sheet.appendRow([
    orderId,
    timestamp,
    data.name,
    "'" + data.phone,
    data.address,
    data.items,
    data.total,
    "รอหยิบสินค้า (Pending)"
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: "success", orderId: orderId }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ส่งข้อมูลคำสั่งซื้อทั้งหมดไปแสดงที่หน้า Admin (GET)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const orders = [];

  for (let i = 1; i < rows.length; i++) {
    orders.push({
      orderId: rows[i][0],
      timestamp: rows[i][1],
      name: rows[i][2],
      phone: rows[i][3],
      address: rows[i][4],
      items: rows[i][5],
      total: rows[i][6],
      status: rows[i][7]
    });
  }

  return ContentService.createTextOutput(JSON.stringify(orders.reverse()))
    .setMimeType(ContentService.MimeType.JSON);
}
