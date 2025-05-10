// frontend/src/api/stats.js

import axios from 'axios';

const API_BASE_URL = 'https://localhost:3000/api'; // Use https
const statsApi = {
  getStudentStats: async (studentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student stats:', error);
      throw error;
    }
  },

  getProfessorStats: async (professorId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/professor/${professorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching professor stats:', error);
      throw error;
    }
  },

  getAdminStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/admin`);
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  },
};

export default statsApi;