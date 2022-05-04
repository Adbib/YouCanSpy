import sites from "./sites.json";
import cheerio from "cheerio";
import { prisma } from "./prisma.server";
const rp = require("request-promise");
export default async function pushNew(id: number) {
  let results: any = [];
  for (let i = id; i < id + 10; i++) {}
  return results;
}
