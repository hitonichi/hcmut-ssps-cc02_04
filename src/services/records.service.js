import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getRecords = async () => {
    try {
      const { data } = await axios.get(baseUrl + '/records');
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };