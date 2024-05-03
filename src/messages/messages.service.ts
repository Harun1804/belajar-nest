import { MessagesRepository } from './messages.repository';

export class MessagesService {
  constructor(private messagesRepo: MessagesRepository) {}

  findAll() {
    return this.messagesRepo.findAll();
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  create(message: string) {
    return this.messagesRepo.create(message);
  }
}
