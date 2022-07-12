import React from "react";
import { View, Text, TouchableOpacity, PixelRatio, Image } from "react-native";
const _2C = require("../images/cards/2C.png");
const _2S = require("../images/cards/2S.png");
const _2D = require("../images/cards/2D.png");
const _2H = require("../images/cards/2H.png");
const _3C = require("../images/cards/3C.png");
const _3S = require("../images/cards/3S.png");
const _3D = require("../images/cards/3D.png");
const _3H = require("../images/cards/3H.png");
const _4C = require("../images/cards/4C.png");
const _4S = require("../images/cards/4S.png");
const _4D = require("../images/cards/4D.png");
const _4H = require("../images/cards/4H.png");
const _5C = require("../images/cards/5C.png");
const _5S = require("../images/cards/5S.png");
const _5D = require("../images/cards/5D.png");
const _5H = require("../images/cards/5H.png");
const _6C = require("../images/cards/6C.png");
const _6S = require("../images/cards/6S.png");
const _6D = require("../images/cards/6D.png");
const _6H = require("../images/cards/6H.png");
const _7C = require("../images/cards/7C.png");
const _7S = require("../images/cards/7S.png");
const _7D = require("../images/cards/7D.png");
const _7H = require("../images/cards/7H.png");
const _8C = require("../images/cards/8C.png");
const _8S = require("../images/cards/8S.png");
const _8D = require("../images/cards/8D.png");
const _8H = require("../images/cards/8H.png");
const _9C = require("../images/cards/9C.png");
const _9S = require("../images/cards/9S.png");
const _9D = require("../images/cards/9D.png");
const _9H = require("../images/cards/9H.png");
const _10C = require("../images/cards/10C.png");
const _10S = require("../images/cards/10S.png");
const _10D = require("../images/cards/10D.png");
const _10H = require("../images/cards/10H.png");
const _JC = require("../images/cards/JC.png");
const _JS = require("../images/cards/JS.png");
const _JD = require("../images/cards/JD.png");
const _JH = require("../images/cards/JH.png");
const _QC = require("../images/cards/QC.png");
const _QS = require("../images/cards/QS.png");
const _QD = require("../images/cards/QD.png");
const _QH = require("../images/cards/QH.png");
const _KC = require("../images/cards/KC.png");
const _KS = require("../images/cards/KS.png");
const _KD = require("../images/cards/KD.png");
const _KH = require("../images/cards/KH.png");
const _AC = require("../images/cards/AC.png");
const _AS = require("../images/cards/AS.png");
const _AD = require("../images/cards/AD.png");
const _AH = require("../images/cards/AH.png");
const _BACK = require("../images/cards/green_back.png");
// const images = {};

const images = {
  _2C,
  _2S,
  _2D,
  _2H,
  _3C,
  _3S,
  _3D,
  _3H,
  _4C,
  _4S,
  _4D,
  _4H,
  _5C,
  _5S,
  _5D,
  _5H,
  _6C,
  _6S,
  _6D,
  _6H,
  _7C,
  _7S,
  _7D,
  _7H,
  _8C,
  _8S,
  _8D,
  _8H,
  _9C,
  _9S,
  _9D,
  _9H,
  _10C,
  _10S,
  _10D,
  _10H,
  _JC,
  _JS,
  _JD,
  _JH,
  _QC,
  _QS,
  _QD,
  _QH,
  _KC,
  _KS,
  _KD,
  _KH,
  _AC,
  _AS,
  _AD,
  _AH,
  _BACK,
};

export const Card = ({
  card,
  onPress,
  hidden,
  table,
  select,
  i,
  center,
  hiddenCenter,
}) => {
  const cardImage = images[`_${card.id}`];
  const cardHidden = images._BACK;

  if (select)
    return (
      <TouchableOpacity
        onPress={() => onPress && card.enabled && onPress()}
        style={styles.cardSelectContainer(card, i)}
      >
        <Image style={styles.cardSelect(card, i)} source={cardImage}></Image>
      </TouchableOpacity>
    );
  if (hidden)
    return <Image source={cardHidden} style={styles.cardHidden}></Image>;
  if (table) return <Image source={cardImage} style={styles.tableCard}></Image>;
  if (center)
    return <Image source={cardImage} style={styles.cardCenter}></Image>;
  if (hiddenCenter)
    return (
      <Image source={cardHidden} style={styles.cardCenterHidden(i)}></Image>
    );
  return <Image source={cardImage} style={styles.card(card)}></Image>;
};

// return select ?
// <TouchableOpacity
//     onPress={() => onPress && card.enabled && onPress()}
//     style={styles.cardSelectContainer(card, i)}
// >
//     <Image
//         style={styles.cardSelect(card, i)}
//         source={cardImage}>
//     </Image>
// </TouchableOpacity>
// :
// (hidden ? <Image source={cardHidden} style={styles.cardHidden}></Image>
// : (
// table ? <Image source={cardImage} style={styles.tableCard}></Image>
// : <Image source={cardImage} style={styles.card(card)}></Image>
// )
// )

const cardContainer = {
  width: "22%",
  height: "auto",
  marginLeft: "-6%",
  aspectRatio: 200 / 306,
};

const styles = {
  card: (card) => ({
    ...cardContainer,
    marginBottom: card.selected ? 15 : 0,
  }),
  tableCard: {
    ...cardContainer,
    height: 60,
    width: "auto",
  },
  cardHidden: {
    ...cardContainer,
  },
  cardSelectContainer: (card, i) => ({
    marginLeft: i === 0 ? 0 : -30,
    width: "auto",
    aspectRatio: 200 / 306,
    backgroundColor: card.enabled ? "transparent" : "black",
    borderRadius: 6,
    height: "100%",
  }),
  cardSelect: (card, i) => ({
    width: "auto",
    height: "100%",
    borderWidth: card.selected ? 2 : 0,
    borderColor: "blue",
    opacity: card.enabled ? 1 : 0.5,
    borderRadius: 5,
    backgroundColor: "transparent",
    marginBottom: card.selected ? 15 : 0,
  }),
  cardCenterHidden: (i) => ({
    position: "absolute",
    left: i * 0.2,
    bottom: i * 0.2,
    height: "90%",
    width: "auto",
    aspectRatio: 200 / 306,
  }),
  cardCenter: {
    height: "100%",
    width: "auto",
    aspectRatio: 200 / 306,
  },
};
