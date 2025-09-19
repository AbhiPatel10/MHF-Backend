import { injectable } from 'tsyringe';

@injectable()
export class MessageService {
  readonly INVALID_TOKEN = 'Session expired, please login again!';

  readonly ADMIN_ALREADY_EXIST = 'Admin already exists!';
  readonly ADMIN_ALREADY_CREATE_SUCCESS = 'Admin created successfully!';
  readonly ADMIN_ALREADY_CREATE_ERROR = 'Error while creating admin user!';
  readonly INVALID_EMAIL_OR_PASSWORD = 'Invalid email and password!';

  readonly SUB_CATEGORY_CREATE_SUCCESS = 'Subcategory created successfully!';
  readonly SUB_CATEGORY_CREATE_ERROR = 'Error while creating subcategory!';
  readonly SUB_CATEGORY_ALREADY_EXIST = 'Subcategory already exists!';
  readonly SUB_CATEGORY_NOT_EXIST = 'Subcategory not exists!';
  readonly SUB_CATEGORY_GET_SUCCESS = 'Subcategory fetched successfully!';
  readonly SUB_CATEGORY_GET_ALL_SUCCESS = 'Subcategories fetched successfully!';
  readonly SUB_CATEGORY_GET_ERROR = 'Error while fetching subcategory!';
  readonly SUB_CATEGORY_UPDATE_SUCCESS = 'Subcategory updated successfully!';
  readonly SUB_CATEGORY_UPDATE_ERROR = 'Error while updating subcategory!';
  readonly SUB_CATEGORY_DELETE_SUCCESS = 'Subcategory deleted successfully!';
  readonly SUB_CATEGORY_DELETE_ERROR = 'Error while deleting subcategory!';

  // auth messages

  readonly USER_CREATE_SUCCESS = 'User created successfully!';
  readonly USER_CREATE_ERROR = 'Error while creating user!';
  readonly USER_ALREADY_EXIST = 'User already exists!';
  readonly USER_NOT_EXIST = 'User not exists!';
  readonly USER_ALREADY_VERIFIED = 'User already verified!';
  readonly OTP_SEND_SUCCESS = 'OTP sent successfully!';
  readonly OTP_SEND_ERROR = 'Error while sending OTP!';
  readonly OTP_NOT_FOUNd = 'OTP not found!';

  readonly INVALID_OTP = 'Invalid OTP!';
  readonly OTP_VERIFIED_SUCCESS = 'OTP verified successfully!';
  readonly OTP_VERIFIED_ERROR = 'Error while verifying OTP!';
  readonly INVALID_CREDENTIALS = 'Invalid credentials!';
  readonly LOGIN_SUCCESS = 'Login successful!';
  readonly LOGIN_ERROR = 'Error while logging in!';
  readonly USER_NOT_VERIFIED = 'User not verified!';

  // User messages
  readonly USER_UPDATE_SUCCESS = 'User updated successfully!';
  readonly USER_UPDATE_ERROR = 'Error while updating user!';
  readonly USER_FETCH_SUCCESS = 'User details fetched successfully!';
  readonly USER_FETCH_ERROR = 'Error while fetching user details!';
  readonly USER_NOT_FOUND = 'User not found!';

  // Business Details
  readonly BUSINESS_CREATE_SUCCESS = 'Business created successfully!';
  readonly BUSINESS_CREATE_ERROR = 'Error while creating business!';
  readonly BUSINESS_UPDATE_SUCCESS = 'Business updated successfully!';
  readonly BUSINESS_FETCH_SUCCESS = 'Business details fetched successfully!';
  readonly BUSINESS_FETCH_ERROR = 'Error while fetching business details!';
  readonly BUSINESS_NOT_FOUND = 'Business not found!';
  readonly GET_ALL_BUSINESS_FETCH_SUCCESS =
    'All Businesses fetched successfully!';
  readonly GET_ALL_BUSINESS_FETCH_ERROR = 'Error while fetching all business!';

  // Service Messages

