import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import React, { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import getData from "~/utils/getData";

// export const meta: MetaFunction = () => {
//   const description = `YouCan.shop Spying tool`;
//   return {
//     charset: "utf-8",
//     description: "tool to scraping and spying on the youcan.shop stores",
//     keywords: "youcan.shop,spying,tool,",
//     "twitter:image":
//       "https://ik.imagekit.io/yadbib/youcan-1651598598820_yIMMrLujH.png",

//     "twitter:title": "YouCanSpy",
//     "twitter:description": description,
//     "og:image":
//       "https://ik.imagekit.io/yadbib/youcan-1651598598820_yIMMrLujH.png",
//   };
// };
type Props = {};
var myArray = [0, 20, 50];
var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
export const loader: LoaderFunction = async () => {
  const data = await getData(randomItem);
  if (data && data.length > 1) return data;
  return null;
};
export const action: ActionFunction = async ({ request }) => {
  const FormData = await request.formData();
  const data: any = Object.fromEntries(FormData);
  if (data.more) {
    const getMore: any = getData(parseInt(data.more));
    return getMore;
  }
  return "";
};
export default function Index({}: Props) {
  const [dataNumber, setDataNumber] = React.useState(0);
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const checkActionData = actionData && actionData.length > 1 ? actionData : [];
  const checkLoaderData = loaderData && loaderData.length > 1 ? loaderData : [];
  const [data, setData] = React.useState([
    ...checkActionData,
    ...checkLoaderData,
  ]);
  useEffect(() => {
    const checkStorage: any = localStorage.getItem("dataNumber");
    if (!checkStorage)
      localStorage.setItem("dataNumber", dataNumber.toString());
    if (actionData) setData([...data, ...checkActionData]);
  }, [actionData]);

  const handleClick = () => {
    setDataNumber(dataNumber + 10);
    // const checkStorage: any = localStorage.getItem("dataNumber");
    // console.log(checkStorage);
    // if (checkStorage && parseInt(checkStorage) < 20) {
    //   localStorage.setItem(
    //     "dataNumber",
    //     (parseInt(checkStorage) + 10).toString()
    //   );
    // } else {
    //   alert("You have reached the limit of data");
    // }
  };
  return (
    <Container>
      <Row>
        {data &&
          data.map((item: any, index: number) => (
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
              onClick={handleClick}
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
