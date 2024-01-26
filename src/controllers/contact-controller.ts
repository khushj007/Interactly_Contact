import { Request, Response } from "express";
import axios from "axios";
import prisma from "../prismaclient/prisma";

const headers = {
  Authorization: `Token token=${process.env.api_key}`,
  "Content-Type": "application/json",
};

//create
export async function createContact(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, mobile_number } = req.body;
    const data_src: String = req.body.data_src.toLowerCase();
    if (!first_name) {
      return res
        .status(400)
        .json({ message: "first_name parameter not provided" });
    }

    if (!last_name) {
      return res
        .status(400)
        .json({ message: "last_name parameter not provided" });
    }

    if (!email) {
      return res.status(400).json({ message: "email parameter not provided" });
    }

    if (!mobile_number) {
      return res
        .status(400)
        .json({ message: "mobile_number parameter not provided" });
    }

    if (data_src === "crm") {
      const data = {
        contact: {
          first_name,
          last_name,
          mobile_number,
          email,
        },
      };

      const details = await axios.post(
        "https://khushjoshi007-org.myfreshworks.com/crm/sales/api/contacts",
        data,
        { headers }
      );

      const sendData = {
        id: details.data.contact.id,
        first_name: details.data.contact.first_name,
        last_name: details.data.contact.last_name,
        email: details.data.contact.email,
        mobile_number: details.data.contact.mobile_number,
      };

      return res
        .status(201)
        .json({ message: "data stored in CRM", details: sendData });
    } else if (data_src === "database") {
      const check_mobile = await prisma.contact.findFirst({
        where: {
          mobile: mobile_number,
        },
      });

      if (check_mobile) {
        return res.json({ message: "mobile number already exist" });
      }

      const detail = await prisma.contact.create({
        data: {
          first_name,
          last_name,
          mobile: mobile_number,
          email,
        },
      });

      return res
        .status(201)
        .json({ message: "data saved in database", details: { ...detail } });
    }
    return res.status(400).json({ message: "enter valid data_src" });
  } catch (error: any) {
    return res.json({ type: "error message", message: error.message });
  }
}

//get
export async function getContact(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data_src: String = req.body.data_src.toLowerCase();

    if (!data_src) {
      return res.status(400).json({ message: "data_src is not provided" });
    }
    if (!id) {
      return res.status(400).json({ message: "id is not provided" });
    }

    if (data_src === "crm") {
      const details = await axios.get(
        `https://khushjoshi007-org.myfreshworks.com/crm/sales/api/contacts/${id}`,
        { headers }
      );
      const sendData = {
        id: details.data.contact.id,
        first_name: details.data.contact.first_name,
        last_name: details.data.contact.last_name,
        email: details.data.contact.email,
        mobile_number: details.data.contact.mobile_number,
      };

      return res
        .status(201)
        .json({ message: "data from CRM", details: sendData });
    } else if (data_src === "database") {
      const data = await prisma.contact.findFirst({
        where: {
          id: id,
        },
      });

      return res
        .status(201)
        .json({ message: "data from database", details: { ...data } });
    }

    return res.status(400).json({ message: "enter valid data_src" });
  } catch (error: any) {
    return res.json({ type: "error message", message: error.message });
  }
}

//update
export async function updateContact(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, mobile_number } = req.body;
    const data_src: String = req.body.data_src.toLowerCase();

    if (!data_src) {
      return res.status(400).json({ message: "data_src is not provided" });
    }
    if (!id) {
      return res.status(400).json({ message: "id is not provided" });
    }

    if (data_src === "crm") {
      const user = await axios.get(
        `https://khushjoshi007-org.myfreshworks.com/crm/sales/api/contacts/${id}`,
        { headers }
      );

      const data = {
        mobile_number: mobile_number ? mobile_number : user.data.mobile_number,
        email: email ? email : user.data.email,
      };

      const details = await axios.put(
        `https://khushjoshi007-org.myfreshworks.com/crm/sales/api/contacts/${id}`,
        data,
        { headers }
      );

      return details.status === 200
        ? res.status(200).json({ message: "contact updated in CRM" })
        : res.status(400).json({
            message: "contact is not present or update failed in CRM",
          });
    } else if (data_src === "database") {
      const user = await prisma.contact.findFirst({
        where: {
          id: id,
        },
      });

      const udated_user = await prisma.contact.update({
        where: {
          id: id,
        },
        data: {
          mobile: mobile_number ? mobile_number : user?.mobile,
          email: email ? email : user?.email,
        },
      });

      return res.status(200).json({
        message: "contact updated in database",
      });
    }

    return res.status(400).json({ message: "enter valid data_src" });
  } catch (error: any) {
    return res.json({ type: "error message", message: error.message });
  }
}

//delete
export async function deleteContact(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const data_src: string = data.data_src.toLowerCase();

    if (!data_src) {
      return res.status(400).json({ message: "data_src is not provided" });
    }
    if (!id) {
      return res.status(400).json({ message: "id is not provided" });
    }

    if (data_src === "crm") {
      const details = await axios.delete(
        `https://khushjoshi007-org.myfreshworks.com/crm/sales/api/contacts/${id}`,
        { headers }
      );
      return details.status == 200
        ? res.status(200).json({ message: "contact deleted from CRM" })
        : res
            .status(200)
            .json({ message: "contact is not present or already deleted" });
    } else if (data_src === "database") {
      const data = await prisma.contact.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: "contact deleted from database",
      });
    }

    return res.status(400).json({ message: "enter valid data_src" });
  } catch (error: any) {
    return res.json({ type: "error message", message: error.message });
  }
}
