# Weather Report App
NodeJs backend application that provides weather reports to users by sending email according to their location. The app uses the OpenWeatherMap API to fetch current weather and use Gemini API to generate text about weather data. This app deployed on Vercel.
<br>

## Installation

To set up the project locally, follow these steps:

**1. Clone the repository:**

```bash
git clone https://github.com/inupaUdara/NodeJS-Weather-Reports-App.git
```

**2. Install dependencies for the frontend and backend:**

```bash
npm install
```

**3. Set up MongoDB:**

- Create a MongoDB database and configure the connection in index.js.

**4. Run the development server:**

```bash
npm run dev
```

<br>

## Postman API collection

**1. Create User (POST):**

```bash
https://node-js-weather-reports-app.vercel.app/api/user/create-user
```
API body - JSON
```bash
{
    "email":"example@gmail.com",
    "location":"pannipitiya"
}
```

**2. Update User (PUT):**

```bash
https://node-js-weather-reports-app.vercel.app/api/user/update-user/668f6ce2a45ae57e5f13e27d
```
API body - JSON
```bash
{
    "email":"example@gmail.com",
    "location":"galle"
}
```

**3. Get weather data (GET):**

```bash
https://node-js-weather-reports-app.vercel.app/api/user/weather-data?email=example2@gmail.com&date=2024-07-12
```



