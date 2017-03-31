'use strict'; 

import {  ClusterCard, Question } from "./index";
 

export interface Cluster {
    

    id?: number;

    name?: string;

    clusterCard?: Array<ClusterCard>;

    question?: Array<Question>;
}
