import { Router } from "express";
import { container } from "tsyringe";

import { BlogController } from "../../controllers/v1/blog.controller";
import { BlogValidator } from "../../validations/v1/blog.validator";

const router = Router();

const blogController = container.resolve(BlogController);
const blogValidator = container.resolve(BlogValidator);

router.get("/getBlogDetails/:id", blogValidator.paramsBlogValidator, blogController.getBlogByIdController);
router.get("/getAllBlogs", blogValidator.getAllBlogsValidator, blogController.getAllBlogsController);

export default router;
