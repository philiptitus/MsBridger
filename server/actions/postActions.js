import axios from 'axios';
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

import API_URL from '../constants/URL';

export const createIncome = (incomeData) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/v1/income/`, incomeData, config);

        dispatch({
            type: INCOME_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOME_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};



export const sendTokenToBackend = (token) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'SEND_TOKEN_REQUEST' });
console.log(token)
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const response = await fetch('https://bridgerbyphil.pythonanywhere.com/api/v1/register-push-token/', {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                token: token,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send token to backend');
        }

        const data = await response.json();

        dispatch({
            type: 'SEND_TOKEN_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'SEND_TOKEN_FAIL',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateIncome = (id, incomeData) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
console.log( "the id is" + id)
        const { data } = await axios.put(`${API_URL}/api/v1/income/update/${id}/`, incomeData, config);

        dispatch({
            type: INCOME_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOME_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteIncome = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/income/delete/${id}/`, config);

        dispatch({
            type: INCOME_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: INCOME_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createBudget = (budgetData) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log(budgetData)

        const { data } = await axios.post(`${API_URL}/api/v1/budget/create/`, budgetData, config);

        dispatch({
            type: BUDGET_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteBudget = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/budget/${id}/delete/`, config);

        dispatch({
            type: BUDGET_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createCategory = (categoryData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log("this is your categeory data: " + categoryData)

        const { data } = await axios.post(`${API_URL}/api/v1/categories/create/`, categoryData, config);

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateCategory = (id, categoryData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/category/${id}/update/`, categoryData, config);

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getBudgetDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_DETAIL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/budget/${id}/`, config);

        dispatch({
            type: BUDGET_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateBudget = (id, budgetData) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/budget/${id}/update/`, budgetData, config);

        dispatch({
            type: BUDGET_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getIncomeDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_DETAIL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/income/${id}/`, config);

        dispatch({
            type: INCOME_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOME_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateSavings = (id, savingsData) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVINGS_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };


        const { data } = await axios.put(`${API_URL}/api/v1/savings/${id}/update/`, savingsData, config);

        dispatch({
            type: SAVINGS_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SAVINGS_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getUserSavingsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_SAVINGS_DETAIL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/savings/${id}/`, config);

        dispatch({
            type: USER_SAVINGS_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_SAVINGS_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteSavings = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVINGS_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/savings/${id}/delete/`, config);

        dispatch({
            type: SAVINGS_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: SAVINGS_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
