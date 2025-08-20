import { CronJob } from "cron";

const startCronJob = async () => {
  const cronJob = CronJob.from({
    cronTime: "*/5 * * * *",
    onTick: async () => {},
  });
  return cronJob;
};

export { startCronJob };
