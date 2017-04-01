 'use strict';
import { FosUser } from './';


export interface DoctorMessage {


    id?: number;

    userId?: number;

    subject?: string;

    message?: string;

    createdAt?: Date;

    views?: number;

    senderId?: number;

    sender?:  FosUser;

    user?:  FosUser;
}
