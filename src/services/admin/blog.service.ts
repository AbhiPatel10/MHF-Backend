import { inject, injectable } from "tsyringe";
import { BlogDocument, BlogModel } from "../../entities/blog.schema";
import { MessageService } from "../../utils/MessageService";
import { AdminUserDocument } from "src/entities/admin/admin.schema";

@injectable()
export class BlogService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Creates blog service
     * @param { title, category, image, content, isDraft } 
     * @returns blog service 
     */
    async createBlogService({ title, category, image, content, isDraft, adminUser }: { title: string; category: string; image?: string; content: any; isDraft: boolean; adminUser: AdminUserDocument }): Promise<{ success: boolean; message: string; data: BlogDocument | null }> {
        try {
            const blog = await BlogModel.create({
                title,
                category,
                image,
                content,
                isDraft,
                createdBy: adminUser
            });

            return {
                success: true,
                message: this.messageService.BLOG_CREATE_SUCCESS,
                data: blog,
            };
        } catch (error) {
            console.error("Error in createBlogService:", error);
            return {
                success: false,
                message: this.messageService.BLOG_CREATE_ERROR,
                data: null,
            };
        }
    }

    /**
     * Gets blog by id service
     * @param { id } 
     * @returns  
     */
    async getBlogByIdService({ id }: { id: string }) {
        try {
            const blog = await BlogModel.findById(id)
                .populate("category")
                .populate("image")
                .populate("createdBy");

            if (!blog) {
                return { success: false, message: this.messageService.BLOG_NOT_EXIST };
            }

            return { success: true, message: this.messageService.BLOG_FETCH_SUCCESS, data: blog };
        } catch (error) {
            console.error("Error in getBlogByIdService:", error);
            return { success: false, message: this.messageService.BLOG_FETCH_ERROR, data: null };
        }
    }

    /**
     * Gets all blogs service
     * @returns  
     */
    async getAllBlogsService({ limit, offset, search = "" }: { limit: number; offset: number; search?: string }) {
        try {
            const filter: any = { isDelete: false };

            // Search in blog title
            if (search) {
                filter.title = { $regex: search, $options: "i" };
            }

            // Get total count (for pagination)
            const totalCount = await BlogModel.countDocuments(filter);

            // Get paginated blogs
            const blogs = await BlogModel.find(filter)
                .populate("category")
                .populate("image")
                .populate("createdBy")
                .skip(offset)
                .limit(limit)
                .sort({ createdAt: -1 });

            return {
                success: true,
                message: this.messageService.BLOG_FETCH_SUCCESS,
                data: {
                    blogs,
                    totalCount,
                },
            };
        } catch (error) {
            console.error("Error in getAllBlogsService:", error);
            return { success: false, message: this.messageService.BLOG_FETCH_ERROR, data: null };
        }
    }

    /**
     * Updates blog service
     * @param id 
     * @param updateData 
     * @returns  
     */
    async updateBlogService(id: string, updateData: Partial<BlogDocument>) {
        try {
            const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
                new: true,
            })
                .populate("category")
                .populate("image");

            if (!updatedBlog) {
                return { success: false, message: this.messageService.BLOG_NOT_EXIST };
            }

            return {
                success: true,
                message: this.messageService.BLOG_UPDATE_SUCCESS,
                data: updatedBlog,
            };
        } catch (error) {
            console.error("Error in updateBlogService:", error);
            return { success: false, message: this.messageService.BLOG_UPDATE_ERROR, data: null };
        }
    }

    /**
     * Deletes blog service
     * @param id 
     * @returns  
     */
    async deleteBlogService(id: string) {
        try {
            const blog = await BlogModel.findByIdAndUpdate(
                id,
                { isDelete: true, isActive: false },
                { new: true }
            );

            if (!blog) {
                return { success: false, message: this.messageService.BLOG_NOT_EXIST, data: null };
            }

            return { success: true, message: this.messageService.BLOG_DELETE_SUCCESS, data: blog };
        } catch (error) {
            console.error("Error in deleteBlogService:", error);
            return { success: false, message: this.messageService.BLOG_DELETE_ERROR, data: null };
        }
    }
}
