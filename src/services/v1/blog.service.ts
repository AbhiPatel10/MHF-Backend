import { inject, injectable } from "tsyringe";
import { BlogDocument, BlogModel } from "../../entities/blog.schema";
import { MessageService } from "../../utils/MessageService";

@injectable()
export class BlogService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Gets blog by id service
     * @param { id } 
     * @returns  
     */
    async getBlogByIdService({ id }: { id: string }) {
        try {
            const blog = await BlogModel.findById(id)
                .populate("category")
                .populate("image");

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
}
