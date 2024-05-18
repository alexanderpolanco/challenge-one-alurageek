function rateProduct(votesByStar) {
  let totalVotes = 0;
  let totalPoints = 0;

  for (let stars in votesByStar) {
    const votes = votesByStar[stars];
    totalVotes += votes;
    totalPoints += votes * parseInt(stars);
  }

  const averageRating = totalPoints / totalVotes;

  const roundedRating = averageRating.toFixed(1);

  return roundedRating;
}

export { rateProduct };
