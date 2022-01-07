// will need this to bust link cache (can add param ?t=getTimeOfDayInSeconds())
export const getTimeOfDayInSeconds = (): number => {
  const now = new Date();
  return now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
};
