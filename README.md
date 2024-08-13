# ToDo-App

This is a ToDo application project built with .NET Core 7 and Angular 16.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Commit Conventions](#commit-conventions)

## Description

ToDo-App is a simple application for managing tasks. The application does not use soft deletes or generics due to its scope.
It is not yet complete and still missing:
- User authentication
- Search and filters
- Style corrections

## Installation

To get the project up and running locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/renzobanegass/ToDo-App.git
    cd ToDo-App
    ```

2. Set up the API:

    - Navigate to the API folder:

      ```bash
      cd ToDoApp.Api
      ```

    - Restore dependencies and update the database with the latest migrations:

      ```bash
      dotnet restore
      dotnet ef database update
      ```

3. Set up the frontend:

    - Navigate to the frontend folder:

      ```bash
      cd ../ToDoApp.Client
      ```

    - Install the dependencies:

      ```bash
      npm install
      ```

4. Run the application:

    - To start the API:

      ```bash
      cd ../ToDoApp.Api
      dotnet run
      ```

    - To start the frontend:

      ```bash
      cd ../ToDoApp.Client
      ng serve
      ```

    The application will be available at `http://localhost:4200`.

## Usage

Once the application is running, you can manage your tasks, create new ones, edit them, and delete them.

## Commit Conventions

This project uses commit conventions to maintain a clear and structured change history. Starting from the API refactor, the following conventions were implemented:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (whitespace, formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or correcting tests
- `chore`: Updates to build tasks, package manager configurations, etc.
