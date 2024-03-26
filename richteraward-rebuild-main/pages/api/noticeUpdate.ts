import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await addNotice(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function addNotice(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  let nowTime = new Date();
  try {
    const newEntry = await prisma.notice.update({
      where: {
        id: body.id
      },
      data: {
        noticeText: body.noticeText,
        updatedAt: nowTime
      },
    });
    return res.status(200).json({ data: newEntry, success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error add notice", success: false });
  }
}
