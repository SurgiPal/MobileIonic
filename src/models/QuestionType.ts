 

'use strict'; 
import { Question } from "./index";

export interface QuestionType {
    

    id?: number;

    name?: string;

    position?: number;

    slug?: string;

    question?: Array<Question>;
}
