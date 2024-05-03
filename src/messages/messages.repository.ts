import { readFile, writeFile } from 'fs/promises';

export class MessagesRepository {
  private async readMessagesFile() {
    const contents = await readFile('messages.json', 'utf-8');
    return JSON.parse(contents);
  }

  async findAll() {
    const messages = await this.readMessagesFile();
    return messages;
  }

  async findOne(id: string) {
    const messages = await this.readMessagesFile();
    return messages[id];
  }

  async create(message: string) {
    const messages = await this.readMessagesFile();

    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, message };

    await writeFile('messages.json', JSON.stringify(messages));

    return messages[id];
  }
}
