**Blog Site Front-end**

**Go to site**

https://.................netlify



**Blog Site API Documentation**

## Using MERN Stack

This documentation provides an overview of the backend API for the blog application built using the MERN stack (MongoDB, Express, React, Node.js).

---

## Table of Contents

1. [Accessing the Admin Panel](#accessing-the-admin-panel)
2. [Logging In](#logging-in)
3. [Managing Posts](#managing-posts)
 - [Creating a Post](#creating-a-post)
 - [Editing a Post](#editing-a-post)
 - [Deleting a Post](#deleting-a-post)
4. [Managing Comments](#managing-comments)
 - [Deleting a Comment](#deleting-a-comment)
5. [Admin Dashboard Overview](#admin-dashboard-overview)
6. [Error Handling](#error-handling)

---

## Accessing the Admin Panel

To access the **Admin Panel**, navigate to the following URL in your browser or Postman:` 

[http://localhost:5000/api/admin](http://localhost:5000/api/admin)


 ``This is the central location where you can manage all aspects of the blog, including creating and deleting posts, managing comments, and performing administrative actions.

--- 
## Logging In

To log into the admin panel, you need valid administrator credentials. Follow these steps:

1. **Go to the Admin Login Page**:
    - **URL**: `/api/admin/login`
    - **Method**: `POST`

2. **Send a POST request** with the following data:
    ```json
    {
      "username": "yourAdminUsername",
      "password": "yourAdminPassword"
    }
    ```

**Response**:

- **Success**: 
    ```json
    { "message": "Logged in successfully", "token": "<jwt_token>" }
    ```

- **Failure**: 
    ```json
    { "message": "Invalid credentials" }
    ```

3. **Use the JWT Token**: After logging in, you will receive a JWT (JSON Web Token). Include this token in the headers of all subsequent requests to authenticate your actions. Example:

    ```
    Authorization: Bearer <jwt_token>
    ```

--- 
## Managing Posts

Once logged in, you can manage blog posts.

### Creating a Post

To create a new post, send a `POST` request to the following endpoint:

- **URL**: `/api/posts/create`
- **Method**: `POST`
- **Body**: The request body should include details for the new post.

Example Request:
```json
{
  "title": "Post title",
  "content": "This is the content of the post...",
  "author": "Admin",
  "category": "Technology"
}`` 

**Response**:

-   **Success**:
    
    `{ "message": "Post created successfully", "post": { ...postDetails } }` 
    
-   **Failure**:

    
    `{ "message": "Failed to create post" }` 
    

----------

### Editing a Post

To edit an existing post, send a `PUT` request to the following endpoint:

-   **URL**: `/api/posts/:postId/edit`
-   **Method**: `PUT`
-   **Body**: The request body should include updated details for the post.

Example Request:

json

Copy code

`{
  "title": "Updated Title",
  "content": "Updated content of the post"
}` 

**Response**:

-   **Success**:

    
    `{ "message": "Post updated successfully", "post": { ...updatedPostDetails } }` 
    
-   **Failure**:
    
    `{ "message": "Failed to update post" }` 
    

----------

### Deleting a Post

To delete a post, send a `DELETE` request to the following endpoint:

-   **URL**: `/api/posts/:postId`
-   **Method**: `DELETE`

**Response**:

-   **Success**:

    `{ "message": "Post deleted successfully" }` 
    
-   **Failure**:

    
    `{ "message": "Failed to delete post" }` 
    

----------

## Managing Comments

As an admin, you can also manage comments on posts.

### Deleting a Comment

To delete a comment, send a `DELETE` request to the following endpoint:

-   **URL**: `/api/comments/:commentId`
-   **Method**: `DELETE`

**Response**:

-   **Success**:

    `{ "message": "Comment deleted successfully" }` 
    
-   **Failure**:
    
    `{ "message": "Failed to delete comment" }` 
    

----------

## Admin Dashboard Overview

Once logged in as an administrator, you will be able to view the admin dashboard. The dashboard includes:

-   **Post Management**: Create, edit, and delete posts.
-   **Comment Management**: Delete inappropriate or spammy comments.
-   **User Management**: View user details and manage their access (if applicable).

### Example Admin Flow

1.  **Log in** to the admin panel using your admin credentials.
2.  **Navigate to the Post Management Section** to create, update, or delete posts.
3.  **Navigate to the Comment Management Section** to moderate comments.
4.  **Logout** when done by sending a `POST` request to `/api/auth/logout`.

----------

## Error Handling

All errors will return a JSON response with the following structure:

`{
  "message": "Error message",
  "error": "Detailed error description"
}` 

### Common Error Responses

-   **401 Unauthorized**: Missing or invalid authentication token.
-   **403 Forbidden**: User is not authorized to access the resource.
-   **404 Not Found**: Resource not found.
-   **500 Internal Server Error**: Unexpected server error.

----------

## Conclusion

This documentation provides all the necessary steps for logging in, managing posts, and moderating comments in your Blog Admin Panel. For any issues or additional features, please refer to the admin’s help section or contact the development team.


 `### Key Updates:
1. **Authentication and JWT**: Clear steps on how to log in and manage JWT tokens.
2. **Post and Comment Management**: Detailed information on creating, editing, deleting posts and managing comments.
3. **Admin Dashboard**: Overview of what to expect on the dashboard once logged in.
4. **Error Handling**: Standard error responses to handle issues gracefully.

Let me know if you need further updates or details on any section!`
