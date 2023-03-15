import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  fs.readFile(
    "/var/log/asterisk_extapi-0/asterisk.log",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err)
        res.status(200).json({})
      }
      let lines = data.split("\n").reverse().slice(0, 20).join("\n")
      res.status(200).json({ data: lines })
    }
  )
}
