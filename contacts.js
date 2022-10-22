const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const getContacts = async () => {
  const contactsFromDb = await fs.readFile(contactsPath, "utf8");
  const parsedContactsFromDb = JSON.parse(contactsFromDb);

  return parsedContactsFromDb;
};

async function listContacts() {
  try {
    const contacts = await getContacts();

    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (!contact) {
      return null;
    }

    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contact = getContactById(contactId);

    if (!contact) {
      return null;
    }

    const contacts = await getContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), "utf8");

    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
    const id = uuid();
    const newContact = { id, name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
