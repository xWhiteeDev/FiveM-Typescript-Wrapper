export class Utils {
  static wait(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }
  static async waitUntil(
    predicate: () => boolean,
    options: { waitInterval: number; maxAttempts: number; onTick?: () => void },
  ): Promise<boolean> {
    let attemps = 0;
    options.onTick?.();
    while (!predicate() && attemps < options.maxAttempts) {
      await Utils.wait(options.waitInterval);
      options.onTick?.();
      attemps++;
    }
    return predicate();
  }
}