// convert timestamp to "--days ago" format
export function calculateDate(createdAt) {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const diffMs = now.getTime() - createdAtDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let timeString;
  if (diffDays === 0) {
    timeString = 'today';
  } else if (diffDays === 1) {
    timeString = 'yesterday';
  } else if (diffDays < 7) {
    timeString = `${diffDays}d ago`;
  } else {
    const formattedDate = new Date(createdAt);
    const options = { month: 'short', day: 'numeric' };
    timeString = formattedDate.toLocaleDateString('en-US', options);
  }

  return timeString;
}
