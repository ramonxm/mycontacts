import delay from '../utils/delay';

const baseURL = 'http://localhost:3001';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(`${baseURL}/contacts?orderBy=${orderBy}`);
    await delay(500);
    return response.json();
  }
}

export default new ContactsService();
