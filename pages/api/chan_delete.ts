import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let chanid = (req && req.query && req.query.chanid) || ""

  return fetch("http://127.0.0.1:8088/ari/channels/" + chanid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa("asterisk:K5CyLDe4iyV2GR2uWo6T5zrzQCru1Yqnh"),
    },
  }).then((data) => {
    if (data.status && data.status == 204) {
      res.status(data.status).json({})
    } else {
      res.status(404).json({})
    }
  })
}
