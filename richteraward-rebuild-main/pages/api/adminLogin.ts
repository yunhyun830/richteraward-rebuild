
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await getLogin(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function getLogin(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    if(body.password === process.env.ADMIN_PASSWORD){
        return res.status(200).json({ message: "ok", success: true });
    }else{
        return res.status(200).json({ message: "no", success: true });
    }
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error add notice", success: false });
  }
}
