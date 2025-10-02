# contact-manager

## To build
---
### Step 1
`git clone https://github.com/TGriffin77/contact-manager` into a new directory

### Step 2
Once cloned, `cd frontend` and run `npm install`
All required libraries will installed

### Step 3
To build the front end run `npm run build` to build the React project
Move the build folder contents to where the frontend will be hosted

### Step 4
Move the files within the `backend` folder into a new route named `LAMPAPI` on apache server to server the php files

### Step 5
Create a database of mysql on the local server and make a database named: `cop4331`
Import the `backup.sql` into the database to create a schema
Create a user named `user` with password `password` with all priveleges