  readonly SERVICE_CREATE_SUCCESS = 'Service created successfully!';
  readonly SERVICE_CREATE_ERROR = 'Error while creating service!';
  readonly SERVICE_UPDATE_SUCCESS = 'Service updated successfully!';
  readonly SERVICE_FETCH_SUCCESS = 'Service details fetched successfully!';
  readonly SERVICE_FETCH_ERROR = 'Error while fetching service details!';
  readonly SERVICE_NOT_EXIST = 'Service not exists!';
  readonly GET_ALL_SERVICE_FETCH_SUCCESS = 'All Services fetched successfully!';
  readonly GET_ALL_SERVICE_FETCH_ERROR = 'Error while fetching all services!';
  readonly SERVICE_ALREADY_EXIST = 'Service already exists!';
  readonly SERVICE_NOT_FOUND = 'Service not found!';
  readonly SERVICE_UPDATE_ERROR = 'Error while updating service!';

  // Product Messages
  readonly PRODUCT_FETCH_SUCCESS = 'Product details fetched successfully!';
  readonly PRODUCT_FETCH_ERROR = 'Error while fetching product details!';
  readonly PRODUCT_NOT_FOUND = 'Product not found!';
  readonly PRODUCT_ALREADY_EXIST = 'Product already exists!';
  readonly PRODUCT_UPDATE_SUCCESS = 'Product updated successfully!';
  readonly PRODUCT_UPDATE_ERROR = 'Error while updating product!';
  readonly PRODUCT_CREATE_SUCCESS = 'Product created successfully!';
  readonly PRODUCT_CREATE_ERROR = 'Error while creating product!';
  readonly GET_ALL_PRODUCT_FETCH_SUCCESS = 'All Products fetched successfully!';
  readonly GET_ALL_PRODUCT_FETCH_ERROR = 'Error while fetching all products!';

  // Image Messages
  readonly IMAGE_ADDED_SUCCESS = 'Image added successfully!';
  readonly IMAGE_UPLOAD_SUCCESS = 'Image uploaded successfully!';
  readonly IMAGE_UPLOAD_ERROR = 'Image upload failed!';
  readonly IMAGE_ADDED_ERROR = 'Error while adding an image';
  readonly IMAGE_DELETE_ERROR = 'Error while deleting an image';
  readonly IMAGE_NOT_FOUND = 'Image not found!';
  readonly IMAGE_DELETE_SUCCESS = 'Image deleted successfully!';

  readonly TEAM_MEMBER_CREATE_SUCCESS = 'Team member created successfully!';
  readonly TEAM_MEMBER_CREATE_ERROR = 'Error while creating team member!';
  readonly TEAM_MEMBER_UPDATE_SUCCESS = 'Team member updated successfully!';
  readonly TEAM_MEMBER_UPDATE_ERROR = 'Error while updating team member!';
  readonly TEAM_MEMBER_NOT_FOUND = 'Team member not found!';
  readonly TEAM_MEMBER_FETCH_SUCCESS =
    'Team member details fetched successfully!';
  readonly TEAM_MEMBER_FETCH_ERROR =
    'Error while fetching team member details!';
  readonly GET_ALL_TEAM_MEMBER_FETCH_SUCCESS =
    'All team members fetched successfully!';
  readonly GET_ALL_TEAM_MEMBER_FETCH_ERROR =
    'Error while fetching all team members!';
  readonly TEAM_MEMBER_DELETE_SUCCESS = 'Team member deleted successfully';
  readonly TEAM_MEMBER_DELETE_ERROR = 'Error deleting team member';

  readonly PRODUCT_DELETE_SUCCESS = 'Product deleted successfully';
  readonly PRODUCT_DELETE_ERROR = 'Error deleting product';
  readonly PRODUCT_DELETE_NOT_ALLOWED =
    'You are not allowed to delete this product';

  readonly SERVICE_DELETE_SUCCESS = 'Service deleted successfully';
  readonly SERVICE_DELETE_ERROR = 'Error deleting service';
  readonly SERVICE_DELETE_NOT_ALLOWED =
    'You are not allowed to delete this service';

