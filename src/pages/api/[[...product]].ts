// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    data: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
//     const data = [
//         {
//             id :1,
//             nama: "Baju Baru",
//             price: 500000,
//             size: "xl"
//         },
//         {
//             id :2,
//             nama: "Jaket Baru",
//             price: 700000,
//             size: "xl"
//         }
// ]
if(req.query.product?.[1]){
    const data = await retrieveDataById("products", req.query.product[1])
    res.status(200).json({ data });
}else{
  const data = await retrieveData("products")
      res.status(200).json({ data });
  }
}
