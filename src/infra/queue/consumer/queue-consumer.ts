export interface QueueConsumerInterface {
  subscribe(): Promise<string[]>;
}