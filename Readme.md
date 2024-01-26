# Contact Management App

This application allows you to save contacts and perform update and delete operations on contacts. The app provides users with two ways to save contacts: in CRM or in the database.

**Note:** If you want to use the database, you need to download Docker or provide the URL for an online MySQL instance in Prisma.

## Endpoints

1. **Create Contact:**

   - **Method:** POST
   - **URL:** `http://localhost:3000/api/createContact`
   - **Data:**
     ```json
     {
       "first_name": "test",
       "last_name": "test",
       "email": "testtest@email.com",
       "mobile_number": "9891704882",
       "data_src": "database"
     }
     ```
     Valid values for `data_src` are "database" or "crm".

2. **Get Contact:**

   - **Method:** GET
   - **URL:** `http://localhost:3000/api/getContact/id`
   - **Data:**
     ```json
     {
       "data_src": "database" // or "crm"
     }
     ```
     `id` is provided in the response once the data is saved.

3. **Update Contact:**

   - **Method:** PUT
   - **URL:** `http://localhost:3000/api/updateContact/id`
   - **Data:**
     ```json
     {
       "data_src": "database" // or "crm"
     }
     ```

4. **Delete Contact:**
   - **Method:** DELETE
   - **URL:** `http://localhost:3000/api/deleteContact/id`
   - **Data:**
     ```json
     {
       "data_src": "database" // or "crm"
     }
     ```

## How to Run the Application Locally

**Step 1:** Run the command `npm install`

**Step 2:** Run the command `docker-compose -f docker-compose.yml up -d`

**Step 3:** Run the command `npx prisma migrate dev --name init`

**Step 4:** Run the command `npm run dev`

**Step 5:** Run the command `npm run start`
