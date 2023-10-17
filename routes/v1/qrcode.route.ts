import Router from "@koa/router";

import qrCodeController from "../../controllers/qrcode.controller";

const router = new Router();

router.get("/status", qrCodeController.qrCodeStatus);

router.post("/update", qrCodeController.setQRCodeStatus);

export default router;
