import stickers from "../assets/stickers.json";

export const getSticker = () => {
  const index = Math.floor(Math.random() * stickers.length);
  const PATH = "https://manz.dev/assets/stickers/";
  return PATH + stickers[index];
};
