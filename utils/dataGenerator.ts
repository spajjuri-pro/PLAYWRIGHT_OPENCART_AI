import { faker } from '@faker-js/faker';

export class RandomDataUtil {
  static getFirstName(): string {
    return faker.person.firstName();
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getFullName(): string {
    return faker.person.fullName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getPhoneNumber(): string {
    return faker.phone.number();
  }

  static getUsername(): string {
    return faker.internet.username();
  }

  static getPassword(length: number = 10): string {
    return faker.internet.password({ length, memorable: false });
  }

  static getCountry(): string {
    return faker.location.country();
  }

  static getState(): string {
    return faker.location.state();
  }

  static getCity(): string {
    return faker.location.city();
  }

  static getStreet(): string {
    return faker.location.street();
  }

  static getStreetAddress(): string {
    return faker.location.streetAddress();
  }

  static getZipCode(): string {
    return faker.location.zipCode();
  }

  static getLatitude(): string {
    return faker.location.latitude().toString();
  }

  static getLongitude(): string {
    return faker.location.longitude().toString();
  }

  static getCurrentDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  static getRecentDate(days: number = 10): string {
    const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 10);
  }

  static getFutureDate(years: number = 1): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date.toISOString().slice(0, 10);
  }

  static getPastDate(years: number = 1): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().slice(0, 10);
  }

  static getProductName(): string {
    return faker.commerce.productName();
  }

  static getProductDescription(): string {
    return faker.commerce.productDescription();
  }

  static getProductPrice(): string {
    return faker.commerce.price({ min: 1, max: 500, dec: 2 });
  }

  static getDepartment(): string {
    return faker.commerce.department();
  }

  static getImageUrl(): string {
    return faker.image.url();
  }

  static getNumber(): number {
    return faker.number.int({ min: 1, max: 999 });
  }

  static generateInvalidLoginPayload() {
    return {
      username: this.getUsername(),
      password: this.getPassword(),
    };
  }

  static generateProductPayload() {
    const productName = this.getProductName();
    const productPrice = Number(this.getProductPrice());

    return {
      title: productName,
      price: productPrice,
      description: this.getProductDescription(),
      image: this.getImageUrl(),
      category: this.getDepartment().toLowerCase(),
    };
  }

  static generateUpdatedProductPayload() {
    const payload = this.generateProductPayload();
    return {
      ...payload,
      title: `Updated ${payload.title}`,
    };
  }

  static generateUserPayload() {
    const firstName = this.getFirstName();
    const lastName = this.getLastName();
    const streetName = this.getStreet();
    const latitude = this.getLatitude();
    const longitude = this.getLongitude();

    return {
      email: this.getEmail(),
      username: this.getUsername(),
      password: this.getPassword(),
      name: `${firstName} ${lastName}`,
      firstname: firstName,
      lastname: lastName,
      address: this.getStreetAddress(),
      city: this.getCity(),
      street: streetName,
      number: this.getNumber(),
      zipcode: this.getZipCode(),
      geolocation: {
        lat: latitude,
        long: longitude,
      },
      lat: latitude,
      long: longitude,
      phone: this.getPhoneNumber(),
    };
  }

  static generateUserUpdatePayload() {
    const payload = this.generateUserPayload();
    return {
      ...payload,
      username: `updated-${payload.username}`,
    };
  }

  static generateCartPayload(userId: number) {
    return {
      userId,
      date: this.getCurrentDate(),
      products: [
        {
          productId: this.getNumber(),
          quantity: this.getNumber(),
        },
      ],
    };
  }

  static generateUpdatedCartPayload(userId: number) {
    const payload = this.generateCartPayload(userId);
    return {
      ...payload,
      products: [
        {
          productId: this.getNumber(),
          quantity: this.getNumber(),
        },
      ],
    };
  }
}
