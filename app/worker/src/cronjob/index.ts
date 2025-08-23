import { getCronJobString } from "../env";
import {
  getStringifyDate,
  startCronJob,
  validateCronJobString,
} from "./cronjob";

const logJobIteration = (iteration: number) => {
  console.log(`[Cronjob] Starting job iteration: ${iteration}.`);
};

const logDateRange = (currentDate: Date, dateBefore: Date) => {
  const stringifyDates = getStringifyDate(currentDate, dateBefore);
  console.log(
    `[Cronjob] Time range: ${stringifyDates.dateBefore} - ${stringifyDates.currentDate}`
  );
};

const runCronjob = async (
  task: (currentDate: Date, dateBefore: Date) => Promise<void>
) => {
  console.log("[Cronjob] CRON JOB STARTING...");
  const cronjobString = getCronJobString();
  let iteration = 1;
  const validatedString = validateCronJobString(cronjobString);
  const cronjobInstance = startCronJob(
    validatedString,
    async (currentDate, dateBefore) => {
      logJobIteration(iteration);
      logDateRange(currentDate, dateBefore);
      await task(currentDate, dateBefore);
      iteration++;
    }
  );
  cronjobInstance.start();
};

export { runCronjob };
