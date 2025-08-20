import { CronJob, validateCronExpression } from "cron";

const validateCronJobString = (cronjobSring: string) => {
  const validated = validateCronExpression(cronjobSring);
  if (!validated.valid && validated.error)
    throw new Error(
      `Validation error, incorrect cronjob string format. Message: ${validated.error.message}`
    );
  return cronjobSring;
};

const getIntervalTick = (cronJob: CronJob) => {
  const diffDuration = cronJob.nextDate().diffNow().get("second");
  return diffDuration;
};

const startCronJob = async (cronjobSring: string) => {
  const cronJob = CronJob.from({
    cronTime: cronjobSring,
    onTick: async () => {},
  });
  return cronJob;
};

export { startCronJob, validateCronJobString, getIntervalTick };
