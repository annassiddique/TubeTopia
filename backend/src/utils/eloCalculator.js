const calculateElo = (eloA, eloB, winner) => {
  const K = 32; 
  const expectedA = 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (eloA - eloB) / 400));

  let newEloA, newEloB;

  if (winner === "A") {
    newEloA = eloA + K * (1 - expectedA); 
    newEloB = eloB + K * (0 - expectedB); 
  } else if (winner === "B") {
    newEloA = eloA + K * (0 - expectedA); 
    newEloB = eloB + K * (1 - expectedB); 
  }

  return { newEloA, newEloB };
};

module.exports = { calculateElo };
