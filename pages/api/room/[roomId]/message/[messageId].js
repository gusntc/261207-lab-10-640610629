import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();

  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  const RoomIdx = rooms.findIndex((x) => x.roomId === roomId);
  const MessageIdx = rooms.findIndex((x) => x.messages.messageId === messageId);

  if (req.method === "DELETE") {
    if (RoomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else if (MessageIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    } else {
      rooms.splice(MessageIdx, 1);
      writeDB(rooms);
      return res.status(200).json({ ok: true });
    }
  }
}
