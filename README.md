# 🍫 CHOCO CRAFT - Landing Page & Pick-Pack System

โปรเจกต์เว็บไซต์ขายช็อกโกแลตแท่ง (2 SKUs) เชื่อมต่อฐานข้อมูล Google Sheets พร้อมระบบหลังบ้านสำหรับหยิบสินค้า แพ็คสินค้า และพิมพ์ใบปะหน้าพัสดุ

## โครงสร้างไฟล์ในโปรเจกต์
- `index.html` : หน้า Landing Page สำหรับลูกค้าเลือกสินค้า 2 SKUs และกรอกที่อยู่จัดส่ง
- `admin.html` : หน้าหลังบ้านสำหรับดูรายการหยิบสินค้า (Pick List), อัปเดตสถานะการแพ็ค และพิมพ์ใบปะหน้าพัสดุ
- `images/` : โฟลเดอร์เก็บรูปภาพสินค้า (`dark-choc.jpg`, `milk-choc.jpg`)
- `google-apps-script.js` : โค้ดสำหรับนำไปวางใน Google Apps Script ของ Google Sheets

## วิธีตั้งค่าก่อนใช้งานจริง
1. สร้าง Google Sheet ตั้งชื่อแท็บด้านล่างว่า `Orders` และใส่หัวตารางแถวที่ 1: `OrderID`, `Timestamp`, `CustomerName`, `Phone`, `Address`, `Items`, `TotalPrice`, `Status`
2. นำโค้ดจากไฟล์ `google-apps-script.js` ไปวางใน **Extensions > Apps Script** แล้วกด **Deploy > Web app** (เลือกสิทธิ์เป็น Anyone)
3. นำ **Web App URL** ที่ได้ มาวางแทนที่คำว่า `วาง_WEB_APP_URL_ของคุณที่นี่` ในไฟล์ `index.html` และ `admin.html`
4. นำขึ้น GitHub และเชื่อมต่อกับ Vercel เพื่อใช้งานออนไลน์
