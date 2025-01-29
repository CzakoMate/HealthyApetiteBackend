import express from "express";
import { dbQuerry, dbRun } from "../database.js";

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const promotions = await dbQuerry("SELECT * FROM promotions");
    res.status(200).json(promotions);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const [promotion] = await dbQuerry("SELECT * FROM promotions Where id=?;", [
      req.params.id,
    ]);
    if (!promotion) return res.status(404).json({ message: "Promotion not found" });
    res.status(200).json(promotion);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO promotions(startDate, endDate, discountRate) VALUES (?,?,?);",
      [req.body.startDate, req.body.endDate, req.body.discountRate]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const [promotion] = await dbQuerry("SELECT * FROM promotions WHERE id=?;", [
      req.params.id,
    ]);
    if (!promotion)
      return res.status(404).json({ message: "Promotion not found" });

    await dbRun(
      "UPDATE promotions SET startDate=?, endDate=?, discountRate=? WHERE id=?;",
      [
        req.body.startDate || promotion.startDate,
        req.body.endDate || promotion.endDate,
        req.body.discountRate || promotion.discountRate,
        req.params.id,
      ]
    );
    res.status(200).json({
      id: req.params.id,
      startDate: req.body.startDate || promotion.startDate,
      endDate: req.body.endDate || promotion.endDate,
      discountRate: req.body.discountRate || promotion.discountRate,
    });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const [promotion] = await dbQuerry("SELECT * FROM promotions WHERE id=?;", [
      req.params.id,
    ]);
    if (!promotion)
      return res.status(404).json({ message: "Promotion not found" });

    await dbRun("DELETE FROM promotions WHERE id=?;", [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
