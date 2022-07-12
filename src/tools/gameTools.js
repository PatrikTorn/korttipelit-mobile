export const sortPlayers = ({ players, user }) => {
  const myIndex = players.findIndex((player) => player.id === user.id);
  const deletedPlayers = players.filter((p, i, s) => i >= myIndex);
  players.splice(myIndex, players.length - myIndex);
  players.splice(0, 0, ...deletedPlayers);
  return players;
};

export const points = [
  {
    name: "Tikkivoitto",
    points: 2,
  },
  {
    name: "Tikkivoitto kakkoslopetuksella",
    points: 4,
  },
  ...[
    {
      name: "Neloset",
      points: 7,
    },
    {
      name: "Värisuora",
      points: 8,
    },
    {
      name: "Suora",
      points: 4,
    },
    {
      name: "Väri",
      points: 5,
    },
    {
      name: "Hai",
      points: 1,
    },
    {
      name: "Pari",
      points: 2,
    },
    {
      name: "Kaksi paria",
      points: 3,
    },
    {
      name: "Kuningasvärisuora",
      points: 9,
    },
    {
      name: "Kolmoset",
      points: 4,
    },
    {
      name: "Täyskäsi",
      points: 6,
    },
  ].sort((a, b) => a.points - b.points),
];
