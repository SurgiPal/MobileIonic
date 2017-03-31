 'use strict';
import { FosUser, Country,  State  } from './';
 

export interface Practice {
    

    id?: number;

    stateId?: number;

    countryId?: number;

    name?: string;

    email?: string;

    address?: string;

    suite?: string;

    city?: string;

    stateTyped?: string;

    postalCode?: string;

    fosUser?: Array<FosUser>;

    country?: Country;

    state?: State;
}
