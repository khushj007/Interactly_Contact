import { Router } from "express";
import {
  createContact,
  getContact,
  deleteContact,
  updateContact,
} from "../controllers/contact-controller";

const ContactRouter = Router();

ContactRouter.post("/createContact", createContact);
ContactRouter.get("/getContact/:id", getContact);
ContactRouter.put("/updateContact/:id", updateContact);
ContactRouter.delete("/deleteContact/:id", deleteContact);

export default ContactRouter;
