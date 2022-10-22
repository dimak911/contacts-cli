const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const getContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

async function listContacts() {
  const contacts = await getContacts();

  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (contact) {
    console.table(contact);
  } else {
    console.warn("\x1B[31m No such contact");
  }
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts), "utf8");

  console.table(filteredContacts);
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const id = uuid();
  const newContact = { id, name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

  console.table(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
