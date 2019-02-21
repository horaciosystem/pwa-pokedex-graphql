# A Progressive Web App Pokédex

## Inspiration

This app is a prove of concept to make an app React with Apollo works offline.
The inspiration comes from the awesome Pokédex https://github.com/nolanlawson/pokedex.org#readme by Nolan Lawson.

## Stack highlights

- Create-React-App;
- Reactjs;
- Apollo GraphQL;
- apollo-cache-persist;

## Doubts I had during the development

1. Purge cache if the API schema has been changed.
   https://github.com/apollographql/apollo-cache-persist#ive-had-a-breaking-schema-change-how-do-i-migrate-or-purge-my-cache

2. Notify users that app is offline and data is not fresh.
   https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine

3. When purge the cache?
   It depends. Consider the apollo-cache-persist API,

   - We can do it automatically after some time;
   - Have a button to user trigger the refresh that basically does purge the cache and call the refetch from the current apollo query.

4. Caching assets on service worker and how to update them?
   A. Create-React-App already handles the manifest and the generated assets for the app.
