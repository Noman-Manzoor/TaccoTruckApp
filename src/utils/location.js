const earthRadiusKm = 6371; // Earth's radius in kilometers

function haversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (earthRadiusKm * c).toFixed(2);
}

// const googleMapsClient = require('@google/maps').createClient({
//   key: '<YOUR_API_KEY>',
// });
//
// // Example usage
// googleMapsClient.distanceMatrix({
//   origins: ['London, UK'],
//   destinations: ['Los Angeles, USA'],
//   travelMode: 'driving',
// }, (err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const distance = response.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
//   console.log(`Driving distance between London and Los Angeles is: ${distance.toFixed(2)} kilometers`);
// });

module.exports = {
  haversineDistance
}