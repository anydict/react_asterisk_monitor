import { Button, Card, Form, List } from "antd"
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import Navigation from "../components/navigation"
import moment from "moment"
import { Typography } from "antd"
React.useLayoutEffect = React.useEffect

const { Title } = Typography
const { Meta } = Card

interface ICaller {
  name: string
  number: string
}

interface IChannel {
  name: string
  id: string
  caller: ICaller
  creationtime: string
  duration: number
}

interface IPeers {
  resource: string
  state: string
}

export default function Home() {
  const [data, setData] = useState<IChannel[]>([])

  const [peers, setPeers] = useState<IPeers[]>([])

  const [logs, setLogs] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/chan_list")
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })

      fetch("/api/peer_list")
        .then((res) => res.json())
        .then((data) => {
          setPeers(data)
        })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/tail_log")
        .then((res) => res.json())
        .then((data) => {
          setLogs(data.data)
          console.log(data.data)
        })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getTimeDiff = (
    creationtime: string,
    differenceIn: string | any = "seconds",
    floating = false
  ) => {
    var now = moment()
    var then = moment(creationtime)
    var timeDifference = now.diff(then, differenceIn, floating)
    return timeDifference
  }

  const buttonHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    fetch("/api/chan_delete?chanid=" + event.currentTarget.id).then((res) => {
      console.log(res)
    })
  }

  return (
    <>
      <Navigation>
        <div style={{ padding: 10 }}>
          <Title level={2}>Устройства</Title>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={peers}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.resource}>
                  <Meta
                    avatar={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    title={"Статус: " + item.state}
                  />
                </Card>
              </List.Item>
            )}
          />

          <Title level={2}>Клиенты</Title>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.caller.number || item.name}>
                  ID канала: {item.id}
                  <p>Длительность: {getTimeDiff(item.creationtime)}</p>
                  <Button
                    type="primary"
                    danger
                    onClick={buttonHandler}
                    id={item.id}
                  >
                    <CloseCircleOutlined />
                    Завершить
                  </Button>
                </Card>
              </List.Item>
            )}
          />

          <Title level={2}>Логи</Title>
          <Card>
            <pre>{logs}</pre>
          </Card>
        </div>
      </Navigation>
    </>
  )
}
