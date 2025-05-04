This is a monorepo containing a frontend and a backend applications. The goal is to provide a sudoku game to the user. The backend and frontend is connected with an graphql endpoint.

We use Bun for as javascript runtime for the frontend and backend application.

The frontend is in folder /apps/frontend. It uses react and the language typescript. Graphql queries are written with the library urql. The component library is @chakra-ui/react.  

The backend is in folder /apps/backend. It uses the language typescript. The provide the graphql endpoint, it uses the library graphql-yoga.