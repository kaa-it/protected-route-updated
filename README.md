# TODO:

1. Fix design in forms (gaps).
2. All functions in `utils` folder must be async, must not use promises.
3. `defaultOptions` must be used only in `tokens.js` file in `request` function only. 
   Now in `getUser` request is not configured properly `Content-Type` Header.
4. For `accessToken` must be used cookies.
5. It is needed to add function `isTokenExists` in `token.js` for checking existing of access token in cookies.
   This function must be used in `checkUserAuth` action.
6. `checkUserAuth` must be async without promises.
