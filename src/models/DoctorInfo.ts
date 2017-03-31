'use strict';
import { FosUser, Country, GloveType, GownSize, Handedness, GloveSize, 
    Resident, State, Specialty, YearsInPractice } from './';
 

 
export interface DoctorInfo {
    

    id?: number;

    image?: string;

    firstName?: string;

    lastName?: string;

    officePhone?: string;

    pager?: string;

    companyName?: string;

    coordinatorName?: string;

    coordinatorPhone?: string;

    coordinatorEmail?: string;

    address?: string;

    suite?: string;

    city?: string;

    ppostalCode?: string;

    residentId?: number;

    yearsInPracticeId?: number;

    stateId?: number;

    countryId?: number;

    handednessId?: number;

    innerGloveSizeId?: number;

    outterGloveSizeId?: number;

    gloveTypeId?: number;

    gownSizeId?: number;

    fellow?: number;

    fellowSubspeciality?: string;

    stateTyped?: string;

    doubleGlove?: number;

    outterGloveTypeId?: number;

    notes?: string;

    specialtyId?: number;

    fellowshipTrained?: number;

    billingCoordinatorName?: string;

    billingCoordinatorPhone?: string;

    billingCoordinatorEmail?: string;

    fosUser?: FosUser;

    country?:  Country;

    gloveType?: GloveType;

    gownSize?: GownSize;

    handedness?: Handedness;

    innerGloveSize?: GloveSize;

    outterGloveSize?: GloveSize;

    outterGloveType?: GloveType;

    resident?: Resident;

    specialty?: Specialty;

    state?: State;

    yearsInPractice?: YearsInPractice;
}
