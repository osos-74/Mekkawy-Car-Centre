export const Layout = {
  header: {
    top: 30,
    bottom: 135,
    left: 40,
    right: 555,
  },
  details: {
    y: 160,

    gap: 20,

    sectionWidth: 247,

    sectionHeight: 120,

    customerX: 40,

    vehicleX: 308,
  },
  page: {
    margin: 40,
    width: 515,
  },

  logo: {
    x: 40,
    y: 40,
    width: 70,
    height: 70,
  },

  company: {
    x: 130,
    y: 40,
  },

  invoice: {
    x: 400,
    y: 40,
  },

  table: {
    x: 40,
    y: 310,

    width: 515,

    headerHeight: 25,

    rowHeight: 22,

    columns: [
      { title: "#", width: 30 },
      { title: "Type", width: 55 },
      { title: "Description", width: 180 },
      { title: "Qty", width: 45 },
      { title: "Unit Price", width: 75 },
      { title: "Discount", width: 60 },
      { title: "Total", width: 70 },
    ],
  },

  totals: {
    x: 360,
    y: 0, // temporary, we will calculate it dynamically

    width: 195,

    lineHeight: 20,
  },
  notes: {
    x: 40,
    width: 515,
    lineHeight: 18,
  },
  signature: {
    leftX: 70,
    rightX: 340,
    width: 150,
  },
  footer: {
    y: 760,
  },
};
