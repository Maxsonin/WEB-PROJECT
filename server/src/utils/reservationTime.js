export const calculateEndTime = (startTime, numberOfVisitors) => {
  const availableHours = numberOfVisitors > 4 ? 4 : numberOfVisitors;

  const end_time = new Date(startTime);
  end_time.setHours(end_time.getHours() + availableHours);
  return end_time;
};
