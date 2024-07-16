import axios from 'axios';

enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

enum BloodGroup {
    A_PLUS = 'A+',
    A_MINUS = 'A-',
    B_PLUS = 'B+',
    B_MINUS = 'B-',
    A_B_PLUS = 'AB+',
    A_B_MINUS = 'AB-',
    ZERO_PLUS = 'O+',
    ZERO_MINUS = 'O-'
}

enum Role {
    USER = 'user',
    MODERATOR = 'moderator',
    ADMIN = 'admin'
}

type hair = { color: string, type: string };

type address = { 
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates: {
        lat: number,
        lng: number
    },
    country: string
}

type bank = {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string
}

type company = {
    department: string
    name: string,
    title: string,
    address: address
}

type crypto = {
    coin: string,
    wallet: string,
    network: string
}

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    age: number;
    gender: Gender,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: BloodGroup,
    height: number,
    weight: number,
    eyeColor: string,
    hair: hair,
    ip: string,
    address: address,
    macAddress: string,
    university: string,
    bank: bank,
    company: company,
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: crypto,
    role: Role
}

interface ResponseData {
    users: UserData[],
    total: number,
    skip: number,
    limit: number
}

async function getUsers(url: string): Promise<ResponseData | undefined> {
    try {
        const response = await axios.get(url);
        const responseData: ResponseData = await response.data;
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

getUsers('https://dummyjson.com/users');
getUsers('https://dummyjson.com/userss');
