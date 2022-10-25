class ContactMapper {
  toPersistence(domainContact) {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(persistenceContact) {
    return {
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      categoryId: persistenceContact.category_id,
    };
  }
}

export default new ContactMapper();
