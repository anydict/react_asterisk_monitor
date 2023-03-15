import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return fetch("http://127.0.0.1:8088/ari/endpoints/SIP", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa("asterisk:K5CyLDe4iyV2GR2uWo6T5zrzQCru1Yqnh"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data)
    })
}
