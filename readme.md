# CSE341-starter

- Author: Matthew Bencomo
- Class: BYUI Pathways Worldwide CSE341
- Semester: Spring 2023

Simple nodeJS api for practicing how to use Node with a database. In this case, MongoDB.

## Dependencies

- dotenv
- express
- mongodb
- body-parser

## Dev Dependencies

- eslint
- nodemon
- prettier

## Setup

Clone the repo by running the following code in your directory of choice:

```console
git clone https://github.com/mbencomo2/CSE341-starter.git
cd CSE341-starter
```

After which you will need to run npm to install the necessary dependencies:

```console
npm install
```

## API Docs

These are the current routes implemented:

- /
  - users
    - GET /:id
  - contacts
    - GET /:id - fetch a single contact
    - POST /:id - Create a new contact
    - PUT /:id - update a contact, create if it doesn't exist
    - DELETE /:id - delete a contact
