class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = CustomAPIError


/*
EXPLANATION FOR WHY WE ARE NO MORE PASSING IN STATUS CODES DIRECTLY (JAISA APAN ISKE PEHELE KARTE THE) HERE AND MAKING SEPERATE ERROR CLASSES FOR EACH STATUS CODE:

1. class CustomAPIError extends Error:
This line defines a class called CustomAPIError.
A class in JavaScript is a blueprint for creating objects. It allows you to define properties and methods that will belong to the objects created from this class.
CustomAPIError is extending (or inheriting from) another built-in class called Error. The Error class is used to represent runtime errors in JavaScript. By extending Error, you're creating a custom type of error.
So, CustomAPIError is a class that will be treated like an error but with any additional customization you might want to add (such as setting custom error messages or properties).

2. constructor(message):
The constructor is a special method inside a class. It’s used to initialize new objects created from that class.
In this case, the constructor accepts a parameter called message. This will be the message you want to attach to the error. For example, "Something went wrong" or "Invalid input data".
When you create a new instance of the CustomAPIError class, you pass a message to it.

3. super(message):
The super() keyword is used to call the constructor of the parent class (Error in this case).
In JavaScript, when you extend a class (like CustomAPIError extending Error), you need to call super() inside your constructor to properly initialize the parent class.
Passing message to super(message) calls the constructor of the Error class and sets the error message for this custom error object.
4. module.exports = CustomAPIError:
This line makes the CustomAPIError class available to be used in other files of your project.
In Node.js, module.exports is used to export code from one file so that it can be imported and used in another file.
By exporting CustomAPIError, you can then import it in other parts of your application where you want to throw or catch this error.

*/