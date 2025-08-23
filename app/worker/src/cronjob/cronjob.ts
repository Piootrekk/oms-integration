import { CronJob, validateCronExpression } from "cron";

const validateCronJobString = (cronjobSring: string) => {
  const validated = validateCronExpression(cronjobSring);
  if (!validated.valid && validated.error)
    throw new Error(
      `[Cronjob] Validation error, incorrect cronjob string format. Message: ${validated.error.message}`
    );
  return cronjobSring;
};

const getIntervalTick = (cronJob: CronJob) => {
  const diffInterval = cronJob.nextDate().diffNow().as("milliseconds");
  return diffInterval;
};

const getDatesRage = (cronJob: CronJob) => {
  const intervalTickInMs = getIntervalTick(cronJob);
  const currentDate = new Date();
  const dateBefore = new Date(Date.now() - intervalTickInMs);
  return { currentDate, dateBefore };
};

const getStringifyDate = (currentDate: Date, dateBefore: Date) => {
  const stringifyCurrentDate = currentDate.toLocaleString();
  const stringifyDateBefore = dateBefore.toLocaleString();

  return { currentDate: stringifyCurrentDate, dateBefore: stringifyDateBefore };
};

const startCronJob = (
  cronjobSring: string,
  onTick: (currentDate: Date, dateBefore: Date) => Promise<void>
) => {
  const cronJob = CronJob.from({
    cronTime: cronjobSring,
    onTick: async () => {
      const dates = getDatesRage(cronJob);
      await onTick(dates.currentDate, dates.dateBefore);
    },
  });
  return cronJob;
};

export { startCronJob, validateCronJobString, getDatesRage, getStringifyDate };
