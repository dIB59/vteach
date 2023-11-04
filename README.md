# vteach

To run this project install these dependencies:
├── bcrypt@5.1.1
├── cors@2.8.5
├── dotenv@16.3.1
├── express@4.18.2
├── jsonwebtoken@9.0.2
├── mongoose@7.6.3
└── validator@13.11.0

In order to make a request to the API, you'll need to include an Authorization header to authenticate.

    1.Open your API testing tool (such as Postman).

    2.Navigate to the Headers section.

    3.Add a new header with "Authorization" as the Key.

    4.In the Value field, enter Bearer followed by a space, and then your access token. For example, if your access token is abc123, the value would be: Bearer abc123.

This step is crucial to ensure that your request is authenticated properly. Without it, you may receive an "invalid token" error message.
