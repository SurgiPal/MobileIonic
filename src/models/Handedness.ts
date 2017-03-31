 

'use strict'; 
import { DoctorInfo } from "./index";

export interface Handedness {
    

    id?: number;

    name?: string;

    doctorInfo?: Array< DoctorInfo>;
}
