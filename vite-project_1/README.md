# CampusConnect (React + Vite + json-server)

## Run it

Open two terminals in this folder.

```
npm install
npm run server      # terminal 1: json-server on http://localhost:3000 (uses db.json)
npm run dev         # terminal 2: React app on http://localhost:5173
```

## Folder structure

```
db.json                      database: events, registrations, favorites
src/
  components/
    countdowntimer/          "Starts in" timer on the details page
    EventCard/               card with Register / Favorite / Details / Edit / Delete
    EventForm/               add and edit form (useRef, controlled inputs)
    Footer/  Navbar/
    RegistrationForm/        student registration form + success summary
  context/
    eventcontext.jsx         events + registrations (loaded from db.json)
    favouritecontext.jsx     favorites (saved in db.json)
  pages/                     Home, Events, EventDetails, Register, Favorites, Notfound
  services/                  api.js + eventservices, registrationservices, favoriteservices
```

## Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `/events` | Events: add/edit form, search, category filter, cards |
| `/events/:eventId` | Event details |
| `/register` and `/register/:eventId` | Registration form (event pre-selected when an id is given) |
| `/favorites` | Favorite events |
