'use strict'; 

import {  Cluster, Card } from "./index";
 

export interface ClusterCard {
    

    clusterId?: number;

    cardId?: number;

    card?:  Card;

    cluster?:  Cluster;
}
