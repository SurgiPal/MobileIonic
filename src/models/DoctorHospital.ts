'use strict'; 

import {  FosUser } from "./index";
 

export interface DoctorHospital {
    

    hospitalId?: number;

    doctorId?: number;

    doctor?:  FosUser;

    hospital?:  FosUser;
}
