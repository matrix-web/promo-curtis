export const img = (png, webp) => {
  return {
    png: {
      "0.5x": png[0],
      "1x": png[1],
      "2x": png[2],
    },
    webp: {
      "0.5x": webp[0],
      "1x": webp[1],
      "2x": webp[2],
    },
  };
};