  // Reviews Messages
  readonly REVIEW_ADDED_SUCCESSFULLY = 'Review added successfully!';
  readonly REVIEW_ADDED_ERROR = 'Error while adding a review!';
  readonly REVIEW_ALREADY_EXISTS = 'You have already reviewed this business!';
  readonly REVIEW_UPDATE_SUCCESSFULLY = 'Review updated successfully!';
  readonly REVIEW_UPDATE_ERROR = 'Error while updating a review!';
  readonly REVIEW_NOT_FOUND = 'Review not found!';
  readonly UNAUTHORIZED_TO_UPDATE_REVIEW = 'Unauthorized to update this review';
  readonly GET_ALL_REVIEW_FETCH_SUCCESS = 'All Reviews fetched successfully!';
  readonly GET_ALL_REVIEW_FETCH_ERROR = 'Error while fetching all reviews!';

  readonly ADMIN_LOGIN_SUCCESS = 'Admin login successfully!';
  readonly ADMIN_LOGIN_ERROR = 'Error while logging in!';

  readonly ADMIN_NOT_FOUND = 'Admin not found';
  readonly ADMIN_FETCH_SUCCESS = 'Admin fetch successfully';
  readonly ADMIN_FETCH_ERROR = 'Error while fetching admin details!';

  // Volunteer

  readonly VOLUNTEER_ALREADY_EXIST = 'Volunteer already exists';
  readonly VOLUNTEER_CREATE_SUCCESSFULLY = 'Volunteer created successfully';
  readonly VOLUNTEER_CREATE_ERROR = 'Volunteer already exists';
  readonly VOLUNTEER_NOT_FOUND = 'Volunteer not found';
  readonly VOLUNTEER_FETCH_SUCCESS = 'Volunteer fetched successfully';
  readonly VOLUNTEER_ALL_FETCH_SUCCESS = 'Volunteers fetched successfully';
  readonly VOLUNTEER_ALL_FETCH_ERROR = 'Error while fetching all volunteers';
  readonly VOLUNTEER_FETCH_ERROR = 'Error While fetching volunteer details';
  readonly VOLUNTEER_UPDATE_SUCCESSFULLY = 'Volunteer updated successfully';
  readonly VOLUNTEER_UPDATE_ERROR = 'Error While updating volunteer details';
  readonly VOLUNTEER_DELETE_SUCCESSFULLY = 'Volunteer deleted successfully';
  readonly VOLUNTEER_DELETE_ERROR = 'Error While deleting volunteer';

  // Gallery
  readonly ADD_IMAGE_TO_GALLERY_SUCCESSFULLY =
    'Image added to gallery successfully';
  readonly ADD_IMAGE_TO_GALLERY_ERROR = 'Image add to gallery failed';
  readonly REMOVE_IMAGE_TO_GALLERY_SUCCESSFULLY =
    'Image removed from gallery successfully';
  readonly REMOVE_IMAGE_TO_GALLERY_ERROR = 'Image remove from gallery failed';
  readonly GET_ALL_GALLERY_IMAGES_SUCCESS =
    'All gallery images fetched successfully';
  readonly GET_ALL_GALLERY_IMAGES_ERROR =
    'Error while fetching all gallery images';
  readonly UPDATE_IMAGE_TO_GALLERY_SUCCESSFULLY =
    'Image updated to gallery successfully';
  readonly UPDATE_IMAGE_TO_GALLERY_ERROR = 'Image update to gallery failed';

  readonly EVENT_NOT_FOUND = 'Event not found';
  readonly EVENT_FETCH_SUCCESS = 'Event fetched successfully';
  readonly EVENT_UPDATE_SUCCESS = 'Event updated successfully';
  readonly EVENT_UPDATE_ERROR = 'Error updating event';

  // Category Messages
  readonly CATEGORY_CREATE_SUCCESS = 'Category created successfully!';
  readonly CATEGORY_CREATE_ERROR = 'Error while creating category!';
  readonly CATEGORY_ALREADY_EXIST = 'Category already exists!';
  readonly CATEGORY_NOT_EXIST = 'Category not exists!';
  readonly CATEGORY_UPDATE_SUCCESS = 'Category updated successfully!';
  readonly CATEGORY_UPDATE_ERROR = 'Error while updating category!';
  readonly CATEGORY_DELETE_SUCCESS = 'Category deleted successfully!';
  readonly CATEGORY_DELETE_ERROR = 'Error while deleting category!';
  readonly CATEGORY_FETCH_SUCCESS = 'Category fetched successfully!';
  readonly CATEGORY_FETCH_ERROR = 'Error while fetching category!';
}
