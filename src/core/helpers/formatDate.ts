import moment from "moment";

export const formatDate = (date: any) => {
  return moment(date).format("D-MM-YYYY");
};
