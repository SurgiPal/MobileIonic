import { AnswerBox } from './AnswerBox';

'use strict';
import * as models from './';

export interface AnswerSuggested {
    

    id?: number;

    fosUserId?: number;

    suggestingHospitalId?: number;

    questionId?: number;

    answerBoxId?: number;

    reply?: string;

    createdAt?: Date;

    answerBox?: AnswerBox;

    fosUser?: models.FosUser;

    question?: models.Question;

    suggestingHospital?: models.FosUser;
}
