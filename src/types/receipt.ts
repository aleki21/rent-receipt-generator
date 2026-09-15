export interface PaymentDetails {
  transactionCode: string;
  amount: number;
  payerName: string;
  phoneNumber: string;
  paymentDate: string;
  paymentTime: string;
}

export interface RentalPeriod {
  startDate: string;
  endDate: string;
  description?: string;
}

export interface LandlordSettings {
  businessName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  receiptPrefix: string;
  logo?: string;
}

export interface Receipt {
  receiptNumber: string;
  issueDate: string;

  payment: PaymentDetails;

  rentalPeriod: RentalPeriod;

  landlord: LandlordSettings;

  paymentMethod: "M-PESA";
}