// i got really confused with this (still am) so i have gpted some things and written the theory below. The first part of theory is just about the code and the second part is about why we are returning an async function.
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        // why are we using next? because we are using this in the error handler middlewear.
        try {
        await fn(req, res, next);
        } catch (error) {
        next(error);
        // next(error) passes the error to the error handler middlewear. If we do not make a custom error handler middlewear then the default error handler middlewear will be used. Express knows it has to pass it to the error handler middlewear as error belongs to class Error. Whenever we pass an error (obj of class error even if it is custom made, which will make in this project itself) to the next function, express knows that it has to pass it to the error handler middlewear.
        }
    };
};

module.exports=asyncWrapper;

/* 
__________________________________________________________________________________
###    PART 1: CODE EXPLANATION

The asyncWrapper middleware function is a higher-order function designed to simplify error handling in asynchronous route handlers in an Express.js application. Let’s break down the code step by step to understand how it works and why it's useful.

1. What is a Higher-Order Function?
A higher-order function is a function that either takes one or more functions as arguments or returns a function. In this case, asyncWrapper is a higher-order function because it takes a function (fn) as an argument and returns a new function.

2. Purpose of asyncWrapper
The purpose of asyncWrapper is to handle errors in asynchronous route handlers (i.e., functions that return a Promise or use the async keyword). When an asynchronous route handler throws an error (e.g., due to a rejected promise), the error must be passed to Express's error-handling middleware using next(error).

Without asyncWrapper, you would have to manually wrap every route handler in a try-catch block to catch any errors and pass them to next(error). This can get repetitive and error-prone. asyncWrapper automates this process.

3. Returning an Async Function
When you use asyncWrapper, it returns an asynchronous function that takes the typical Express route handler arguments: req, res, and next. This returned function does the following:

try block: It awaits the execution of the passed-in fn (which is the actual route handler function). If fn runs successfully without errors, everything proceeds as usual.
catch block: If fn throws an error (e.g., due to an exception or rejected promise), the catch block catches that error and passes it to next(error). This ensures that Express's error-handling middleware can handle the error appropriately.

4. Why Use async and await?
The async keyword is used because the route handler function (fn) might be an asynchronous function that returns a Promise. Using await inside the try block allows you to wait for the Promise to resolve or reject:

If the Promise resolves, the function completes, and the response can be sent to the client.
If the Promise rejects (throws an error), the catch block will handle the error by passing it to next.

ISKE AAGE KUCH THA BUT I DIDNT FIND IT THAT IMP SO I DIDNT PASTE THAT PART.

__________________________________________________________________________________
###    PART 2: WHY RETURN A FUNCTION?

The reason we return a function inside `asyncWrapper` rather than just executing the passed-in function (`fn`) directly is due to how middleware and route handlers work in Express.js.

### How Middleware and Route Handlers Work in Express

In Express.js, when you define a route, you're actually passing a function to Express that it will call later when a matching request comes in. This function (the route handler or middleware) is called with the `req`, `res`, and `next` objects.

For example:

```javascript
app.get('/some-route', (req, res) => {
    res.send('Hello World');
});
```

Here, `app.get` is being passed a function (`(req, res) => { ... }`). Express will call this function when a GET request is made to `/some-route`.

### Why Do We Return a Function in `asyncWrapper`?

When you use `asyncWrapper`, you're wrapping your original route handler in another function. This returned function is what Express will call when a request is made to the route.

Here’s a step-by-step explanation:

1. **Wrapping the Original Function**: 
    - `asyncWrapper` takes the original route handler function `fn` as an argument.
    - It returns a new function `(req, res, next)` that Express can call later.

2. **Delaying Execution**:
    - The returned function is not executed immediately. Instead, it is executed by Express when the corresponding route is hit.
    - If we executed `fn` immediately inside `asyncWrapper`, we would lose access to the `req`, `res`, and `next` objects, which are only available when the route is actually hit.

3. **Ensuring Access to Request and Response Objects**:
    - By returning a function, we ensure that when a request comes in, `fn` is executed with the correct `req`, `res`, and `next` objects.
    - The `asyncWrapper` ensures that the route handler (`fn`) has everything it needs to process the request and send a response.

### What Would Happen If You Executed `fn` Directly?

If you executed `fn` immediately inside `asyncWrapper`, you'd run into several issues:

- **Lack of `req`, `res`, and `next`**: The original function `fn` expects to be called with `req`, `res`, and `next` objects, which are only available when a request is made. If you executed `fn` directly, these objects wouldn’t be available, and the function wouldn’t work as expected.
  
  ```javascript
  const asyncWrapper = (fn) => {
      // If we executed fn directly, we would have to call it like this:
      fn(); // No req, res, or next available here
  };
  ```

- **No Deferred Execution**: Middleware and route handlers are supposed to be executed when a request is made. By returning a function, you defer the execution of `fn` until the correct time (i.e., when the route is hit).

### Example: Without Returning a Function

Imagine you tried to execute `fn` directly:

```javascript
const asyncWrapper = (fn) => {
    // This executes fn immediately, without req, res, or next
    try {
        fn(); // But there's no request yet, so this won't work as intended
    } catch (error) {
        // No next() function available to pass the error to
    }
};
```

In this case, `fn` would run immediately when you define the route, not when a request is made. This would defeat the purpose of having a route handler or middleware.

### Summary

- **Returning a Function**: In `asyncWrapper`, we return a new function so that it can be executed by Express when a request is made to the route. This ensures that `fn` has access to `req`, `res`, and `next` at the right time.
- **Deferred Execution**: By returning the function, you allow Express to defer the execution of `fn` until it’s actually needed (i.e., when the route is hit).

This pattern is common in Express.js and ensures that route handlers and middleware behave correctly within the framework’s request-response lifecycle.

*/