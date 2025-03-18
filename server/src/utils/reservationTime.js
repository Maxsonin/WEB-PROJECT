export const calculateEndTime = (startTime, numberOfVisitors) => {
  const timezoneOffset = 2; // Kyiv
  const availableHours = numberOfVisitors > 4 ? 4 : numberOfVisitors;
  const end_time = new Date(startTime);
  end_time.setUTCHours(
    end_time.getUTCHours() + availableHours + timezoneOffset
  );
  return end_time;
};
