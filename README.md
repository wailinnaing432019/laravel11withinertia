# Laravel 11 + Inertia.js Task & Project Management App

A modern task and project management application built with **Laravel 11**, **Inertia.js**, **React**, and **Tailwind CSS**. It supports full CRUD operations for Projects, Tasks, and Users, with rich table features (search, filter, sort, pagination), dark mode support, and authenticated access via Laravel Sanctum and Breeze.

## Features

- **Dashboard** – At-a-glance task statistics (pending, in-progress, completed) and active task list
- **Project Management** – Full CRUD with image upload and associated tasks
- **Task Management** – Full CRUD with:
  - Image upload
  - Priority & status tracking
  - Task assignment to users
  - Project association
  - Search by name, filter by status, sort by columns
  - Pagination
- **User Management** – Full CRUD with role-based display (Admin/User)
- **Authentication** – Laravel Breeze (Inertia + React) with email verification
- **Profile Management** – Update name, email, password, and delete account
- **Dark Mode** – Full dark mode support via Tailwind CSS
- **Notifications** – SweetAlert2 toasts and AlertifyJS confirmations
- **API Resource Layers** – Dedicated Inertia resources for Task, Project, and User
- **Route Management** – Ziggy for named route helpers in JavaScript

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 11 (PHP 8.2+) |
| Frontend | React 18, Inertia.js 2 |
| Styling | Tailwind CSS 3 |
| Build Tool | Vite 6 |
| Authentication | Laravel Sanctum, Laravel Breeze |
| Notifications | SweetAlert2, AlertifyJS |
| Icons | Heroicons React |
| Route Helpers | Ziggy |
| Testing | Pest PHP |

## Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM or Yarn
- MySQL / SQLite / PostgreSQL

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd laravel11withinertia
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel11withinertia
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations and seeders:
```bash
php artisan migrate --seed
```

7. Create storage link for uploaded images:
```bash
php artisan storage:link
```

8. Build frontend assets:
```bash
npm run dev
```

## Running the Application

Start the development server:
```bash
php artisan serve
```

Or use the all-in-one dev command (server, queue, logs, Vite):
```bash
composer dev
```

Then visit: `http://localhost:8000`

## Available Routes

| Method | URI | Name | Action |
|--------|-----|------|--------|
| GET | /dashboard | dashboard | DashboardController@index |
| GET | /project | project.index | ProjectController@index |
| GET | /project/create | project.create | ProjectController@create |
| POST | /project | project.store | ProjectController@store |
| GET | /project/{project} | project.show | ProjectController@show |
| GET | /project/{project}/edit | project.edit | ProjectController@edit |
| PUT | /project/{project} | project.update | ProjectController@update |
| DELETE | /project/{project} | project.destroy | ProjectController@destroy |
| GET | /task | task.index | TaskController@index |
| GET | /task/create | task.create | TaskController@create |
| POST | /task | task.store | TaskController@store |
| GET | /task/{task} | task.show | TaskController@show |
| GET | /task/{task}/edit | task.edit | TaskController@edit |
| PUT | /task/{task} | task.update | TaskController@update |
| DELETE | /task/{task} | task.destroy | TaskController@destroy |
| GET | /task/my-tasks | task.myTasks | TaskController@myTasks |
| GET | /user | user.index | UserController@index |
| GET | /user/create | user.create | UserController@create |
| POST | /user | user.store | UserController@store |
| GET | /user/{user} | user.show | UserController@show |
| GET | /user/{user}/edit | user.edit | UserController@edit |
| PUT | /user/{user} | user.update | UserController@update |
| DELETE | /user/{user} | user.destroy | UserController@destroy |
| GET | /profile | profile.edit | ProfileController@edit |
| PATCH | /profile | profile.update | ProfileController@update |
| DELETE | /profile | profile.destroy | ProfileController@destroy |

## Models

### Task
- `name`, `description`, `due_date`, `status`, `priority`, `image_path`
- `assigned_user_id`, `created_by`, `updated_by`, `project_id`
- Relationships: `project()`, `assignedUser()`, `createdBy()`, `updatedBy()`

### Project
- `name`, `description`, `due_date`, `status`, `image_path`
- `created_by`, `updated_by`
- Relationships: `tasks()`, `createdBy()`, `updatedBy()`

### User
- `name`, `email`, `password`, `email_verified_at`
- Implements `MustVerifyEmail`

## Form Requests

- `StoreTaskRequest` / `UpdateTaskRequest`
- `StoreProjectRequest` / `UpdateProjectRequest`
- `StoreUserRequest` / `UpdateUserRequest`
- `ProfileUpdateRequest`

## Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build assets for production |

## PHP Scripts

| Command | Description |
|---------|-------------|
| `composer dev` | Run server, queue, logs, and Vite concurrently |
| `php artisan serve` | Start PHP development server |
| `php artisan migrate` | Run database migrations |
| `php artisan migrate:fresh --seed` | Reset DB and seed |
| `php artisan pail` | View application logs in real-time |
| `php artisan queue:listen` | Process queued jobs |

## Testing

```bash
php artisan test
# or
vendor/bin/pest
```

 
