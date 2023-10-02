export interface ICustomer {
    _id: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    shop: {
        shopName: string;
        phoneNumber: string;
        address: string;
        LGA: string;
    };
}
