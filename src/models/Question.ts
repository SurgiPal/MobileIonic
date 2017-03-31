 'use strict';
import { Answer, AnswerSuggested, Exclusioner, Cluster, QuestionType
 } from './';
 


export interface Question {
    

    id?: number;

    content?: string;

    placeholder?: string;

    clusterId?: number;

    questionTypeId?: number;

    active?: number;

    required?: number;

    position?: number;

    options?: string;

    indent?: number;

    answer?: Array<Answer>;

    answerSuggested?: Array<AnswerSuggested>;

    exclusioner?: Array<Exclusioner>;

    cluster?: Cluster;

    questionType?: QuestionType;
}
