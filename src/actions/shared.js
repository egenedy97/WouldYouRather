import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/API";
import { recieveUsers } from "./users";
import { recievePolls } from "./polls";

export const USER_ADDS_NEW_POLL = "USER_ADDS_NEW_POLL"; 
export const USER_ANSWERS_POLL = "USER_ANSWERS_POLL"; 
export const GET_INITIAL_DATA = "GET_INITIAL_DATA";

export const userAddsNewPoll = (author , poll) =>({
    type:USER_ADDS_NEW_POLL,
    author , 
    poll,
})

export const userAnswersPoll =(author , {id , option}) => ({
    type : USER_ANSWERS_POLL , 
    author , 
    poll:{id , option}
})

export const handleInitialData = () =>{
    return(dispatch)=>{
        return getInitialData().then(({users,polls})=>{
            dispatch(recieveUsers(users)) ;
            dispatch(recievePolls(polls)) ;
        });
    };
};

