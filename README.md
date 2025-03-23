# ADF-Hydra

Presentation of the ADF-Hydra Application Functionality

# 1.1. User Registration

To register on the website, there is a registration form. Fields marked with a "*" are required, and if they are left unfilled, a message will appear asking the user to complete those fields. The "Email" field also checks if the email is entered correctly. The "Phone Number" field has a defined pattern for how the user should enter the number, and the "Password" and "Repeat Password" fields have a minimum character length set to 5, and both passwords must match; if they do not, a message will pop up saying that the passwords are not the same. Another feature of the registration form is that if the email or username already exists in the database, a message will appear after clicking the "Register" button stating that the email or username has already been used.

# 1.2. User Login

Through the login form, users can access all the functionalities of the application. If the password or username is entered incorrectly, a message will appear indicating that the password is incorrect or that there is no such user.

# 1.3. Add Client

A client and task data form is displayed because a client can be added with a task to be performed. Fields marked with "*" are mandatory to fill out. The "Email" field checks if the email is entered correctly, and the "Phone" field must be entered in the proper format provided in parentheses.
After clicking "Add Client," the client is added to the client database. If the task meets the criteria that it is a task to be done in the future, it will appear in the "Service" tab under tasks for two weeks ahead. If the task is to be done today, it will be displayed on the homepage. If the "Next Service Date" field is filled out and the date is not more than two weeks in the future, it will also appear in the "Service" tab in notifications two weeks ahead. Once the task's completion time passes, it will automatically appear in the "Service" tab under tasks from two weeks ago.

# 1.4. Homepage

The homepage displays the tasks that the installer must complete for the current day. There are also four buttons: "Clients," "Add Client," "Service," and "User Profile," which lead to other sections of the application.
You can view task details by clicking on the selected task. On the left column, you will see client data, and on the right, you will find task data.

# 1.5. Clients

This tab displays all the clients added by the user. There is also a search function above the listed clients, which helps locate a specific person whose data is needed by the installer.
By clicking on a client, you can view the details and the "Services" button, where you can find tasks performed for that client.

# 1.6. Client/Services

In this tab, you can see which tasks have been or will be performed for the client. It is also possible to search for a specific task. You can add a new service, add a related service, modify a service, or delete it. Client data can also be edited, or the client can be deleted.
Service details can be viewed by clicking on the service and expanding it.
Clicking on the invoice will display it on the full browser screen, with the option to print or download it.
Similarly, clicking on the protocol will display it in the same way as the invoice.

# 1.7. Add Service

After filling in all the required fields marked with "*," clicking "Add Service" will add the service.

# 1.8. Edit Client Data

Client data can be edited by clicking the "Edit Client Data" button, which will open a form.

# 1.9. Delete Client

In this case, we delete the client "Witek Komorowski," who was previously added to the client database. After viewing the details and clicking the "Delete Client" button, a window will appear asking "Are you sure you want to delete this client?" Clicking "Yes" will delete the client.

# 1.10. Add Related Service

By clicking the "Add Related Service" button, a form will appear. After filling in all the required fields marked with "*," and clicking "Add Service," the service will be added.
A related service can be viewed by going to "View Main Services," then locating the service "Boiler Installation" and clicking on it. After the details appear, click the "List Related Services" button, and a window will pop up showing client data, main service data, and the related services.

# 1.11. Edit Service

By clicking the "Edit Service" button in the service details, a form will appear. After filling in the data and clicking the "Edit Service" button, the service data will be updated.

# 1.12. Edit Service Files

Clicking the "Edit Files" button will display a form. After selecting the files and clicking "Add Files," they will be added.
Clicking the "Delete File" button will prompt a message asking, "Are you sure you want to delete this file?" Clicking "Yes" will delete the file.

# 1.13. Delete Service

After viewing the service details and clicking "Delete Service," a window will appear asking, "Are you sure you want to delete this service?" After confirm

# - Running the application:
  
- You need to download and open the application, then in the terminal, enter the command:

 node app.js

 - The application runs on: localhost:3000
