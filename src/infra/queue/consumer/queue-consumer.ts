export interface QueueConsumerInterface {
  subscribe(): Promise<void>;
}