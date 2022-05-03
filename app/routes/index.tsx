import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import getData from "~/utils/getData";

type Props = {};

export const loader: LoaderFunction = async () => {
  const data = await getData(0);
  // console.log(data);
  if (data && data.length > 1) return data;
  return null;
};
export const action: ActionFunction = async ({ request }) => {
  // num += 10;
  const FormData = await request.formData();
  const data = Object.fromEntries(FormData);
  // FormData.
  if (data.more) {
    // console.log(parseInt(data.more));
    const getMore: any = getData(parseInt(data.more));
    return getMore;
  }
  // console.log("data", data);
  return "";
};
export default function Index({}: Props) {
  const [dataNumber, setDataNumber] = React.useState(0);
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const data = [];
  if (loaderData) {
    data.push(...loaderData);
  } else if (actionData) {
    data.push(...actionData);
  }
  const [filterdData, setFilterdData] = React.useState(data);
  return (
    <Container>
      <Row>
        {loaderData &&
          loaderData.map((item: any, index: number) => (
            <Col key={index} sm={12} md={3}>
              <Image className=" img-fluid" src={item.uri} />
            </Col>
          ))}
        {actionData &&
          actionData.map((item: any, index: number) => (
            <Col key={index} sm={12} md={3}>
              <Image className=" img-fluid" src={item.uri} />
            </Col>
          ))}
      </Row>
      <Row>
        <div
          style={{
            position: "fixed",
            top: "80%",
            width: "100%",
            textAlign: "end",
          }}
        >
          <Form method="post">
            <Button
              name="more"
              type="submit"
              value={dataNumber}
              onClick={() => setDataNumber(dataNumber + 10)}
              style={{
                padding: 63,
                // background: "s#0d6efd",
                color: "white",
                fontSize: 31,
              }}
            >
              More
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
