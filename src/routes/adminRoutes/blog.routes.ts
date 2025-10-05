import { Router } from "express";
import { container } from "tsyringe";

import { BlogController } from "src/controllers/admin/blog.controller";
import { BlogValidator } from "src/validations/admin/blog.validator";

const router = Router();

const blogController = container.resolve(BlogController);
const blogValidator = container.resolve(BlogValidator);

router.post("/createBlog", blogValidator.createBlogValidator, blogController.createBlogController);
router.get("/getBlogDetails/:id", blogValidator.paramsBlogValidator, blogController.getBlogByIdController);
router.get("/getAllBlogs", blogValidator.getAllBlogsValidator, blogController.getAllBlogsController);
router.put("/updateBlog/:id", blogValidator.paramsBlogValidator, blogValidator.updateBlogValidator, blogController.updateBlogController);
router.delete("/deleteBlog/:id", blogValidator.paramsBlogValidator, blogController.deleteBlogController);

export default router;
