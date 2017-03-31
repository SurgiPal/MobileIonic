'use strict';
import { FosUser, Country,  State  } from './';
 


export interface HospitalInfo {
    

    id?: number;

    name?: string;

    managerName?: string;

    managerPhone?: string;

    managerPager?: string;

    managerEmail?: string;

    address?: string;

    suite?: string;

    city?: string;

    postalCode?: string;

    stateId?: number;

    countryId?: number;

    stateType?: string;

    fosUser?: FosUser;

    country?: Country;

    state?: State;
}
