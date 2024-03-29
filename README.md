# Shlink - URL Shortening Service

Shlink is a URL shortening service built with Node.js and TypeScript. It allows users to shorten original or long URLs. It offers other features like custom URLs, QR code generation, basic analytics, and link history.

## Features

- **URL Shortening**: Shorten long URLs into compact, easy-to-share links.
- **Custom URLs**: Customize shortened URLs with your own custom alias and domain.
- **QR Code Generation**: Generate QR codes for shortened URLs for easy sharing and promotion.
- **Analytics**: Track the performance of shortened URLs with basic analytics, including click counts and sources.
- **Link History**: View a history of shortened URLs created by each user for easy access and reuse.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (or any other database of your choice)
- Redis (for caching)
- Third-party QR code generator API (e.g., QR Code API)

## Setup Instructions

1. Clone the repository:

   git clone 

2. Install Dependecies:

- cd backend
- npm install

3. Set up environment variables:

- Create a '.env' file in the root directory
- Define enviroment variablessuch as database connection string, API keys, etc.
