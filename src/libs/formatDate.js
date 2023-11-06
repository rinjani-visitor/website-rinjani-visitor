const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options).replace(/\//g, '-').replace(',', '');
  return formattedDate;
};

export { showFormattedDate }
