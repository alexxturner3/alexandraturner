
// Live datetime
function updateTime() {
  const now = new Date();

  const day = now.toLocaleDateString('en-NZ', {
    weekday: 'short'
  });

  const time = now.toLocaleTimeString('en-NZ', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const date = now.getDate();

  const suffix =
    date % 10 === 1 && date !== 11 ? 'st' :
    date % 10 === 2 && date !== 12 ? 'nd' :
    date % 10 === 3 && date !== 13 ? 'rd' : 'th';

  document.getElementById("datetime").innerHTML =
    `${day} ${date}${suffix}, NZT ${time}`;
}

setInterval(updateTime, 1000);
updateTime();

