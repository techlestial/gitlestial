export const logError = (error: Error) => {
  console.log("[ERROR] Gitlestial has encountered error.");
  console.error(error);
};

export const logInfo = (info: string) => {
  console.log(`[INFO] ${info}`);
};

export const logSuccess = (success: string) => {
  console.log(`[SUCCESS] ${success}`);
};

export const logDebug = (debug: string) => {
  console.debug(`[DEBUG] ${debug}`);
};
