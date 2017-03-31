'use strict'; 

import {Exclusioner, AnswerBox, ClusterCard, Category } from "./index";
 


export interface Card {
    

    id?: number;

    name?: string;

    categoryId?: number;

    description?: string;

    active?: number;

    answerBox?: Array<AnswerBox>;

    clusterCard?: Array<ClusterCard>;

    exclusioner?: Array<Exclusioner>;

    category?: Category;
}
