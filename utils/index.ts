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
  return `https://${link.subdomain}.relink.page/${link.slug}`;
};
