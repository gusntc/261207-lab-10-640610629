import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const RoomIdx = rooms.findIndex((x) => x.roomId === roomId);
    if (RoomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const newMessage = [];
      for (const room of rooms) {
        for (const message of room.messages) {
          newMessage.push({ messageId: message.messageId, text: message.text });
        }
      }
      return res.json({ ok: true, message: newMessage });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
  }
}
