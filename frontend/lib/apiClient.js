import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getConfig = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const apiClient = {
  getCourses: () => axios.get(`${API_URL}/courses`),
  getCourse: (id) => axios.get(`${API_URL}/courses/${id}`),
  createCourse: (data) => axios.post(`${API_URL}/courses`, data, getConfig()),
  updateCourse: (id, data) => axios.put(`${API_URL}/courses/${id}`, data, getConfig()),
  deleteCourse: (id) => axios.delete(`${API_URL}/courses/${id}`, getConfig()),
  enrollCourse: (id) => axios.post(`${API_URL}/courses/${id}/enroll`, {}, getConfig()),
  getLiveClasses: () => axios.get(`${API_URL}/live-classes`),
  getLiveClass: (id) => axios.get(`${API_URL}/live-classes/${id}`),
  createLiveClass: (data) => axios.post(`${API_URL}/live-classes`, data, getConfig()),
  joinLiveClass: (id) => axios.post(`${API_URL}/live-classes/${id}/join`, {}, getConfig()),
  startLiveClass: (id) => axios.post(`${API_URL}/live-classes/${id}/start`, {}, getConfig()),
  endLiveClass: (id) => axios.post(`${API_URL}/live-classes/${id}/end`, {}, getConfig()),
  getQuizzes: () => axios.get(`${API_URL}/quizzes`),
  getQuiz: (id) => axios.get(`${API_URL}/quizzes/${id}`),
  createQuiz: (data) => axios.post(`${API_URL}/quizzes`, data, getConfig()),
  submitQuiz: (id, answers) => axios.post(`${API_URL}/quizzes/${id}/submit`, { answers }, getConfig()),
};

export default apiClient;