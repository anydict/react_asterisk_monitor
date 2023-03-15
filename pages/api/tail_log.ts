import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

async function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile("/var/log/call_log", 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      let lines = data.split("\n").reverse().slice(0, 20).join("\n")
      resolve(lines);
    });
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let data = await readFile()
  res.status(200).json({ data: data })
}