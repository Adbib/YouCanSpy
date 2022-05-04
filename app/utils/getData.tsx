import sites from "./sites.json";
import cheerio from "cheerio";
import { prisma } from "./prisma.server";
const rp = require("request-promise");
export default async function getData(id: number) {
  let results: any = [];
  for (let i = id; i < id + 10; i++) {
    // for (let i = 500; i < 601; i++) {
    // console.log("id", i);
    if (i >= sites.length) break;
    try {
      const element = sites[i];
      const secResult: any = [];
      const check = await prisma.sites.findUnique({
        where: {
          title: element,
        },
      });
      if (check) {
        results.push(...check.imgs);
      } else {
        console.log(i, " : ", element);

        let html = await rp(element);
        let $ = cheerio.load(html);
        var link: any = $(".load-more a").html();
        if (link !== null) {
          link = $(".load-more a").attr("href");
          // console.log(link);
          try {
            html = await rp(link);
            $ = cheerio.load(html);
            const img: any = $(".product-thumbnail > img").map(function () {
              const imgLink: any = $(this).attr("data-src");
              const imgName = imgLink.split("/")[6];
              results.push({
                uri: imgLink,
                filename: imgName,
              });
              secResult.push({
                uri: imgLink,
                filename: imgName,
              });
            });
          } catch (err: any) {
            console.log("mesg", err.message);
            // if (err.message.includes("getaddrinfo ENOTFOUND ")) {
            const img = $(".product-thumbnail > img").map(function () {
              const imgLink: any = $(this).attr("data-src");
              const imgName = imgLink.split("/")[6];
              results.push({
                uri: imgLink,
                filename: imgName,
              });
              secResult.push({
                uri: imgLink,
                filename: imgName,
              });
            });
            // }
          }
        } else {
          console.log(2);
          const img = $(".product-thumbnail > img").map(function (itm) {
            const imgLink: any = $(this).attr("data-src");
            const imgName = imgLink.split("/")[6];
            results.push({
              uri: imgLink,
              filename: imgName,
            });
            secResult.push({
              uri: imgLink,
              filename: imgName,
            });
          });
        }
      }
      if (check === null)
        await prisma.sites.create({
          data: {
            title: sites[i],
            uri: sites[i],
            imgs: secResult,
          },
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return results;
}

// try {
//   const element = sites[i];
//   const secResult: any = [];
//   const check = await prisma.sites.findUnique({
//     where: {
//       title: element,
//     },
//   });
//   if (check) {
//     results.push(...check.imgs);
//   } else {
//     console.log(i);
//     const html = await rp(element);
//     var $ = cheerio.load(html);
//     var teli = $(".products-list-section").html();

//     const img: any = $(".product-thumbnail > img").map(function () {
//       const imgLink: any = $(this).attr("data-src");
//       const imgName = imgLink.split("/")[6];

//       results.push({
//         uri: imgLink,
//         filename: imgName,
//       });
//       secResult.push({
//         uri: imgLink,
//         filename: imgName,
//       });
//     });
//   }
//   if (check === null)
//     await prisma.sites.create({
//       data: {
//         title: sites[i],
//         uri: sites[i],
//         imgs: secResult,
//       },
//     });
// } catch (error: any) {
//   console.log(error.message);
// }
