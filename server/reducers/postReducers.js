import {
    INCOME_CREATE_REQUEST,
    INCOME_CREATE_SUCCESS,
    INCOME_CREATE_FAIL,

    INCOME_UPDATE_REQUEST,
    INCOME_UPDATE_SUCCESS,
    INCOME_UPDATE_FAIL,

    INCOME_DELETE_REQUEST,
    INCOME_DELETE_SUCCESS,
    INCOME_DELETE_FAIL,

    BUDGET_CREATE_REQUEST,
    BUDGET_CREATE_SUCCESS,
    BUDGET_CREATE_FAIL,
    BUDGET_CREATE_RESET,

    BUDGET_DELETE_REQUEST,
    BUDGET_DELETE_SUCCESS,
    BUDGET_DELETE_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,

    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,

    BUDGET_DETAIL_REQUEST,
    BUDGET_DETAIL_SUCCESS,
    BUDGET_DETAIL_FAIL,

    BUDGET_UPDATE_REQUEST,
    BUDGET_UPDATE_SUCCESS,
    BUDGET_UPDATE_FAIL,

    INCOME_DETAIL_REQUEST,
    INCOME_DETAIL_SUCCESS,
    INCOME_DETAIL_FAIL,

    SAVINGS_UPDATE_REQUEST,
    SAVINGS_UPDATE_SUCCESS,
    SAVINGS_UPDATE_FAIL,
    USER_SAVINGS_DETAIL_REQUEST,
    USER_SAVINGS_DETAIL_SUCCESS,
    USER_SAVINGS_DETAIL_FAIL,
    SAVINGS_DELETE_REQUEST,
    SAVINGS_DELETE_SUCCESS,
    SAVINGS_DELETE_FAIL,

} from '../constants/postConstants';

export const incomeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOME_CREATE_REQUEST:
            return { loading: true };
        case INCOME_CREATE_SUCCESS:
            return { loading: false, success: true, income: action.payload };
        case INCOME_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const incomeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOME_UPDATE_REQUEST:
            return { loading: true };
        case INCOME_UPDATE_SUCCESS:
            return { loading: false, success: true, income: action.payload };
        case INCOME_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const incomeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOME_DELETE_REQUEST:
            return { loading: true };
        case INCOME_DELETE_SUCCESS:
            return { loading: false, success: true };
        case INCOME_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const budgetCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BUDGET_CREATE_REQUEST:
            return { loading: true };
        case BUDGET_CREATE_SUCCESS:
            return { loading: false, success: true, budget: action.payload };
        case BUDGET_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BUDGET_CREATE_RESET:
            return {budget:{}}
        default:
            return state;
    }
};

export const budgetDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BUDGET_DELETE_REQUEST:
            return { loading: true };
        case BUDGET_DELETE_SUCCESS:
            return { loading: false, success: true };
        case BUDGET_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true };
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true };
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const budgetDetailReducer = (state = { budget: {} }, action) => {
    switch (action.type) {
        case BUDGET_DETAIL_REQUEST:
            return { loading: true, ...state };
        case BUDGET_DETAIL_SUCCESS:
            return { loading: false, budget: action.payload };
        case BUDGET_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const budgetUpdateReducer = (state = { budget: {} }, action) => {
    switch (action.type) {
        case BUDGET_UPDATE_REQUEST:
            return { loading: true };
        case BUDGET_UPDATE_SUCCESS:
            return { loading: false, success: true, budget: action.payload };
        case BUDGET_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const incomeDetailReducer = (state = { income: {}, budget: {}, categories: [] }, action) => {
    switch (action.type) {
        case INCOME_DETAIL_REQUEST:
            return { loading: true, ...state };
        case INCOME_DETAIL_SUCCESS:
            return { loading: false, income: action.payload.income, budget: action.payload.budget, categories: action.payload.categories };
        case INCOME_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};




export const savingsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVINGS_UPDATE_REQUEST:
            return { loading: true };
        case SAVINGS_UPDATE_SUCCESS:
            return { loading: false, success: true, savings: action.payload };
        case SAVINGS_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userSavingsDetailReducer = (state = { savings: {} }, action) => {
    switch (action.type) {
        case USER_SAVINGS_DETAIL_REQUEST:
            return { loading: true, ...state };
        case USER_SAVINGS_DETAIL_SUCCESS:
            return { loading: false, savings: action.payload };
        case USER_SAVINGS_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const savingsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVINGS_DELETE_REQUEST:
            return { loading: true };
        case SAVINGS_DELETE_SUCCESS:
            return { loading: false, success: true };
        case SAVINGS_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

