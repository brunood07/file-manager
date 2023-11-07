import { ServiceBusMessage } from '@azure/service-bus';

export interface QueueSenderInterface {
  createMessage(data: ServiceBusMessage ): Promise<void>;
  createMessageBatch(data: ServiceBusMessage[]): Promise<void>;
}