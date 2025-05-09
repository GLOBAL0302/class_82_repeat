import express from "express";
import Track from "../../modules/Track";
const tracksAdminRouter = express.Router();

tracksAdminRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Track.findByIdAndDelete({ _id: id });
  res.status(200).send({ message: "Track has been deleted" });
});

tracksAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const { id } = req.params;
    const track = await Track.findById(id);
    const tracks = await Track.findByIdAndUpdate(
      id,
      { isPublished: !track?.isPublished },
      { new: true, runValidators: true },
    );
    await tracks?.save();
    res.send(tracks);
  } catch (e) {
    next(e);
  }
});

export default tracksAdminRouter;
