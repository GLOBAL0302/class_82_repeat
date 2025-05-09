import express from "express";
import Album from "../../modules/Album";
const albumsAdminRouter = express.Router();

albumsAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Album.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Albums Deleted" });
  } catch (e) {
    next(e);
  }
});

albumsAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    const albums = await Album.findByIdAndUpdate(
      id,
      { isPublished: !album?.isPublished },
      { new: true, runValidators: true },
    );
    await albums?.save();
    res.send(albums);
  } catch (e) {
    next(e);
  }
});

export default albumsAdminRouter;
