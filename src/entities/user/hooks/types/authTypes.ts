export interface SignupReqBody  {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface SigninReqBody {
    email: string;
    password: string;
}