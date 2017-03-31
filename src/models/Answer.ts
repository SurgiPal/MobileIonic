'use strict';
import * as models from './';

export interface Answer {
    

    id?: number;

    userId?: number;

    questionId?: number;

    answerBoxId?: number;

    reply?: string;

    createdAt?: Date;

    updatedAt?: Date;

    answerBox?: models.AnswerBox;

    question?: models.Question;

    user?: models.FosUser;
}
