import * as api from "@/client/api";

// will need this to bust link cache (can add param ?t=getTimeOfDayInSeconds())
export const getTimeOfDayInSeconds = (date: Date): number => {
  return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
};

export function isValidURL(value: string) {
  var res = value.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export const buildUrlFromLink = (link: api.types.Link) => {
  const updatedAt = new Date(link.updated_at);
  const seconds = getTimeOfDayInSeconds(updatedAt);
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000/links/${encodeURIComponent(
      link.slug
    )}?t=${seconds}`;
  } else {
    return `https://relink.page/links/${encodeURIComponent(
      link.slug
    )}?t=${seconds}`;
  }
};

// prepend https if no protocol specified
export const inferRedirectUrl = (redirectUrl: string) => {
  if (redirectUrl.includes("://")) {
    return redirectUrl;
  } else {
    return "https://" + redirectUrl;
  }
};

// export const getSubdomain = (host: string) => {
//   if (process.env.NODE_ENV === "development") {
//     return host.split(".").slice(0, -1).join(".");
//   } else {
//     return host.split(".").slice(0, -2).join(".");
//   }
// };
