import { getCronJobString } from "../env";
import {
  getDatesRage,
  getStringifyDate,
  startCronJob,
  validateCronJobString,
} from "./cronjob";
import { CronJob } from "cron";

const task = async (cronJob: CronJob) => {
  const dates = getDatesRage(cronJob);
  const stringifyDates = getStringifyDate(dates.currentDate, dates.dateBefore);
  console.log(stringifyDates);
};

const runCronjob = () => {
  console.log("STARTING CRON JOB");
  const cronjobString = getCronJobString();
  const validatedString = validateCronJobString(cronjobString);
  const cronjobInstance = startCronJob(validatedString, async () => {
    await task(cronjobInstance);
  });
  cronjobInstance.start();
};

export { runCronjob };
