 'use strict';
import { Surgery} from './';
 


export interface SurgeryStatus {
    

    id?: number;

    name?: string;

    surgery?: Array<Surgery>;
}
