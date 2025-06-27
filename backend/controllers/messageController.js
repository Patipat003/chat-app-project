import Message from "../models/Message.js";
import User from "../models/User.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const userId = req.user._id; // รับ id ผู้ใช้หลัก จาก front? (id เดียว)
    const filteredUsers = await User.find({
      // หาจาก model User Schema
      _id: { $ne: userId }, // ถ้า _id ไม่ตรงกับ userId ที่มาจาก front (id เจ้าของ) แล้วเก็บลง filteredUsers ก็จะมีชุด data เป็น id ทั้งหมด type JSON
    }).select("-password"); // เพิ่ม use case กัน password มาด้วย

    const unseenMessage = {};
    const promises = filteredUsers.map(async (user) => {
      // loop user จาก filteredUsers ที่มีการแยกเป็น id (เฉพาะข้อมูล id)
      const message = await Message.find({
        // หาข้อมูลจาก Message Schema เก็บเป็น message (เพื่อ list ข้อความระหว่างเรากับคนคุย)
        senderId: user._id, // id ของตัวเองก็คือผู้ส่ง
        receiverId: userId, // id คนที่รับ
        seen: false, // สถานะ คือยังไม่อ่าน (ถ้า false จะนำไป + ใส่กับ จำนวนชุดข้อความที่ยังไม่อ่าน)
      });
      if (message.length > 0) {
        // เช็คข้อความ ถ้าข้อความยังไม่อ่าน
        unseenMessage[user._id] = message.length; // แสดงจำนวน เป็น length ของ message
      }
    });
    await Promise.all(promises); // เช็ค Promise.all ว่าข้อมูลทั้งหมดไม่ lost
    res
      .status(200)
      .json({ success: true, users: filteredUsers, unseenMessage }); // ถ้าถูกต้อง ส่ง json ไปที่ api เส้นนี้
    // (users: filteredUsers = id ของ user ทั้งหมดยกเว้นตัวเอง, unseenMessage แสดงแค่จำนวนไว้บอกว่าอ่านหรือยัง )
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );
    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
