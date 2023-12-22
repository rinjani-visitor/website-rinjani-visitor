const BookingStatus = ({ status }) => {
  let bg
  switch (status) {
    case 'Offering':
      bg = '#026AA2';
      break;
    case 'Success':
      bg = '#039855';
      break;
    case 'Waiting for Payment':
      bg = '#DC6803';
      break;
    case 'Declined':
      bg = '#D92D20';
      break;
    case 'Payment Failed':
      bg = '#D92D20';
      break;
    case 'Payment Reviewing':
      bg = '#934400';
      break;
    case 'On Journey':
      bg = '#039855';
      break;
    case 'Finished':
      bg = '#979797';
      break;
    case 'Canceled':
      bg = '#C5261A';
      break;
    default:
      bg = '#232323'; // Warna default
  }

  return (
    <p style={{ backgroundColor: bg }} className={`rounded-full py-2 px-3 text-[10px] md:text-sm font-light text-white`}>{status}</p>
  )
}

export default BookingStatus