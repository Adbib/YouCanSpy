import type { ActionFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "./components/Header";
import mongoose from "mongoose";

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
export const meta: MetaFunction = () => {
  const description = `YouCan.shop Spying tool`;
  return {
    title: "YouCan.shop Spying tool",
    charset: "utf-8",
    description: "tool to scraping and spying on the youcan.shop stores",
    keywords: "youcan.shop,spying,tool,",
    "twitter:image":
      "https://ik.imagekit.io/yadbib/youcan-1651598598820_yIMMrLujH.png",

    "twitter:title": "YouCanSpy",
    "twitter:description": description,
    "og:image":
      "https://ik.imagekit.io/yadbib/youcan-1651598598820_yIMMrLujH.png",
  };
};
export function links() {
  return [
    {
      rel: "stylesheet",
      href: bootstrap,
    },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
