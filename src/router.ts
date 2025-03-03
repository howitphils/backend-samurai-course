import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, this is from router");
});

router.get("/:id", (req, res) => {
  res.send(`Its a ${req.params.id} route!!`);
});

export default router;
