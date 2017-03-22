export interface Message {
     Id: number;
    userId: number | null;
   subject: string;
    message: string;
    createdAt: Date;
    viewed: boolean;
    senderId: number | null;
    doctorDataId: number | null;
    hosptalDataId: number | null;
    email: string;
    doctorName: string;
   doctorImage: string;
    hospitalName: string;
    hospitalEmail: string;
  }
