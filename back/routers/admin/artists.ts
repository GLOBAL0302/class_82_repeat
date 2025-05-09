import express from "express";
import Artist from "../../modules/Artist";

const artistsAdminRouter = express.Router();

artistsAdminRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Artist.findByIdAndDelete({ _id: id });
  res.status(200).send({ message: "ArtistDeleted" });
});

artistsAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    const artists = await Artist.findByIdAndUpdate(
      id,
      { isPublished: !artist?.isPublished },
      { new: true, runValidators: true },
    );
    await artists?.save();
    res.send(artists);
  } catch (e) {
    next(e);
  }
});

export default artistsAdminRouter;
