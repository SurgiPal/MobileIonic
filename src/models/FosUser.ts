'use strict';
import { Surgery, AnswerBox, AnswerSuggested, DoctorHospital, DoctorMessage, HospitalInfo, Practice, DoctorInfo, ApplicationUser, Answer
} from './';
 

export interface FosUser {
    

    id?: number;

    userId?: string;

    doctorInfoId?: number;

    hospitalInfoId?: number;

    username?: string;

    usernameCanonical?: string;

    email?: string;

    emailCanonical?: string;

    enabled?: number;

    salt?: string;

    password?: string;

    lastLogin?: Date;

    locked?: number;

    expired?: number;

    expiredAt?: Date;

    confirmationToken?: string;

    passwordRequestedAt?: Date;

    roles?: string;

    credentialsExpired?: number;

    credentialsExpireAt?: Date;

    practiceId?: number;

    activationToken?: string;

    answer?: Array<Answer>;

    answerBoxDoctor?: Array<AnswerBox>;

    answerBoxHospital?: Array<AnswerBox>;

    answerBoxResponded?: Array<AnswerBox>;

    answerSuggestedFosUser?: Array<AnswerSuggested>;

    answerSuggestedSuggestingHospital?: Array<AnswerSuggested>;

    doctorHospitalDoctor?: Array<DoctorHospital>;

    doctorHospitalHospital?: Array<DoctorHospital>;

    doctorMessageSender?: Array<DoctorMessage>;

    doctorMessageUser?: Array<DoctorMessage>;

    surgeryDoctor?: Array<Surgery>;

    surgeryHospital?: Array<Surgery>;

    doctorInfo?: DoctorInfo;

    hospitalInfo?: HospitalInfo;

    practice?: Practice;

    user?: ApplicationUser;
}
