import { Context } from "koa";
import httpStatus from "http-status";
import { PassThrough } from "stream";

const qrCodeStatus = async (ctx: Context) => {
  ctx.request.socket.setTimeout(0);
  ctx.req.socket.setNoDelay();
  ctx.req.socket.setKeepAlive(true);

  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new PassThrough();

  ctx.status = httpStatus.OK;
  ctx.body = stream;

  setInterval(() => {
    if (db.sent) {
      // console.log("already writing data to steam, so dont send this time");
      return;
    }
    const status = { status: db.status };
    console.log("writing data to steam", JSON.stringify(status));
    stream.write(`data:${JSON.stringify(status)}\n\n`);
    db.sent = true;
  }, 2000);
};

// unscanned
// scanned-unconfirmed
// scanned-confirmed
// scanned-cancel
// expired
const db = { status: "unscanned", sent: false };

const setQRCodeStatus = async (ctx: Context) => {
  const data = ctx.request.body;
  db.sent = db.status === data.status;
  db.status = data.status;
  ctx.status = httpStatus.OK;
};

export default { qrCodeStatus, setQRCodeStatus };
