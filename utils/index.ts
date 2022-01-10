import * as api from "@/client/api";

// will need this to bust link cache (can add param ?t=getTimeOfDayInSeconds())
export const getTimeOfDayInSeconds = (): number => {
  const now = new Date();
  return now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
};

export function isValidURL(value: string) {
  var res = value.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export const buildUrlFromLink = (link: api.types.Link) => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000/links/${link.slug}`;
  } else {
    return `https://relink.page/links/${link.slug}`;
  }
};

// export const getSubdomain = (host: string) => {
//   if (process.env.NODE_ENV === "development") {
//     return host.split(".").slice(0, -1).join(".");
//   } else {
//     return host.split(".").slice(0, -2).join(".");
//   }
// };
