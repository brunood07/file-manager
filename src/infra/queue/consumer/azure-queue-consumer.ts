import { ServiceBusClient, ServiceBusReceiver, ServiceBusReceivedMessage, delay, ProcessErrorArgs } from '@azure/service-bus';
import { QueueConsumerInterface } from './queue-consumer';
import { env } from '../../env';

export class AzureQueueConsumer implements QueueConsumerInterface {
  queueName: string = 'my-learning-qeue';
  sbClient: ServiceBusClient;
  receiver: ServiceBusReceiver ;

  constructor() {
    this.sbClient = new ServiceBusClient(env.AZURE_SERVICEBUS_CONNECTION_STRING);
    this.receiver = this.sbClient.createReceiver(this.queueName);
  }
  
  async subscribe(): Promise<string[]> {
    const messages = [] as string[];

    const myMessageHandler = async (messageReceived: ServiceBusReceivedMessage) => {
      console.log(`Received message: ${messageReceived.body}`);
      messages.push(messageReceived.body);
    };

    const myErrorHandler = async (error: ProcessErrorArgs) => {
      console.log(error);
    };

    this.receiver.subscribe({
      processMessage: myMessageHandler,
      processError: myErrorHandler
    });

    await delay(20000);

    await this.receiver.close();
    await this.sbClient.close();

    return messages;
  }
}