# MeLi-TC

[Front-End Test Práctico.pdf](https://github.com/GermanFerro/MeLi-TC/files/10884707/Front-End.Test.Practico.pdf)

This is my implementation of the code challenge from Mercado Libre.

Details of the UX and UI can be checked out on the attached PDF file.

## HOW TO RUN THE PROJECT

Both backend and frontend have to be run in order to use the app locally.

- Backend: go to **MeLi-TC/meli-tc-b** and run **npm start** (runs on port 8080)
- Frontend: go to **MeLi-TC/meli-tc-f** and run **npm start** (runs on port 3000)

**npm install** is needed on both places in order to install required dependences.

## TECH STACK

### Frontend

[React Router](https://reactrouter.com/en/main): I picked this due to the way navigation works for the App, the new version includes useful hooks like useNavigate that can be seen in action. It also works great in combination with react query.

[React Query](https://tanstack.com/query/latest): Due to the quick navigation that may happen inside the App, I though react query could really help making the experience more fluid. I combined the cache properties with the loaders for the routes to accomplish instant navigation between cached results.

### Backend

NodeJS - Express: The backend implementation is fairly simple as it only works as a passthrough between the frontend and Mercado Libre's public API.
