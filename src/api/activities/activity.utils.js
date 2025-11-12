export const kindsOfActivities = [
  'Badminton',
  'Cycling',
  'Other Activities',
  'Outdoor Walking',
  'Running',
  'Strength Training',
  'Swimming',
  'Threadmill',
  'Trailrunning',
  'Trekking',
];

export const secToTimeStr = (sec) => {
  let sec_num = parseInt(sec, 10); // don't forget the second param
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};

export const timeStrToSec = (timeStr) => {
  const durationParts = timeStr.split(':').map((part) => parseInt(part, 10));
  return (durationParts[0] || 0) * 3600 + (durationParts[1] || 0) * 60 + (durationParts[2] || 0);
};
