# Micro Tasker - Server

This is the backend server for **Micro Tasker**, a platform that connects buyers and workers for completing micro-tasks. The server handles user authentication, task management, payment processing, and withdrawal requests.

---

## Admin Credentials

- **Admin Username:** admin@microtasker.com
- **Admin Password:** 123456Az


---

## Live Site URL

- **Server URL:** Replace with your server's actual URL. For example: `https://micro-tasker-server.vercel.app/`.

---

## Features

1. **User Management**: Admin can manage user roles such as `Buyer`, `Worker`, and `Admin`.
2. **Task Management**: Buyers can create tasks with specific requirements, and workers can submit applications.
3. **Coin-Based System**: Workers earn coins for task completions, where 20 coins equal 1 dollar.
4. **Stripe Payment Integration**: Buyers can securely pay workers using Stripe.
5. **Withdrawal System**: Workers can request withdrawals through popular services like Bkash, Rocket, and Nagad.
6. **JWT Authentication**: Secure login using JWT tokens for user authentication.
7. **Role-Based Access**: Admin can manage users and monitor the status of tasks and payments.
8. **Notification System**: Workers and buyers are notified about task status changes and payment/withdrawal updates.
9. **Statistics for Admin**: Admin can view detailed stats like total workers, total payments, and more.
10. **Task Approval/Rejection**: Buyers can approve or reject submissions, and workers can receive feedback.

---

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user data, tasks, submissions, and payments.
- **Stripe**: Payment gateway for processing transactions.
- **JWT (JSON Web Tokens)**: Authentication system for secure login and token management.

---


