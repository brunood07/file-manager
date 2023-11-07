import { ServiceBusClient, ServiceBusSender, ServiceBusMessage } from '@azure/service-bus';
import { QueueSenderInterface } from './queue-sender';
import { env } from '../../env';

export class AzureQueueSender implements QueueSenderInterface {
  queueName: string = 'my-learning-qeue';
  sbClient: ServiceBusClient;
  sender: ServiceBusSender;

  constructor() {
    this.sbClient = new ServiceBusClient(env.AZURE_SERVICEBUS_CONNECTION_STRING);
    this.sender = this.sbClient.createSender(this.queueName);
  }

  async createMessage(data: ServiceBusMessage ): Promise<void> {
    this.sender.sendMessages(data);
  }
  
  async createMessageBatch(data: ServiceBusMessage[]): Promise<void> {
    try {
      let batch = await this.sender.createMessageBatch();

      for (let i = 0; i < data.length; i++) {
        if (!batch.tryAddMessage(data[i])) {
          await this.sender.sendMessages(batch);

          batch = await this.sender.createMessageBatch();

          if (!batch.tryAddMessage(data[i])) {
            throw new Error('Message too big to fit in a batch');
          }
        }
      }

      await this.sender.sendMessages(batch);
      console.log(`Sent a batch of messages to the queue: ${this.queueName}`);
      await this.sender.close();
    } finally {
      await this.sbClient.close();
    }
  }
}