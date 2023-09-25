import moment from "moment";

export const formatDate = (date: string) => {
  const momntDate = moment(date);
  if (!momntDate.isValid()) {
    return "";
  }
  return moment(date).format("D-MM-YYYY");
};
